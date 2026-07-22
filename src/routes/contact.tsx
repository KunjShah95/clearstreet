import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="px-4 sm:px-8">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 pt-20 sm:pt-28 md:grid-cols-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#3b29e0]/10 blur-[100px]" />
        </div>

        <div className="relative md:col-span-5">
          <p
            className="cs-label-sm uppercase text-white/50 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDuration: "0.6s", animationFillMode: "both" }}
          >
            Contact
          </p>
          <h1
            className="cs-h1 mt-6 text-white animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDuration: "0.8s", animationDelay: "0.08s", animationFillMode: "both" }}
          >
            Let's talk.
          </h1>
          <p
            className="cs-body-lg mt-6 max-w-lg text-white/75 animate-in fade-in slide-in-from-bottom-3"
            style={{ animationDuration: "0.8s", animationDelay: "0.18s", animationFillMode: "both" }}
          >
            Tell us about your firm and where you would like to start. A member of our team
            will follow up within one business day.
          </p>

          <Stagger className="mt-16 space-y-10">
            <StaggerItem>
              <ContactBlock
                label="Sales"
                value="sales@clearstreet.io"
                note="Prime brokerage, clearing, and execution inquiries."
              />
            </StaggerItem>
            <StaggerItem>
              <ContactBlock
                label="Client services"
                value="support@clearstreet.io"
                note="Existing clients, 24/7 coverage."
              />
            </StaggerItem>
            <StaggerItem>
              <ContactBlock
                label="Headquarters"
                value="4 World Trade Center, New York, NY"
                note="Additional offices in London, Tel Aviv, Singapore, and Bangalore."
              />
            </StaggerItem>
            <StaggerItem>
              <ContactBlock
                label="Careers"
                value="careers@clearstreet.io"
                note="Join a team rebuilding capital markets infrastructure."
              />
            </StaggerItem>
          </Stagger>
        </div>

        <FadeInSection delay={0.2} className="relative md:col-span-6 md:col-start-7">
          <div className="rounded-2xl border border-white/10 bg-[#01001f] p-8 md:p-10 shadow-xl backdrop-blur-md">
            {submitted ? (
              <div className="py-12 text-center">
                <h2 className="cs-h3 text-white">Thanks, we will be in touch.</h2>
                <p className="cs-body mt-4 text-white/60">
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
                <Field label="Full name">
                  <input required className="cs-input" placeholder="Full name" />
                </Field>
                <Field label="Work email">
                  <input
                    required
                    type="email"
                    className="cs-input"
                    placeholder="you@firm.com"
                  />
                </Field>
                <Field label="Firm">
                  <input required className="cs-input" placeholder="Firm name" />
                </Field>
                <Field label="Interest">
                  <select className="cs-input" defaultValue="Clearing">
                    <option>Clearing</option>
                    <option>Financing</option>
                    <option>Execution & Trading</option>
                    <option>Investment Banking</option>
                    <option>Active Trading</option>
                    <option>Partnerships</option>
                    <option>Careers</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    className="cs-input"
                    style={{ height: "auto", minHeight: 96, borderRadius: 16, padding: "12px 18px" }}
                    placeholder="Tell us a bit about your firm and what you are looking for."
                  />
                </Field>
                <button type="submit" className="cs-btn cs-btn-light w-full">
                  Send message
                </button>
                <p className="cs-label-sm text-white/40">
                  By submitting, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="cs-label-sm mb-2 block uppercase text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactBlock({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div>
      <p className="cs-label-sm uppercase text-white/40">{label}</p>
      <p className="cs-h4 mt-2 text-white">{value}</p>
      <p className="cs-label mt-1 text-white/60">{note}</p>
    </div>
  );
}
