import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../components/fade-in-section";
import { ArrowRight, Newspaper, Megaphone, BookOpen, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Insights — Clear Street" },
      {
        name: "description",
        content:
          "Latest news, press releases, and insights from Clear Street. Stay informed about our platform, team, and industry perspective.",
      },
    ],
  }),
  component: NewsPage,
});

type NewsItem = {
  type: "pressReleases" | "blog" | "conferences";
  title: string;
  href: string;
  image?: string;
  date?: string;
};

const newsItems: NewsItem[] = [
  { type: "pressReleases", title: "Clear Street Unifies Client Experience with Global Platform Sales Launch", href: "/news/press-releases/clear-street-unifies-client-experience-with-global-platform-sales-launch-one-clear-stre", image: "https://cdn.sanity.io/images/40fnhjbe/production/8a7aded60c0e3422cd5524308626298e97104dce-1920x1080.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street Appoints Sean Hendelman to Lead Active Division", href: "/news/press-releases/clear-street-appoints-sean-hendelman-to-lead-active-division", image: "https://cdn.sanity.io/images/40fnhjbe/production/15aaab81663b1c17e087e8f423a2b12114999e45-3840x2160.png", date: "2025" },
  { type: "blog", title: "The 'Golden Record' That Makes Voluntary Corporate Actions Easier", href: "/news/blog/the-golden-record-that-makes-voluntary-corporate-actions-easier", image: "https://cdn.sanity.io/images/40fnhjbe/production/c2e9aaae985596b777fd60fb099e7fe9a966cb0b-1920x1080.jpg", date: "2025" },
  { type: "blog", title: "Clear Street's Commitment to Corporate Access and the 'Power of Prime'", href: "/news/blog/clear-streets-commitment-to-corporate-access-and-the-power-of-prime", image: "https://cdn.sanity.io/images/40fnhjbe/production/cd9ced9228f740345e94536d46c8a358d388a1fd-3840x2160.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street Promotes Technology & Client Service with Executive Organizational Changes", href: "/news/press-releases/clear-street-promotes-technology-client-service-with-executive-organizational-changes", date: "2025" },
  { type: "pressReleases", title: "Clear Street Expands European Market Access with MiFID II License in the Netherlands", href: "/news/press-releases/clear-street-expands-european-market-access-with-mifid-ii-license-in-the-netherlands", image: "https://cdn.sanity.io/images/40fnhjbe/production/bb50edfeb4740d2b98c08dc499b1eb374b14873b-1920x1080.png", date: "2025" },
  { type: "blog", title: "History of Data at Clear Street", href: "/news/blog/history-of-data-at-clear-street", image: "https://cdn.sanity.io/images/40fnhjbe/production/97681fb649a2b188213efadf85b2c2c026adc80b-3840x2160.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street Welcomes Industry Veteran Edward Tilly as President", href: "/news/press-releases/clear-street-welcomes-industry-veteran-edward-tilly-as-president", image: "https://cdn.sanity.io/images/40fnhjbe/production/bdd7df8352a5298bbbb543c2fe802fd1324e01fc-3840x2160.png", date: "2025" },
  { type: "blog", title: "Clear Street Investment Banking Expands Blockchain and Digital Assets Franchise", href: "/news/blog/clear-street-expands-blockchain-digital-assets-franchise", image: "https://cdn.sanity.io/images/40fnhjbe/production/71aec502bcf84e7d8195a8e12ee937e13c02153d-3840x2160.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street's Outsourced Trading Team Further Expands", href: "/news/press-releases/clear-streets-outsourced-trading-team-further-expands", image: "https://cdn.sanity.io/images/40fnhjbe/production/9fe1872d2f07b225e33b84b0c2406bec27d72353-1920x1080.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street Welcomes Mike Buchenberger as Chief Human Resources Officer", href: "/news/press-releases/clear-street-welcomes-mike-buchenberger-as-chief-human-resources-officer", image: "https://cdn.sanity.io/images/40fnhjbe/production/4b366431e6a0ae1c6396fe0bf05ca66b965291cc-1920x1080.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street Expands UK Leadership Team with Key Senior Hires", href: "/news/press-releases/clear-street-expands-uk-leadership-team-with-key-senior-hires", date: "2025" },
  { type: "pressReleases", title: "Clear Street Investment Banking Expands Blockchain & Digital Asset", href: "/news/press-releases/clear-street-ib-expands-blockchain-digital-asset", date: "2025" },
  { type: "pressReleases", title: "Clear Street to Acquire Fox River Algorithmic Trading Business from Instinet", href: "/news/press-releases/clear-street-to-acquire-fox-river-algorithmic-trading-business-from-instinet", image: "https://cdn.sanity.io/images/40fnhjbe/production/bdd7df8352a5298bbbb543c2fe802fd1324e01fc-3840x2160.png", date: "2025" },
  { type: "pressReleases", title: "Clear Street Launches Equity Research Group", href: "/news/press-releases/clear-street-launches-equity-research-group", date: "2025" },
  { type: "pressReleases", title: "Clear Street Launches Healthcare & Biotechnology Equity Research", href: "/news/press-releases/clear-street-launches-healthcare-biotechnology-equity-research", date: "2025" },
  { type: "pressReleases", title: "Clear Street Closes $400 Million Senior Notes Offering", href: "/news/press-releases/clear-street-closes-400-million-senior-notes-offering", date: "2025" },
  { type: "pressReleases", title: "Clear Street Launches 24/6 Trading", href: "/news/press-releases/clear-street-launches-24-6-trading", date: "2025" },
  { type: "blog", title: "Revolutionizing Electronic Trading with Cutting-Edge Technology", href: "/news/blog/revolutionizing-electronic-trading-with-cutting-edge-technology", date: "2025" },
  { type: "blog", title: "Scaling Your Fund Efficiently with Modern Technology", href: "/news/blog/scaling-your-fund-efficiently-with-modern-technology", date: "2025" },
  { type: "pressReleases", title: "Clear Street Named to CNBC's The World's Top Fintech Companies of 2024", href: "/news/press-releases/clear-street-named-to-cnbc-s-the-world-s-top-fintech-companies-of-2024", date: "2024" },
  { type: "pressReleases", title: "Clear Street Hires Chris Tufano as Head of Clearing", href: "/news/press-releases/clear-street-hires-chris-tufano-as-head-of-clearing", date: "2024" },
  { type: "blog", title: "Supporting Developer Experience at a Growing Fintech", href: "/news/blog/supporting-developer-experience-at-a-growing-fintech", date: "2024" },
  { type: "pressReleases", title: "Clear Street Launches Futures Clearing Services", href: "/news/press-releases/clear-street-launches-futures-clearing-services", date: "2024" },
  { type: "pressReleases", title: "Clear Street Appoints Michael Stover as Firm's First Chief People & Performance Officer", href: "/news/press-releases/clear-street-appoints-michael-stover-as-firm-s-first-chief-people-performance-officer", date: "2024" },
  { type: "pressReleases", title: "Clear Street Announces Voluntary SEC Deregistration", href: "/news/press-releases/clear-street-announces-voluntary-sec-deregistration", date: "2024" },
  { type: "blog", title: "Where Trading Meets Intelligence", href: "/news/blog/where-trading-meets-intelligence", date: "2024" },
  { type: "pressReleases", title: "Puneet Pardasani Joins Clear Street to Lead Global Institutional Sales", href: "/news/press-releases/puneet-pardasani-joins-clear-street-to-lead-global-institutional-sales-and-sales-trading", date: "2024" },
  { type: "pressReleases", title: "Alex Lawton Joins Clear Street's UK Management Team", href: "/news/press-releases/alex-lawton-joins-clear-streets-uk-management-team", date: "2024" },
  { type: "pressReleases", title: "Clear Street Further Builds Institutional Division with Senior Hires in Prime Brokerage", href: "/news/press-releases/clear-street-further-builds-institutional-division-with-senior-hires-in-prime-brokerage-business", date: "2024" },
  { type: "blog", title: "Trading Services That Help You Build Alpha, Not Overhead", href: "/news/blog/trading-services-that-help-you-build-alpha-not-overhead", date: "2024" },
  { type: "blog", title: "Market Infrastructure Needs More Than an Upgrade", href: "/news/blog/market-infrastructure-needs-more-than-an-upgrade", date: "2024" },
  { type: "pressReleases", title: "Clear Street Wins Top Technology & Client Service Awards at 2024 Global Custodian Event", href: "/news/press-releases/clear-street-wins-top-technology-client-service-awards-at-2024-global-custodian-industry-leaders-event", date: "2024" },
  { type: "blog", title: "Webinar Recap: CSIS — AI & Financial Infrastructure — What's Next", href: "/news/blog/webinar-recap-csis-ai-financial-infrastructure-whats-next", date: "2024" },
  { type: "blog", title: "Supporting the Rise of Derivatives-Based ETFs", href: "/news/blog/supporting-the-rise-of-derivatives-based-etfs", date: "2024" },
  { type: "blog", title: "Navigating the Regulatory Landscape Within a Growing Fintech", href: "/news/blog/navigating-the-regulatory-landscape-within-a-growing-fintech", date: "2024" },
  { type: "pressReleases", title: "The Clear Street Trading App Goes Live", href: "/news/press-releases/the-clear-street-trading-app-goes-live", date: "2024" },
  { type: "pressReleases", title: "Clear Street Appoints Julian Rainero as Chief Regulatory Counsel", href: "/news/press-releases/clear-street-appoints-julian-rainero-as-chief-regulatory-counsel", date: "2024" },
  { type: "pressReleases", title: "Clear Street Launches Specialty Finance", href: "/news/press-releases/clear-street-launches-specialty-finance-mickey-chleien", date: "2024" },
  { type: "conferences", title: "Options Industry Conference 2025", href: "https://www.optionsconference.com/", date: "2025" },
  { type: "conferences", title: "TradeTech Europe", href: "https://tradetecheu.wbresearch.com/", date: "2025" },
];

const tabs = [
  { id: "all", label: "All", icon: Newspaper },
  { id: "pressReleases", label: "Press Releases", icon: Megaphone },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "conferences", label: "Events", icon: Calendar },
];

const typeLabels: Record<string, string> = {
  pressReleases: "Press Release",
  blog: "Blog Post",
  conferences: "Event",
};

function NewsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? newsItems : newsItems.filter((i) => i.type === activeTab);

  return (
    <div className="px-4 sm:px-8">
      <Hero />
      <FadeInSection>
        <div className="mx-auto max-w-7xl pb-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "border-indigo-500 bg-indigo-500/20 text-white"
                      : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="mx-auto max-w-7xl pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <NewsCard key={`${item.type}-${i}`} item={item} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="cs-body mt-12 text-center text-white/40">No items found.</p>
          )}
        </div>
      </FadeInSection>
      <CTASection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>
      <FadeInSection>
        <div className="mx-auto max-w-7xl">
          <div
            className="max-w-3xl animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDuration: "0.8s", animationFillMode: "both" }}
          >
            <p className="cs-label-sm mb-4 uppercase tracking-wider text-indigo-300">News & Insights</p>
            <h1 className="cs-display text-white">
              The latest from{" "}
              <span className="text-indigo-400">Clear Street</span>
            </h1>
            <p className="cs-body-lg mt-6 max-w-2xl text-white/60">
              Press releases, blog posts, and industry events — stay informed about our platform,
              our people, and our perspective on the markets.
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const isExternal = item.href.startsWith("http");

  const content = (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
    >
      {item.image ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width="640"
            height="360"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-white/5">
          <Newspaper className="h-10 w-10 text-white/20" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-indigo-300">
            {typeLabels[item.type]}
          </span>
          {item.date && (
            <span className="font-sans text-[11px] text-white/40">{item.date}</span>
          )}
        </div>
        <h3 className="cs-h5 flex-1 text-white group-hover:text-indigo-200 transition-colors">
          {item.title}
        </h3>
        <div className="mt-4 flex items-center gap-1 font-sans text-xs font-medium text-indigo-400 group-hover:gap-2 transition-all">
          {isExternal ? "Learn more" : "Read more"}
          {isExternal ? (
            <ExternalLink className="h-3.5 w-3.5" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" />
          )}
        </div>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return <Link to={item.href} className="block">{content}</Link>;
}

function CTASection() {
  return (
    <FadeInSection>
      <section className="mx-auto max-w-7xl pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/20 to-primary px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-400/10 blur-[80px]" />
          </div>
          <h2 className="cs-h2 text-white">Want to stay in the loop?</h2>
          <p className="cs-body mt-4 max-w-lg mx-auto text-white/60">
            Get our latest press releases and blog posts delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://www.linkedin.com/company/clear-street"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn cs-btn-light"
            >
              Follow on LinkedIn
            </a>
            <Link to="/contact" className="cs-btn cs-btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
