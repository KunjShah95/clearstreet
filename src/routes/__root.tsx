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
      // Each route should define its own canonical URL in its head() function
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

type DropdownItem = { label: string; to?: string; href?: string };

const dropdowns: Record<string, { label: string; items: DropdownItem[] }> = {
  clients: {
    label: "Clients",
    items: [
      { label: "Traders", to: "/clients" },
      { label: "Family Offices", to: "/clients" },
      { label: "Hedge Funds", to: "/clients" },
      { label: "ETF Issuers", to: "/clients" },
      { label: "Broker-Dealers", to: "/clients" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { label: "Services Overview", to: "/services" },
      { label: "Clearing", to: "/services/clearing" },
      { label: "Financing", to: "/services/financing" },
      { label: "Execution & Trading", to: "/services/execution-trading" },
      { label: "Investment Banking", to: "/services/investment-banking" },
      { label: "Active Trading", to: "/services/active-trading" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
    ],
  },
  insights: {
    label: "Insights",
    items: [
      { label: "News & Content", to: "/news" },
      { label: "Clear Street Studio", to: "/studio" },
      { label: "Research Portal", href: "https://clearstreet-portal.bluematrix.com/" },
    ],
  },
};

function DropdownNav({
  id,
  label,
  items,
  openDropdown,
  setOpenDropdown,
}: {
  id: string;
  label: string;
  items: DropdownItem[];
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = openDropdown === id;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, setOpenDropdown]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : id)}
        className="cs-nav-link inline-flex items-center gap-1"
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 min-w-[200px] rounded-xl border border-white/10 bg-primary/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="block rounded-lg px-4 py-2.5 font-sans text-[14px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setOpenDropdown(null)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href || "#"}
                className="block rounded-lg px-4 py-2.5 font-sans text-[14px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </div>
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

  const router = useRouter();
  useEffect(() => {
    return router.subscribe("onBeforeLoad", () => setMobileOpen(false));
  }, [router]);

  return (
    <header className="fixed top-4 z-50 px-4 sm:px-8 left-0 right-0">
      {/* Floating Centered Pill Navbar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/30 bg-white/20 px-5 py-2 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Logo — mark only on narrow screens, full wordmark from sm up */}
        <Link to="/" className="flex items-center gap-2 text-white shrink-0">
          <span className="sm:hidden">
            <ClearStreetLogo variant="white" showText={false} />
          </span>
          <span className="hidden sm:inline-flex">
            <ClearStreetLogo variant="white" showText={true} />
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {Object.entries(dropdowns).map(([id, dd]) => (
            <DropdownNav
              key={id}
              id={id}
              label={dd.label}
              items={dd.items}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
          <Link
            to="/studio"
            className="rounded-full px-3.5 py-1.5 font-sans text-xs font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            Clear Street Studio
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <LoginDropdown />

          <Link
            to="/contact"
            className="hidden rounded-full bg-[#2E21DE] px-4 py-1.5 font-sans text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-[#2518c9] sm:inline-flex"
          >
            Get in touch
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* No floating accessibility icon — removed per user request */}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="cs-mobile-menu-enter mx-auto mt-3 max-w-lg rounded-2xl border border-white/20 bg-[#01001f]/95 p-4 backdrop-blur-2xl lg:hidden shadow-2xl">
          {Object.entries(dropdowns).map(([id, dd]) => (
            <div key={id} className="mb-3">
              <p className="cs-label-sm mb-2 px-3 uppercase opacity-60">{dd.label}</p>
              <div className="space-y-1">
                {dd.items.map((item) =>
                  item.to ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block rounded-lg px-3 py-2 font-sans text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href || "#"}
                      className="block rounded-lg px-3 py-2 font-sans text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
          <div className="mt-3 border-t border-white/10 pt-3">
            <Link to="/contact" className="cs-btn cs-btn-primary w-full text-center cs-pulse-ring">
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-0 bg-[#DAD7FF] px-4 pb-10 pt-16 text-[#01001F] sm:px-8">
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
            <div className="mt-8 flex items-center gap-4">
              <a href="https://www.linkedin.com/company/clear-street" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#01001F]/60 hover:text-[#01001F] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ClearStreet" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#01001F]/60 hover:text-[#01001F] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://github.com/clear-street" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#01001F]/60 hover:text-[#01001F] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterCol heading="Company" />
            <FooterCol heading="Clients" />
            <FooterCol heading="Services" />
            <FooterCol heading="Other" />
          </div>

          <div>
            <p className="font-sans text-sm font-medium">Address</p>
            <p className="mt-3 font-sans text-sm leading-relaxed opacity-80">
              4 World Trade Center<br />
              150 Greenwich St Floor 45<br />
              New York, NY 10007<br />
              (646) 845-0036
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-[#01001F]/10 pt-8">
          <div className="flex flex-wrap gap-4 text-sm opacity-70">
            <Link to="/legal/regulatory-disclosures">Regulatory Disclosures</Link>
            <Link to="/legal/privacy-notice">Privacy Notice</Link>
            <Link to="/legal/security">Security</Link>
          </div>
          <p className="mt-6 font-sans text-xs leading-relaxed opacity-60">
            Products and services are offered by Clear Street LLC as a Broker Dealer member FINRA and SIPC
            and a Futures Commission Merchant registered with the CFTC and member of NFA.
          </p>
          <p className="mt-2 font-sans text-xs leading-relaxed opacity-60">
            Clear Street UK Limited is authorised and regulated in the United Kingdom by the Financial
            Conduct Authority and is a Category 1 member of the London Metals Exchange.
          </p>
          <p className="mt-2 font-sans text-xs leading-relaxed opacity-60">
            Additional information about Clear Street LLC is available on{" "}
            <a href="https://brokercheck.finra.org/firm/summary/288933" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-100">
              FINRA BrokerCheck
            </a>
            , including its Customer Relationship Summary and{" "}
            <a href="https://www.nfa.futures.org/basicnet/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-100">
              NFA BASIC
            </a>.
          </p>
          <p className="mt-4 font-sans text-xs opacity-50">
            Copyright © {new Date().getFullYear()} Clear Street LLC. All rights reserved. Made by Büro.
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Company: [
    { label: "About", to: "/about" },
    { label: "Careers", to: "/careers" },
  ],
  Clients: [
    { label: "Traders", to: "/clients" },
    { label: "Family Offices", to: "/clients" },
    { label: "Hedge Funds", to: "/clients" },
    { label: "ETF Issuers", to: "/clients" },
    { label: "Broker-Dealers", to: "/clients" },
  ],
  Services: [
    { label: "Services Overview", to: "/services" },
    { label: "Clearing", to: "/services/clearing" },
    { label: "Financing", to: "/services/financing" },
    { label: "Execution & Trading", to: "/services/execution-trading" },
    { label: "Investment Banking", to: "/services/investment-banking" },
    { label: "Active Trading", to: "/services/active-trading" },
  ],
  Other: [
    { label: "News & Content", to: "/news" },
    { label: "Clear Street Studio", to: "/studio" },
  ],
};

function FooterCol({ heading }: { heading: string }) {
  const items = footerLinks[heading] || [];
  return (
    <div>
      <h4 className="mb-4 font-sans text-sm font-medium">{heading}</h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.to} className="font-sans text-sm opacity-80 hover:opacity-100 cs-link-underline">
              {item.label}
            </Link>
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
    } catch {}
  }, []);

  if (!visible) return null;

  const dismiss = (v: string) => {
    try {
      localStorage.setItem("cs-cookies", v);
    } catch {}
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-8">
      <div className="cs-surface mx-auto flex max-w-4xl flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <p className="cs-label text-[color:var(--on-surface)] md:max-w-2xl">
          We use cookies to improve site performance, analyze traffic, and personalize
          content. See our{" "}
          <a href="#" className="underline underline-offset-2">
            cookie policy
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dismiss("declined")}
            className="cs-btn cs-btn-secondary"
            style={{ color: "#01001F", borderColor: "#D7D9E7" }}
          >
            Decline
          </button>
          <button onClick={() => dismiss("accepted")} className="cs-btn cs-btn-primary">
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
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
