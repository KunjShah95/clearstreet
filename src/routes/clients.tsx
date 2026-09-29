import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { CountUp } from "../components/count-up";
import { PageHero } from "../components/page-hero";
import { CtaBanner } from "../components/page-sections";
import { TrendingUp, Building2, Users, BarChart3, Globe, Shield, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Clear Street" },
      {
        name: "description",
        content:
          "Clear Street serves hedge funds, family offices, broker-dealers, ETF issuers, and active traders with institutional-grade prime brokerage and clearing services.",
      },
    ],
  }),
  component: ClientsPage,
});

/** Each audience type links to the service most relevant to it, so the
 *  card's affordance has somewhere to go. Previously all six rendered a
 *  "Learn more" affordance that was a plain <span> — it looked like a
 *  link, arrow-swiped on hover, and went nowhere. */
const clientTypes = [
  {
    icon: TrendingUp,
    name: "Hedge funds",
    to: "/services/financing",
    desc: "Multi-asset prime brokerage with real-time risk and portfolio margining across equities, options, and futures. Dedicated coverage from experienced prime brokerage professionals who understand complex fund structures.",
  },
  {
    icon: Building2,
    name: "Family offices",
    to: "/services/clearing",
    desc: "Dedicated institutional coverage, transparent financing terms, and a single platform for clearing, custody, and comprehensive reporting across all asset classes.",
  },
  {
    icon: Users,
    name: "Broker-dealers",
    to: "/services/clearing",
    desc: "Self-clearing capabilities, correspondent clearing, and white-label technology solutions for growing broker-dealers seeking modern, scalable infrastructure.",
  },
  {
    icon: BarChart3,
    name: "ETF issuers",
    to: "/services",
    desc: "End-to-end support for ETF creation, redemption, AP connectivity, secondary market making, and capital markets advisory for new and established issuers.",
  },
  {
    icon: Globe,
    name: "Active & prop traders",
    to: "/services/active-trading",
    desc: "Low-latency algorithmic execution, direct market access (DMA), dedicated stock loan locates, and professional-grade trading tools for sophisticated individual traders.",
  },
  {
    icon: Shield,
    name: "Institutional investors",
    to: "/services/investment-banking",
    desc: "Comprehensive prime brokerage, custody, and execution services for pension funds, endowments, and institutional asset managers.",
  },
];

const stats = [
  { value: "25+", label: "Years of leadership experience" },
  { value: "800+", label: "Employees globally" },
  { value: "18", label: "Offices worldwide" },
  { value: "500+", label: "Institutional clients" },
];

function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Who we serve"
        lede="From sophisticated individual traders to the largest institutional investors, Clear Street provides a modern capital markets platform built for the demands of today's global markets."
      />
      <StatsStrip />
      <ClientTypes />
      <CtaBanner
        title="Ready to get started?"
        body="Talk to our team about how Clear Street can serve your firm's unique needs across prime brokerage, clearing, execution, and more."
        primary={{ label: "Talk to our team", to: "/contact" }}
        secondary={{ label: "Explore services", to: "/services" }}
      />
    </>
  );
}

function StatsStrip() {
  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
      <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="cs-display text-white">
              <CountUp value={s.value} />
            </dd>
            <dt className="cs-label mt-1 text-[color:var(--on-brand-muted)]">{s.label}</dt>
          </div>
        ))}
      </dl>
    </FadeInSection>
  );
}

function ClientTypes() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 text-white">Client types</h2>
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientTypes.map((c) => {
          const Icon = c.icon;
          return (
            <StaggerItem key={c.name}>
              {/* The whole card is the link, so the target is reachable by
                  click, keyboard and touch. A <span> "Learn more" inside a
                  non-interactive card left the grid with no hit area at
                  all — only the text looked actionable. */}
              <Link
                to={c.to}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-8 transition-colors hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#DAD7FF]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="cs-h4 mb-3 text-white">{c.name}</h3>
                <p className="cs-body flex-1 text-[color:var(--on-brand)]">{c.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-sans text-sm font-medium text-indigo-200 transition-all group-hover:gap-2">
                  Learn more
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </FadeInSection>
  );
}
