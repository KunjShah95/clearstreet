#!/usr/bin/env node
/**
 * Image CDN migration utility.
 *
 * DEFAULT MODE IS A DRY RUN. It prints an inventory and exits. Nothing
 * is downloaded, uploaded, or written unless you pass an explicit flag.
 *
 *   node scripts/migrate-images.mjs               # inventory + verify manifest
 *   node scripts/migrate-images.mjs --verify      # fail if manifest drifts
 *   node scripts/migrate-images.mjs --apply       # upload to Cloudinary
 *   node scripts/migrate-images.mjs --apply --host local   # just download
 *
 * Flags
 *   --apply        Perform the transfer. Requires credentials below.
 *   --verify       Exit non-zero if the manifest and the source disagree.
 *   --host <id>    Cloudinary cloud name, or `local` to stage files only.
 *   --force        Overwrite assets that already exist in the target.
 *   --only <key>   Transfer a single manifest key. Use to smoke-test the
 *                  signature and response handling before a full run.
 *   --include-riv  Also transfer the Rive `.riv` stat animations.
 *   --json         Emit the inventory as JSON instead of a table.
 *
 * Credentials are read from the environment, never committed:
 *   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 *
 * WHAT THIS SCRIPT WILL NOT DO
 * ----------------------------
 * It refuses to transfer the Unsplash placeholders. The Unsplash
 * licence is written around hotlinking, and re-hosting them is a
 * separate licensing decision, not a mechanical one. Video on the
 * DigitalOcean host is excluded for the same reason: it is not image
 * infrastructure and needs a different pipeline.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = join(ROOT, "src");
const MANIFEST = join(SRC, "lib", "images.ts");
const MAP_PATH = join(SRC, "lib", "image-cdn-map.json");

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n, d) => {
  const i = argv.indexOf(n);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};

const APPLY = flag("--apply");
const VERIFY = flag("--verify");
const FORCE = flag("--force");
const INCLUDE_RIV = flag("--include-riv");
const AS_JSON = flag("--json");
const ONLY = opt("--only", "");
const HOST = opt("--host", process.env.CLOUDINARY_CLOUD_NAME || "");
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

const SANITY_HOST = "cdn.sanity.io";
const UNSPLASH_HOST = "images.unsplash.com";

/* ── Source discovery ─────────────────────────────────────────────── */

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const URL_RE = /https:\/\/[^\s"'`)]+/g;
const IMAGE_EXT = /\.(jpg|jpeg|png|webp|svg|avif|ico)(\?|$)/i;

async function collectSourceUrls() {
  const files = await walk(SRC);
  const found = new Map(); // url -> Set<file>

  for (const file of files) {
    const text = await readFile(file, "utf8");
    for (const raw of text.match(URL_RE) || []) {
      const url = raw.replace(/[.,;]+$/, "");
      if (!IMAGE_EXT.test(url)) continue;
      if (!found.has(url)) found.set(url, new Set());
      found.get(url).add(relative(ROOT, file));
    }
  }
  return found;
}

/** Parse the `IMAGES` object literal out of the manifest. */
async function collectManifest() {
  const text = await readFile(MANIFEST, "utf8");
  const start = text.indexOf("export const IMAGES = {");
  if (start < 0) throw new Error(`No IMAGES object found in ${MANIFEST}`);

  const bodyStart = text.indexOf("{", start);
  let depth = 0;
  let end = bodyStart;
  for (let i = bodyStart; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  const body = text.slice(bodyStart, end + 1);
  const entries = [];
  const re = /"([^"]+)"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body))) entries.push({ key: m[1], url: m[2] });
  return entries;
}

/* ── Classification ───────────────────────────────────────────────── */

function classify(url) {
  const ext = (url.match(/\.([a-z0-9]+)(?:\?|$)/i)?.[1] || "").toLowerCase();
  if (ext === "riv") return "rive";
  if (url.includes(SANITY_HOST)) return "sanity";
  if (url.includes(UNSPLASH_HOST)) return "unsplash";
  return "other";
}

function publicIdFor(key) {
  // Cloudinary public_ids allow most punctuation; dots are fine but make
  // path handling awkward, so normalise the namespace separator.
  return `clearstreet/${key.replace(/\./g, "/")}`;
}

/* ── Transfer ─────────────────────────────────────────────────────── */

async function fetchAsset(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, sha: createHash("sha256").update(buf).digest("hex").slice(0, 12) };
}

async function uploadToCloudinary(key, buf) {
  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = publicIdFor(key);

  // Cloudinary signs every parameter except `file`, `api_key` and
  // `signature`, and requires them sorted alphabetically and joined
  // with `&`. Build the set first and sort it, rather than writing the
  // string by hand: a hardcoded `public_id=…&timestamp=…` silently
  // signs wrong the moment another parameter is added — `overwrite`
  // sorts *before* `public_id` — and that surfaces only as a generic
  // "Invalid Signature" 401.
  const params = { public_id: publicId, timestamp: String(timestamp) };
  if (FORCE) params.overwrite = "true";

  const toSign =
    Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&") + API_SECRET;

  const form = new FormData();
  form.append("file", new Blob([buf]));
  for (const [k, v] of Object.entries(params)) form.append(k, v);
  form.append("api_key", API_KEY);
  form.append("signature", createHash("sha1").update(toSign).digest("hex"));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${HOST}/image/upload`, {
    method: "POST",
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || `upload failed (${res.status})`);
  }
  return json.secure_url;
}

/* ── Main ─────────────────────────────────────────────────────────── */

async function main() {
  const manifest = await collectManifest();
  const manifestUrls = new Map(manifest.map((e) => [e.url, e.key]));
  const sourceUrls = await collectSourceUrls();

  const buckets = { sanity: [], unsplash: [], other: [], rive: [] };
  for (const [url, files] of sourceUrls) {
    const kind = classify(url);
    if (kind === "rive" && !INCLUDE_RIV) continue;
    buckets[kind].push({ url, key: manifestUrls.get(url) ?? null, files: [...files] });
  }

  const manifestKeys = new Set(manifest.map((e) => e.key));
  const duplicateKeys = new Set();
  const seen = new Set();
  for (const e of manifest) {
    if (seen.has(e.url)) duplicateKeys.add(e.url);
    seen.add(e.url);
  }

  const unmapped = buckets.sanity.filter((a) => !a.key);
  const mapped = buckets.sanity.filter((a) => a.key);
  const unused = manifest.filter((e) => !sourceUrls.has(e.url));

  // A manifest URL that no longer exists in source is the dangerous case:
  // it means the manifest was hand-edited into a state the app never uses.
  const broken = manifest.filter((e) => {
    const kind = classify(e.url);
    return kind === "sanity" && !sourceUrls.has(e.url) && !e.url.includes("data:");
  });

  if (AS_JSON) {
    console.log(
      JSON.stringify(
        {
          totals: { sanity: buckets.sanity.length, unsplash: buckets.unsplash.length },
          mapped,
          unmapped,
          broken,
          unused,
        },
        null,
        2,
      ),
    );
  } else {
    const line = (s = "") => console.log(s);
    line();
    line("  Image inventory");
    line("  " + "─".repeat(72));
    line(
      `  Sanity images       ${buckets.sanity.length}  (${mapped.length} mapped, ${unmapped.length} unmapped)`,
    );
    line(`  Unsplash            ${buckets.unsplash.length}  (skipped — hotlink licence)`);
    line(`  Rive animations     ${buckets.rive.length}  (skipped — pass --include-riv)`);
    line(`  Manifest entries    ${manifest.length}`);
    line();

    if (unmapped.length) {
      line("  Not in manifest (add these before migrating):");
      for (const a of unmapped) line(`    ${a.url}`);
      line();
    }
    if (broken.length) {
      line(`  ✗ MANIFEST DRIFT — ${broken.length} manifest entries are not present in src/:`);
      for (const e of broken) line(`    ${e.key}\n      ${e.url}`);
      line();
    }
    if (unused.length) {
      line(`  ${unused.length} manifest entries are not referenced in src/ (safe to keep):`);
      for (const e of unused) line(`    ${e.key}`);
      line();
    }
    if (!unmapped.length && !broken.length) line("  ✓ Manifest and source agree.");
    line();
  }

  if (VERIFY && (unmapped.length || broken.length)) {
    console.error("  Verification failed. Fix the manifest before applying.\n");
    process.exit(1);
  }

  if (!APPLY) {
    console.log("  Dry run. Nothing was transferred. Pass --apply to proceed.\n");
    return;
  }

  if (unmapped.length || broken.length) {
    console.error("  Refusing to apply: manifest and source disagree.\n");
    process.exit(1);
  }

  const localMode = HOST === "local";
  if (!localMode && (!HOST || !API_KEY || !API_SECRET)) {
    console.error(
      "  Missing credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and\n" +
        "  CLOUDINARY_API_SECRET, or use --host local to stage files only.\n",
    );
    process.exit(1);
  }

  const map = existsSync(MAP_PATH) ? JSON.parse(await readFile(MAP_PATH, "utf8")) : {};
  const stageDir = join(ROOT, ".image-migration");
  if (localMode) await mkdir(stageDir, { recursive: true });

  // `--only` restricts the transfer to a single key. Used to prove the
  // signature and response handling against one asset before committing
  // to the full batch — a signing mistake should fail on asset one, not
  // after sixty upload attempts.
  const queue = ONLY ? mapped.filter((a) => a.key === ONLY) : mapped;
  if (ONLY && queue.length === 0) {
    console.error(`\n  No manifest key matches --only "${ONLY}".\n`);
    process.exit(1);
  }

  console.log(
    `  Transferring ${queue.length} asset(s)${localMode ? " (staging only)" : ` to cloud "${HOST}"`}…\n`,
  );

  for (const asset of queue) {
    try {
      const { buf, sha } = await fetchAsset(asset.url);

      if (map[asset.key] && !FORCE) {
        console.log(`  = ${asset.key} (already mapped, use --force to re-send)`);
        continue;
      }

      if (localMode) {
        const dest = join(stageDir, `${asset.key.replace(/[/.]/g, "__")}__${sha}`);
        await writeFile(dest, buf);
        map[asset.key] = asset.url; // unchanged; staging is a dry transfer
        console.log(
          `  ↓ ${asset.key}  ${(buf.length / 1024).toFixed(0)} KB → ${relative(ROOT, dest)}`,
        );
      } else {
        const url = await uploadToCloudinary(asset.key, buf);
        map[asset.key] = url;
        console.log(`  ↑ ${asset.key}  ${(buf.length / 1024).toFixed(0)} KB → ${url}`);
      }
    } catch (err) {
      console.error(`  ✗ ${asset.key}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  await writeFile(MAP_PATH, JSON.stringify(map, null, 2) + "\n");
  console.log(`\n  Wrote ${Object.keys(map).length} entries to ${relative(ROOT, MAP_PATH)}.\n`);
}

main().catch((err) => {
  console.error(`\n  ${err.message}\n`);
  process.exit(1);
});
