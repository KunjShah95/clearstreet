import { createFileRoute } from "@tanstack/react-router";
import { Shield, Clock, BarChart3, Globe } from "lucide-react";
import {
  ServiceHero,
  ServiceCapabilities,
  ServiceDetailPanel,
  ServiceCta,
} from "../../components/service-page";

export const Route = createFileRoute("/services/clearing")({
  head: () => ({
    meta: [
      { title: "Clearing — Clear Street" },
      {
        name: "description",
        content:
          "Real-time visibility into balances, collateral, and exposures across US equities, listed options, and futures on a single unified clearing platform.",
      },
    ],
  }),
  component: Clearing,
});

const features = [
  {
    icon: Shield,
    title: "Real-Time Risk & Margin",
    description:
      "Continuous intraday risk alignment across equities, options, and futures. Margin calculations update in real-time, not overnight.",
  },
  {
    icon: Clock,
    title: "Sub-Millisecond Processing",
    description:
      "Cloud-native core ledger processes millions of trades with sub-millisecond precision. No batch cycles, no end-of-day surprises.",
  },
  {
    icon: BarChart3,
    title: "Flexible Pricing & Terms",
    description:
      "Transparent passthrough fee structures with flexible capital terms. No hidden costs, no black-box pricing.",
  },
  {
    icon: Globe,
    title: "Rapid Product Integration",
    description:
      "Quick onboarding for new exchanges and products. Our API-first infrastructure means faster time-to-market for new asset classes.",
  },
];

const details = [
  "Eliminate multi-vendor reconciliation with a single unified ledger",
  "Reduce capital requirements with cross-product netting",
  "Real-time settlement status across all asset classes",
  "Automated regulatory reporting (SEC, FINRA, CFTC)",
  "Dedicated clearing specialists with deep market expertise",
  "Seamless integration with Clear Street financing and execution",
];

function Clearing() {
  return (
    <>
      <ServiceHero
        name="Clearing"
        title="Unified clearing for a fragmented market."
        lede="Real-time visibility into balances, collateral, and exposures across US equities, listed options, and futures — all on a single unified clearing platform."
      />
      <ServiceCapabilities
        eyebrow="Platform capabilities"
        title="Engineered for institutional clearing."
        features={features}
      />
      <ServiceDetailPanel
        eyebrow="Why clients choose us"
        title="Clearing built for today's markets."
        items={details}
      />
      <ServiceCta
        title="Ready to transform your clearing operations?"
        body="Schedule a conversation with our team to learn more about Clear Street's clearing platform."
        secondary={{ label: "All services", to: "/services" }}
      />
    </>
  );
}
