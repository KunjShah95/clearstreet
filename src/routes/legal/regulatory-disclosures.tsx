import { createFileRoute } from "@tanstack/react-router";
import { LegalHero, LegalProse, LegalClause } from "../../components/legal-page";

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
    <>
      <LegalHero
        title="Regulatory disclosures"
        lede="Clear Street LLC is a registered broker-dealer and member of FINRA and SIPC. The following disclosures contain important regulatory information about our business and services."
      />
      <LegalProse className="mb-24">
        <LegalClause title="Disclosure">
          Clear Street LLC (&ldquo;Clear Street&rdquo;) is a broker-dealer registered with the
          U.S. Securities and Exchange Commission (SEC) and is a member of the Financial
          Industry Regulatory Authority (FINRA) and the Securities Investor Protection
          Corporation (SIPC).
        </LegalClause>

        <LegalClause title="SIPC information">
          Securities in your account are protected up to $500,000 (including $250,000 for claims
          for cash). An explanatory brochure is available upon request or at www.sipc.org.
        </LegalClause>

        <LegalClause title="FINRA BrokerCheck">
          FINRA&rsquo;s BrokerCheck program provides information about Clear Street LLC and its
          associated persons. You may obtain this information by calling FINRA at (800) 289-9999
          or visiting brokercheck.finra.org.
        </LegalClause>

        <LegalClause title="Best execution">
          Clear Street is committed to providing best execution for all client orders,
          consistent with applicable regulatory requirements. Our order routing and execution
          policies are designed to achieve the most favorable terms reasonably available for our
          clients&rsquo; orders.
        </LegalClause>

        <LegalClause title="Order routing disclosure">
          Upon request, Clear Street will provide a report that summarizes the venues to which
          customer orders were routed for execution in the most recent calendar quarter. This
          report is available in accordance with SEC Rule 606.
        </LegalClause>

        <LegalClause title="Margin disclosure">
          Trading on margin involves significant risk. The possibility exists that you could lose
          more than your initial deposit. A margin account involves the extension of credit by
          Clear Street to you and is subject to regulatory requirements and Clear Street&rsquo;s
          internal policies.
        </LegalClause>

        <LegalClause title="Anti-money laundering">
          Clear Street has established and maintains an Anti-Money Laundering (AML) program that
          complies with the Bank Secrecy Act and all applicable regulations. Our AML program
          includes policies and procedures for customer identification, transaction monitoring, and
          reporting suspicious activity.
        </LegalClause>

        <LegalClause title="Contact">
          For questions regarding any of these disclosures, please contact us at{" "}
          <a href="mailto:disclosures@clearstreet.io" className="cs-link-underline">
            disclosures@clearstreet.io
          </a>{" "}
          or write to Clear Street LLC, 285 Lafayette Street, Floor 5, New York, NY 10012.
        </LegalClause>
      </LegalProse>
    </>
  );
}
