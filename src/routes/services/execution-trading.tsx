import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowRight, CheckCircle2, Zap, Radio, Target, Cpu } from "lucide-react";

export const Route = createFileRoute("/services/execution-trading")({
  head: () => ({
    meta: [
      { title: "Execution & Trading — Clear Street" },
      {
        name: "description",
        content:
          "Multi-asset algorithmic execution with low-latency routing, smart order types, direct market access, and comprehensive algo suite across 50+ exchanges.",
      },
    ],
  }),
  component: ExecutionTrading,
});

function ExecutionTrading() {
  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <Features />
      <Infrastructure />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] pt-20 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/20 blur-[100px]" />
        <div className="absolute -right-20 top-1/3 h-[300px] w-[300px] rounded-full bg-[#6b4aff]/15 blur-[80px]" />
      </div>
      <div className="relative pb-16">
        <p
          className="cs-label-sm uppercase text-white/50 animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDuration: "0.6s", animationFillMode: "both" }}
        >
          Services / Execution & Trading
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          Multi-asset execution with global liquidity access.
        </h1>
        <p
          className="cs-body-lg mt-8 max-w-2xl text-white/75 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          Advanced algorithms combined with high-touch support to source global liquidity across 50+
          markets and multiple asset classes.
        </p>
        <div
          className="mt-10 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.28s", animationFillMode: "both" }}
        >
          <Link to="/contact" className="cs-btn cs-btn-light">
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/services" className="cs-btn cs-btn-secondary">
            All services
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Radio,
      title: "Direct Market Access",
      desc: "Sponsored access and DMA to major global exchanges with ultra-low latency connectivity and colocation options.",
    },
    {
      icon: Target,
      title: "Comprehensive Algo Suite",
      desc: "VWAP, TWAP, Implementation Shortfall, Smart Routing, and custom algo strategies. Full pre- and post-trade analytics.",
    },
    {
      icon: Zap,
      title: "Low-Latency Infrastructure",
      desc: "Sub-microsecond order processing with hardware-accelerated tick-to-trade. Colocation at major data centers worldwide.",
    },
    {
      icon: Cpu,
      title: "Multi-Asset Support",
      desc: "Trade US equities, options, futures, and international equities through a single connection and unified API.",
    },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <span className="cs-label-sm uppercase text-white/50">Platform capabilities</span>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">Execution infrastructure built for speed.</h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E21DE] text-[#DAD7FF]">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="cs-h4 text-white">{f.title}</h3>
            <p className="cs-body mt-3 text-white/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}

function Infrastructure() {
  const items = [
    "Low-latency market data feeds from all major exchanges",
    "FIX 4.2/4.4, REST, and WebSocket protocol support",
    "Smart order routing for best execution across dark and lit pools",
    "Transaction cost analysis (TCA) with full transparency",
    "Pre-trade risk checks and real-time position monitoring",
    "Co-location and proximity hosting available at NJ4, NY4, LD4, and more",
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        <span className="cs-label-sm uppercase text-white/50">Infrastructure</span>
        <h2 className="cs-h2 mt-4 max-w-3xl text-white">Enterprise-grade trading infrastructure.</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span className="cs-body text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function CTA() {
  return (
    <FadeInSection className="mx-auto mt-24 mb-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 p-10 text-center md:p-16">
        <h2 className="cs-h2 mx-auto max-w-2xl text-white">
          Experience institutional-grade execution.
        </h2>
        <p className="cs-body-lg mx-auto mt-6 max-w-xl text-white/70">
          See how our execution platform can improve your fill rates and reduce latency.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="cs-btn cs-btn-light">
            Contact us
          </Link>
          <Link to="/services" className="cs-btn cs-btn-secondary">
            Back to services
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}
