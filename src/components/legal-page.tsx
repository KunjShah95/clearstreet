import { type ReactNode } from "react";
import { FadeInSection } from "./fade-in-section";
import { PageHero } from "./page-hero";

/**
 * Layout shared by the three `/legal/*` pages.
 *
 * They were three separate files each carrying an identical hero (a
 * "Back to home" link the fixed header already provides, then a
 * `cs-display` heading roughly twice the size of every other page's
 * h1, then a `text-white/60` lede) and an identical prose column.
 *
 * Two problems came out of that copy-paste:
 *  - the legal h1s used `cs-display` (up to 96px) where the rest of the
 *    site uses `cs-h1`, so a one-word title like "Security" rendered as
 *    a billboard while "Let's talk." on /contact rendered at 70px, and
 *  - the "Back to home" link duplicated the header's Clients / Company
 *    menus and pushed the title down the page for no navigational gain.
 */
export function LegalHero({ title, lede }: { title: string; lede: ReactNode }) {
  return <PageHero eyebrow="Legal" title={title} lede={lede} tone="orb" />;
}

/**
 * Narrow measure for legal prose.
 *
 * Long-form policy text at the site's 7xl marketing measure runs past
 * ~90 characters, which is well beyond the comfortable reading range.
 */
export function LegalProse({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <FadeInSection className={`mx-auto mt-24 max-w-3xl px-4 sm:px-8 ${className}`}>
      <div className="space-y-10">{children}</div>
    </FadeInSection>
  );
}

export function LegalClause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="cs-h3 mb-4 text-white">{title}</h2>
      <div className="cs-body leading-relaxed text-[color:var(--on-brand)]">{children}</div>
    </section>
  );
}
