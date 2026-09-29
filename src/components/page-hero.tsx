import { type ReactNode } from "react";

/**
 * The single hero used by every page below `/`.
 *
 * This existed as nine hand-copied `<section>` blocks — services/index,
 * the five service pages, careers, clients, studio, contact. They had
 * drifted apart: some constrained their copy to `max-w-7xl` and some
 * (careers) did not, so that headline ran full-bleed to the viewport
 * edge while every other page held the measure. Heading scale, vertical
 * rhythm, entrance timing and the eyebrow treatment all varied too.
 *
 * One component means the drift can't come back. `max-w-7xl` lives here
 * so a page physically cannot opt out of it.
 */

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  children,
  tone = "gradient",
  backdrop,
}: {
  /** Small uppercase label above the headline. Omit it where the
   *  headline already says the same thing — the site budgets roughly one
   *  eyebrow per three sections. */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  /** Secondary content below the CTA row: a data panel, a stat strip. */
  children?: ReactNode;
  /** `gradient` for a flat brand field, `orb` for a softer blurred glow. */
  tone?: "gradient" | "orb";
  /** Extra decorative layers behind the copy, drawn under the tone.
   *  Some pages had a distinctive hero treatment — a photographic
   *  field, slowly rotating rings — that the shared component would
   *  otherwise flatten away. This slot keeps that expressible without
   *  giving each page its own `<section>` again. */
  backdrop?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {tone === "gradient" ? (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/85 to-primary" />
        ) : (
          <>
            <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#3b29e0]/10 blur-[120px]" />
            <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/5 blur-[100px]" />
          </>
        )}
        {backdrop}
      </div>

      <div className="relative mx-auto max-w-7xl pb-20">
        {eyebrow ? (
          <p
            className="cs-eyebrow animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDuration: "0.6s", animationFillMode: "both" }}
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          className="cs-h1 mt-6 max-w-4xl animate-in text-white fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          {title}
        </h1>

        {lede ? (
          <p
            className="cs-body-lg mt-8 max-w-2xl animate-in text-[color:var(--on-brand)] fade-in slide-in-from-bottom-3"
            style={{
              animationDuration: "0.8s",
              animationDelay: "0.18s",
              animationFillMode: "both",
            }}
          >
            {lede}
          </p>
        ) : null}

        {actions ? (
          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-3"
            style={{
              animationDuration: "0.8s",
              animationDelay: "0.28s",
              animationFillMode: "both",
            }}
          >
            {actions}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
