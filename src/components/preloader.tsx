import { useEffect, useState } from "react";
import { ClearStreetLogo } from "./clearstreet-logo";

/* ──────────────────────────────────────────── */
/*  Market Pulse — Elevated terminal-style intro */
/*  Shows animated bar charts with platform      */
/*  metrics streaming in, topped by the brand.   */
/*  CRT scan-line + grid overlay for character.  */
/* ──────────────────────────────────────────── */

const metricData = [
  { value: "$1.0bn", label: "Capital Raised", pct: 32 },
  { value: "~$28.4bn", label: "Notional / Day", pct: 85 },
  { value: "~550mm", label: "Shares / Day", pct: 62 },
  { value: "~700", label: "Clients", pct: 45 },
  { value: "800+", label: "Employees", pct: 55 },
  { value: "~$16bn", label: "Customer Balances", pct: 72 },
];

export function Preloader() {
  const [phase, setPhase] = useState<"intro" | "visible" | "exiting" | "hidden">("intro");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 80);
    const t2 = setTimeout(() => setPhase("exiting"), 2200);
    const t3 = setTimeout(() => setPhase("hidden"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#01001f",
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none",
      }}
    >
      {/* ── Terminal grid overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── CRT scan-line overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Center glow — wrapper keeps centering, child animates ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,122,255,0.10) 0%, transparent 65%)",
            animation: "marketPulsePulse 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Bar-chart rows ── */}
      <div className="relative z-10 mb-8 w-full max-w-lg px-8 space-y-3">
        {metricData.map((d, i) => {
          const delay = 0.12 + i * 0.08;
          return (
            <div
              key={d.label}
              style={{
                opacity: phase === "intro" ? 0 : 1,
                transform: phase === "intro" ? "translateX(-16px)" : "translateX(0)",
                transition: `opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[color:var(--on-brand-muted)]">
                  {d.label}
                </span>
                <span
                  className="font-sans text-xs font-bold text-white"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {d.value}
                </span>
              </div>
              <div className="h-[6px] w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: phase === "intro" ? "0%" : `${d.pct}%`,
                    background: "linear-gradient(90deg, #6b4aff, #8b7aff)",
                    transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.1}s`,
                    boxShadow: "0 0 12px rgba(107,74,255,0.3)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Logo + Tagline ── */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: phase === "intro" ? 0 : 1,
          transform: phase === "intro" ? "translateY(16px) scale(0.93)" : "translateY(0) scale(1)",
          transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.75s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.75s",
        }}
      >
        <ClearStreetLogo variant="white" showText={true} className="h-10 w-auto" />
        <p
          className="mt-3 font-sans text-[10px] uppercase tracking-[0.25em] text-[color:var(--on-brand-muted)]"
          style={{
            opacity: phase === "intro" ? 0 : 1,
            transition: "opacity 0.5s ease 0.95s",
          }}
        >
          Cloud-Native Prime Brokerage
        </p>
      </div>

      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes marketPulsePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
