import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useRef, useEffect, useState } from "react";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { StatsMarquee as SharedStatsMarquee } from "../components/stats-marquee";
import { img, type ImageKey } from "../lib/images";
import { WorldMap } from "../components/world-map";
import { useInView, usePrefersReducedMotion } from "../hooks/use-in-view";
import { getLenis } from "../components/smooth-scroll";
import { LazyVideo } from "../components/lazy-video";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clear Street — Modern prime brokerage for institutional markets" },
      {
        name: "description",
        content:
          "A cloud-native prime brokerage, clearing, and execution platform built from the ground up for hedge funds, market makers, and institutional investors.",
      },
      { property: "og:title", content: "Clear Street — Modern prime brokerage" },
      {
        property: "og:description",
        content:
          "Cloud-native prime brokerage, clearing, and execution for institutional markets.",
      },
    ],
  }),
  component: Home,
});

const TOTAL_FRAMES = 76;
const FRAME_HEIGHT = 2;

function frameUrl(n: number) {
  return `https://www.clearstreet.io/imgs/home/header/webp/ct_header_end${n}.webp`;
}

function Home() {
  return (
    <div>
      <ScrollVideo />
      <StatsMarquee />
      <ModernizingSection />
      <FeaturesSection />
      <ReasonsSection />
      <QuoteSection />
      <StudioCalloutSection />
      <ClientsForSection />
      <VectorsSection />
      <GlobalMarketSection />
      <StudioHighlightsSection />
      <ExchangesSection />
      <NewsSection />
      <GetInTouch />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas-driven hero frame sequence.                                 */
/*                                                                     */
/*  A single <canvas> paints the scroll-linked cut, so there is one     */
/*  composited layer instead of 76 stacked <img> nodes. The render     */
/*  loop only runs when the target frame actually changes.              */
/* ------------------------------------------------------------------ */
function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastIdxRef = useRef(-1);
  const rafIdRef = useRef(0);
  const scaleRef = useRef(1);
  const copyRef = useRef<HTMLDivElement>(null);
  const drawFrame = useRef<(idx: number) => void>(() => {});
  const reduced = usePrefersReducedMotion();

  /* Frame loading.

     All 76 frames have to be resident before the user reaches the end
     of the pin — the sequence is scroll-driven playback, so a frame
     that hasn't loaded simply isn't drawn and the hero falls back to
     the flat background.

     An earlier version drip-fed these through requestIdleCallback two
     at a time, to spare the LCP element. That was the wrong lever:
     idle callbacks are starved exactly while the user is scrolling, so
     the sequence played back mostly empty.

     What actually helps LCP here is priority, not a smaller request
     count. Frame 1 is the only frame visible before any scrolling, so
     it is issued first at high priority; the remaining 75 go out in a
     short burst over the next few frames, which lets frame 1's
     connection settle without queueing behind 75 equal-priority ones.
     fetchPriority must be set before src — assigning src starts the
     request immediately. */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) imgs.push(new Image());
    imagesRef.current = imgs;

    let cancelled = false;

    imgs[0].fetchPriority = "high";
    imgs[0].src = frameUrl(1);

    const BURST = 8;
    let cursor = 1;
    const pump = () => {
      if (cancelled) return;
      const end = Math.min(cursor + BURST, imgs.length);
      for (; cursor < end; cursor++) imgs[cursor].src = frameUrl(cursor + 1);
      if (cursor < imgs.length) requestAnimationFrame(pump);
    };
    requestAnimationFrame(pump);

    return () => {
      cancelled = true;
      // Detach sources so an unmount doesn't leave 76 live decodes.
      for (const img of imgs) img.src = "";
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const size = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      // Render at device resolution (capped at 2x) so the frame stays
      // sharp on retina without allocating a 3x backing store.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
        // Work in CSS pixels from here on. Note the draw below targets
        // canvas.width / dpr, NOT canvas.width — the transform is
        // already scaling by dpr, so passing backing-store dimensions
        // would draw at dpr x dpr and crop to the top-left quadrant.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      scaleRef.current = dpr;
    };
    size();

    drawFrame.current = (idx: number) => {
      size();
      const img = imagesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      // Cover the viewport: scale so the image fills, centre the overflow.
      const cw = canvas.width / scaleRef.current;
      const ch = canvas.height / scaleRef.current;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.globalAlpha = 1;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const first = imagesRef.current[0];
    const onFirstFrame = () => {
      lastIdxRef.current = 0;
      drawFrame.current(0);
      first.removeEventListener("load", onFirstFrame);
    };
    if (first.complete && first.naturalWidth > 0) onFirstFrame();
    else first.addEventListener("load", onFirstFrame);

    const onResize = () => {
      if (lastIdxRef.current >= 0) drawFrame.current(lastIdxRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  /* Scroll linkage.
     The previous handler called getBoundingClientRect() on every scroll
     event, forcing a synchronous layout each time, and read the value
     off the native scroll position even though Lenis is driving it.
     The section's offset is now measured once (and on resize) so the
     handler is pure arithmetic, and when Lenis is active we subscribe
     to its scroll event instead of the native one. */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reduced) {
      drawFrame.current(0);
      lastIdxRef.current = 0;
      if (copyRef.current) copyRef.current.style.opacity = "1";
      return;
    }

    let top = 0;
    let span = 0;
    const measure = () => {
      top = container.getBoundingClientRect().top + window.scrollY;
      span = window.innerHeight * ((TOTAL_FRAMES * FRAME_HEIGHT) / 100);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });

    const update = () => {
      const progress = Math.min(Math.max((window.scrollY - top) / span, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const idx = Math.min(Math.floor(eased * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      // Fade the copy out before the section starts releasing. The
      // headline reaches the fixed header at ~43% of the runway, so
      // the copy is fully clear by 0.40.
      if (copyRef.current) {
        const fade = 1 - Math.min(Math.max((progress - 0.2) / 0.2, 0), 1);
        copyRef.current.style.opacity = String(fade);
      }

      if (idx === lastIdxRef.current) return;
      lastIdxRef.current = idx;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = 0;
        drawFrame.current(idx);
      });
    };

    // Prefer Lenis so the hero stays in step with the smoothed scroll
    // instead of running against it.
    const lenis = getLenis() as { on?: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void } | null;
    if (lenis?.on) {
      lenis.on("scroll", update);
    } else {
      window.addEventListener("scroll", update, { passive: true });
    }
    update();

    return () => {
      window.removeEventListener("resize", measure);
      if (lenis?.off) lenis.off("scroll", update);
      else window.removeEventListener("scroll", update);
    };
  }, [reduced]);

  return (
    // Scroll runway lives on the section, with the sticky hero as its
    // first child. It used to be an empty sibling placed *before* the
    // sticky element, which meant the hero sat at its static position
    // — 1368px down the page — until the user scrolled far enough to
    // trigger the pin. On load that rendered as a screen of empty
    // background with the headline well below the fold.
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_FRAMES * FRAME_HEIGHT}vh` }}
    >
      <div className="sticky top-0 z-0 flex h-[100dvh] items-center overflow-hidden">
        {/* Base wash. The frame sequence loads from an external CDN;
            when it is slow or unreachable this keeps the hero reading
            as a deliberate gradient instead of a flat void. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[#01001f] bg-[radial-gradient(120%_85%_at_18%_8%,#2e21de_0%,#1b1580_45%,#01001f_100%)]"
        />

        {/* Ambient orbs sit above the canvas */}
        <div aria-hidden className="cs-ambient-orb z-[1] -left-32 top-0 h-[500px] w-[500px] bg-indigo-500/20" />
        <div aria-hidden className="cs-ambient-orb z-[1] -right-20 bottom-0 h-[400px] w-[400px] bg-[#3b29e0]/20" />
        <div aria-hidden className="cs-ambient-orb z-[1] left-1/3 top-1/2 h-[300px] w-[300px] bg-[#8b7aff]/15" />

        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
        />

        {/* Scrims. The vertical wash ties the frame into the page; the
            left-to-right one is what actually buys text contrast —
            the copy is left-aligned over the busiest part of the
            artwork, and a bottom-only gradient left it competing with
            the chart detail behind it. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[4] bg-gradient-to-r from-[#01001f]/92 via-[#01001f]/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[5] bg-gradient-to-t from-primary via-primary/25 to-transparent"
        />

        {/* Hero copy. Opacity is driven from the scroll handler (see
            `update`) rather than declared here — the copy has to clear
            the fixed header as the section releases, otherwise the
            headline scrolls straight underneath the nav pill. */}
        <div ref={copyRef} className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
            <div className="max-w-5xl">
              <h1 className="cs-hero-title text-white">
                {/* The space has to sit OUTSIDE the .cs-word-reveal span.
                    That span is display: inline-block, and a trailing
                    space inside an inline-block is trimmed at the box
                    edge — so the words ran together as
                    "Speed,TransparencyandScalefor". */}
                {[
                  "Speed,",
                  "Transparency",
                  "and",
                  "Scale",
                  "for",
                  <em key="a" className="cs-italic">Sophisticated</em>,
                  <em key="b" className="cs-italic">Investors.</em>,
                ].map((word, i) => (
                  <Fragment key={i}>
                    <span
                      className="cs-word-reveal"
                      style={{ animationDelay: `${0.2 + i * 0.07}s` }}
                    >
                      {word}
                    </span>
                    {" "}
                  </Fragment>
                ))}
                <sup className="cs-trademark cs-word-reveal" style={{ animationDelay: "0.76s" }}>
                  &trade;
                </sup>
              </h1>
              <p className="cs-hero-fade cs-hero-fade-1 cs-body-lg mt-6 max-w-2xl text-[color:var(--on-brand)]">
                Prime brokerage, clearing, and execution on infrastructure we built and operate.
              </p>
              <div className="cs-hero-fade cs-hero-fade-2 mt-8 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="cs-btn cs-btn-light">
                  Talk to our team
                </Link>
                <Link to="/services" className="cs-btn cs-btn-secondary">
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <div className="cs-scroll-chevron flex flex-col items-center gap-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[color:var(--on-brand-muted)]">
              Scroll
            </span>
            <svg
              aria-hidden
              className="h-5 w-5 text-[color:var(--on-brand-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsMarquee() {
  return <SharedStatsMarquee className="mt-32" />;
}

/* ------------------------------------------------------------------ */
/*  Modernizing the brokerage ecosystem — narrative section             */
/*  Inspired by the real clearstreet.io COBOL → modern platform story.  */
/* ------------------------------------------------------------------ */
const MODERNIZING_VIDEO =
  "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4";
const STUDIO_VIDEO =
  "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-17-53.992Z-full.mp4";
const EXECUTION_VIDEO =
  "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-20-18.183Z-preview-mobile.mp4";

function ModernizingSection() {
  return (
    <section className="mt-32 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInSection>
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="cs-h2 text-white">
                The industry still runs on infrastructure built in the 1970s
              </h2>
              <p className="cs-body-lg mt-6 max-w-[60ch] text-[color:var(--on-brand)]">
                Decades of patches sit on top of mainframe cores that were never designed
                for today&rsquo;s volumes, latency targets, or data loads.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-4 border-t border-[color:var(--rule-brand)] pt-4">
                  <StatusDot tone="risk" />
                  <div>
                    <p className="font-sans text-sm font-medium text-white">
                      COBOL mainframes now fifty years old
                    </p>
                    <p className="mt-1 font-sans text-xs text-[color:var(--on-brand-muted)]">
                      Core systems that cannot keep pace with modern market volume
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 border-t border-[color:var(--rule-brand)] pt-4">
                  <StatusDot tone="risk" />
                  <div>
                    <p className="font-sans text-sm font-medium text-white">
                      Rising cost of maintenance, narrowing margins
                    </p>
                    <p className="mt-1 font-sans text-xs text-[color:var(--on-brand-muted)]">
                      Spend goes to keeping legacy systems alive rather than to growth
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <LazyVideo
                src={MODERNIZING_VIDEO}
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{ backgroundColor: "#01001f" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-primary/70 to-[#01001f]/90" />
              </LazyVideo>
              <div className="relative border border-indigo-500/30 bg-gradient-to-br from-indigo-600/30 to-primary/20 p-8 md:p-12">
                <div aria-hidden className="cs-ambient-orb -right-20 -top-20 h-60 w-60 bg-indigo-500/15" />
                <p className="cs-eyebrow">The solution</p>
                <h3 className="cs-h3 mt-4 text-white">
                  A platform designed for today&rsquo;s global market
                </h3>
                <p className="cs-body mt-6 text-[color:var(--on-brand)]">
                  Clear Street puts market participants on modern infrastructure, reducing
                  risk and supporting growth through a real-time, cloud-native platform.
                </p>
                <Link to="/about" className="cs-btn cs-btn-secondary mt-8 inline-flex">
                  Read our story
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/**
 * Status marker. The previous version drew a bare "!" glyph inside a
 * red/amber circle for both the same severity of message, so the colour
 * was carrying meaning it didn't have, and the glyph read as a stray
 * character rather than an icon. `tone` is explicit, and the label is
 * carried by the adjacent text rather than by colour alone.
 */
function StatusDot({ tone }: { tone: "risk" | "positive" }) {
  const isRisk = tone === "risk";
  return (
    <span
      aria-hidden
      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
        isRisk ? "bg-amber-400" : "bg-emerald-400"
      }`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Built for Multi-Asset Clearing / Designed for the Future           */
/* ------------------------------------------------------------------ */
const featureColumns = [
  {
    title: "Built for multi-asset clearing",
    items: [
      "One platform for every asset class",
      "Real-time data and risk management",
      "Position information in a single system",
    ],
    video: MODERNIZING_VIDEO,
  },
  {
    title: "Designed for what comes next",
    items: [
      "Cloud-native, API-first, AI-enhanced",
      "Horizontally scalable under load",
      "Lower cost of ownership over time",
    ],
    video: EXECUTION_VIDEO,
  },
];

function FeaturesSection() {
  return (
    <section className="mt-32 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInSection>
          <h2 className="cs-h2 max-w-4xl text-white">
            Clearing, financing, and execution on a single modern stack.
          </h2>
        </FadeInSection>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
          {featureColumns.map((col) => (
            <StaggerItem key={col.title}>
              <div className="cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8">
                <LazyVideo
                  src={col.video}
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{ backgroundColor: "#01001f" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-primary/10" />
                </LazyVideo>
                <div className="relative z-10">
                  <h3 className="cs-h4 text-white">{col.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <svg
                          aria-hidden
                          className="h-5 w-5 shrink-0 text-indigo-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-sans text-[15px] text-[color:var(--on-brand)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const reasons = [
  {
    headline: "Clearing and custody, built from the ground up",
    body: "We process millions of trades daily on infrastructure we own and operate — US equities, options, and futures — with real-time risk, P&L, and position visibility.",
    video: STUDIO_VIDEO,
  },
  {
    headline: "Multi-asset financing at institutional scale",
    body: "From securities lending to portfolio margin, the platform delivers over $10B in daily financing with automated collateral management and global reach.",
    video: MODERNIZING_VIDEO,
  },
  {
    headline: "Execution technology that redefines the edge",
    body: "Low-latency routing, advanced algos, and direct market access, unified on one platform with transparent analytics and end-of-day TCA.",
    video: EXECUTION_VIDEO,
  },
];

function ReasonsSection() {
  return (
    <section className="mt-32 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInSection>
          <h2 className="cs-h2 max-w-4xl text-white">
            A single platform that replaces the patchwork.
          </h2>
        </FadeInSection>

        {/* Three reasons, two layout families. The original ran the same
            left-text/right-video zigzag three times in a row, which
            reads as a template rather than a composition. */}
        <FadeInSection className="mt-16" y={24}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <ReasonIndex n={1} />
              <h3 className="cs-h3 mt-4 text-white">{reasons[0].headline}</h3>
              <p className="cs-body-lg mt-6 max-w-[52ch] text-[color:var(--on-brand)]">
                {reasons[0].body}
              </p>
            </div>
            <ReasonMedia src={reasons[0].video} />
          </div>
        </FadeInSection>

        <FadeInSection className="mt-28" y={24}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <LazyVideo
              src={reasons[1].video}
              className="absolute inset-0 h-full w-full"
              style={{ backgroundColor: "#01001f" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01001f] via-[#01001f]/70 to-[#01001f]/20" />
            <div className="relative flex min-h-[420px] flex-col justify-end p-8 md:min-h-[520px] md:p-14">
              <ReasonIndex n={2} />
              <h3 className="cs-h2 mt-4 max-w-[20ch] text-white">{reasons[1].headline}</h3>
              <p className="cs-body-lg mt-5 max-w-[52ch] text-[color:var(--on-brand)]">
                {reasons[1].body}
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="mt-28" y={24}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <ReasonMedia src={reasons[2].video} />
            <div>
              <ReasonIndex n={3} />
              <h3 className="cs-h3 mt-4 text-white">{reasons[2].headline}</h3>
              <p className="cs-body-lg mt-6 max-w-[52ch] text-[color:var(--on-brand)]">
                {reasons[2].body}
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function ReasonIndex({ n }: { n: number }) {
  return (
    <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--on-brand-muted)]">
      {String(n).padStart(2, "0")}
    </span>
  );
}

function ReasonMedia({ src }: { src: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
      <LazyVideo src={src} className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
      />
    </div>
  );
}

function QuoteSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <figure className="relative overflow-hidden rounded-2xl border border-white/10">
        <LazyVideo
          src={MODERNIZING_VIDEO}
          className="absolute inset-0 h-full w-full opacity-25"
          style={{ backgroundColor: "#01001f" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-[#01001f]/80" />
        </LazyVideo>
        <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
          <blockquote className="cs-h2 text-[color:var(--on-brand-strong)]">
            <p>
              &ldquo;The first prime broker in a generation that feels like it was built
              in this decade, not retrofitted from the last three.&rdquo;
            </p>
          </blockquote>
          <figcaption className="cs-body mt-8 text-[color:var(--on-brand-muted)]">
            Head of Trading, multi-strategy hedge fund
          </figcaption>
        </div>
      </figure>
    </FadeInSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Studio portfolio management CTA                                     */
/* ------------------------------------------------------------------ */
const studioBadges = ["Risk and margin", "Exposures", "P&L", "Analytic reports"];

function StudioCalloutSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-10 md:p-16">
        <LazyVideo
          src={STUDIO_VIDEO}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          style={{ backgroundColor: "#01001f" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-[#01001f]/90" />
        </LazyVideo>
        <div className="relative z-10">
          <p className="cs-eyebrow">Clear Street Studio</p>
          <h2 className="cs-h2 mt-4 max-w-3xl text-white">
            The portfolio management system designed for your growth.
          </h2>
          <p className="cs-body-lg mt-6 max-w-2xl text-[color:var(--on-brand)]">
            Portfolio, trading, and risk management built to drive alpha and speed up
            decision-making.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-light">
              Talk to our team
            </Link>
            <Link to="/studio" className="cs-btn cs-btn-secondary">
              View Studio
            </Link>
          </div>
        </div>

        <ul className="relative z-10 mt-10 flex flex-wrap gap-2">
          {studioBadges.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-[13px] text-[color:var(--on-brand-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FadeInSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Clients "For" section — audience types                              */
/* ------------------------------------------------------------------ */
const clientTypes = [
  "Sophisticated individuals",
  "Hedge funds",
  "Proprietary traders",
  "Broker-dealers",
  "ETF issuers",
  "Family offices",
  "Corporate issuers",
  "Traditional asset managers",
  "Alternative asset managers",
];

function ClientsForSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=15')] bg-cover bg-center opacity-[0.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/80 to-[#01001f]/95"
        />
        <div className="relative z-10 grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="cs-h2 text-white">
              Built for sophisticated investors across every market.
            </h2>
            <p className="cs-body-lg mt-6 max-w-[52ch] text-[color:var(--on-brand)]">
              From individual traders to large institutions, brokers and banks, to ETF
              issuers and corporate issuers, across global capital markets.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 self-start">
            {clientTypes.map((type) => (
              <li
                key={type}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] px-5 py-4"
              >
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-indigo-300" />
                <span className="font-sans text-[14px] text-[color:var(--on-brand)]">{type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeInSection>
  );
}

const vectors = [
  {
    title: "Prime services",
    body: "Multi-asset financing, securities lending, and portfolio margin engineered for scale.",
    to: "/services/financing",
  },
  {
    title: "Clearing",
    body: "Self-clearing across US equities and options on infrastructure we built and operate.",
    to: "/services/clearing",
  },
  {
    title: "Execution and trading",
    body: "Low-latency routing, algos, and market access, with transparent unified reporting.",
    to: "/services/execution-trading",
  },
  {
    title: "Data and APIs",
    body: "One API surface for positions, risk, corporate actions, and post-trade activity.",
    to: "/services",
  },
];

function VectorsSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <h2 className="cs-h2 max-w-3xl text-white">
          The platform that connects every part of the trade lifecycle.
        </h2>
        <Link to="/services" className="cs-btn cs-btn-secondary shrink-0">
          Explore the platform
        </Link>
      </div>

      {/* Four cells, no filler. Each links to its own service page —
          previously all four said "Learn more" with no destination,
          which made the whole grid inert. */}
      <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--rule-brand)] sm:grid-cols-2 lg:grid-cols-4">
        {vectors.map((v) => (
          <StaggerItem key={v.title}>
            <Link
              to={v.to}
              className="group flex h-full flex-col bg-primary p-8 transition-colors hover:bg-indigo-800/40"
            >
              <h3 className="cs-h4 text-white">{v.title}</h3>
              <p className="cs-body mt-3 flex-1 text-[color:var(--on-brand)]">{v.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-indigo-200">
                Learn more
                <span aria-hidden className="cs-arrow-slide">→</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function GlobalMarketSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 max-w-3xl text-white">
        One connection to the world&rsquo;s markets.
      </h2>
      <p className="cs-body-lg mt-6 max-w-2xl text-[color:var(--on-brand)]">
        Direct access to more than 77 exchanges across every major asset class, with
        real-time risk, collateral, and reporting in one place.
      </p>
      <div className="mt-12">
        <WorldMap />
      </div>
    </FadeInSection>
  );
}

const studioItems = [
  { label: "Real-time portfolio", desc: "Live P&L, positions, and risk in a single view" },
  { label: "Automated reconciliation", desc: "End-of-day matching across prime brokers and custodians" },
  { label: "Corporate actions", desc: "Mandatory and voluntary events with automated elections" },
  { label: "Securities lending", desc: "Automated borrows, returns, and recall management" },
  { label: "Post-trade ops", desc: "Trade confirmation, allocation, and settlement in real-time" },
  { label: "Client reporting", desc: "Custom reports delivered on your schedule" },
];

function StudioHighlightsSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="cs-h2 text-white">Your entire operation in one window.</h2>
          <p className="cs-body-lg mt-6 text-[color:var(--on-brand)]">
            Workstation-grade portfolio, risk, and operations tools, accessible from any
            browser.
          </p>
          <Stagger className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {studioItems.map((item) => (
              <StaggerItem key={item.label}>
                <div className="border-t border-[color:var(--rule-brand)] pt-4">
                  <p className="font-sans text-sm font-medium text-white">{item.label}</p>
                  <p className="mt-1 font-sans text-xs text-[color:var(--on-brand-muted)]">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <LazyVideo src={STUDIO_VIDEO} className="absolute inset-0 h-full w-full" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"
          />
        </div>
      </div>
    </FadeInSection>
  );
}

type ExchangeZone = {
  name: string;
  color: string;
  exchanges: { name: string; country: string; comingSoon?: boolean }[];
  moreCount: number;
  moreLabel: string;
};

const zones: ExchangeZone[] = [
  {
    name: "North America",
    color: "#8b7aff",
    exchanges: [
      { name: "24x National Exchange LLC", country: "United States" },
      { name: "BOX Exchange", country: "United States of America" },
      { name: "C2 Options Exchange", country: "United States of America" },
      { name: "Cboe Options Exchange", country: "United States of America" },
      { name: "Cboe BYX", country: "United States of America" },
    ],
    moreCount: 36,
    moreLabel: "more in North America",
  },
  {
    name: "South America",
    color: "#66bb6a",
    exchanges: [
      { name: "B3 Clearing", country: "Brazil", comingSoon: true },
      { name: "CRCC", country: "Colombia", comingSoon: true },
      { name: "Argentina Clearing", country: "Argentina", comingSoon: true },
    ],
    moreCount: 0,
    moreLabel: "",
  },
  {
    name: "Europe",
    color: "#4fc3f7",
    exchanges: [
      { name: "Coinbase", country: "" },
      { name: "ICE Clear EU", country: "United Kingdom" },
      { name: "ECC", country: "Germany" },
      { name: "EUREX", country: "" },
      { name: "EUREX Clearing", country: "" },
    ],
    moreCount: 16,
    moreLabel: "more in Europe",
  },
  {
    name: "Africa",
    color: "#ffb74d",
    exchanges: [
      { name: "JSE Clear", country: "South Africa", comingSoon: true },
      { name: "Maroclear", country: "Morocco", comingSoon: true },
    ],
    moreCount: 0,
    moreLabel: "",
  },
  {
    name: "Middle East",
    color: "#ff7043",
    exchanges: [
      { name: "Gulf Mercantile Exchange", country: "United Arab Emirates" },
      { name: "ICE Abu Dhabi", country: "United Arab Emirates" },
      { name: "DCCC", country: "United Arab Emirates", comingSoon: true },
      { name: "Dubai Clear", country: "United Arab Emirates", comingSoon: true },
      { name: "Muqassa", country: "Saudi Arabia", comingSoon: true },
    ],
    moreCount: 1,
    moreLabel: "more in Middle East",
  },
  {
    name: "Asia Pacific",
    color: "#4dd0e1",
    exchanges: [
      { name: "ASX Clear", country: "Australia", comingSoon: true },
      { name: "HKEX Clearing", country: "Hong Kong", comingSoon: true },
      { name: "Shanghai Clearing House", country: "China", comingSoon: true },
      { name: "CSDC", country: "China", comingSoon: true },
      { name: "JPX Clearing", country: "Japan", comingSoon: true },
    ],
    moreCount: 5,
    moreLabel: "more in Asia Pacific",
  },
];

function ExchangesSection() {
  // Defaults to North America. The previous default was Africa � an
  // arbitrary index that opened the section on its two-exchange zone.
  const [activeZone, setActiveZone] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving focus: arrows move between tabs, Home/End jump to the ends.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = zones.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = activeZone === last ? 0 : activeZone + 1;
    else if (e.key === "ArrowLeft") next = activeZone === 0 ? last : activeZone - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveZone(next);
    tabRefs.current[next]?.focus();
  };

  const zone = zones[activeZone];

  return (
    <section className="relative mt-32 overflow-hidden px-4 sm:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <LazyVideo
          src={MODERNIZING_VIDEO}
          className="absolute inset-0 h-full w-full opacity-[0.08]"
          style={{ backgroundColor: "#01001f" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-primary/40 to-[#01001f]/80" />
        </LazyVideo>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="cs-h2 max-w-3xl text-white">
          Our mission is to give every sophisticated investor access to every asset, in
          every market.
        </h2>

        <FadeInSection className="mt-16">
          {/* Real tab semantics. The previous markup was a row of
              buttons with no role, no aria-selected and no keyboard
              support, and all six panels rendered at once � five of
              them absolutely positioned at opacity 0. */}
          <div
            role="tablist"
            aria-label="Exchanges by region"
            onKeyDown={onKeyDown}
            className="mb-10 flex items-center gap-2 overflow-x-auto pb-2"
          >
            {zones.map((z, i) => (
              <button
                key={z.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`zone-tab-${i}`}
                aria-selected={i === activeZone}
                aria-controls={`zone-panel-${i}`}
                tabIndex={i === activeZone ? 0 : -1}
                onClick={() => setActiveZone(i)}
                className={`relative shrink-0 rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  i === activeZone
                    ? "bg-white/15 text-white"
                    : "text-[color:var(--on-brand-muted)] hover:bg-white/5 hover:text-[color:var(--on-brand)]"
                }`}
              >
                {i === activeZone && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{ backgroundColor: z.color }}
                  />
                )}
                <span className="relative z-10">{z.name}</span>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`zone-panel-${activeZone}`}
            aria-labelledby={`zone-tab-${activeZone}`}
            tabIndex={0}
          >
            <h3 className="cs-h4 mb-8" style={{ color: zone.color }}>
              {zone.name}
            </h3>

            <ul className="space-y-4">
              {zone.exchanges.map((ex) => (
                <li
                  key={ex.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="font-sans text-[15px] font-medium text-white">
                      {ex.name}
                    </span>
                    {ex.comingSoon && (
                      <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-amber-200">
                        Coming soon
                      </span>
                    )}
                  </div>
                  {ex.country && (
                    <span className="font-sans text-[13px] text-[color:var(--on-brand-muted)]">
                      {ex.country}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* The "+N more" row used to carry a "See all" button with
                no click handler � a control that looked live and did
                nothing. Now plain disclosure text. */}
            {zone.moreCount > 0 && (
              <p className="mt-6 border-t border-[color:var(--rule-brand)] pt-4 font-sans text-sm text-[color:var(--on-brand-muted)]">
                {zone.moreCount} more {zone.moreLabel}
              </p>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

const newsItems: { category: string; title: string; date: string; image: ImageKey; href: string }[] = [
  {
    category: "Press Release",
    title: "Clear Street Unifies Client Experience with Global Platform Sales Launch",
    date: "2025",
    image: "news.platform-sales",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-unifies-client-experience-with-global-platform-sales-launch-one-clear-stre",
  },
  {
    category: "Press Release",
    title: "Clear Street Appoints Sean Hendelman to Lead Active Division",
    date: "2025",
    image: "news.hendelman",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-appoints-sean-hendelman-to-lead-active-division",
  },
  {
    category: "Press Release",
    title: "Clear Street Welcomes Industry Veteran Edward Tilly as President",
    date: "2025",
    image: "news.tilly",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-welcomes-industry-veteran-edward-tilly-as-president",
  },
  {
    category: "Press Release",
    title: "Clear Street to Acquire Fox River Algorithmic Trading Business from Instinet",
    date: "2025",
    image: "news.tilly",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-to-acquire-fox-river-algorithmic-trading-business-from-instinet",
  },
];

function NewsSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <h2 className="cs-h2 max-w-3xl text-white">Latest from Clear Street.</h2>
        <Link to="/news" className="cs-btn cs-btn-secondary shrink-0">
          All news
        </Link>
      </div>

      <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {newsItems.slice(0, 4).map((item) => (
          <StaggerItem key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] transition-colors hover:border-[color:var(--rule-brand-strong)]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={img(item.image, { w: 640 })}
                  // The thumbnail is the only visual for this card, so
                  // it needs a description rather than alt="".
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="360"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-indigo-200">
                    {item.category}
                  </span>
                  <span className="font-sans text-[11px] text-[color:var(--on-brand-muted)]">
                    {item.date}
                  </span>
                </div>
                <h3 className="cs-h4 text-white">{item.title}</h3>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function GetInTouch() {
  return (
    <FadeInSection className="mx-auto mb-24 mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-10 md:p-16">
        <LazyVideo
          src={MODERNIZING_VIDEO}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          style={{ backgroundColor: "#01001f" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#01001f]/90 to-primary/80" />
        </LazyVideo>
        <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="cs-h2 text-white">Ready to see the platform in action?</h2>
            <p className="cs-body-lg mt-6 text-[color:var(--on-brand)]">
              Schedule a live walkthrough and see how Clear Street can transform your
              operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-light">
              Talk to our team
            </Link>
            <Link to="/about" className="cs-btn cs-btn-secondary">
              Read our story
            </Link>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
