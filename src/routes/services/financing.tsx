import { createFileRoute } from "@tanstack/react-router";
import { Layers, DollarSign, TrendingUp, Shield } from "lucide-react";
import {
  ServiceHero,
  ServiceCapabilities,
  ServiceProductGrid,
  ServiceCta,
} from "../../components/service-page";

export const Route = createFileRoute("/services/financing")({
  head: () => ({
    meta: [
      { title: "Financing — Clear Street" },
      {
        name: "description",
        content:
          "Integrated capital solutions with real-time portfolio margining, securities lending, and flexible funding across repo, stock loan, term financing, and special-situation lending.",
      },
    ],
  }),
  component: Financing,
});

const features = [
  {
    icon: Layers,
    title: "Real-Time Portfolio Margining",
    description:
      "Cross-product margin calculation across equities, options, and futures in a single account — continuously updated, never overnight.",
  },
  {
    icon: DollarSign,
    title: "Flexible Funding Access",
    description:
      "Access capital through repo, stock loan, term financing, and special-situation lending. Tailored solutions for every strategy.",
  },
  {
    icon: TrendingUp,
    title: "Securities Lending",
    description:
      "Robust stock loan desk with deep inventory across hard-to-borrow names, competitive rebates, and automated locate processing.",
  },
  {
    icon: Shield,
    title: "Unified Balance Sheet",
    description:
      "One integrated view of your financing across all products and strategies. No more reconciling between multiple counterparties.",
  },
];

/** Financing lists named products rather than capabilities, so this page
 *  gets a product grid instead of the shared tick-list panel. */
const products = [
  {
    name: "Repo Financing",
    desc: "Short-term secured funding against collateral at competitive rates with flexible maturity terms.",
  },
  {
    name: "Stock Loan",
    desc: "Access hard-to-borrow securities with automated locate, competitive rebates, and global inventory.",
  },
  {
    name: "Term Financing",
    desc: "Longer-duration secured funding for multi-strategy funds and bespoke portfolio needs.",
  },
  {
    name: "Special Situations",
    desc: "Tailored financing for IPOs, SPACs, PIPE transactions, and other event-driven strategies.",
  },
];

function Financing() {
  return (
    <>
      <ServiceHero
        name="Financing"
        title="Fully integrated, data-driven capital solutions."
        lede="A unified, real-time ledger that integrates trading, clearing, and financing to free up capital and automate risk calculations across your entire portfolio."
      />
      <ServiceCapabilities
        eyebrow="Platform capabilities"
        title="Capital solutions for sophisticated strategies."
        features={features}
      />
      <ServiceProductGrid
        eyebrow="Financing products"
        title="Flexible capital, one platform."
        products={products}
      />
      <ServiceCta
        title="Optimize your capital structure."
        body="Speak with our financing desk about custom capital solutions for your strategy."
        secondary={{ label: "All services", to: "/services" }}
      />
    </>
  );
}
