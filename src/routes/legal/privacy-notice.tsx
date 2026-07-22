import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowLeft } from "lucide-react";

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
    <div className="px-4 sm:px-8">
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
        <FadeInSection>
          <div className="mx-auto max-w-7xl">
            <Link to="/" className="cs-label-sm mb-8 inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
            <h1 className="cs-display mt-4 text-white">Privacy Notice</h1>
            <p className="cs-body-lg mt-4 max-w-3xl text-white/60">
              Last updated: January 2025
            </p>
            <p className="cs-body mt-4 max-w-3xl text-white/60">
              Clear Street LLC ("Clear Street," "we," "us," or "our") is committed to protecting 
              the privacy and confidentiality of personal information we collect from our clients, 
              website visitors, and other individuals.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="mx-auto max-w-3xl pb-24">
        <FadeInSection>
          <div className="space-y-10 text-white/80">
            <div>
              <h2 className="cs-h3 mb-4 text-white">Information We Collect</h2>
              <p className="cs-body leading-relaxed">
                We collect information necessary to open, maintain, and administer accounts, 
                comply with regulatory requirements, and provide services. This may include 
                personal identification information, financial information, employment details, 
                and transactional data.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">How We Use Information</h2>
              <p className="cs-body leading-relaxed">
                We use the information we collect to process transactions, provide client 
                support, comply with legal and regulatory obligations, prevent fraud, and 
                improve our services. We do not sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Information Sharing</h2>
              <p className="cs-body leading-relaxed">
                We may share information with affiliates, service providers, regulators, 
                and as required by law. We require third parties to maintain appropriate 
                confidentiality and security measures consistent with our policies.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Data Security</h2>
              <p className="cs-body leading-relaxed">
                We maintain physical, electronic, and procedural safeguards to protect 
                your personal information. These measures are regularly reviewed and 
                updated to address emerging threats and regulatory requirements.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Cookies and Tracking</h2>
              <p className="cs-body leading-relaxed">
                Our website uses cookies and similar technologies to enhance user experience, 
                analyze site traffic, and support our marketing efforts. You can manage your 
                cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Your Rights</h2>
              <p className="cs-body leading-relaxed">
                Depending on your jurisdiction, you may have rights regarding your personal 
                information, including the right to access, correct, delete, or restrict 
                processing. To exercise these rights, please contact us as described below.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Contact</h2>
              <p className="cs-body leading-relaxed">
                For questions about this Privacy Notice or our data practices, please contact 
                us at privacy@clearstreet.io or write to Clear Street LLC, 285 Lafayette Street, 
                Floor 5, New York, NY 10012.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
