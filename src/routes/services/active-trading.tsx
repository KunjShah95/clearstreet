import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowRight, CheckCircle2, TrendingUp, BarChart3, Zap, Users } from "lucide-react";

export const Route = createFileRoute("/services/active-trading")({
  head: () => ({
    meta: [
      { title: "Active Trading — Clear Street" },
      {
        name: "description",
        content:
          "Professional-grade trading tools for sophisticated individual traders, offering institutional execution quality and competitive pricing.",
      },
    ],
  }),
  component: ActiveTrading,
});

function ActiveTrading() {
  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <Features />
      <Benefits />
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
          Services / Active Trading
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          Professional-grade tools for active traders.
        </h1>
        <p
          className="cs-body-lg mt-8 max-w-2xl text-white/75 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          Designed for sophisticated individual traders who demand institutional execution quality and
          competitive pricing.
        </p>
        <div
          className="mt-10 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.28s", animationFillMode: "both" }}
        >
          <Link to="/contact" className="cs-btn cs-btn-light">
            Register now <ArrowRight className="ml-2 h-4 w-4" />
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
      icon: TrendingUp,
      title: "Institutional Execution",
      desc: "Access the same execution infrastructure used by hedge funds and professional traders. DMA, smart routing, and advanced order types.",
    },
    {
      icon: BarChart3,
      title: "Competitive Pricing",
      desc: "Transparent, low-cost pricing with no hidden fees. Volume-based discounts for high-frequency and high-notional traders.",
    },
    {
      icon: Zap,
      title: "Modern Platform",
      desc: "Built for speed and reliability. Real-time P&L, streaming quotes, and one-click trading from a cloud-native interface.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      desc: "Access to trading professionals who understand your strategies. Real-time assistance when you need it most.",
    },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <span className="cs-label-sm uppercase text-white/50">Platform capabilities</span>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">Trade like the institutions.</h2>
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

function Benefits() {
  const items = [
    "Direct market access to US equities and options exchanges",
    "Advanced order types: iceberg, pegged, trailing stop, and more",
    "Streaming real-time market data with Level 2 depth",
    "Integrated clearing and custody through Clear Street's platform",
    "Dedicated trader support desk available during market hours",
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        <span className="cs-label-sm uppercase text-white/50">Why active traders choose us</span>
        <h2 className="cs-h2 mt-4 max-w-3xl text-white">Built for serious traders.</h2>
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
          Ready to upgrade your trading experience?
        </h2>
        <p className="cs-body-lg mx-auto mt-6 max-w-xl text-white/70">
          Open an account and start trading on Clear Street's institutional-grade platform.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="cs-btn cs-btn-light">
            Open an account
          </Link>
          <Link to="/services" className="cs-btn cs-btn-secondary">
            Back to services
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}
