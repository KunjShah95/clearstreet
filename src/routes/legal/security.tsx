import { createFileRoute } from "@tanstack/react-router";
import { FadeInSection, Stagger, StaggerItem } from "../../components/fade-in-section";
import { LegalHero } from "../../components/legal-page";
import { Lock, Server, Eye, Key, UserCheck, Shield } from "lucide-react";

export const Route = createFileRoute("/legal/security")({
  head: () => ({
    meta: [
      { title: "Security — Clear Street" },
      {
        name: "description",
        content:
          "Clear Street's security practices, certifications, and commitment to protecting client data and assets.",
      },
    ],
  }),
  component: Security,
});

const securityItems = [
  {
    icon: Lock,
    title: "Encryption",
    description:
      "All data in transit is encrypted using TLS 1.3. Data at rest is encrypted using AES-256. We maintain strict key management practices and regularly rotate encryption keys.",
  },
  {
    icon: Server,
    title: "Infrastructure security",
    description:
      "Our cloud-native infrastructure runs on SOC 2-compliant providers with redundant data centers, network segmentation, and 24/7 monitoring. Access is restricted by least-privilege principles.",
  },
  {
    icon: Eye,
    title: "Monitoring & detection",
    description:
      "We operate a 24/7 security operations center (SOC) with advanced threat detection, behavioral analytics, and incident response capabilities. All systems are continuously monitored for anomalous activity.",
  },
  {
    icon: Key,
    title: "Access control",
    description:
      "Multi-factor authentication is required for all system access. Role-based access controls (RBAC), privileged access management (PAM), and just-in-time (JIT) access ensure users have only the permissions they need.",
  },
  {
    icon: UserCheck,
    title: "Vendor & third-party risk",
    description:
      "All third-party vendors undergo rigorous security assessments before engagement. We continuously monitor vendor security posture and conduct regular reviews.",
  },
  {
    icon: Shield,
    title: "Compliance & audits",
    description:
      "We maintain SOC 2 Type II certification and comply with FINRA, SEC, and applicable regulatory requirements. Regular penetration testing and vulnerability assessments are conducted by independent firms.",
  },
];

export function Security() {
  return (
    <>
      <LegalHero
        title="Security"
        lede="Security is foundational to everything we build at Clear Street. Our cloud-native platform is designed to protect client data and assets through defense-in-depth architecture, continuous monitoring, and rigorous compliance."
      />

      <FadeInSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-6 transition-colors duration-300 hover:border-[color:var(--rule-brand-strong)] hover:bg-white/[0.06]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#DAD7FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="cs-h5 mb-2 text-white">{item.title}</h3>
                  <p className="cs-body-sm text-[color:var(--on-brand)]">{item.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-24 max-w-3xl px-4 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-[color:var(--fill-brand-subtle)] p-8">
          <h2 className="cs-h3 mb-4 text-white">Report a vulnerability</h2>
          <p className="cs-body leading-relaxed text-[color:var(--on-brand)]">
            We welcome input from the security research community. If you believe you have
            discovered a vulnerability in our platform or services, please report it responsibly
            to{" "}
            <a href="mailto:security@clearstreet.io" className="cs-link-underline">
              security@clearstreet.io
            </a>
            . We are committed to reviewing and addressing all credible reports promptly.
          </p>
        </div>
      </FadeInSection>
    </>
  );
}
