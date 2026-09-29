/**
 * Single place where every remote image URL in the app is resolved.
 *
 * Why this exists
 * ---------------
 * The image URLs used to be hardcoded string literals scattered across
 * eight route files — 89 references to 60 distinct Sanity assets. That
 * made two things expensive and error-prone:
 *
 *  1. Changing image hosting. A CDN swap was a find-and-replace across
 *     the whole `src/` tree, with no way to tell a completed migration
 *     from a partial one.
 *  2. Correctness. The same asset was spelled differently in different
 *     files, and the seven platform-stat icons were duplicated
 *     verbatim between the homepage and /about, so the two pages could
 *     disagree about the firm's own numbers.
 *
 * How it works
 * ------------
 * `IMAGES` is the manifest of canonical source URLs. `img(key)` returns
 * the override from `image-cdn-map.json` when one exists for that key,
 * and falls back to the canonical URL otherwise. So a migration to a
 * different host is a data change — regenerate the map, change nothing
 * else — and a partially-migrated app still renders, because every
 * unmapped key resolves to a working URL instead of `undefined`.
 *
 * Generating the map: `node scripts/migrate-images.mjs --apply`
 */

/** Canonical source of an asset. Keys are semantic, not hashes, so a
 *  reviewer can tell what a URL is for without opening the file. */
export const IMAGES = {
  /* ── Platform statistics (stats marquee) ─────────────────────────── */
  "stat.capital-raised":
    "https://cdn.sanity.io/images/40fnhjbe/production/d689231f2214b6a41f7f52a23c2dc36c1b8de92a-270x270.png",
  "stat.shares-per-day":
    "https://cdn.sanity.io/images/40fnhjbe/production/b1fc124413fd49362032895ee65bea977648e2c6-160x160.png",
  "stat.notional-per-day":
    "https://cdn.sanity.io/images/40fnhjbe/production/616252af94d03f609c3c669e78fd8920a5c6dddf-160x160.png",
  "stat.institutional-clients":
    "https://cdn.sanity.io/images/40fnhjbe/production/88d391f715baf4d6cea1430092201c9bd8cce0ef-160x160.png",
  "stat.employees":
    "https://cdn.sanity.io/images/40fnhjbe/production/62eeac92c57b7513602f235400107c1b5e975396-160x160.png",
  "stat.transacted-growth":
    "https://cdn.sanity.io/images/40fnhjbe/production/280041ac042811742253e7f5bc1c788d2fff9207-190x190.png",
  "stat.customer-balances":
    "https://cdn.sanity.io/images/40fnhjbe/production/2e87bd97776b6981cc422452e701ce9b730e4eb8-190x192.png",

  /* ── Service illustrations (services index) ──────────────────────── */
  "service.clearing":
    "https://cdn.sanity.io/images/40fnhjbe/production/e3cf6a8f90ea6442f3e4fa4ed977cdfdcdbb6e4f-3398x1400.webp",
  "service.financing":
    "https://cdn.sanity.io/images/40fnhjbe/production/b5d647f1abe0f07db3429be70448037ee1ecded5-3398x1400.webp",
  "service.execution-trading":
    "https://cdn.sanity.io/images/40fnhjbe/production/2e0643b1ade78df7fa4457c259e344b6a6ac70e8-3398x1400.webp",
  "service.investment-banking":
    "https://cdn.sanity.io/images/40fnhjbe/production/acdcf1b9f06dee06e21920c5b1a0a3e92b223437-3398x1400.webp",

  /* ── Asset-class glyphs (services index) ─────────────────────────── */
  "asset.equities":
    "https://cdn.sanity.io/images/40fnhjbe/production/b180ee228faf85747e3c48c885c6c6d1488d617c-32x32.svg",
  "asset.options":
    "https://cdn.sanity.io/images/40fnhjbe/production/e48e41e23e173b5f7d1662fe8042be8774cd4754-32x32.svg",
  "asset.futures":
    "https://cdn.sanity.io/images/40fnhjbe/production/5233f650faa6073ece6713ea4605ac4248d93222-32x32.svg",
  "asset.fixed-income":
    "https://cdn.sanity.io/images/40fnhjbe/production/7e5324fe5f4c4e6377bf6da3ee6325cd53507b48-32x32.svg",
  "asset.fx":
    "https://cdn.sanity.io/images/40fnhjbe/production/0c43acd448258520a2215bc511bd871d9000b46d-32x32.svg",
  "asset.swaps":
    "https://cdn.sanity.io/images/40fnhjbe/production/919820dd9a781c91aa49959cb9bb0cc149d3d255-32x32.svg",
  "asset.commodities":
    "https://cdn.sanity.io/images/40fnhjbe/production/e9fbff0c30a80ce09d1c0643fc8253db75fa3d2e-32x32.svg",
  "asset.treasury-repo":
    "https://cdn.sanity.io/images/40fnhjbe/production/b109049e994c8edbafd70c66b731563b5e19d6e6-32x32.svg",
  "asset.mbs-repo":
    "https://cdn.sanity.io/images/40fnhjbe/production/de9b78dee58cecaeb7a77b62b81f18c2edf940a9-32x32.svg",
  "asset.digital-assets":
    "https://cdn.sanity.io/images/40fnhjbe/production/e945655a157e941046bb4ad9e067a778a2c19a47-32x32.svg",

  /* ── Audience glyphs (services index) ───────────────────────────── */
  "audience.traders":
    "https://cdn.sanity.io/images/40fnhjbe/production/d556602a75e36ed3cb5d8bbce49430c61e683b97-32x32.svg",
  "audience.family-offices":
    "https://cdn.sanity.io/images/40fnhjbe/production/a0d00654eddfa648c0ff9530be910c46a37dbfdc-32x32.svg",
  "audience.hedge-funds":
    "https://cdn.sanity.io/images/40fnhjbe/production/7b812bee0a7e04973c76513ed7bbbcc24823c2bd-32x32.svg",
  "audience.etf-issuers":
    "https://cdn.sanity.io/images/40fnhjbe/production/8debf7dc03a2d0d701a0e852ec04232af60b6d6c-32x32.svg",
  "audience.broker-dealers":
    "https://cdn.sanity.io/images/40fnhjbe/production/6f607c814772c9ff904e20e5001eff9fd2ea82da-32x32.svg",

  /* ── Leadership photography (about) ─────────────────────────────── */
  "team.uriel-cohen":
    "https://cdn.sanity.io/images/40fnhjbe/production/5512ad73eac8989401fff461b473af04fcec72ba-2297x2677.png",
  "team.atul-pawar":
    "https://cdn.sanity.io/images/40fnhjbe/production/216843c685f4ae195679b14a15f295751fed94fa-1532x1760.jpg",
  "team.steve-bisgay":
    "https://cdn.sanity.io/images/40fnhjbe/production/89bbb1b1f0d82616a70783e92eb9c4bbea7c94af-1532x1760.jpg",
  "team.jon-daplyn":
    "https://cdn.sanity.io/images/40fnhjbe/production/690e31b1415d2a07e4f7883ecc7db8e61c97bf9d-1532x1760.jpg",
  "team.ashley-desimone":
    "https://cdn.sanity.io/images/40fnhjbe/production/d510a7d121e722392f13f46fea7b4a5cbd4a8c81-1532x1760.jpg",
  "team.christy-moccia":
    "https://cdn.sanity.io/images/40fnhjbe/production/b4d0da5b5736273561ff4f1a471e427a85ab3792-1532x1760.jpg",
  "team.kenneth-sicklick":
    "https://cdn.sanity.io/images/40fnhjbe/production/e44094c06453ed6c63ff543f52a224502cafe5f9-1532x1760.jpg",
  "team.michael-stover":
    "https://cdn.sanity.io/images/40fnhjbe/production/fe8534999467688428a343b88c12cb26992ae5d3-2295x2678.png",
  "team.john-dibacco":
    "https://cdn.sanity.io/images/40fnhjbe/production/26bd57d4df05206981d95b405f220886aad14c33-1532x1760.jpg",
  "team.andy-volz":
    "https://cdn.sanity.io/images/40fnhjbe/production/5c1103af00c7cb0cd7c9a800d1d87852ad5d4451-1532x1760.jpg",
  "team.john-dagostini":
    "https://cdn.sanity.io/images/40fnhjbe/production/77dd8582655369b70eb02d494f85597da326a9dd-1532x1760.jpg",
  "team.nicholas-hemmerly":
    "https://cdn.sanity.io/images/40fnhjbe/production/7636f355bb4c86695a2aae0a728c21c2b10d3ff0-1532x1760.jpg",
  "team.alex-lawton":
    "https://cdn.sanity.io/images/40fnhjbe/production/43ca3e5ed8a9e8958627c12e48f3e3009f9d505b-2295x2682.png",
  "team.chris-smith":
    "https://cdn.sanity.io/images/40fnhjbe/production/01e59cde84308d51f20e1cd229f1e893007ecc81-1532x1760.jpg",

  /* ── Culture photography (about) ────────────────────────────────── */
  "culture.1":
    "https://cdn.sanity.io/images/40fnhjbe/production/5397f03c1e6c9f7780c0732fa8fd22eb736e753e-766x640.jpg",
  "culture.2":
    "https://cdn.sanity.io/images/40fnhjbe/production/a269ecb9cd2157151d16c4ba9770b24fd8022e8d-550x363.png",
  "culture.3":
    "https://cdn.sanity.io/images/40fnhjbe/production/6128dde31dbfb727f213b6273052f31502d58e6a-766x504.jpg",
  "culture.4":
    "https://cdn.sanity.io/images/40fnhjbe/production/a406164e87390d581fc797d10fb30be038f8c1d2-766x504.jpg",
  "culture.5":
    "https://cdn.sanity.io/images/40fnhjbe/production/f219eda9623e9047d9d70a1647036d66f78688ce-1280x853.jpg",
  "culture.6":
    "https://cdn.sanity.io/images/40fnhjbe/production/3b9a3f5067df282b7fdeeac0b78a3306e8f0eba5-1283x818.jpg",
  "culture.7":
    "https://cdn.sanity.io/images/40fnhjbe/production/53ff1f14eb8dc63c74cb861c4a92e8edc8f19ee7-550x770.jpg",

  /* ── Quote backgrounds (about) ──────────────────────────────────── */
  "quote.volz":
    "https://cdn.sanity.io/images/40fnhjbe/production/0c0a11f2faab4d29a1b2ca9a0853b5089b2d6823-4900x3267.jpg",
  "quote.daplyn":
    "https://cdn.sanity.io/images/40fnhjbe/production/4afdb660042278ce9a5e3317a8ad169459a3e2d3-3400x1960.jpg",
  "quote.zivkovic":
    "https://cdn.sanity.io/images/40fnhjbe/production/a9e32f0cb226eeed1bff5b0f598bdb1627174ccd-3400x1960.jpg",

  /* ── News and press thumbnails ──────────────────────────────────── */
  "news.platform-sales":
    "https://cdn.sanity.io/images/40fnhjbe/production/8a7aded60c0e3422cd5524308626298e97104dce-1920x1080.png",
  "news.hendelman":
    "https://cdn.sanity.io/images/40fnhjbe/production/15aaab81663b1c17e087e8f423a2b12114999e45-3840x2160.png",
  "news.golden-record":
    "https://cdn.sanity.io/images/40fnhjbe/production/c2e9aaae985596b777fd60fb099e7fe9a966cb0b-1920x1080.jpg",
  "news.corporate-access":
    "https://cdn.sanity.io/images/40fnhjbe/production/cd9ced9228f740345e94536d46c8a358d388a1fd-3840x2160.png",
  "news.mifid-ii":
    "https://cdn.sanity.io/images/40fnhjbe/production/bb50edfeb4740d2b98c08dc499b1eb374b14873b-1920x1080.png",
  "news.history-of-data":
    "https://cdn.sanity.io/images/40fnhjbe/production/97681fb649a2b188213efadf85b2c2c026adc80b-3840x2160.png",
  "news.tilly":
    "https://cdn.sanity.io/images/40fnhjbe/production/bdd7df8352a5298bbbb543c2fe802fd1324e01fc-3840x2160.png",
  "news.blockchain-franchise":
    "https://cdn.sanity.io/images/40fnhjbe/production/71aec502bcf84e7d8195a8e12ee937e13c02153d-3840x2160.png",
  "news.outsourced-trading":
    "https://cdn.sanity.io/images/40fnhjbe/production/9fe1872d2f07b225e33b84b0c2406bec27d72353-1920x1080.png",
  "news.buchenberger":
    "https://cdn.sanity.io/images/40fnhjbe/production/4b366431e6a0ae1c6396fe0bf05ca66b965291cc-1920x1080.png",
} as const;

export type ImageKey = keyof typeof IMAGES;

/**
 * Host-rewrite map, regenerated by `scripts/migrate-images.mjs --apply`.
 *
 * Ships empty and is a committed file rather than a `require` in a
 * try/catch: a generated artifact that may not exist yet is a broken
 * build waiting to happen, and an empty object is both a valid value
 * and an honest signal that no migration has run.
 *
 * Typed as a partial so a map covering only some assets stays valid —
 * `img()` falls back per key, which means a half-finished migration
 * degrades to "some images on the new host" rather than to `undefined`
 * src attributes site-wide.
 */
import overrides from "./image-cdn-map.json";

const migrated = overrides as Partial<Record<ImageKey, string>>;

/** Delivery hints. Widths are in CSS pixels. */
export type ImgOpts = {
  /** Render at this width. Omit to get the stored original. */
  w?: number;
  /**
   * Cap the delivered weight. Defaults to `auto`, which lets the CDN
   * negotiate a sensible quality for the format it chooses.
   */
  quality?: "auto" | "low" | "good" | number;
  /** Force a format, or `"auto"` to negotiate via `Accept`. */
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
};

/**
 * Insert a Cloudinary transformation into an already-mapped URL.
 *
 * Transformations go *before* the version segment — Cloudinary's
 * `/upload/<transforms>/v<version>/<public_id>` — not appended as a
 * query string. A query string is what the Sanity source used, so
 * blindly appending `?w=` silently no-ops on a Cloudinary URL and
 * leaves the multi-megabyte original in place.
 */
function transform(url: string, opts: ImgOpts): string {
  const parts: string[] = [];
  if (opts.format) parts.push(`f_${opts.format}`);
  if (opts.w) parts.push(`w_${opts.w}`);
  if (opts.quality !== undefined) parts.push(`q_${opts.quality}`);
  if (parts.length === 0) return url;

  const transforms = parts.join(",");

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const [head, tail] = url.split("/upload/");
    // Keep any version segment at the head of the tail.
    const versionMatch = tail.match(/^(v\d+\/)/);
    const rest = versionMatch ? tail.slice(versionMatch[1].length) : tail;
    return `${head}/upload/${transforms}/${versionMatch ? versionMatch[1] : ""}${rest}`;
  }

  // Non-Cloudinary hosts (the pre-migration Sanity URLs) take a query
  // parameter, which is what `?w=` already meant there.
  return `${url}${url.includes("?") ? "&" : "?"}w=${opts.w ?? ""}`;
}

/**
 * Resolve an image key to a URL, preferring a migrated host.
 *
 * Pass `w` for anything displayed at less than its stored size. The
 * leadership photography is stored at up to 8 MB per headshot; served
 * untransformed, rendering the team grid pulls ~19 MB.
 */
export function img(key: ImageKey, opts: ImgOpts = {}): string {
  const url = migrated[key] ?? IMAGES[key];
  return transform(url, { quality: "auto", ...opts });
}

/** True when `key` has been repointed at a different host. */
export function isMigrated(key: ImageKey): boolean {
  return migrated[key] !== undefined;
}

/** Every key, for the migration script's coverage report. */
export const IMAGE_KEYS = Object.keys(IMAGES) as ImageKey[];

/**
 * Unsplash placeholders and the local OG image are tracked separately
 * from the Sanity manifest. Unsplash's licence is written around
 * hotlinking, and the hero frame sequence is served from a third-party
 * host that is not ours to migrate — so neither belongs in a bulk
 * re-host operation.
 */
export const EXTERNAL_IMAGES = {
  "unsplash.team-hero":
    "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?auto=format&fit=crop&w=80&q=15",
  "unsplash.clients":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=15",
  "unsplash.careers":
    "https://images.unsplash.com/photo-1706689656095-168768dc20a5?auto=format&fit=crop&w=800&q=60",
} as const;
