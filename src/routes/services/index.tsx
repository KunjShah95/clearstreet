import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../../components/fade-in-section";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Clear Street" },
      {
        name: "description",
        content: "Explore Clear Street's range of services",
      },
      { property: "og:title", content: "Services Overview — Clear Street" },
      {
        property: "og:description",
        content: "Clearing, financing, execution, investment banking, and active trading on one modern stack.",
      },
    ],
  }),
  component: Services,
});

const statusTags = [
  { label: "Last updated ET", text: "17:24:10.892" },
  { label: "Status", text: "Live" },
  { label: "Side", text: "Buy" },
  { label: "Symbol", text: "GATO" },
  { label: "Account", text: "D70041285-R" },
  { label: "Client order ID", text: "1023016CLST5" },
  { label: "Trade date", text: "11-19-2025" },
  { label: "Price", text: "121.27" },
  { label: "Quantity", text: "100" },
];

const assetClasses = [
  { name: "Equities", icon: "https://cdn.sanity.io/images/40fnhjbe/production/b180ee228faf85747e3c48c885c6c6d1488d617c-32x32.svg" },
  { name: "Options", icon: "https://cdn.sanity.io/images/40fnhjbe/production/e48e41e23e173b5f7d1662fe8042be8774cd4754-32x32.svg" },
  { name: "Futures", icon: "https://cdn.sanity.io/images/40fnhjbe/production/5233f650faa6073ece6713ea4605ac4248d93222-32x32.svg" },
  { name: "Fixed Income", icon: "https://cdn.sanity.io/images/40fnhjbe/production/7e5324fe5f4c4e6377bf6da3ee6325cd53507b48-32x32.svg" },
  { name: "Foreign Exchange", icon: "https://cdn.sanity.io/images/40fnhjbe/production/0c43acd448258520a2215bc511bd871d9000b46d-32x32.svg" },
  { name: "Swaps", icon: "https://cdn.sanity.io/images/40fnhjbe/production/919820dd9a781c91aa49959cb9bb0cc149d3d255-32x32.svg" },
  { name: "Commodities", icon: "https://cdn.sanity.io/images/40fnhjbe/production/e9fbff0c30a80ce09d1c0643fc8253db75fa3d2e-32x32.svg" },
  { name: "U.S. Treasury Repo", icon: "https://cdn.sanity.io/images/40fnhjbe/production/b109049e994c8edbafd70c66b731563b5e19d6e6-32x32.svg" },
  { name: "U.S. MBS Repo", icon: "https://cdn.sanity.io/images/40fnhjbe/production/de9b78dee58cecaeb7a77b62b81f18c2edf940a9-32x32.svg" },
  { name: "Digital Assets (coming soon)", icon: "https://cdn.sanity.io/images/40fnhjbe/production/e945655a157e941046bb4ad9e067a778a2c19a47-32x32.svg" },
];

const clientTypes = [
  { name: "Traders", icon: "https://cdn.sanity.io/images/40fnhjbe/production/d556602a75e36ed3cb5d8bbce49430c61e683b97-32x32.svg" },
  { name: "Family offices", icon: "https://cdn.sanity.io/images/40fnhjbe/production/a0d00654eddfa648c0ff9530be910c46a37dbfdc-32x32.svg" },
  { name: "Hedge funds", icon: "https://cdn.sanity.io/images/40fnhjbe/production/7b812bee0a7e04973c76513ed7bbbcc24823c2bd-32x32.svg" },
  { name: "ETF Issuers", icon: "https://cdn.sanity.io/images/40fnhjbe/production/8debf7dc03a2d0d701a0e852ec04232af60b6d6c-32x32.svg" },
  { name: "Broker-Dealers", icon: "https://cdn.sanity.io/images/40fnhjbe/production/6f607c814772c9ff904e20e5001eff9fd2ea82da-32x32.svg" },
];

const servicesList = [
  {
    tag: "Clearing",
    route: "/services/clearing" as const,
    title: "Clearing",
    description: "Sophisticated market participants need counterparty diversification. Clear Street fills this gap with real-time transparency, cross-asset flexibility and modern clearing infrastructure.",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/e3cf6a8f90ea6442f3e4fa4ed977cdfdcdbb6e4f-3398x1400.webp",
  },
  {
    tag: "Financing",
    route: "/services/financing" as const,
    title: "Financing",
    description: "Scale your strategy on one single platform. Clear Street\u2019s integrated cash and synthetic financing solutions provide the flexibility to grow efficiently \u2013 unlocking capital, streamlining risk and delivering institutional-grade leverage.",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/b5d647f1abe0f07db3429be70448037ee1ecded5-3398x1400.webp",
  },
  {
    tag: "Execution & Trading",
    route: "/services/execution-trading" as const,
    title: "Execution & Trading",
    description: "Speed. Precision. Reach. Execute complex strategies with confidence. Clear Street unites advanced algorithms and white-glove support, so that you source global liquidity across markets and asset classes.",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/2e0643b1ade78df7fa4457c259e344b6a6ac70e8-3398x1400.webp",
  },
  {
    tag: "Investment Banking",
    route: "/services/investment-banking" as const,
    title: "Investment Banking",
    description: "Clear Street\u2019s team has decades of advisory experience and deep relationships. As disruptors ourselves, we empower innovators, founders, executives and investors with the tailored strategies they need to navigate the capital markets of today and tomorrow.",
    image: "https://cdn.sanity.io/images/40fnhjbe/production/acdcf1b9f06dee06e21920c5b1a0a3e92b223437-3398x1400.webp",
  },
];

function Services() {
  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <AssetClasses />
      <ClientTypes />
      <ServicesGrid />
      <CTABanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] pt-20 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/85 to-primary" />
        <div className="absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/20 blur-[100px]" />
      </div>

      <div className="relative pb-16">
        <p
          className="cs-label-sm uppercase text-white/50 animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDuration: "0.6s", animationFillMode: "both" }}
        >
          Our Services
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          One platform. Every service an institutional investor needs.
        </h1>
        <p
          className="cs-body-lg mt-8 max-w-2xl text-white/75 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          Clear Street\u2019s modern infrastructure powers market participants in real time and in the cloud.
        </p>

        <div
          className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] p-6 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            <span className="cs-label-sm text-white/60">Real-time trade data</span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {statusTags.map((t) => (
              <div key={t.label} className="flex items-baseline gap-1.5">
                <span className="cs-label-sm text-white/40">{t.label}</span>
                <span className="font-sans text-[14px] font-medium text-white/90">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AssetClasses() {
  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <p className="cs-label-sm uppercase text-white/50">Asset classes</p>
      <h2 className="cs-h2 mt-4 max-w-2xl text-white">
        Our cloud-native technology focuses on managing risk and facilitating growth for our clients.
      </h2>
      <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {assetClasses.map((a) => (
          <StaggerItem key={a.name}>
            <div
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-200 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.06]"
            >
              <img src={a.icon} alt="" className="h-6 w-6 shrink-0" width="24" height="24" loading="lazy" decoding="async" />
              <span className="font-sans text-[13px] leading-tight text-white/80">{a.name}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function ClientTypes() {
  return (
    <FadeInSection className="mx-auto mt-20 max-w-7xl">
      <p className="cs-label-sm uppercase text-white/50">Our clients</p>
      <Stagger className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {clientTypes.map((c) => (
          <StaggerItem key={c.name}>
            <div
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-all duration-200 hover:scale-[1.05] hover:border-white/20 hover:bg-white/[0.06]"
            >
              <img src={c.icon} alt="" className="h-8 w-8 shrink-0" width="32" height="32" loading="lazy" decoding="async" />
              <span className="font-sans text-[13px] font-medium text-white/80">{c.name}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function ServicesGrid() {
  return (
    <section className="mx-auto mt-32 max-w-7xl">
      <Stagger className="space-y-8">
        {servicesList.map((s, i) => (
          <StaggerItem key={s.tag}>
            <article
              className="group cs-glow-card grid grid-cols-1 gap-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-200 hover:scale-[1.01] md:grid-cols-12"
            >
              <div className="flex flex-col justify-center p-8 md:col-span-5 md:p-12">
                <div className="flex items-center gap-3">
                  <span className="cs-label-sm text-white/40">0{i + 1}</span>
                  <span className="cs-label-sm rounded-full border border-[#6b4aff]/30 bg-[#6b4aff]/10 px-3 py-1 text-[#8b7aff]">
                    {s.tag}
                  </span>
                </div>
                <h2 className="cs-h3 mt-6 text-white">{s.title}</h2>
                <p className="cs-body mt-4 text-white/70">{s.description}</p>
                <div className="mt-6">
                  <Link
                    to={s.route}
                    className="cs-label inline-flex items-center gap-2 text-[#8b7aff] transition-colors hover:text-white"
                  >
                    Learn more <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden md:col-span-7">
                <img
                  src={s.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="494"
                />
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function CTABanner() {
  return (
    <FadeInSection className="mx-auto mb-24 mt-32 max-w-7xl">
      <div className="rounded-2xl border border-white/10 p-10 text-center md:p-16">
        <h2 className="cs-h2 mx-auto max-w-2xl text-white">
          See how the modules work together, live.
        </h2>
        <p className="cs-body-lg mx-auto mt-6 max-w-xl text-white/70">
          Book a personalized walkthrough with our team. We will show you how Clear Street can
          transform your trading operations.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="cs-btn cs-btn-light">
            Book a walkthrough
          </Link>
          <Link to="/about" className="cs-btn cs-btn-secondary">
            About Clear Street
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}

