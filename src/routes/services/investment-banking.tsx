import { createFileRoute } from "@tanstack/react-router";
import { Building2, LineChart, Handshake, Globe } from "lucide-react";
import {
  ServiceHero,
  ServiceCapabilities,
  ServiceDetailPanel,
  ServiceCta,
} from "../../components/service-page";

export const Route = createFileRoute("/services/investment-banking")({
  head: () => ({
    meta: [
      { title: "Investment Banking — Clear Street" },
      {
        name: "description",
        content:
          "Strategic advisory and capital markets services including capital raising, private placements, IPOs, and strategic execution for growth-stage companies.",
      },
    ],
  }),
  component: InvestmentBanking,
});

const features = [
  {
    icon: Building2,
    title: "Capital Raising",
    description:
      "Senior-level guidance on equity and debt financing, including PIPEs, registered directs, and confidentially marketed offerings.",
  },
  {
    icon: LineChart,
    title: "Strategic Advisory",
    description:
      "M&A advisory, corporate strategy, and capital structure optimization for founders, executives, and boards.",
  },
  {
    icon: Handshake,
    title: "Private Placements",
    description:
      "Execution and distribution across institutional investor networks for private and public companies.",
  },
  {
    icon: Globe,
    title: "IPO & Listing Advisory",
    description:
      "End-to-end support for public listings, including pre-IPO planning, underwriter selection, and regulatory compliance.",
  },
];

const differentiators = [
  "Senior attention from experienced market practitioners, not junior bankers",
  "Full lifecycle support from inception through execution and settlement",
  "Deep institutional investor relationships across hedge funds, pensions, and family offices",
  "Integrated execution through Clear Street's broker-dealer infrastructure",
  "Proprietary data and analytics for pricing, timing, and structuring decisions",
];

function InvestmentBanking() {
  return (
    <>
      <ServiceHero
        name="Investment Banking"
        title="Strategic advisory for growth-stage companies."
        lede="Capital markets advisory, private placements, and strategic execution from senior-level practitioners who understand the full lifecycle of a trade."
        primaryLabel="Request an introduction"
      />
      <ServiceCapabilities
        eyebrow="Platform capabilities"
        title="Senior-level guidance at every stage."
        features={features}
      />
      <ServiceDetailPanel
        eyebrow="Why Clear Street"
        title="Advisory that understands the full trade lifecycle."
        items={differentiators}
      />
      <ServiceCta
        title="Discuss your capital strategy with our team."
        body="Reach out to our investment banking team for a confidential discussion."
        secondary={{ label: "All services", to: "/services" }}
      />
    </>
  );
}
