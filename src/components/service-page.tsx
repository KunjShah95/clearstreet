import { type ComponentType, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FadeInSection, Stagger, StaggerItem } from "./fade-in-section";
import { PageHero } from "./page-hero";
import { CtaBanner, FeatureCard } from "./page-sections";

/**
 * The layout every `/services/*` detail page shares.
 *
 * These five pages were five near-identical 168-line files — same hero,
 * same four-card capability grid, same dark check-list panel, same CTA.
 * They had already drifted: `rounded-xl` vs `rounded-2xl` on the cards,
 * `CheckCircle2` vs an inline SVG on the tick list, and CTA copy that
 * ranged across "Get in touch" / "Contact us" / "Open an account" /
 * "Register now" for what is the same intent — the site already settled
 * on one label for the contact intent in the header and the homepage.
 *
 * Each page is now data plus, at most, one genuinely page-specific
 * section. Layout and rhythm can only change in one place.
 */

export type ServiceFeature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export function ServiceHero({
  name,
  title,
  lede,
  primaryLabel = "Talk to our team",
  children,
}: {
  name: string;
  title: string;
  lede: string;
  primaryLabel?: string;
  children?: ReactNode;
}) {
  return (
    <PageHero
      eyebrow={`Services / ${name}`}
      title={title}
      lede={lede}
      actions={
        <>
          <Link to="/contact" className="cs-btn cs-btn-light">
            {primaryLabel}
            <ArrowRight className="cs-arrow-slide ml-2 h-4 w-4" />
          </Link>
          <Link to="/services" className="cs-btn cs-btn-secondary">
            All services
          </Link>
        </>
      }
    >
      {children}
    </PageHero>
  );
}

/** Four-up capability grid. Shared by all five service pages. */
export function ServiceCapabilities({
  eyebrow,
  title,
  features,
}: {
  eyebrow?: string;
  title: string;
  features: ServiceFeature[];
}) {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      {eyebrow ? <p className="cs-eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="cs-h2 max-w-3xl text-white">{title}</h2>
      <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <FeatureCard icon={f.icon} title={f.title} description={f.description} />
          </StaggerItem>
        ))}
      </Stagger>
    </FadeInSection>
  );
}

/**
 * Inset dark panel holding a tick list.
 *
 * This is the section that alternated most across the five pages — one
 * used `CheckCircle2`, the rest used an inline `CheckCircle2`-shaped SVG
 * at a different size, and all five ran the list items at a different
 * opacity (`text-white/80` in three, `-sm` in one, and one omitted the
 * `<li>` element entirely so the list had no semantics).
 */
export function ServiceDetailPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: string[];
}) {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        {eyebrow ? <p className="cs-eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className="cs-h2 max-w-3xl text-white">{title}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg
                aria-hidden
                className="mt-1 h-5 w-5 shrink-0 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" opacity="0.35" />
                <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="cs-body text-[color:var(--on-brand)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeInSection>
  );
}

/**
 * Named-product grid inside the dark panel.
 *
 * Financing is the one service page whose third section lists products
 * rather than benefits, so it needs real name/description cards rather
 * than a tick list. This was previously a bespoke block unique to that
 * file, which is why the surrounding section drifted away from the
 * other four pages.
 */
export function ServiceProductGrid({
  eyebrow,
  title,
  products,
}: {
  eyebrow?: string;
  title: string;
  products: { name: string; desc: string }[];
}) {
  return (
    <FadeInSection className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
      <div className="rounded-2xl border border-white/10 bg-[#01001f] px-8 py-14 md:px-14 md:py-16">
        {eyebrow ? <p className="cs-eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className="cs-h2 max-w-3xl text-white">{title}</h2>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((p) => (
            <StaggerItem key={p.name}>
              <div className="h-full rounded-xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-6">
                <h3 className="font-sans text-[17px] font-semibold text-white">{p.name}</h3>
                <p className="cs-body mt-2 text-[color:var(--on-brand)]">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </FadeInSection>
  );
}

export { CtaBanner as ServiceCta };
