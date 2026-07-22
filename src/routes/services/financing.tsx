import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowRight, CheckCircle2, DollarSign, TrendingUp, Layers, Shield } from "lucide-react";

export const Route = createFileRoute("/services/financing")({
  head: () => ({
    meta: [
      { title: "Financing — Clear Street" },
      {
        name: "description",
        content:
          "Integrated capital solutions with real-time portfolio margining, securities lending, and flexible funding across repo, stock loan, term financing, and special-situation lending.",
      },
    ],
  }),
  component: Financing,
});

function Financing() {
  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <Features />
      <Products />
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
          Services / Financing
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          Fully integrated, data-driven capital solutions.
        </h1>
        <p
          className="cs-body-lg mt-8 max-w-2xl text-white/75 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          A unified, real-time ledger that integrates trading, clearing, and financing to free up
          capital and automate risk calculations across your entire portfolio.
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
      icon: Layers,
      title: "Real-Time Portfolio Margining",
      desc: "Cross-product margin calculation across equities, options, and futures in a single account — continuously updated, never overnight.",
    },
    {
      icon: DollarSign,
      title: "Flexible Funding Access",
      desc: "Access capital through repo, stock loan, term financing, and special-situation lending. Tailored solutions for every strategy.",
    },
    {
      icon: TrendingUp,
      title: "Securities Lending",
      desc: "Robust stock loan desk with deep inventory across hard-to-borrow names, competitive rebates, and automated locate processing.",
    },
    {
      icon: Shield,
      title: "Unified Balance Sheet",
      desc: "One integrated view of your financing across all products and strategies. No more reconciling between multiple counterparties.",
    },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <span className="cs-label-sm uppercase text-white/50">Platform capabilities</span>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">Capital solutions for sophisticated strategies.</h2>
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

function Products() {
  const products = [
    { name: "Repo Financing", desc: "Short-term secured funding against collateral at competitive rates with flexible maturity terms." },
    { name: "Stock Loan", desc: "Access hard-to-borrow securities with automated locate, competitive rebates, and global inventory." },
    { name: "Term Financing", desc: "Longer-duration secured funding for multi-strategy funds and bespoke portfolio needs." },
    { name: "Special Situations", desc: "Tailored financing for IPOs, SPACs, PIPE transactions, and other event-driven strategies." },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        <span className="cs-label-sm uppercase text-white/50">Financing products</span>
        <h2 className="cs-h2 mt-4 max-w-3xl text-white">Flexible capital, one platform.</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-sans text-lg font-semibold text-white">{p.name}</h3>
              <p className="cs-body mt-2 text-white/70">{p.desc}</p>
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
          Optimize your capital structure.
        </h2>
        <p className="cs-body-lg mx-auto mt-6 max-w-xl text-white/70">
          Speak with our financing desk about custom capital solutions for your strategy.
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
