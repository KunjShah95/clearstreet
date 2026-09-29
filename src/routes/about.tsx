import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useInView } from "../hooks/use-in-view";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";
import { StatsMarquee } from "../components/stats-marquee";
import { img, type ImageKey } from "../lib/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Clear Street" },
      {
        name: "description",
        content:
          "Clear Street was founded in 2018 to replace legacy financial infrastructure with a modern, cloud-native platform for institutional investors. 800+ employees, 18 offices worldwide.",
      },
      { property: "og:title", content: "About — Clear Street" },
      {
        property: "og:description",
        content:
          "Replacing legacy financial infrastructure with a modern, cloud-native platform.",
      },
    ],
  }),
  component: About,
});

const phrase = "A completely cloud-native clearing and custody system, designed for today\u2019s complex, global markets and participants, built from the ground up for speed, transparency and scale.";

const teaserDesktop = "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-19-58.052Z-preview-desktop.mp4";
const teaserMobile = "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-20-18.183Z-preview-mobile.mp4";
const fullVideo = "https://clearstreet.nyc3.cdn.digitaloceanspaces.com/clearstreet/2026-02-24T14-17-53.992Z-full.mp4";

const culturePhotos: { key: ImageKey; w: number }[] = [
  { key: "culture.1", w: 400 },
  { key: "culture.2", w: 400 },
  { key: "culture.3", w: 400 },
  { key: "culture.4", w: 400 },
  { key: "culture.5", w: 640 },
  { key: "culture.6", w: 640 },
  { key: "culture.7", w: 300 },
];

const newsArticles = [
  {
    category: "Press Release",
    date: "2025-10-29",
    title: "Clear Street Unifies Client Experience with Global Platform Sales Launch",
    slug: "clear-street-unifies-client-experience-with-global-platform-sales-launch-one-clear-stre",
  },
  {
    category: "Press Release",
    date: "2025-09-30",
    title: "Clear Street, NEAR Protocol and Event Horizon Capital Converse Today at Clear Street\u2019s Innovator Insight Series",
    slug: "clear-street-near-protocol-and-event-horizon-capital-converse-today-at-clear-street-s-innovator-insight-series",
  },
  {
    category: "Press Release",
    date: "2025-05-22",
    title: "Clear Street Investment Banking Expands Blockchain and Digital Assets Franchise",
    slug: "clear-street-ib-expands-blockchain-digital-asset",
  },
];

const journeyEvents = [
  { date: "Sep 2026", text: "Clear Street Expands into Asia-Pacific Region With Acquisition of Boom Securities", slug: "clear-street-expands-into-asia-pacific-region-with-acquisition-of-boom-securities" },
  { date: "Dec 2025", text: "Alex Lawton Joins Clear Street\u2019s UK Management Team", slug: "alex-lawton-joins-clear-streets-uk-management-team" },
  { date: "Dec 2025", text: "Clear Street and iConnections Launch Groundbreaking, Premium Partnership for Client Growth", slug: "clear-street-and-iconnections-launch-groundbreaking-premium-partnership-for-client-growth" },
  { date: "Nov 2025", text: "Clear Street & BitGo Announce Partnership", slug: "clear-street-bitgo-announce-partnership" },
  { date: "Oct 2025", text: "Clear Street Unifies Client Experience with Global Platform Sales Launch", slug: "clear-street-unifies-client-experience-with-global-platform-sales-launch-one-clear-stre" },
  { date: "Oct 2025", text: "Clear Street Enhances 24/6 Market Access with Integration of Bruce ATS", slug: "clear-street-integrates-bruce-ats" },
  { date: "Jul 2025", text: "Clear Street Hires Chris Tufano as Head of Clearing", slug: "clear-street-hires-chris-tufano-as-head-of-clearing" },
  { date: "May 2025", text: "Clear Street Investment Banking Expands Blockchain and Digital Assets Franchise", slug: "clear-street-ib-expands-blockchain-digital-asset" },
  { date: "May 2025", text: "Launches Outsourced Trading Platform.", slug: "clear-street-launches-outsourced-trading" },
  { date: "May 2025", text: "Clear Street Launches Outsourced Trading with Senior Hire from UBS", slug: "clear-street-launches-outsourced-trading" },
  { date: "Apr 2025", text: "Rolls Out Product Enhancement Expanding Overnight Trading Access with MOON ATS\u2122 + OTC Overnight.", slug: "clear-street-another-enhancement-expands-overnight-trading-access" },
  { date: "Mar 2025", text: "Launches 24/6 Trading.", slug: "clear-street-launches-24-6-trading" },
  { date: "Mar 2025", text: "Accelerates Product Roll Out with OCC Cross-Margin Capabilities.", slug: "clear-street-accelerates-product-roll-out" },
  { date: "Feb 2025", text: "John Levene Joins Clear Street in New Role Leading Prime Brokerage Business.", slug: "john-levene-to-join-clear-street-new-role-leads-prime-brokerage-business" },
  { date: "Dec 2024", text: "Launches in United Kingdom Following FCA Approval, Joins London Metal Exchange.", slug: "clear-street-launches-in-united-kingdom-following-fca-approval-joins-london-metal-exchange" },
  { date: "Nov 2024", text: "Launches Equity Research Group.", slug: "clear-street-launches-equity-research-group" },
  { date: "Oct 2024", text: "Acquires Fox River Algorithmic Trading Business", slug: "clear-street-completes-purchase-of-fox-river-algorithmic-trading-business-from-instinet" },
  { date: "Apr 2024", text: "Begins offering market maker and futures clearing services", slug: "clear-street-launches-clearing-services-for-market-makers" },
  { date: "Jan 2024", text: "Begins offering corporate access services.", slug: "clear-street-introduces-corporate-access-capabilities" },
  { date: "Dec 2023", text: "Raises additional $520mm in Series B funding, increasing round to $685mm.", slug: "" },
  { date: "Oct 2023", text: "Expands asset class capabilities to include fixed-income securities", slug: "organically-expanding-into-fixed-income" },
  { date: "Jul 2023", text: "Acquires cloud-native futures clearing platform REACT", slug: "clear-street-announces-expansion-into-futures-market" },
  { date: "Jun 2023", text: "Begins offering investment banking services.", slug: "clear-street-to-launch-investment-banking-business-strategic-advisory-services" },
  { date: "Nov 2022", text: "Launches ATLAS (Automated Trading Locates Allocation Systems).", slug: "building-a-modern-securities-finance-technology-stack" },
  { date: "May 2022", text: "Raises $165mm Series B funding round", slug: "clear-street-closes-165-million-series-b-funding-round" },
  { date: "Jul 2021", text: "Raises over $300mm in capital", slug: "one-platform-two-years-1-billion-per-day" },
  { date: "Jul 2021", text: "Processes over a billion dollars in trades daily.", slug: "" },
  { date: "Sep 2021", text: "Adds U.S. options to asset class roster.", slug: "" },
  { date: "Jul 2020", text: "Acquires professional trading platform CenterPoint Securities.", slug: "" },
  { date: "Aug 2019", text: "Processes first trade in U.S. equities market.", slug: "" },
  { date: "Jul 2019", text: "Starts servicing first prime brokerage client", slug: "a-major-milestone" },
  { date: "Jan 2019", text: "Enters the prime brokerage market", slug: "" },
  { date: "Dec 2018", text: "Starts operating a clearing broker-dealer", slug: "" },
  { date: "Sep 2018", text: "Clear Street is founded", slug: "" },
];

const quotes: { name: string; text: string; bg: ImageKey }[] = [
  {
    name: "Andy Volz, Chief Commercial Officer",
    text: "At Clear Street, every decision is based on how well it best serves our clients\u2019 needs.",
    bg: "quote.volz",
  },
  {
    name: "Jon Daplyn, Chief Operating Officer",
    text: "We\u2019ve completely reimagined how capital markets infrastructure should work.",
    bg: "quote.daplyn",
  },
  {
    name: "Tania Zivkovic, Deputy Head of Human Resources",
    text: "We will drive our vision forward through exceptional results, every day.",
    bg: "quote.zivkovic",
  },
];

/* The platform stats live in ../components/stats-marquee. They used to
   be duplicated here, byte-identical to the homepage's copy, so the two
   pages could disagree about the firm's own numbers. */

const execTeam: { name: string; role: string; photo: ImageKey }[] = [
  { name: "Uriel Cohen", role: "Chief Executive Officer", photo: "team.uriel-cohen" },
  { name: "Atul Pawar", role: "Chief Risk Officer", photo: "team.atul-pawar" },
  { name: "Steve Bisgay", role: "Chief Financial Officer", photo: "team.steve-bisgay" },
  { name: "Jon Daplyn", role: "Chief Operating Officer", photo: "team.jon-daplyn" },
  { name: "Ashley DeSimone", role: "Chief Marketing Officer", photo: "team.ashley-desimone" },
  { name: "Christy Moccia", role: "Chief Compliance Officer", photo: "team.christy-moccia" },
  { name: "Kenneth Sicklick", role: "Chief Legal Officer", photo: "team.kenneth-sicklick" },
  { name: "Michael Stover", role: "Chief People & Performance Officer", photo: "team.michael-stover" },
];

const bizLeaders: { name: string; role: string; photo: ImageKey }[] = [
  { name: "John DiBacco", role: "Head of Markets", photo: "team.john-dibacco" },
  { name: "Andy Volz", role: "Chief Revenue Officer", photo: "team.andy-volz" },
  { name: "John D\u2019Agostini", role: "Co-Head of Investment Banking", photo: "team.john-dagostini" },
  { name: "Nicholas Hemmerly", role: "Co-Head of Investment Banking", photo: "team.nicholas-hemmerly" },
  { name: "Alex Lawton", role: "Chief Executive Officer, Clear Street UK and Europe", photo: "team.alex-lawton" },
];

const allTeam: { name: string; role: string; photo: ImageKey }[] = [
  { name: "Uriel Cohen", role: "Chief Executive Officer", photo: "team.uriel-cohen" },
  { name: "Andy Volz", role: "Chief Revenue Officer", photo: "team.andy-volz" },
  { name: "Atul Pawar", role: "Chief Risk Officer", photo: "team.atul-pawar" },
  { name: "Christy Moccia", role: "Chief Compliance Officer", photo: "team.christy-moccia" },
  { name: "Jon Daplyn", role: "Chief Operating Officer", photo: "team.jon-daplyn" },
  { name: "Chris Smith", role: "Chief Executive Officer, Clear Street Futures", photo: "team.chris-smith" },
  { name: "Steve Bisgay", role: "Chief Financial Officer", photo: "team.steve-bisgay" },
  { name: "Ashley DeSimone", role: "Chief Marketing Officer", photo: "team.ashley-desimone" },
  { name: "Kenneth Sicklick", role: "Chief Legal Officer", photo: "team.kenneth-sicklick" },
];

function About() {
  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <Culture />
      <FeaturedNews />
      <StatsMarqueeSection />
      <Journey />
      <QuotesSlider />
      <TeamSection />
      <CareersCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] pt-20 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-30"
          style={{ backgroundColor: "#01001f" }}
          preload="metadata"
          poster="https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?auto=format&fit=crop&w=80&q=15"
        >
          <source src={teaserDesktop} type="video/mp4" media="(min-width: 768px)" />
          <source src={teaserMobile} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/85 to-primary" />
        <div className="cs-ambient-orb -left-32 top-0 h-[500px] w-[500px] bg-indigo-500/20" />
        <div className="cs-ambient-orb -right-20 bottom-0 h-[400px] w-[400px] bg-[#3b29e0]/20" />
      </div>

      <div className="relative pb-16">
        <p
          className="cs-eyebrow animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDuration: "0.6s", animationFillMode: "both" }}
        >
          About
        </p>
        <h1
          className="cs-h1 mt-6 max-w-4xl text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          {phrase}
        </h1>
        <div
          className="mt-8 animate-in fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          <a
            href={fullVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-label inline-flex items-center gap-2 text-[#dad7ff] transition-colors hover:text-white"
          >
            world <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Culture() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {culturePhotos.map((photo, i) => (
          <StaggerItem key={photo.key}>
            <div className={`overflow-hidden rounded-xl border border-white/10 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <img
                src={img(photo.key, { w: photo.w })}
                alt=""
                aria-hidden
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ aspectRatio: i === 0 ? "1.2" : "1.5" }}
                loading="lazy"
                decoding="async"
                width={i === 0 ? "766" : "550"}
                height={i === 0 ? "640" : "363"}
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-16 max-w-3xl">
        <h2 className="cs-h2 text-white">
          The future is bright at <span className="italic text-[#c8baff]">Clear Street</span>.
        </h2>
        <p className="cs-body-lg mt-6 text-[color:var(--on-brand)]">
          We want to work with people who will drive our vision forward through exceptional results.
        </p>
        {/* Was a raw <a href="/careers">, which triggered a full document
            reload and threw away the client router. */}
        <Link to="/careers" className="cs-btn cs-btn-light mt-8 inline-flex">
          Explore open roles
        </Link>
      </div>
    </FadeInSection>
  );
}

function FeaturedNews() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 text-white">Latest press releases.</h2>
      <div className="mt-10 space-y-4">
        {newsArticles.map((a) => (
          <a
            key={a.slug}
            href={`https://www.clearstreet.io/news/press-releases/${a.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group cs-hover-lift block rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-6 transition-colors duration-300 hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-3 font-sans text-[13px] text-[color:var(--on-brand-muted)]">
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-sans">{a.category}</span>
              <span className="font-sans">{a.date}</span>
            </div>
            <p className="cs-body mt-3 text-[color:var(--on-brand)] transition-colors group-hover:text-white">
              {a.title}
            </p>
          </a>
        ))}
      </div>
    </FadeInSection>
  );
}

function StatsMarqueeSection() {
  return <StatsMarquee className="mt-32" />;
}

function Journey() {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <h2 className="cs-h2 max-w-3xl text-white">
        Our journey to modernize capital markets.
      </h2>
      <div className="relative mt-12">
        <div aria-hidden className="absolute left-[19px] top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px" />

        <div className="space-y-0">
          {journeyEvents.map((m, i) => (
            <div
              key={`${m.date}-${i}`}
              className={`relative flex flex-col gap-4 pb-8 md:flex-row md:items-start ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div aria-hidden className="absolute left-[12px] top-[6px] z-10 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-[#6b4aff] bg-primary md:left-1/2 md:-translate-x-1/2" />

              <div className={`pl-12 md:w-[calc(50%-32px)] md:pl-0 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}>
                <span className="cs-label-sm inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-indigo-300">
                  {m.date}
                </span>
                {m.slug ? (
                  <a
                    href={`https://www.clearstreet.io/news/press-releases/${m.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-body mt-3 block text-[color:var(--on-brand)] transition-colors hover:text-white"
                  >
                    {m.text}
                  </a>
                ) : (
                  <p className="cs-body mt-3 text-[color:var(--on-brand)]">{m.text}</p>
                )}
              </div>

              <div className="hidden md:block md:w-[calc(50%-32px)]" />
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function QuotesSlider() {
  const [active, setActive] = useState(0);
  const { ref } = useInView<HTMLDivElement>({ once: true, margin: "-20% 0px" });

  const q = quotes[active];

  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div ref={ref} className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <img
            src={img(q.bg, { w: 1600 })}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        <div className="relative px-8 py-16 md:px-16 md:py-24">
          <svg
            aria-hidden
            className="mb-6 h-8 w-8 text-white/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
          </svg>
          <blockquote className="cs-h3 max-w-3xl text-[color:var(--on-brand-strong)]">
            {q.text}
          </blockquote>
          <p className="cs-body mt-6 text-[color:var(--on-brand)]">{q.name}</p>

          <div className="mt-10 flex gap-3">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Quote ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

const teamTabs = [
  { id: "executive", label: "Executive", members: execTeam },
  { id: "leaders", label: "Business Leaders", members: bizLeaders },
  { id: "all", label: "All", members: allTeam },
] as const;

function TeamSection() {
  const [tab, setTab] = useState<(typeof teamTabs)[number]["id"]>("executive");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = teamTabs.find((t) => t.id === tab)!;

  // Roving focus: arrows move between tabs, Home/End jump to the ends.
  // Previously these were bare buttons — every one of them was a tab
  // stop, none reported a selected state, and arrow keys did nothing.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = teamTabs.length - 1;
    const current = teamTabs.findIndex((t) => t.id === tab);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = current === last ? 0 : current + 1;
    else if (e.key === "ArrowLeft") next = current === 0 ? last : current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setTab(teamTabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl">
      <h2 className="cs-h2 max-w-3xl text-white">Founded and led by industry experts.</h2>
      <p className="cs-body-lg mt-6 max-w-2xl text-[color:var(--on-brand)]">
        Our founders and leaders have lived the challenges of outdated technology, and transformed
        them into a vision for the future.
      </p>

      <div
        role="tablist"
        aria-label="Team"
        onKeyDown={onKeyDown}
        className="mt-10 flex flex-wrap gap-3"
      >
        {teamTabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`team-tab-${t.id}`}
            aria-selected={t.id === tab}
            aria-controls={`team-panel-${t.id}`}
            tabIndex={t.id === tab ? 0 : -1}
            onClick={() => setTab(t.id)}
            className={`cs-label-sm rounded-full border px-4 py-2 transition-all duration-300 ${
              t.id === tab
                ? "border-white/30 bg-white/10 text-white"
                : "border-white/10 text-[color:var(--on-brand-muted)] hover:border-white/25 hover:text-[color:var(--on-brand)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`team-panel-${active.id}`}
        aria-labelledby={`team-tab-${active.id}`}
        tabIndex={0}
      >
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {active.members.map((m) => (
            <StaggerItem key={m.name}>
              <div className="group cs-glow-card overflow-hidden rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)]">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={img(m.photo, { w: 500 })}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="765"
                    height="880"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-sans text-[15px] font-medium text-white">{m.name}</h3>
                  <p className="cs-label-sm mt-1 text-[color:var(--on-brand-muted)]">{m.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </FadeInSection>
  );
}

function CareersCTA() {
  return (
    <FadeInSection className="mx-auto mb-24 mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-10 md:p-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1706689656095-168768dc20a5?auto=format&fit=crop&w=800&q=60"
            alt=""
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#01001f]/95 to-primary/90" />
        </div>
        <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="cs-h2 max-w-2xl text-white">Come build with us.</h2>
            <p className="cs-body-lg mt-6 max-w-xl text-[color:var(--on-brand)]">
              We are hiring across engineering, trading, operations, and client coverage. Join a team
              that is rebuilding the infrastructure of global capital markets.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.clearstreet.io/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn cs-btn-light"
            >
              Open roles
            </a>
            <Link to="/careers" className="cs-btn cs-btn-secondary">
              Life at Clear Street
            </Link>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
