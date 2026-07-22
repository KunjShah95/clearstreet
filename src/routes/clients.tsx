import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { CountUp } from "../components/count-up";
import {
  ArrowLeft, TrendingUp, Building2, Users, BarChart3, Globe, Shield, ArrowRight,
} from "lucide-react";

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

const clientTypes = [
  {
    icon: TrendingUp,
    name: "Hedge Funds",
    desc: "Multi-asset prime brokerage with real-time risk and portfolio margining across equities, options, and futures. Dedicated coverage from experienced prime brokerage professionals who understand complex fund structures.",
  },
  {
    icon: Building2,
    name: "Family Offices",
    desc: "Dedicated institutional coverage, transparent financing terms, and a single platform for clearing, custody, and comprehensive reporting across all asset classes.",
  },
  {
    icon: Users,
    name: "Broker-Dealers",
    desc: "Self-clearing capabilities, correspondent clearing, and white-label technology solutions for growing broker-dealers seeking modern, scalable infrastructure.",
  },
  {
    icon: BarChart3,
    name: "ETF Issuers",
    desc: "End-to-end support for ETF creation, redemption, AP connectivity, secondary market making, and capital markets advisory for new and established issuers.",
  },
  {
    icon: Globe,
    name: "Active & Prop Traders",
    desc: "Low-latency algorithmic execution, direct market access (DMA), dedicated stock loan locates, and professional-grade trading tools for sophisticated individual traders.",
  },
  {
    icon: Shield,
    name: "Institutional Investors",
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
    <div className="px-4 sm:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#3b29e0]/10 blur-[120px]" />
          <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/5 blur-[100px]" />
        </div>

        <FadeInSection>
          <div className="mx-auto max-w-7xl">
            <Link to="/" className="cs-label-sm mb-8 inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
            <h1 className="cs-display mt-4 text-white">
              Who we serve
            </h1>
            <p className="cs-body-lg mt-4 max-w-3xl text-white/60">
              From sophisticated individual traders to the largest institutional investors,
              Clear Street provides a modern capital markets platform built for the demands
              of today's global markets.
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-7xl pb-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="cs-display text-white">
                <CountUp value={s.value} />
              </p>
              <p className="cs-label mt-1 text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client types */}
      <section className="mx-auto max-w-7xl pb-24">
        <FadeInSection>
          <h2 className="cs-h2 mb-12 text-white">Client types</h2>
        </FadeInSection>
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientTypes.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.name}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="cs-h4 mb-3 text-white">{c.name}</h3>
                  <p className="cs-body text-white/60">{c.desc}</p>
                  <div className="mt-6 flex items-center gap-1 font-sans text-sm font-medium text-indigo-400 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl pb-32">
        <FadeInSection>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-primary p-12 md:p-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="cs-h2 text-white">Ready to get started?</h2>
              <p className="cs-body-lg mt-4 max-w-2xl text-white/60">
                Talk to our team about how Clear Street can serve your firm's
                unique needs across prime brokerage, clearing, execution, and more.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="cs-btn cs-btn-light">
                  Get in touch
                </Link>
                <Link to="/services" className="cs-btn cs-btn-secondary text-white">
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
