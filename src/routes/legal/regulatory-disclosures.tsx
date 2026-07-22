import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/legal/regulatory-disclosures")({
  head: () => ({
    meta: [
      { title: "Regulatory Disclosures — Clear Street" },
      {
        name: "description",
        content:
          "Regulatory disclosures and legal information for Clear Street LLC, member FINRA and SIPC.",
      },
    ],
  }),
  component: RegulatoryDisclosures,
});

export function RegulatoryDisclosures() {
  return (
    <div className="px-4 sm:px-8">
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
        <FadeInSection>
          <div className="mx-auto max-w-7xl">
            <Link to="/" className="cs-label-sm mb-8 inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
            <h1 className="cs-display mt-4 text-white">Regulatory Disclosures</h1>
            <p className="cs-body-lg mt-4 max-w-3xl text-white/60">
              Clear Street LLC is a registered broker-dealer and member of FINRA and SIPC. 
              The following disclosures contain important regulatory information about our 
              business and services.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="mx-auto max-w-3xl pb-24">
        <FadeInSection>
          <div className="space-y-10 text-white/80">
            <div>
              <h2 className="cs-h3 mb-4 text-white">Disclosure</h2>
              <p className="cs-body leading-relaxed">
                Clear Street LLC ("Clear Street") is a broker-dealer registered with the U.S. Securities 
                and Exchange Commission (SEC) and is a member of the Financial Industry Regulatory 
                Authority (FINRA) and the Securities Investor Protection Corporation (SIPC).
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">SIPC Information</h2>
              <p className="cs-body leading-relaxed">
                Securities in your account are protected up to $500,000 (including $250,000 for 
                claims for cash). An explanatory brochure is available upon request or at 
                www.sipc.org.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">FINRA BrokerCheck</h2>
              <p className="cs-body leading-relaxed">
                FINRA's BrokerCheck program provides information about Clear Street LLC and its 
                associated persons. You may obtain this information by calling FINRA at 
                (800) 289-9999 or visiting brokercheck.finra.org.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Best Execution</h2>
              <p className="cs-body leading-relaxed">
                Clear Street is committed to providing best execution for all client orders, 
                consistent with applicable regulatory requirements. Our order routing and execution 
                policies are designed to achieve the most favorable terms reasonably available 
                for our clients' orders.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Order Routing Disclosure</h2>
              <p className="cs-body leading-relaxed">
                Upon request, Clear Street will provide a report that summarizes the venues to 
                which customer orders were routed for execution in the most recent calendar quarter. 
                This report is available in accordance with SEC Rule 606.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Margin Disclosure</h2>
              <p className="cs-body leading-relaxed">
                Trading on margin involves significant risk. The possibility exists that you could 
                lose more than your initial deposit. A margin account involves the extension of 
                credit by Clear Street to you and is subject to regulatory requirements and 
                Clear Street's internal policies.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Anti-Money Laundering</h2>
              <p className="cs-body leading-relaxed">
                Clear Street has established and maintains an Anti-Money Laundering (AML) program 
                that complies with the Bank Secrecy Act and all applicable regulations. Our AML 
                program includes policies and procedures for customer identification, transaction 
                monitoring, and reporting suspicious activity.
              </p>
            </div>

            <div>
              <h2 className="cs-h3 mb-4 text-white">Contact</h2>
              <p className="cs-body leading-relaxed">
                For questions regarding any of these disclosures, please contact us at 
                disclosures@clearstreet.io or write to Clear Street LLC, 285 Lafayette Street, 
                Floor 5, New York, NY 10012.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
