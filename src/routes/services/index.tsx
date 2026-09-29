import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../../components/fade-in-section";
import { PageHero } from "../../components/page-hero";
import { CtaBanner } from "../../components/page-sections";
import { img, type ImageKey } from "../../lib/images";

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

const assetClasses: { name: string; icon: ImageKey }[] = [
  { name: "Equities", icon: "asset.equities" },
  { name: "Options", icon: "asset.options" },
  { name: "Futures", icon: "asset.futures" },
  { name: "Fixed Income", icon: "asset.fixed-income" },
  { name: "Foreign Exchange", icon: "asset.fx" },
  { name: "Swaps", icon: "asset.swaps" },
  { name: "Commodities", icon: "asset.commodities" },
  { name: "U.S. Treasury Repo", icon: "asset.treasury-repo" },
  { name: "U.S. MBS Repo", icon: "asset.mbs-repo" },
  { name: "Digital Assets (coming soon)", icon: "asset.digital-assets" },
];

const clientTypes: { name: string; icon: ImageKey }[] = [
  { name: "Traders", icon: "audience.traders" },
  { name: "Family offices", icon: "audience.family-offices" },
  { name: "Hedge funds", icon: "audience.hedge-funds" },
  { name: "ETF Issuers", icon: "audience.etf-issuers" },
  { name: "Broker-Dealers", icon: "audience.broker-dealers" },
];

const servicesList: {
  tag: string;
  route: "/services/clearing" | "/services/financing" | "/services/execution-trading" | "/services/investment-banking";
  title: string;
  description: string;
  image: ImageKey;
}[] = [
  {
    tag: "Clearing",
    route: "/services/clearing",
    title: "Clearing",
    description: "Sophisticated market participants need counterparty diversification. Clear Street fills this gap with real-time transparency, cross-asset flexibility and modern clearing infrastructure.",
    image: "service.clearing",
  },
  {
    tag: "Financing",
    route: "/services/financing",
    title: "Financing",
    description: "Scale your strategy on one single platform. Clear Street’s integrated cash and synthetic financing solutions provide the flexibility to grow efficiently – unlocking capital, streamlining risk and delivering institutional-grade leverage.",
    image: "service.financing",
  },
  {
    tag: "Execution & Trading",
    route: "/services/execution-trading",
    title: "Execution & Trading",
    description: "Speed. Precision. Reach. Execute complex strategies with confidence. Clear Street unites advanced algorithms and white-glove support, so that you source global liquidity across markets and asset classes.",
    image: "service.execution-trading",
  },
  {
    tag: "Investment Banking",
    route: "/services/investment-banking",
    title: "Investment Banking",
    description: "Clear Street’s team has decades of advisory experience and deep relationships. As disruptors ourselves, we empower innovators, founders, executives and investors with the tailored strategies they need to navigate the capital markets of today and tomorrow.",
    image: "service.investment-banking",
  },
];

function Services() {
  return (
    <>
      <Hero />
      <AssetClasses />
      <ClientTypes />
      <ServicesGrid />
      <CtaBanner
        title="See how the modules work together, live."
        body="Book a personalized walkthrough with our team. We will show you how Clear Street can transform your trading operations."
        primary={{ label: "Book a walkthrough", to: "/contact" }}
        secondary={{ label: "About Clear Street", to: "/about" }}
      />
    </>
  );
}

function Hero() {
  return (
    <PageHero
      eyebrow="Our services"
      title="One platform. Every service an institutional investor needs."
      lede="Clear Street’s modern infrastructure powers market participants in real time and in the cloud."
    >
      {/* Live trade tape. The labels were at text-white/40 (~3.3:1 on the
          brand canvas, below AA) and the values at /90; both now use the
          audited on-brand tiers. */}
      <div
        className="mt-10 rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-6 animate-in fade-in slide-in-from-bottom-3"
        style={{ animationDuration: "0.8s", animationDelay: "0.3s", animationFillMode: "both" }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span className="cs-label-sm text-[color:var(--on-brand-muted)]">
            Real-time trade data
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {statusTags.map((t) => (
            <div key={t.label} className="flex items-baseline gap-1.5">
              <dt className="cs-label-sm text-[color:var(--on-brand-muted)]">{t.label}</dt>
              <dd className="font-sans text-[14px] font-medium text-[color:var(--on-brand-strong)]">
                {t.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </PageHero>
  );
}

function AssetClasses() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 max-w-2xl text-white">
        Our cloud-native technology focuses on managing risk and facilitating growth for our
        clients.
      </h2>
      <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {assetClasses.map((a) => (
          <StaggerItem key={a.name}>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] px-4 py-3 transition-colors duration-200 hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]">
              <img
                src={img(a.icon)}
                alt=""
                aria-hidden
                className="h-6 w-6 shrink-0"
                width="24"
                height="24"
                loading="lazy"
                decoding="async"
              />
              <span className="font-sans text-[13px] leading-tight text-[color:var(--on-brand)]">
                {a.name}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function ClientTypes() {
  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 text-white">Who we serve</h2>
      <Stagger className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {clientTypes.map((c) => (
          <StaggerItem key={c.name}>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] px-4 py-6 text-center transition-colors duration-200 hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]">
              <img
                src={img(c.icon)}
                alt=""
                aria-hidden
                className="h-8 w-8 shrink-0"
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
              />
              <span className="font-sans text-[13px] font-medium text-[color:var(--on-brand)]">
                {c.name}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function ServicesGrid() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <Stagger className="space-y-8">
        {servicesList.map((s, i) => (
          <StaggerItem key={s.tag}>
            <article className="group cs-glow-card grid grid-cols-1 gap-8 overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] md:grid-cols-12">
              <div className="flex flex-col justify-center p-8 md:col-span-5 md:p-12">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="cs-label-sm text-[color:var(--on-brand-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="cs-label-sm rounded-full border border-[#6b4aff]/30 bg-[#6b4aff]/10 px-3 py-1 text-[#8b7aff]">
                    {s.tag}
                  </span>
                </div>
                <h2 className="cs-h3 mt-6 text-white">{s.title}</h2>
                <p className="cs-body mt-4 text-[color:var(--on-brand)]">{s.description}</p>
                <div className="mt-6">
                  <Link
                    to={s.route}
                    className="cs-label inline-flex items-center gap-2 text-[#8b7aff] transition-colors hover:text-white"
                  >
                    Learn more <span aria-hidden className="cs-arrow-slide">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden md:col-span-7">
                <img
                  src={img(s.image, { w: 1200 })}
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
