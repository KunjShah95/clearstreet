import { createFileRoute } from "@tanstack/react-router";
import { LegalHero, LegalProse, LegalClause } from "../../components/legal-page";

export const Route = createFileRoute("/legal/privacy-notice")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — Clear Street" },
      {
        name: "description",
        content:
          "Clear Street's privacy notice explaining how we collect, use, and protect your personal information.",
      },
    ],
  }),
  component: PrivacyNotice,
});

export function PrivacyNotice() {
  return (
    <>
      <LegalHero
        title="Privacy notice"
        lede="Last updated January 2025. Clear Street LLC is committed to protecting the privacy and confidentiality of personal information we collect from our clients, website visitors, and other individuals."
      />
      <LegalProse className="mb-24">
        <LegalClause title="Information we collect">
          We collect information necessary to open, maintain, and administer accounts, comply with
          regulatory requirements, and provide services. This may include personal identification
          information, financial information, employment details, and transactional data.
        </LegalClause>

        <LegalClause title="How we use information">
          We use the information we collect to process transactions, provide client support, comply
          with legal and regulatory obligations, prevent fraud, and improve our services. We do not
          sell your personal information to third parties.
        </LegalClause>

        <LegalClause title="Information sharing">
          We may share information with affiliates, service providers, regulators, and as required
          by law. We require third parties to maintain appropriate confidentiality and security
          measures consistent with our policies.
        </LegalClause>

        <LegalClause title="Data security">
          We maintain physical, electronic, and procedural safeguards to protect your personal
          information. These measures are regularly reviewed and updated to address emerging
          threats and regulatory requirements.
        </LegalClause>

        <LegalClause title="Cookies and tracking">
          Our website uses cookies and similar technologies to enhance user experience, analyze
          site traffic, and support our marketing efforts. You can manage your cookie preferences
          through your browser settings.
        </LegalClause>

        <LegalClause title="Your rights">
          Depending on your jurisdiction, you may have rights regarding your personal information,
          including the right to access, correct, delete, or restrict processing. To exercise
          these rights, please contact us as described below.
        </LegalClause>

        <LegalClause title="Contact">
          For questions about this Privacy Notice or our data practices, please contact us at{" "}
          <a href="mailto:privacy@clearstreet.io" className="cs-link-underline">
            privacy@clearstreet.io
          </a>{" "}
          or write to Clear Street LLC, 285 Lafayette Street, Floor 5, New York, NY 10012.
        </LegalClause>
      </LegalProse>
    </>
  );
}
