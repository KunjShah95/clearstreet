import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeInSection } from "../../components/fade-in-section";
import { ArrowLeft, Shield, Lock, Eye, Server, Key, UserCheck } from "lucide-react";

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
    title: "Infrastructure Security",
    description:
      "Our cloud-native infrastructure runs on SOC 2-compliant providers with redundant data centers, network segmentation, and 24/7 monitoring. Access is restricted by least-privilege principles.",
  },
  {
    icon: Eye,
    title: "Monitoring & Detection",
    description:
      "We operate a 24/7 security operations center (SOC) with advanced threat detection, behavioral analytics, and incident response capabilities. All systems are continuously monitored for anomalous activity.",
  },
  {
    icon: Key,
    title: "Access Control",
    description:
      "Multi-factor authentication is required for all system access. Role-based access controls (RBAC), privileged access management (PAM), and just-in-time (JIT) access ensure users have only the permissions they need.",
  },
  {
    icon: UserCheck,
    title: "Vendor & Third-Party Risk",
    description:
      "All third-party vendors undergo rigorous security assessments before engagement. We continuously monitor vendor security posture and conduct regular reviews.",
  },
  {
    icon: Shield,
    title: "Compliance & Audits",
    description:
      "We maintain SOC 2 Type II certification and comply with FINRA, SEC, and applicable regulatory requirements. Regular penetration testing and vulnerability assessments are conducted by independent firms.",
  },
];

export function Security() {
  return (
    <div className="px-4 sm:px-8">
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
        <FadeInSection>
          <div className="mx-auto max-w-7xl">
            <Link to="/" className="cs-label-sm mb-8 inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
            <h1 className="cs-display mt-4 text-white">Security</h1>
            <p className="cs-body-lg mt-4 max-w-3xl text-white/60">
              Security is foundational to everything we build at Clear Street. Our cloud-native 
              platform is designed to protect client data and assets through defense-in-depth 
              architecture, continuous monitoring, and rigorous compliance.
            </p>
          </div>
        </FadeInSection>
      </section>

      <section className="mx-auto max-w-7xl pb-10">
        <FadeInSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    <Icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="cs-h5 mb-2 text-white">{item.title}</h3>
                  <p className="cs-body-sm text-white/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </FadeInSection>
      </section>

      <section className="mx-auto max-w-3xl pb-24">
        <FadeInSection>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="cs-h3 mb-4 text-white">Report a Vulnerability</h2>
            <p className="cs-body leading-relaxed text-white/60">
              We welcome input from the security research community. If you believe you have 
              discovered a vulnerability in our platform or services, please report it 
              responsibly to security@clearstreet.io. We are committed to reviewing and 
              addressing all credible reports promptly.
            </p>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
