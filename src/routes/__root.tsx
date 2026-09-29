import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ClearStreetLogo } from "../components/clearstreet-logo";
import { SmoothScroll } from "../components/smooth-scroll";
import { ScrollProgress } from "../components/scroll-progress";
import { Preloader } from "../components/preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4">
      <div className="max-w-md text-center text-white">
        <h1 className="cs-display">404</h1>
        <p className="cs-body-lg mt-2 opacity-80">This page isn't in our book.</p>
        <div className="mt-8">
          <Link to="/" className="cs-btn cs-btn-light">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4">
      <div className="max-w-md text-center text-white">
        <h1 className="cs-h3">Something went sideways.</h1>
        <p className="cs-body mt-3 opacity-80">
          We logged it. Try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cs-btn cs-btn-light"
          >
            Try again
          </button>
          <a href="/" className="cs-btn cs-btn-secondary">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const OG_IMAGE = "/og-image.png";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Clear Street — Speed, Transparency and Scale for Sophisticated Investors" },
      {
        name: "description",
        content:
          "Clear Street is a cloud-native prime brokerage platform serving hedge funds, family offices, and institutional investors. Clearing, financing, execution, and investment banking on a modern stack.",
      },
      { name: "author", content: "Clear Street" },
      // Open Graph
      { property: "og:site_name", content: "Clear Street" },
      { property: "og:title", content: "Clear Street — Modern prime brokerage for institutional markets" },
      {
        property: "og:description",
        content:
          "Cloud-native prime brokerage and market access for institutional investors.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.clearstreet.io/" },
      {
        property: "og:image",
        content: OG_IMAGE,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Clear Street — Speed, Transparency and Scale for Sophisticated Investors.",
      },
      // Twitter
      {
        name: "twitter:image",
        content: OG_IMAGE,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@ClearStreet" },
      // Theme
      { name: "theme-color", content: "#2e21de" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
      // Each route should define its own canonical URL in its head()
      // function. Root supplies the fallback for the site root only.
      { rel: "canonical", href: "https://www.clearstreet.io/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    // JSON-LD structured data for Organization
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Clear Street",
          url: "https://www.clearstreet.io/",
          logo: "https://www.clearstreet.io/favicon.ico",
          description:
            "Clear Street is a cloud-native prime brokerage platform serving hedge funds, family offices, and institutional investors.",
          foundingDate: "2018",
          address: {
            "@type": "PostalAddress",
            streetAddress: "4 World Trade Center, 150 Greenwich St Floor 45",
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10007",
            addressCountry: "US",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-646-845-0036",
            contactType: "customer service",
          },
          sameAs: [
            "https://www.linkedin.com/company/clear-street",
            "https://www.youtube.com/@ClearStreet",
            "https://github.com/clear-street",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Every scroll reveal hides its content behind a CSS
            `opacity: 0` until IntersectionObserver adds `.is-in`. With
            JS unavailable that class never arrives and the page renders
            blank below the hero, so neutralise the hidden state. */}
        <noscript>
          <style>{`
            .cs-reveal, .cs-stagger-item, .cs-word-reveal,
            .cs-scroll-chevron, .cs-scroll-chevron span {
              opacity: 1 !important;
              transform: none !important;
              clip-path: none !important;
            }
            .cs-marquee-track { animation: none !important; }
          `}</style>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

type NavItem = { label: string; to?: string; href?: string };

/**
 * Single source of truth for site navigation.
 *
 * The header dropdowns and the footer columns used to be two separate
 * hand-maintained copies of the same information architecture, which is
 * how the footer and the nav drift out of sync. The header renders the
 * first four groups; the footer renders `footerGroups` below.
 */
const navGroups: { id: string; label: string; items: NavItem[] }[] = [
  {
    id: "clients",
    label: "Clients",
    items: [
      { label: "Traders", to: "/clients" },
      { label: "Family offices", to: "/clients" },
      { label: "Hedge funds", to: "/clients" },
      { label: "ETF issuers", to: "/clients" },
      { label: "Broker-dealers", to: "/clients" },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      { label: "Overview", to: "/services" },
      { label: "Clearing", to: "/services/clearing" },
      { label: "Financing", to: "/services/financing" },
      { label: "Execution and trading", to: "/services/execution-trading" },
      { label: "Investment banking", to: "/services/investment-banking" },
      { label: "Active trading", to: "/services/active-trading" },
    ],
  },
  {
    id: "company",
    label: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    items: [
      { label: "News", to: "/news" },
      { label: "Clear Street Studio", to: "/studio" },
    ],
  },
];

/** Footer column order differs from header order, so it names its sources. */
const footerGroups = [
  navGroups[2],
  navGroups[0],
  navGroups[1],
  {
    id: "other",
    label: "Other",
    items: [
      { label: "News", to: "/news" },
      { label: "Clear Street Studio", to: "/studio" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

function DropdownNav({
  id,
  label,
  items,
  openDropdown,
  setOpenDropdown,
}: {
  id: string;
  label: string;
  items: NavItem[];
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = openDropdown === id;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, setOpenDropdown]);

  // Escape closes and returns focus to the trigger; arrows walk the menu.
  // Without this the dropdown was mouse-only — the `aria-expanded`
  // state it announced was not reachable by keyboard.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpenDropdown(id);
      requestAnimationFrame(() => itemRefs.current[0]?.focus());
      return;
    }
    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpenDropdown(null);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      itemRefs.current[1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const first = itemRefs.current[0];
      if (document.activeElement === first) triggerRef.current?.focus();
      else itemRefs.current[0]?.focus();
    }
  };

  return (
    <div ref={ref} className="relative" onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => setOpenDropdown(isOpen ? null : id)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="cs-nav-link inline-flex items-center gap-1"
      >
        {label}
        <svg
          aria-hidden
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute left-0 top-full mt-2 min-w-[210px] rounded-xl border border-white/10 bg-primary/95 p-2 shadow-2xl backdrop-blur-xl">
          {items.map((item, i) =>
            item.to ? (
              <li key={item.label}>
                <Link
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  to={item.to}
                  className="block rounded-lg px-4 py-2.5 font-sans text-[14px] text-[color:var(--on-brand)] transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label}>
                <a
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={item.href}
                  rel="external nofollow noopener"
                  target="_blank"
                  className="block rounded-lg px-4 py-2.5 font-sans text-[14px] text-[color:var(--on-brand)] transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

const loginLinks: { label: string; href: string }[] = [
  { label: "Research Portal", href: "https://clearstreet-portal.bluematrix.com/" },
  { label: "Clear Street Studio™", href: "https://studio.clearstreet.io/" },
];

function LoginDropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Login"
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-sans text-xs font-medium text-white transition-all hover:bg-white/20"
      >
        Login
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[220px] rounded-xl border border-white/10 bg-primary/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {loginLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              rel="external nofollow noopener"
              target="_blank"
              className="block rounded-lg px-4 py-2.5 font-sans text-[14px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  useEffect(() => {
    return router.subscribe("onBeforeLoad", () => setMobileOpen(false));
  }, [router]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-8">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/30 bg-white/20 px-5 shadow-2xl backdrop-blur-2xl">
        {/* Logo — mark only on narrow screens, full wordmark from sm up */}
        <Link to="/" className="flex shrink-0 items-center gap-2 text-white">
          <span className="sm:hidden">
            <ClearStreetLogo variant="white" showText={false} />
          </span>
          <span className="hidden sm:inline-flex">
            <ClearStreetLogo variant="white" showText={true} />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navGroups.map((g) => (
            <DropdownNav
              key={g.id}
              id={g.id}
              label={g.label}
              items={g.items}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LoginDropdown />

          {/* One label for the contact intent, matching the hero and
              every CTA section. The site previously used four
              different labels for /contact. */}
          <Link
            to="/contact"
            className="hidden rounded-full bg-[#2E21DE] px-4 py-2 font-sans text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#2518c9] sm:inline-flex"
          >
            Talk to our team
          </Link>

          <button
            ref={mobileToggleRef}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="cs-mobile-menu-enter mx-auto mt-3 max-w-lg rounded-2xl border border-white/20 bg-[#01001f]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMobileOpen(false);
              mobileToggleRef.current?.focus();
            }
          }}
        >
          <nav aria-label="Mobile">
            {navGroups.map((g) => (
              <div key={g.id} className="mb-3">
                <p className="cs-label-sm mb-2 px-3 uppercase text-[color:var(--on-brand-muted)]">
                  {g.label}
                </p>
                <ul className="space-y-1">
                  {g.items.map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link
                          to={item.to}
                          className="block rounded-lg px-3 py-2 font-sans text-sm text-[color:var(--on-brand)] transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          rel="external nofollow noopener"
                          target="_blank"
                          className="block rounded-lg px-3 py-2 font-sans text-sm text-[color:var(--on-brand)] transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="mt-3 border-t border-white/10 pt-3">
            <Link to="/contact" className="cs-btn cs-btn-light w-full">
              Talk to our team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#DAD7FF] px-4 pb-10 pt-16 text-[#01001F] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr_1fr]">
          <div>
            <p className="font-sans text-sm font-medium">Get Started</p>
            <a
              href="https://app.clearstreet.io/public/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn cs-btn-primary mt-4 inline-flex"
            >
              Login
            </a>
            <ul className="mt-8 flex items-center gap-4">
              <li>
                <a
                  href="https://www.linkedin.com/company/clear-street"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Clear Street on LinkedIn"
                  className="block text-[color:var(--ink-faint)] transition-colors hover:text-[#01001F]"
                >
                  <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ClearStreet"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Clear Street on YouTube"
                  className="block text-[color:var(--ink-faint)] transition-colors hover:text-[#01001F]"
                >
                  <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/clear-street"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Clear Street on GitHub"
                  className="block text-[color:var(--ink-faint)] transition-colors hover:text-[#01001F]"
                >
                  <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((g) => (
              <FooterCol key={g.id} label={g.label} items={g.items} />
            ))}
          </nav>

          <div>
            <p className="font-sans text-sm font-medium">Address</p>
            <address className="mt-3 font-sans text-sm not-italic leading-relaxed text-[color:var(--ink-soft)]">
              4 World Trade Center<br />
              150 Greenwich St Floor 45<br />
              New York, NY 10007<br />
              (646) 845-0036
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-[#01001F]/10 pt-8">
          <ul className="flex flex-wrap gap-4 text-sm">
            {[
              { label: "Regulatory disclosures", to: "/legal/regulatory-disclosures" },
              { label: "Privacy notice", to: "/legal/privacy-notice" },
              { label: "Security", to: "/legal/security" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[color:var(--ink-soft)] transition-colors hover:text-[#01001F]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 font-sans text-xs leading-relaxed text-[color:var(--ink-faint)]">
            <p>
              Products and services are offered by Clear Street LLC as a Broker Dealer member
              FINRA and SIPC and a Futures Commission Merchant registered with the CFTC and
              member of NFA.
            </p>
            <p>
              Clear Street UK Limited is authorised and regulated in the United Kingdom by the
              Financial Conduct Authority and is a Category 1 member of the London Metals
              Exchange.
            </p>
            <p>
              Additional information about Clear Street LLC is available on{" "}
              <a
                href="https://brokercheck.finra.org/firm/summary/288933"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                FINRA BrokerCheck
              </a>
              , including its Customer Relationship Summary and{" "}
              <a
                href="https://www.nfa.futures.org/basicnet/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                NFA BASIC
              </a>
              .
            </p>
          </div>
          <p className="mt-4 font-sans text-xs text-[color:var(--ink-faint)]">
            Copyright © {new Date().getFullYear()} Clear Street LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div>
      {/* h2 rather than h4 — these column headings follow h2 sections,
          and jumping to h4 skipped a level for screen reader users. */}
      <h2 className="mb-4 font-sans text-sm font-medium">{label}</h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="cs-link-underline font-sans text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[#01001F]"
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="external nofollow noopener"
                className="cs-link-underline font-sans text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[#01001F]"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cs-cookies")) setVisible(true);
    } catch {
      // Storage can throw in private-mode or with cookies blocked. The
      // banner simply stays hidden rather than breaking the page.
    }
  }, []);

  if (!visible) return null;

  const dismiss = (v: string) => {
    try {
      localStorage.setItem("cs-cookies", v);
    } catch {
      // Dismissal just won't persist; hiding it for this view is fine.
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-8"
    >
      {/* Dark surface rather than the previous white card. A white
          banner floating over the indigo page was a second light
          inversion competing with the footer, and it needed inline
          style overrides to keep its buttons legible. */}
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/20 bg-[#01001f]/95 p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <p className="cs-label text-[color:var(--on-brand)] md:max-w-2xl">
          We use cookies to improve site performance, analyse traffic, and personalise
          content. See our{" "}
          <Link to="/legal/privacy-notice" className="underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => dismiss("declined")} className="cs-btn cs-btn-secondary">
            Decline
          </button>
          <button onClick={() => dismiss("accepted")} className="cs-btn cs-btn-light">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <SmoothScroll>
        <ScrollProgress />
        <div className="min-h-screen bg-primary text-white">
          <a href="#main" className="cs-skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1}>
            <Outlet />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
