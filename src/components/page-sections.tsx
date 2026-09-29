import { type ComponentType, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { FadeInSection } from "./fade-in-section";

/** An internal route or an external destination. */
export type CtaAction = { label: string; to: string; href?: string };

function CtaButton({ action, variant }: { action: CtaAction; variant: "light" | "secondary" }) {
  const cls = variant === "light" ? "cs-btn cs-btn-light" : "cs-btn cs-btn-secondary";
  if (action.href) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {action.label}
      </a>
    );
  }
  return (
    <Link to={action.to} className={cls}>
      {action.label}
    </Link>
  );
}

/**
 * The closing CTA, previously copy-pasted into nine pages.
 *
 * Every copy was a variant of the same centred block, and the variants
 * had drifted: some set `pb-24`, some `pb-32`, some `mb-24 mt-32`; the
 * body copy ran at `text-white/70` on one page and `text-white/60` on
 * the next. Centralising it means the last section on every page lands
 * the same distance above the footer.
 */
export function CtaBanner({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  /** The forward action. Defaults to the one contact intent the site
   *  uses everywhere ("Talk to our team"). */
  primary?: CtaAction;
  secondary?: CtaAction;
}) {
  return (
    <FadeInSection className="mx-auto mb-24 mt-32 max-w-7xl px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-10 md:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-primary"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[80px]" />
        </div>

        <div className="relative text-center">
          <h2 className="cs-h2 mx-auto max-w-2xl text-white">{title}</h2>
          <p className="cs-body-lg mx-auto mt-6 max-w-xl text-[color:var(--on-brand)]">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {primary ? (
              <CtaButton action={primary} variant="light" />
            ) : (
              <Link to="/contact" className="cs-btn cs-btn-light">
                Talk to our team
              </Link>
            )}
            {secondary ? <CtaButton action={secondary} variant="secondary" /> : null}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

/**
 * Section shell for the pages below `/`.
 *
 * Two things it enforces that were previously up to each page:
 *  - the `mt-32` rhythm (the inner pages had drifted across `mt-20`,
 *    `mt-24` and `mt-32` for what is the same structural break), and
 *  - `px-4 sm:px-8` on the container, which several pages were applying
 *    once on a page wrapper and others not at all.
 */
export function Section({
  children,
  className = "",
  gap = "md",
}: {
  children: ReactNode;
  className?: string;
  /** Top spacing before the section's first heading. */
  gap?: "sm" | "md" | "lg";
}) {
  const mt = gap === "lg" ? "mt-40" : gap === "sm" ? "mt-24" : "mt-32";
  return (
    <section className={`${mt} px-4 sm:px-8`}>
      <div className={`mx-auto max-w-7xl ${className}`}>{children}</div>
    </section>
  );
}

/**
 * A section heading with an optional eyebrow.
 *
 * The eyebrow is opt-in and off by default. Every inner page had one
 * above nearly every section, which is what gave the site its templated
 * rhythm — the eyebrow and the headline beneath it usually restate the
 * same thing. Pass one only where the label genuinely adds a category
 * the headline doesn't carry.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={className}>
      {eyebrow ? <p className="cs-eyebrow mb-4">{eyebrow}</p> : null}
      <Tag className="cs-h2 max-w-3xl text-white">{title}</Tag>
      {lede ? (
        <p className="cs-body-lg mt-6 max-w-2xl text-[color:var(--on-brand)]">{lede}</p>
      ) : null}
    </div>
  );
}

/**
 * Icon + title + description card.
 *
 * Duplicated across careers, and all five service pages, which had
 * drifted on corner radius (`rounded-xl` vs `rounded-2xl`), icon tile
 * colour (`bg-[#2E21DE]` vs `bg-indigo-500/20`) and body opacity.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-8 transition-colors duration-300 hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#DAD7FF]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="cs-h4 text-white">{title}</h3>
      <p className="cs-body mt-3 text-[color:var(--on-brand)]">{description}</p>
    </div>
  );
}

/** Tick list used for "why clients choose us" blocks. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="cs-body text-[color:var(--on-brand)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}
