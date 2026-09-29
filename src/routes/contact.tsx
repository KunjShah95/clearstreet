import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { FadeInSection, Stagger, StaggerItem } from "../components/fade-in-section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Clear Street" },
      {
        name: "description",
        content:
          "Talk to Clear Street about prime brokerage, clearing, execution, investment banking, or partnerships.",
      },
      { property: "og:title", content: "Contact — Clear Street" },
      {
        property: "og:description",
        content: "Reach out to Clear Street sales, client services, or partnerships.",
      },
    ],
  }),
  component: Contact,
});

const interests = [
  "Clearing",
  "Financing",
  "Execution & Trading",
  "Investment Banking",
  "Active Trading",
  "Partnerships",
  "Careers",
];

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 pt-20 sm:px-8 sm:pt-28 md:grid-cols-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/10 blur-[100px]" />
      </div>

      <div className="relative md:col-span-5">
        <p
          className="cs-eyebrow animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDuration: "0.6s", animationFillMode: "both" }}
        >
          Contact
        </p>
        <h1
          className="cs-h1 mt-6 text-white animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          Let&rsquo;s talk.
        </h1>
        <p
          className="cs-body-lg mt-6 max-w-lg animate-in text-[color:var(--on-brand)] fade-in slide-in-from-bottom-3"
          style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
        >
          Tell us about your firm and where you would like to start. A member of our team will
          follow up within one business day.
        </p>

        <Stagger className="mt-16 space-y-10">
          <StaggerItem>
            <ContactBlock
              label="Sales"
              value="sales@clearstreet.io"
              href="mailto:sales@clearstreet.io"
              note="Prime brokerage, clearing, and execution inquiries."
            />
          </StaggerItem>
          <StaggerItem>
            <ContactBlock
              label="Client services"
              value="support@clearstreet.io"
              href="mailto:support@clearstreet.io"
              note="Existing clients, 24/7 coverage."
            />
          </StaggerItem>
          <StaggerItem>
            <ContactBlock
              label="Careers"
              value="careers@clearstreet.io"
              href="mailto:careers@clearstreet.io"
              note="Join a team rebuilding capital markets infrastructure."
            />
          </StaggerItem>
          <StaggerItem>
            <ContactBlock
              label="Headquarters"
              value="4 World Trade Center, New York, NY"
              note="Additional offices in London, Tel Aviv, Singapore, and Bangalore."
            />
          </StaggerItem>
        </Stagger>
      </div>

      <FadeInSection delay={0.2} className="relative md:col-span-6 md:col-start-7">
        <div className="rounded-2xl border border-white/10 bg-[#01001f] p-8 md:p-10">
          {submitted ? (
            <div className="py-12 text-center" role="status" aria-live="polite">
              <h2 className="cs-h3 text-white">Thanks, we will be in touch.</h2>
              <p className="cs-body mt-4 text-[color:var(--on-brand)]">
                A member of our team will reach out shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <h2 className="cs-h4 text-white">Request an intro</h2>
              <Field label="Full name" name="name">
                <input
                  id="name"
                  name="name"
                  required
                  className="cs-input"
                  placeholder="Full name"
                  autoComplete="name"
                />
              </Field>
              <Field label="Work email" name="email">
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  className="cs-input"
                  placeholder="you@firm.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Firm" name="firm">
                <input
                  id="firm"
                  name="firm"
                  required
                  className="cs-input"
                  placeholder="Firm name"
                  autoComplete="organization"
                />
              </Field>
              {/* The select previously had no name, no id and no
                  autocomplete, so the control existed only visually and
                  nothing about the submission could be attributed to it.
                  It also inherited `cs-input`'s pill shape, which is wrong
                  for a control with a dropdown affordance. */}
              <Field label="Interest" name="interest">
                <select id="interest" name="interest" className="cs-input cs-select" defaultValue="Clearing">
                  {interests.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </Field>
              <Field label="Message" name="message">
                <textarea
                  id="message"
                  name="message"
                  className="cs-input"
                  style={{ height: "auto", minHeight: 96, borderRadius: 16, padding: "12px 18px" }}
                  placeholder="Tell us a bit about your firm and what you are looking for."
                />
              </Field>
              <button type="submit" className="cs-btn cs-btn-light w-full">
                Send message
              </button>
              <p className="cs-label-sm text-[color:var(--on-brand-muted)]">
                By submitting, you agree to our{" "}
                <Link to="/legal/privacy-notice" className="cs-link-underline">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </FadeInSection>
    </div>
  );
}

/** Labels are associated by id rather than by wrapping the control. The
 *  wrapper approach made the accessible name depend on the whole label
 *  subtree, so a control that later gained a hint or an error would
 *  silently change what screen readers announce. */
function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="cs-label-sm mb-2 block uppercase text-[color:var(--on-brand-muted)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactBlock({
  label,
  value,
  href,
  note,
}: {
  label: string;
  value: string;
  href?: string;
  note: string;
}) {
  return (
    <div>
      <p className="cs-label-sm uppercase text-[color:var(--on-brand-muted)]">{label}</p>
      {href ? (
        <a href={href} className="cs-h4 cs-link-underline mt-2 inline-block text-white">
          {value}
        </a>
      ) : (
        <p className="cs-h4 mt-2 text-white">{value}</p>
      )}
      <p className="cs-label mt-1 text-[color:var(--on-brand)]">{note}</p>
    </div>
  );
}
