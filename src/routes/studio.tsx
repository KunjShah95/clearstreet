import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import {
  ArrowLeft, ArrowRight, BookOpen, BarChart3, Mic, LineChart, Users, FileText,
} from "lucide-react";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Clear Street Studio — Research & Insights" },
      {
        name: "description",
        content:
          "Clear Street Studio delivers original research, market commentary, and in-depth analysis on the global capital markets from Clear Street's team of experienced professionals.",
      },
    ],
  }),
  component: StudioPage,
});

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: BookOpen,
    title: "Original Research",
    desc: "Deep-dive reports on market structure, thematic trends, and actionable ideas from Clear Street's team of experienced analysts and strategists.",
  },
  {
    icon: BarChart3,
    title: "Market Commentary",
    desc: "Daily and weekly market briefs covering macro developments, sector rotations, and notable trading activity across global equities, options, and futures.",
  },
  {
    icon: Mic,
    title: "Events & Webinars",
    desc: "Live and on-demand programming featuring expert panels, fireside chats with industry leaders, and deep-dive sessions on critical market topics.",
  },
  {
    icon: FileText,
    title: "Data & Insights",
    desc: "Proprietary data visualizations, flow analysis, and quantitative insights derived from Clear Street's position as a leading prime broker and clearing firm.",
  },
];

const highlights = [
  { label: "Reports published", value: "200+" },
  { label: "Webinars hosted", value: "48+" },
  { label: "Followership", value: "15K+" },
];

function StudioPage() {
  return (
    <div className="px-4 sm:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.03] animate-studio-rotate-cw"
          />
          <div
            className="absolute -right-40 -top-20 h-[400px] w-[400px] rounded-full border border-white/[0.02] animate-studio-rotate-ccw"
          />
          <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/8 blur-[100px]" />
        </div>

        <FadeInSection>
          <div className="mx-auto max-w-7xl">
            <Link to="/" className="cs-label-sm mb-8 inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>

            <span className="cs-label-sm mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-indigo-300">
              Clear Street Studio
            </span>

            <h1 className="cs-display mt-4 text-white">
              Research &amp; insights
            </h1>
            <p className="cs-body-lg mt-4 max-w-3xl text-white/60">
              Original research, market commentary, and in-depth analysis from Clear Street's
              team of capital markets professionals. Stay informed with proprietary data,
              expert perspectives, and curated content.
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl pb-24">
        <div className="grid grid-cols-3 gap-8 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 md:px-16">
          {highlights.map((h) => (
            <div key={h.label} className="text-center">
              <p className="cs-display text-white">{h.value}</p>
              <p className="cs-label mt-1 text-white/50">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl pb-24">
        <FadeInSection>
          <h2 className="cs-h2 mb-12 text-white">What we offer</h2>
        </FadeInSection>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="cs-h4 mb-3 text-white">{f.title}</h3>
                  <p className="cs-body text-white/60">{f.desc}</p>
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
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="cs-h2 text-white">Visit the platform</h2>
                  <p className="cs-body-lg mt-3 max-w-xl text-white/60">
                    Access the full Clear Street Studio portal for the latest research,
                    webinars, and market data.
                  </p>
                </div>
                <a
                  href="https://studio.clearstreet.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-btn cs-btn-light shrink-0"
                >
                  Open Studio <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
