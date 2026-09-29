import { createFileRoute } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { PageHero } from "../components/page-hero";
import { CtaBanner, FeatureCard } from "../components/page-sections";
import { BookOpen, BarChart3, Mic, FileText } from "lucide-react";

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

const features = [
  {
    icon: BookOpen,
    title: "Original research",
    desc: "Deep-dive reports on market structure, thematic trends, and actionable ideas from Clear Street's team of experienced analysts and strategists.",
  },
  {
    icon: BarChart3,
    title: "Market commentary",
    desc: "Daily and weekly market briefs covering macro developments, sector rotations, and notable trading activity across global equities, options, and futures.",
  },
  {
    icon: Mic,
    title: "Events & webinars",
    desc: "Live and on-demand programming featuring expert panels, fireside chats with industry leaders, and deep-dive sessions on critical market topics.",
  },
  {
    icon: FileText,
    title: "Data & insights",
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
    <>
      <PageHero
        eyebrow="Clear Street Studio"
        title="Research & insights"
        lede="Original research, market commentary, and in-depth analysis from Clear Street's team of capital markets professionals. Stay informed with proprietary data, expert perspectives, and curated content."
        tone="orb"
        backdrop={
          /* The two counter-rotating rings this hero originally carried.
             They are the one moving element on an otherwise static page,
             and both loops are already neutralised under
             prefers-reduced-motion in styles.css. */
          <>
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.03] animate-studio-rotate-cw" />
            <div className="absolute -right-40 -top-20 h-[400px] w-[400px] rounded-full border border-white/[0.02] animate-studio-rotate-ccw" />
          </>
        }
      />
      <Highlights />
      <Features />
      <CtaBanner
        title="Visit the platform"
        body="Access the full Clear Street Studio portal for the latest research, webinars, and market data."
        primary={{ label: "Open Studio", to: "", href: "https://studio.clearstreet.io/" }}
        secondary={{ label: "Latest news", to: "/news" }}
      />
    </>
  );
}

function Highlights() {
  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
      <dl className="grid grid-cols-3 gap-8 rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] px-8 py-10 md:px-16">
        {highlights.map((h) => (
          <div key={h.label} className="text-center">
            <dd className="cs-display text-white">{h.value}</dd>
            <dt className="cs-label mt-1 text-[color:var(--on-brand-muted)]">{h.label}</dt>
          </div>
        ))}
      </dl>
    </FadeInSection>
  );
}

function Features() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 text-white">What we offer</h2>
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <FeatureCard icon={f.icon} title={f.title} description={f.desc} />
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}
