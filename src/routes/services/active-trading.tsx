import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, BarChart3, Zap, Users } from "lucide-react";
import {
  ServiceHero,
  ServiceCapabilities,
  ServiceDetailPanel,
  ServiceCta,
} from "../../components/service-page";

export const Route = createFileRoute("/services/active-trading")({
  head: () => ({
    meta: [
      { title: "Active Trading — Clear Street" },
      {
        name: "description",
        content:
          "Professional-grade trading tools for sophisticated individual traders, offering institutional execution quality and competitive pricing.",
      },
    ],
  }),
  component: ActiveTrading,
});

const features = [
  {
    icon: TrendingUp,
    title: "Institutional Execution",
    description:
      "Access the same execution infrastructure used by hedge funds and professional traders. DMA, smart routing, and advanced order types.",
  },
  {
    icon: BarChart3,
    title: "Competitive Pricing",
    description:
      "Transparent, low-cost pricing with no hidden fees. Volume-based discounts for high-frequency and high-notional traders.",
  },
  {
    icon: Zap,
    title: "Modern Platform",
    description:
      "Built for speed and reliability. Real-time P&L, streaming quotes, and one-click trading from a cloud-native interface.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Access to trading professionals who understand your strategies. Real-time assistance when you need it most.",
  },
];

const benefits = [
  "Direct market access to US equities and options exchanges",
  "Advanced order types: iceberg, pegged, trailing stop, and more",
  "Streaming real-time market data with Level 2 depth",
  "Integrated clearing and custody through Clear Street's platform",
  "Dedicated trader support desk available during market hours",
];

function ActiveTrading() {
  return (
    <>
      <ServiceHero
        name="Active Trading"
        title="Professional-grade tools for active traders."
        lede="Designed for sophisticated individual traders who demand institutional execution quality and competitive pricing."
        primaryLabel="Open an account"
      />
      <ServiceCapabilities
        eyebrow="Platform capabilities"
        title="Trade like the institutions."
        features={features}
      />
      <ServiceDetailPanel
        eyebrow="Why active traders choose us"
        title="Built for serious traders."
        items={benefits}
      />
      <ServiceCta
        title="Ready to upgrade your trading experience?"
        body="Open an account and start trading on Clear Street's institutional-grade platform."
        primary={{ label: "Open an account", to: "/contact" }}
        secondary={{ label: "All services", to: "/services" }}
      />
    </>
  );
}
