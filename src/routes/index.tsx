import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { MarqueeTicker } from "../components/marquee-ticker";
import { RiveIcon } from "../components/rive-icon";
import { CountUp } from "../components/count-up";
import { WorldMap } from "../components/world-map";
import { useInView } from "../hooks/use-in-view";

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
/*  Scroll-driven image frame sequence                                 */
/*  Uses direct DOM ref manipulation for opacity — zero React re-       */
/*  renders during scroll, matching clearstreet.io's approach.          */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Canvas-driven hero frame sequence — single <canvas> renders all    */
/*  76 preloaded frames with scroll-driven cuts. Runs the render loop  */
/*  only when the frame actually changes (idles when stationary).      */
/* ------------------------------------------------------------------ */
function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastIdxRef = useRef(-1);
  const rafIdRef = useRef(0);

  /* Preload all 76 images — no crossOrigin (CDN doesn't send CORS headers) */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.fetchPriority = i < 3 ? "high" : "auto";
      img.src = frameUrl(i + 1);
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  /* Draw a single frame to the canvas, with optional prev-frame ghost */
  const drawFrame = useRef<(idx: number) => void>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    const size = () => {
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    size();

    drawFrame.current = (idx: number) => {
      size();
      const img = imagesRef.current[idx];
      const prevImg = idx > 0 ? imagesRef.current[idx - 1] : null;
      if (img && img.complete && img.naturalWidth > 0) {
        /* Draw previous frame at 15% opacity for a subtle dissolve feel */
        if (
          prevImg &&
          prevImg !== img &&
          prevImg.complete &&
          prevImg.naturalWidth > 0
        ) {
          ctx.globalAlpha = 0.15;
          ctx.drawImage(prevImg, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
        }
        /* Draw current frame on top */
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    /* Draw initial frame 0 */
    /* Wait for first image to load, then draw */
    const check = setInterval(() => {
      const first = imagesRef.current[0];
      if (first && first.complete && first.naturalWidth > 0) {
        clearInterval(check);
        lastIdxRef.current = 0;
        drawFrame.current!(0);
      }
    }, 50);
    /* Safety: clear after 10s */
    setTimeout(() => clearInterval(check), 10000);

    /* Resize listener — redraws current frame on window resize */
    const onResize = () => {
      if (lastIdxRef.current >= 0) {
        drawFrame.current?.(lastIdxRef.current);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(check);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Scroll handler — driven purely by scroll position; no RAF cycle otherwise */
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = window.innerHeight * TOTAL_FRAMES * FRAME_HEIGHT / 100;
      const scrolled = Math.max(0, Math.abs(rect.top));
      const progress = Math.min(scrolled / totalHeight, 1);

      /* easeOutCubic — smooth, gradual deceleration */
      const eased = 1 - Math.pow(1 - progress, 3);
      const idx = Math.min(Math.floor(eased * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      if (idx === lastIdxRef.current) return;
      lastIdxRef.current = idx;

      /* Draw new frame on next animation frame (avoids layout thrash) */
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = 0;
        drawFrame.current?.(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative">
        <div
          className="pointer-events-none"
          style={{ height: `${TOTAL_FRAMES * FRAME_HEIGHT}vh` }}
        />

        <div className="sticky inset-0 top-0 z-0 flex h-screen items-center overflow-hidden bg-[#01001f]">
          {/* Ambient orbs — z-[1] above canvas */}
          <div className="cs-ambient-orb z-[1] -left-32 top-0 h-[500px] w-[500px] bg-indigo-500/20" />
          <div className="cs-ambient-orb z-[1] -right-20 bottom-0 h-[400px] w-[400px] bg-[#3b29e0]/20" />
          <div className="cs-ambient-orb z-[1] left-1/3 top-1/2 h-[300px] w-[300px] bg-[#8b7aff]/15" />

          {/* Single canvas — no z-index needed, sits at default layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ backgroundColor: "#01001f" }}
          />

          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-primary via-primary/20 to-transparent" />

          {/* Hero text — overlaid on frames, word-by-word reveal */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
              <div className="max-w-4xl">
                <h1 className="cs-h1 text-white" style={{ opacity: 0, animation: "heroFadeUp 0.01s 0.15s forwards" }}>
                  {["Speed,", "Transparency", "and", "Scale", "for", <em key="em" className="italic opacity-90">Sophisticated</em>, <em key="em2" className="italic opacity-90">Investors.</em>].map((word, i) => (
                    <span
                      key={i}
                      className="cs-word-reveal"
                      style={{
                        animationDelay: `${0.2 + i * 0.07}s`,
                      }}
                    >
                      {word}{" "}
                    </span>
                  ))}
                  <sup className="align-super text-[0.45em] opacity-70 cs-word-reveal" style={{ animationDelay: "0.76s" }}>&trade;</sup>
                </h1>
                <p className="cs-body-lg mt-8 max-w-3xl text-white/75" style={{
                  opacity: 0,
                  animation: "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s forwards",
                }}>
                  With $1.0 billion in capital raised from some of the most prominent investors, the
                  Clear Street platform services 700+ institutional clients and supports ~$16 billion
                  in customer balances.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3" style={{
                  opacity: 0,
                  animation: "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.65s forwards",
                }}>
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

          {/* Scroll indicator — animated bounce arrow */}
          <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
            <div className="cs-scroll-chevron flex flex-col items-center gap-1">
              <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">
                Scroll
              </span>
              <svg
                className="h-5 w-5 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const stats = [
  { value: "$1.0bn", label: "in capital raised", riv: "https://cdn.sanity.io/files/40fnhjbe/production/2039b6b689c1bed8b19e49dc9a861954bca76e48.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/d689231f2214b6a41f7f52a23c2dc36c1b8de92a-270x270.png" },
  { value: "~550mm", label: "shares / day", riv: "https://cdn.sanity.io/files/40fnhjbe/production/e4b9f87300e4626ca6907acb45a3e5348c08d745.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/b1fc124413fd49362032895ee65bea977648e2c6-160x160.png" },
  { value: "~$28.4bn", label: "notional / day", riv: "https://cdn.sanity.io/files/40fnhjbe/production/bb1a79c621a28db2d8f810667a662558df27a15d.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/616252af94d03f609c3c669e78fd8920a5c6dddf-160x160.png" },
  { value: "~700", label: "institutional clients", riv: "https://cdn.sanity.io/files/40fnhjbe/production/bb1a79c621a28db2d8f810667a662558df27a15d.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/88d391f715baf4d6cea1430092201c9bd8cce0ef-160x160.png" },
  { value: "800+", label: "employees worldwide", riv: "https://cdn.sanity.io/files/40fnhjbe/production/386bebb09582ccf09ea4c375762758702f33c029.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/62eeac92c57b7513602f235400107c1b5e975396-160x160.png" },
  { value: "94% YoY", label: "transacted growth", riv: "https://cdn.sanity.io/files/40fnhjbe/production/6614fef61a9084867cbe5c6a78872c2c78cb671f.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/280041ac042811742253e7f5bc1c788d2fff9207-190x190.png" },
  { value: "~$16bn", label: "customer balances", riv: "https://cdn.sanity.io/files/40fnhjbe/production/0dad6e380e80b1d7816e1c380c8f9c02fa857029.riv", icon: "https://cdn.sanity.io/images/40fnhjbe/production/2e87bd97776b6981cc422452e701ce9b730e4eb8-190x192.png" },
];

function StatsMarquee() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl overflow-hidden px-4 sm:px-8">
      <p className="cs-label-sm mb-6 uppercase text-white/50">
        Clear Street is replacing the legacy infrastructure used across capital markets
      </p>
      <MarqueeTicker speed={20}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex w-[200px] shrink-0 flex-col items-center text-center"
          >
            <div className="h-14 w-14">
              <RiveIcon src={s.riv} fallback={s.icon} className="h-full w-full" />
            </div>
            <p className="cs-h3 mt-3 text-white">
              <CountUp value={s.value} />
            </p>
            <p className="cs-label-sm mt-1 text-white/60">{s.label}</p>
          </div>
        ))}
      </MarqueeTicker>
    </FadeInSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Modernizing the brokerage ecosystem — narrative section             */
/*  Inspired by the real clearstreet.io COBOL → modern platform story.  */
/* ------------------------------------------------------------------ */
function ModernizingSection() {
  return (
    <section className="mt-32 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInSection>
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <p className="cs-label-sm uppercase text-white/50">The problem</p>
              <h2 className="cs-h2 mt-4 text-white">
                The financial industry still operates on outdated infrastructure built in
                the 1970s
              </h2>
              <p className="cs-body-lg mt-6 text-white/70">
                Over the years, technology has been layered on top of these old
                systems…
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <span
                    aria-hidden
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 font-sans text-xs font-bold text-red-400"
                  >
                    !
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-white/90">
                      Like 50-year-old COBOL mainframe systems
                    </p>
                    <p className="mt-1 font-sans text-xs text-white/50">
                      Legacy technology that can&rsquo;t keep up with modern market demands
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.03] p-5">
                  <span
                    aria-hidden
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 font-sans text-xs font-bold text-yellow-400"
                  >
                    !
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-white/90">
                      Leading to inefficiencies, reduced profit margins and increased risk
                    </p>
                    <p className="mt-1 font-sans text-xs text-white/50">
                      The cost of maintaining legacy systems continues to rise
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              {/* Background video with overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-30"
                  style={{ backgroundColor: "#01001f" }}
                  preload="metadata"
                >
                  <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-primary/70 to-[#01001f]/90" />
              </div>
              <div className="relative border border-indigo-500/30 bg-gradient-to-br from-indigo-600/30 to-primary/20 p-8 md:p-12">
                <div className="cs-ambient-orb -right-20 -top-20 h-60 w-60 bg-indigo-500/15" />
                <p className="cs-label-sm uppercase text-indigo-300">The solution</p>
                <h3 className="cs-h3 mt-4 text-white">
                  A technology-driven platform designed for today&rsquo;s complex,
                  global market
                </h3>
                <p className="cs-body mt-6 text-white/70">
                  Clear Street is putting market participants on modern infrastructure,
                  minimizing risk and facilitating growth for our clients with our
                  real-time, cloud-native platform.
                </p>
                <Link
                  to="/about"
                  className="cs-btn cs-btn-secondary mt-8 inline-flex"
                >
                  Our story →
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Built for Multi-Asset Clearing / Designed for the Future           */
/* ------------------------------------------------------------------ */
function FeaturesSection() {
  return (
    <section className="mt-32 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInSection>
          <p className="cs-label-sm uppercase text-white/50">Platform</p>
          <h2 className="cs-h2 mt-4 max-w-4xl text-white">
            Clearing, financing, and execution on a single modern stack.
          </h2>
        </FadeInSection>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <FadeInSection>
            <div className="group cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300">
              {/* Subtle video background */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-10"
                  style={{ backgroundColor: "#01001f" }}
                  preload="metadata"
                >
                  <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-primary/10" />
              </div>
              <div className="relative z-10">
                <h3 className="cs-h4 text-white">Built for Multi-Asset Clearing</h3>
                <ul className="mt-6 space-y-3">
                  {[
                    "One platform for all asset classes",
                    "Real-time data and risk management",
                    "Information held in a single system",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 shrink-0 text-indigo-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-sans text-[15px] text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="group cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300">
              {/* Subtle video background */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-10"
                  style={{ backgroundColor: "#01001f" }}
                  preload="metadata"
                >
                  <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-20-18.183Z-preview-mobile.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-primary/10" />
              </div>
              <div className="relative z-10">
                <h3 className="cs-h4 text-white">Designed for the Future</h3>
                <ul className="mt-6 space-y-3">
                  {[
                    "Cloud-native, API-based, AI-enhanced",
                    "Horizontally scalable technology",
                    "Cost-effective maintenance",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 shrink-0 text-indigo-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-sans text-[15px] text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    headline: "A clearing & custody system built for a modern world.",
    body: "We process millions of trades daily on infrastructure we built and operate — US equities, options, and futures — with real-time risk, P&L, and position visibility.",
    video: "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-17-53.992Z-full.mp4",
  },
  {
    headline: "Multi-asset financing at institutional scale.",
    body: "From securities lending to portfolio margin, our platform delivers $10B+ in daily financing with automated collateral management and global reach.",
    video: "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4",
  },
  {
    headline: "Execution technology that redefines the edge.",
    body: "Low-latency routing, advanced algos, and direct market access — all unified on a single platform with transparent analytics and end-of-day TCA.",
    video: "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-20-18.183Z-preview-mobile.mp4",
  },
];

function ReasonsSection() {
  return (
    <section className="mt-32 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInSection>
          <p className="cs-label-sm uppercase text-white/50">Why Clear Street</p>
          <h2 className="cs-h2 mt-4 max-w-4xl text-white">
            A single platform that replaces the patchwork.
          </h2>
        </FadeInSection>

        <div className="mt-16 space-y-32">
          {reasons.map((r, i) => (
            <ReasonCard key={i} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ margin: "-30% 0px" });
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  return (
    <div ref={ref}>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div
          className={`cs-reason-text ${index % 2 === 1 ? "md:order-2" : ""}`}
          style={{
            animation: inView
              ? "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards"
              : "none",
            opacity: 0,
          }}
        >
          <span className="cs-label-sm text-indigo-400">0{index + 1}</span>
          <h3 className="cs-h2 mt-4 text-white">{reason.headline}</h3>
          <p className="cs-body-lg mt-6 text-white/70">{reason.body}</p>
        </div>

        <div
          className={`relative aspect-video overflow-hidden rounded-2xl border border-white/10 ${
            index % 2 === 1 ? "md:order-1" : ""
          }`}
          style={{
            animation: inView
              ? "fadeScaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards"
              : "none",
            opacity: 0,
          }}
        >
          {mounted && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              style={{ opacity: visible ? 1 : 0, backgroundColor: "#01001f" }}
              preload="metadata"
            >
              <source src={reason.video} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function QuoteSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <div aria-hidden className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-25"
            style={{ backgroundColor: "#01001f" }}
            preload="metadata"
            poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=80&q=15"
          >
            <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-[#01001f]/80" />
        </div>
        <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
          <p className="cs-h2 italic text-white/95">
            "The first prime broker in a generation that feels like it was built in this
            decade — not retrofitted from the last three."
          </p>
          <p className="cs-body mt-8 text-white/60">
            Head of Trading · Multi-strategy hedge fund
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Studio portfolio management CTA                                     */
/* ------------------------------------------------------------------ */
function StudioCalloutSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-10 md:p-16">
        {/* Background video with gradient overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-20"
            style={{ backgroundColor: "#01001f" }}
            preload="metadata"
            poster="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=80&q=15"
          >
            <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-17-53.992Z-full.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-[#01001f]/90" />
        </div>
        <div className="relative z-10">
          <p className="cs-label-sm uppercase text-indigo-300">Clear Street Studio</p>
          <h2 className="cs-h2 mt-4 max-w-3xl text-white">
            The portfolio management system designed for your growth.
          </h2>
          <p className="cs-body-lg mt-6 max-w-2xl text-white/70">
            Revolutionary portfolio, trading and risk management to drive alpha and power
            decision-making.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-light">
              Request a Demo
            </Link>
            <Link to="/studio" className="cs-btn cs-btn-secondary">
              View Studio →
            </Link>
          </div>
        </div>

        {/* Feature badges */}
        <div className="relative z-10 mt-10 flex flex-wrap gap-2">
          {["Risk and Margin", "Exposures", "P&L", "Analytic reports"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-[13px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
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
        {/* Background image for visual depth */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=15')] bg-cover bg-center opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-[#01001f]/95" />
        </div>
        <div className="relative z-10 grid gap-16 md:grid-cols-2">
          <div>
            <p className="cs-label-sm uppercase text-white/50">For</p>
            <h2 className="cs-h2 mt-4 text-white">
              Built for sophisticated investors across every market.
            </h2>
            <p className="cs-body-lg mt-6 text-white/70">
              From sophisticated individual traders to large institutions, brokers and
              banks, to ETF issuers and C-suites at corporate issuers — across the global
              capital markets — all depend on Clear Street.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-3">
              {clientTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 shrink-0 rounded-full bg-indigo-400"
                  />
                  <span className="font-sans text-[14px] text-white/80">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function VectorsSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="cs-label-sm uppercase text-white/50">One platform</p>
          <h2 className="cs-h2 mt-4 max-w-3xl text-white">
            The platform that connects every part of the trade lifecycle.
          </h2>
        </div>
        <Link
          to="/services"
          className="cs-btn cs-btn-secondary shrink-0"
        >
          Explore the platform →
        </Link>
      </div>

      <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
        <StaggerItem>
          <div className="group cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-2xl">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=15')] bg-cover bg-center opacity-[0.06]" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 to-primary/10" />
            </div>
            <div className="relative z-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-[60px]" />
              <h3 className="cs-h4 text-white">Prime Services</h3>
              <p className="cs-body mt-3 text-white/70">
                Multi-asset financing, securities lending, and portfolio margin engineered for scale.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-300">
                Learn more <span aria-hidden className="cs-arrow-slide">→</span>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="group cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-2xl">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=15')] bg-cover bg-center opacity-[0.06]" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 to-primary/10" />
            </div>
            <div className="relative z-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-[60px]" />
              <h3 className="cs-h4 text-white">Clearing</h3>
              <p className="cs-body mt-3 text-white/70">
                Self-clearing across US equities and options on infrastructure we built and operate.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-300">
                Learn more <span aria-hidden className="cs-arrow-slide">→</span>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="group cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-2xl">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=15')] bg-cover bg-center opacity-[0.06]" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 to-primary/10" />
            </div>
            <div className="relative z-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-[60px]" />
              <h3 className="cs-h4 text-white">Execution & Trading</h3>
              <p className="cs-body mt-3 text-white/70">
                Low-latency routing, algos, and market access — with transparent, unified reporting.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-300">
                Learn more <span aria-hidden className="cs-arrow-slide">→</span>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="group cs-glow-card relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-2xl">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=15')] bg-cover bg-center opacity-[0.06]" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 to-primary/10" />
            </div>
            <div className="relative z-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-[60px]" />
              <h3 className="cs-h4 text-white">Data & APIs</h3>
              <p className="cs-body mt-3 text-white/70">
                A single API surface for positions, risk, corporate actions, and post-trade activity.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-300">
                Learn more <span aria-hidden className="cs-arrow-slide">→</span>
              </div>
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </FadeInSection>
  );
}

function GlobalMarketSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <p className="cs-label-sm uppercase text-white/50">Global reach</p>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">
        One connection to the world's markets.
      </h2>
      <p className="cs-body-lg mt-6 max-w-2xl text-white/70">
        From New York to Singapore, Clear Street provides direct access to 77+ exchanges
        across every major asset class. Our cloud-native infrastructure means you can trade
        from anywhere — with real-time risk, collateral, and reporting in one place.
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
          <p className="cs-label-sm uppercase text-white/50">Clear Street Studio</p>
          <h2 className="cs-h2 mt-4 text-white">
            Your entire operation in one window.
          </h2>
          <p className="cs-body-lg mt-6 text-white/70">
            Workstation-grade portfolio, risk, and operations tools — accessible from any browser.
          </p>
          <Stagger className="mt-10 space-y-3">
            {studioItems.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]">
                  <div aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                  <div>
                    <p className="font-sans text-sm font-medium text-white">{item.label}</p>
                    <p className="font-sans text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{ backgroundColor: "#01001f" }}
            preload="metadata"
            poster="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=80&q=15"
          >
            <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-17-53.992Z-full.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
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
  const [activeZone, setActiveZone] = useState(3); // Africa starts active

  const prevZone = () => setActiveZone((a) => (a - 1 + zones.length) % zones.length);
  const nextZone = () => setActiveZone((a) => (a + 1) % zones.length);

  return (
    <section className="relative mt-32 overflow-hidden px-4 sm:px-8">
      {/* Atmospheric video background — subtle global market visualization */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-[0.08]"
          style={{ backgroundColor: "#01001f" }}
          preload="none"
          poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=80&q=15"
        >
          <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-20-18.183Z-preview-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-primary/40 to-[#01001f]/80" />
      </div>

      {/* Exchange info container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="cs-label-sm uppercase text-white/50">Global reach</p>
            <h2 className="cs-h2 mt-4 max-w-3xl text-white">
              Clear Street&rsquo;s mission is to give every sophisticated investor access to
              every asset, in every market
            </h2>
          </div>
        </div>

        <FadeInSection className="mt-16">
          {/* Zone navigation pills */}
          <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2">
            {zones.map((z, i) => (
              <button
                key={z.name}
                onClick={() => setActiveZone(i)}
                className={`relative shrink-0 rounded-full px-4 py-2 font-sans text-sm font-medium transition-all ${
                  i === activeZone
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {i === activeZone && (
                  <span
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{ backgroundColor: z.color }}
                  />
                )}
                <span className="relative z-10">{z.name}</span>
              </button>
            ))}
          </div>

          {/* Zone panels — all rendered simultaneously, only active one visible */}
          <div className="relative">
            {zones.map((zone, i) => (
              <div
                key={zone.name}
                className={`transition-all duration-500 ${
                  i === activeZone
                    ? ""
                    : "pointer-events-none absolute inset-0 opacity-0"
                }`}
                aria-hidden={i !== activeZone}
              >
                {/* Active zone title */}
                <h4
                  className="cs-h4 mb-8 text-white transition-colors duration-300"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </h4>

                {/* Exchange list */}
                <div className="space-y-4">
                  {zone.exchanges.map((ex) => (
                    <div
                      key={ex.name}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="font-sans text-[15px] font-medium text-white/90">
                          {ex.name}
                        </span>
                        {ex.comingSoon && (
                          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-yellow-400">
                            Coming soon
                          </span>
                        )}
                      </div>
                      {ex.country && (
                        <span className="font-sans text-[13px] text-white/40">{ex.country}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* +N more footer */}
                {zone.moreCount > 0 && (
                  <div className="mt-6 flex items-center justify-between rounded-xl border border-dashed border-white/10 px-6 py-4">
                    <p className="font-sans text-sm text-white/50">
                      + {zone.moreCount} {zone.moreLabel}
                    </p>
                    <button className="cs-label inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-white/70 transition-colors hover:border-white/40 hover:text-white">
                      See all
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation arrows — matching reference style */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={prevZone}
              className="cs-zone-arrow flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70"
              aria-label="Previous zone"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9 15.61C9.88 14.42 9.37 13.83 9.15 13.05C8.95 12.36 8.95 11.64 9.15 10.95C9.38 10.17 9.89 9.58 10.91 8.39L12.95 6H14.93L12.05 9.36C11.17 10.39 10.73 10.9 10.59 11.37C10.47 11.78 10.47 12.22 10.59 12.63C10.73 13.1 11.17 13.61 12.05 14.64L14.93 18H12.95L10.9 15.61Z" fill="currentColor" />
              </svg>
            </button>
            <span className="font-sans text-xs text-white/40">
              {activeZone + 1} / {zones.length}
            </span>
            <button
              onClick={nextZone}
              className="cs-zone-arrow relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70"
              aria-label="Next zone"
            >
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.03 15.61C14.05 14.42 14.56 13.83 14.78 13.05C14.98 12.36 14.98 11.64 14.78 10.95C14.55 10.17 14.04 9.58 13.02 8.39L10.98 6H9L11.88 9.36C12.76 10.39 13.2 10.9 13.34 11.37C13.46 11.78 13.46 12.22 13.34 12.63C13.2 13.1 12.76 13.61 11.88 14.64L9 18H10.98L13.03 15.61Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

const newsItems = [
  {
    category: "Press Release",
    title: "Clear Street Unifies Client Experience with Global Platform Sales Launch",
    date: "2025",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/8a7aded60c0e3422cd5524308626298e97104dce-1920x1080.png",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-unifies-client-experience-with-global-platform-sales-launch-one-clear-stre",
  },
  {
    category: "Press Release",
    title: "Clear Street Appoints Sean Hendelman to Lead Active Division",
    date: "2025",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/15aaab81663b1c17e087e8f423a2b12114999e45-3840x2160.png",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-appoints-sean-hendelman-to-lead-active-division",
  },
  {
    category: "Press Release",
    title: "Clear Street Welcomes Industry Veteran Edward Tilly as President",
    date: "2025",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/bdd7df8352a5298bbbb543c2fe802fd1324e01fc-3840x2160.png",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-welcomes-industry-veteran-edward-tilly-as-president",
  },
  {
    category: "Press Release",
    title: "Clear Street to Acquire Fox River Algorithmic Trading Business from Instinet",
    date: "2025",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/bdd7df8352a5298bbbb543c2fe802fd1324e01fc-3840x2160.png",
    href: "https://www.clearstreet.io/news/press-releases/clear-street-to-acquire-fox-river-algorithmic-trading-business-from-instinet",
  },
];

function NewsSection() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="cs-label-sm uppercase text-white/50">News</p>
          <h2 className="cs-h2 mt-4 max-w-3xl text-white">
            Latest from Clear Street.
          </h2>
        </div>
        <Link to="/news" className="cs-btn cs-btn-secondary shrink-0">
          All news →
        </Link>
      </div>

      <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {newsItems.slice(0, 4).map((item) => (
          <StaggerItem key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl"
            >
              {item.image ? (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center bg-white/5" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-indigo-300">
                    {item.category}
                  </span>
                  <span className="font-sans text-[11px] text-white/40">{item.date}</span>
                </div>
                <h3 className="font-serif text-lg font-medium leading-tight text-white transition-colors group-hover:text-indigo-200">
                  {item.title}
                </h3>
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
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-20"
            style={{ backgroundColor: "#01001f" }}
            preload="metadata"
            poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=80&q=15"
          >
            <source src="https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-[#01001f]/90 to-primary/80" />
        </div>
        <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="cs-h2 text-white">
              Ready to see the platform in action?
            </h2>
            <p className="cs-body-lg mt-6 text-white/70">
              Schedule a live walkthrough with our team and see how Clear Street can
              transform your operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-light">
              Request a demo
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
