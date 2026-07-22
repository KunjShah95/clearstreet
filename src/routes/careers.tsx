import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { ArrowRight, Code2, BarChart3, Briefcase, Users, Globe, Heart } from "lucide-react";

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

function Careers() {
  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <WhyJoin />
      <Departments />
      <Values />
      <CTABanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] pt-20 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1706689656095-168768dc20a5?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="h-full w-full object-cover opacity-25"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/85 to-primary" />
      </div>
      <div className="relative pb-16">
        <p
          className="cs-label-sm uppercase text-white/50 animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDuration: "0.6s", animationFillMode: "both" }}
        >
          Careers
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          Come build the future of capital markets.
        </h1>
        <p
          className="cs-body-lg mt-8 max-w-2xl text-white/75 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          We are hiring across engineering, trading, operations, and client coverage. Join a team
          that is rebuilding the infrastructure of global capital markets from the ground up.
        </p>
      </div>
    </section>
  );
}

function WhyJoin() {
  const reasons = [
    {
      icon: Code2,
      title: "Build From Scratch",
      desc: "Work on greenfield projects that replace legacy systems. Our engineers own services end-to-end, from design to deployment.",
    },
    {
      icon: BarChart3,
      title: "Real Market Impact",
      desc: "Your code clears trades, manages risk, and moves markets. Every line you write has direct impact on institutional trading.",
    },
    {
      icon: Users,
      title: "World-Class Team",
      desc: "Work alongside engineers and traders from top hedge funds, big tech, and elite financial institutions.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      desc: "Our platform spans 18 offices across North America, Europe, and Asia Pacific. Impact that reaches every time zone.",
    },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <span className="cs-label-sm uppercase text-white/50">Why Clear Street</span>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">Build with purpose, at scale.</h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E21DE] text-[#DAD7FF]">
              <r.icon className="h-6 w-6" />
            </div>
            <h3 className="cs-h4 text-white">{r.title}</h3>
            <p className="cs-body mt-3 text-white/70">{r.desc}</p>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}

function Departments() {
  const depts = [
    {
      title: "Engineering",
      roles: "Backend, Frontend, Infrastructure, Data, Security",
    },
    {
      title: "Trading & Markets",
      roles: "Execution, Quantitative, Risk, Operations",
    },
    {
      title: "Client Coverage",
      roles: "Sales, Account Management, Client Onboarding",
    },
    {
      title: "Corporate",
      roles: "Finance, Legal, Compliance, Marketing, People",
    },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <span className="cs-label-sm uppercase text-white/50">Departments</span>
      <h2 className="cs-h2 mt-4 max-w-3xl text-white">Find your team.</h2>
      <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {depts.map((d) => (
          <StaggerItem key={d.title}>
            <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
              <h3 className="cs-h4 text-white">{d.title}</h3>
              <p className="cs-body mt-4 text-white/70">{d.roles}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

function Values() {
  const vals = [
    { icon: Heart, title: "Client First", desc: "Every decision serves our clients." },
    { icon: Users, title: "Here to Win", desc: "Competitive, driven, and ambitious." },
    { icon: Briefcase, title: "Think Big", desc: "Tackle the hardest challenges." },
  ];

  return (
    <FadeInSection className="mx-auto mt-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        <span className="cs-label-sm text-center uppercase text-white/50 block">Our values</span>
        <h2 className="cs-h2 mt-4 text-center text-white">The principles that guide us.</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {vals.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E21DE] text-[#DAD7FF]">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="cs-h4 text-white">{v.title}</h3>
              <p className="cs-body mt-2 text-white/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function CTABanner() {
  return (
    <FadeInSection className="mx-auto mt-24 mb-24 max-w-7xl">
      <div className="rounded-2xl border border-white/10 p-10 text-center md:p-16">
        <h2 className="cs-h2 mx-auto max-w-2xl text-white">
          Ready to make an impact?
        </h2>
        <p className="cs-body-lg mx-auto mt-6 max-w-xl text-white/70">
          View our open positions and apply. We look forward to hearing from you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#" className="cs-btn cs-btn-light">
            View open roles <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link to="/about" className="cs-btn cs-btn-secondary">
            About Clear Street
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}
