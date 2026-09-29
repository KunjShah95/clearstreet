import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, BarChart3, Briefcase, Users, Globe, Heart } from "lucide-react";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { PageHero } from "../components/page-hero";
import { CtaBanner, FeatureCard } from "../components/page-sections";
import { EXTERNAL_IMAGES } from "../lib/images";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Clear Street" },
      {
        name: "description",
        content:
          "Join Clear Street and help rebuild the infrastructure of global capital markets. Open roles across engineering, trading, operations, and client coverage.",
      },
    ],
  }),
  component: Careers,
});

const reasons = [
  {
    icon: Code2,
    title: "Build from scratch",
    description:
      "Work on greenfield projects that replace legacy systems. Our engineers own services end-to-end, from design to deployment.",
  },
  {
    icon: BarChart3,
    title: "Real market impact",
    description:
      "Your code clears trades, manages risk, and moves markets. Every line you write has direct impact on institutional trading.",
  },
  {
    icon: Users,
    title: "World-class team",
    description:
      "Work alongside engineers and traders from top hedge funds, big tech, and elite financial institutions.",
  },
  {
    icon: Globe,
    title: "Global scale",
    description:
      "Our platform spans 18 offices across North America, Europe, and Asia Pacific. Impact that reaches every time zone.",
  },
];

const departments = [
  { title: "Engineering", roles: "Backend, Frontend, Infrastructure, Data, Security" },
  { title: "Trading & Markets", roles: "Execution, Quantitative, Risk, Operations" },
  { title: "Client Coverage", roles: "Sales, Account Management, Client Onboarding" },
  { title: "Corporate", roles: "Finance, Legal, Compliance, Marketing, People" },
];

const values = [
  { icon: Heart, title: "Client first", description: "Every decision serves our clients." },
  { icon: Users, title: "Here to win", description: "Competitive, driven, and ambitious." },
  { icon: Briefcase, title: "Think big", description: "Tackle the hardest challenges." },
];

function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Come build the future of capital markets."
        lede="We are hiring across engineering, trading, operations, and client coverage. Join a team that is rebuilding the infrastructure of global capital markets from the ground up."
        backdrop={
          /* The photographic field this hero originally had. It was lost
             when the page moved onto the shared hero, and a careers page
             with a flat gradient reads markedly flatter than one with a
             room behind it. Kept decorative, so it is aria-hidden and
             lazy. */
          <>
            <img
              src={EXTERNAL_IMAGES["unsplash.careers"]}
              alt=""
              className="h-full w-full object-cover opacity-25"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/85 to-primary" />
          </>
        }
      />
      <WhyJoin />
      <Departments />
      <Values />
      <CtaBanner
        title="Ready to make an impact?"
        body="View our open positions and apply. We look forward to hearing from you."
        primary={{ label: "Email careers", to: "/contact" }}
        secondary={{ label: "About Clear Street", to: "/about" }}
      />
    </>
  );
}

function WhyJoin() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 max-w-3xl text-white">Build with purpose, at scale.</h2>
      <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {reasons.map((r) => (
          <StaggerItem key={r.title}>
            <FeatureCard icon={r.icon} title={r.title} description={r.description} />
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function Departments() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 max-w-3xl text-white">Find your team.</h2>
      <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {departments.map((d) => (
          <StaggerItem key={d.title}>
            <div className="h-full rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-8 transition-colors duration-300 hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]">
              <h3 className="cs-h4 text-white">{d.title}</h3>
              <p className="cs-body mt-4 text-[color:var(--on-brand)]">{d.roles}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function Values() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        <h2 className="cs-h2 text-center text-white">The principles that guide us.</h2>
        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="text-center">
              <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#DAD7FF]">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="cs-h4 text-white">{v.title}</h3>
              <p className="cs-body mt-2 text-[color:var(--on-brand)]">{v.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </FadeInSection>
  );
}
/* The previous "View open roles" button pointed at `href="#"`, so it
   jumped the page to the top and did nothing else — a control that
   looked live and wasn't. There is no public careers index in this
   build, so the CTA's primary action routes to the contact form, which
   is where a candidate enquiry is actually handled. */
