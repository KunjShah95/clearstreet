import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowRight, CheckCircle2, Shield, Clock, BarChart3, Globe } from "lucide-react";

export const Route = createFileRoute("/services/clearing")({
  head: () => ({
    meta: [
      { title: "Clearing — Clear Street" },
      {
        name: "description",
        content:
          "Real-time visibility into balances, collateral, and exposures across US equities, listed options, and futures on a single unified clearing platform.",
      },
    ],
  }),
  component: Clearing,
});

function Clearing() {
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
          Services / Clearing
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          Unified clearing for a fragmented market.
        </h1>
        <p
          className="cs-body-lg mt-8 max-w-2xl text-white/75 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          Real-time visibility into balances, collateral, and exposures across US equities, listed
          options, and futures — all on a single unified clearing platform.
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
      icon: Shield,
      title: "Real-Time Risk & Margin",
      desc: "Continuous intraday risk alignment across equities, options, and futures. Margin calculations update in real-time, not overnight.",
    },
    {
      icon: Clock,
      title: "Sub-Millisecond Processing",
      desc: "Cloud-native core ledger processes millions of trades with sub-millisecond precision. No batch cycles, no end-of-day surprises.",
    },
    {
      icon: BarChart3,
      title: "Flexible Pricing & Terms",
      desc: "Transparent passthrough fee structures with flexible capital terms. No hidden costs, no black-box pricing.",
    },
    {
      icon: Globe,
      title: "Rapid Product Integration",
      desc: "Quick onboarding for new exchanges and products. Our API-first infrastructure means faster time-to-market for new asset classes.",
    },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <span className="cs-label-sm uppercase text-white/50">Platform capabilities</span>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">Engineered for institutional clearing.</h2>
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
    "Eliminate multi-vendor reconciliation with a single unified ledger",
    "Reduce capital requirements with cross-product netting",
    "Real-time settlement status across all asset classes",
    "Automated regulatory reporting (SEC, FINRA, CFTC)",
    "Dedicated clearing specialists with deep market expertise",
    "Seamless integration with Clear Street financing and execution",
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        <span className="cs-label-sm uppercase text-white/50">Why clients choose us</span>
        <h2 className="cs-h2 mt-4 max-w-3xl text-white">Clearing built for today's markets.</h2>
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
          Ready to transform your clearing operations?
        </h2>
        <p className="cs-body-lg mx-auto mt-6 max-w-xl text-white/70">
          Schedule a conversation with our team to learn more about Clear Street's clearing platform.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="cs-btn cs-btn-light">
            Get in touch
          </Link>
          <Link to="/services" className="cs-btn cs-btn-secondary">
            Back to services
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}
