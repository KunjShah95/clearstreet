import { createFileRoute } from "@tanstack/react-router";
import { Radio, Target, Zap, Cpu } from "lucide-react";
import {
  ServiceHero,
  ServiceCapabilities,
  ServiceDetailPanel,
  ServiceCta,
} from "../../components/service-page";

export const Route = createFileRoute("/services/execution-trading")({
  head: () => ({
    meta: [
      { title: "Execution & Trading — Clear Street" },
      {
        name: "description",
        content:
          "Multi-asset algorithmic execution with low-latency routing, smart order types, direct market access, and comprehensive algo suite across 50+ exchanges.",
      },
    ],
  }),
  component: ExecutionTrading,
});

const features = [
  {
    icon: Radio,
    title: "Direct Market Access",
    description:
      "Sponsored access and DMA to major global exchanges with ultra-low latency connectivity and colocation options.",
  },
  {
    icon: Target,
    title: "Comprehensive Algo Suite",
    description:
      "VWAP, TWAP, Implementation Shortfall, Smart Routing, and custom algo strategies. Full pre- and post-trade analytics.",
  },
  {
    icon: Zap,
    title: "Low-Latency Infrastructure",
    description:
      "Sub-microsecond order processing with hardware-accelerated tick-to-trade. Colocation at major data centers worldwide.",
  },
  {
    icon: Cpu,
    title: "Multi-Asset Support",
    description:
      "Trade US equities, options, futures, and international equities through a single connection and unified API.",
  },
];

const infrastructure = [
  "Low-latency market data feeds from all major exchanges",
  "FIX 4.2/4.4, REST, and WebSocket protocol support",
  "Smart order routing for best execution across dark and lit pools",
  "Transaction cost analysis (TCA) with full transparency",
  "Pre-trade risk checks and real-time position monitoring",
  "Co-location and proximity hosting available at NJ4, NY4, LD4, and more",
];

function ExecutionTrading() {
  return (
    <>
      <ServiceHero
        name="Execution & Trading"
        title="Multi-asset execution with global liquidity access."
        lede="Advanced algorithms combined with high-touch support to source global liquidity across 50+ markets and multiple asset classes."
      />
      <ServiceCapabilities
        eyebrow="Platform capabilities"
        title="Execution infrastructure built for speed."
        features={features}
      />
      <ServiceDetailPanel
        eyebrow="Infrastructure"
        title="Enterprise-grade trading infrastructure."
        items={infrastructure}
      />
      <ServiceCta
        title="Experience institutional-grade execution."
        body="See how our execution platform can improve your fill rates and reduce latency."
        secondary={{ label: "All services", to: "/services" }}
      />
    </>
  );
}
