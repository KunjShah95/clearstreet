import { CountUp } from "./count-up";
import { MarqueeTicker } from "./marquee-ticker";
import { RiveIcon } from "./rive-icon";
import { FadeInSection } from "./fade-in-section";
import { img, type ImageKey } from "../lib/images";

/**
 * The platform-wide numbers, shown as a scrolling ticker.
 *
 * Previously declared twice — once in the homepage route and again,
 * byte-identical, in /about. Any edit to a figure or an icon had to be
 * made in both places or the two pages would quietly disagree about
 * how much capital the firm has raised.
 *
 * The still images resolve through the shared manifest so a host change
 * is a one-file edit. The Rive animations are left on their current
 * host: they are vector-anim files rather than images, they are the
 * largest asset class here, and they are deliberately outside the
 * migration's scope.
 */
const stats: { value: string; label: string; riv: string; icon: ImageKey }[] = [
  {
    value: "$1.0bn",
    label: "in capital raised",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/2039b6b689c1bed8b19e49dc9a861954bca76e48.riv",
    icon: "stat.capital-raised",
  },
  {
    value: "~550mm",
    label: "shares / day",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/e4b9f87300e4626ca6907acb45a3e5348c08d745.riv",
    icon: "stat.shares-per-day",
  },
  {
    value: "~$28.4bn",
    label: "notional / day",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/bb1a79c621a28db2d8f810667a662558df27a15d.riv",
    icon: "stat.notional-per-day",
  },
  {
    value: "~700",
    label: "institutional clients",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/bb1a79c621a28db2d8f810667a662558df27a15d.riv",
    icon: "stat.institutional-clients",
  },
  {
    value: "800+",
    label: "employees worldwide",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/386bebb09582ccf09ea4c375762758702f33c029.riv",
    icon: "stat.employees",
  },
  {
    value: "94% YoY",
    label: "transacted growth",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/6614fef61a9084867cbe5c6a78872c2c78cb671f.riv",
    icon: "stat.transacted-growth",
  },
  {
    value: "~$16bn",
    label: "customer balances",
    riv: "https://cdn.sanity.io/files/40fnhjbe/production/0dad6e380e80b1d7816e1c380c8f9c02fa857029.riv",
    icon: "stat.customer-balances",
  },
];

export const PLATFORM_STATS = stats;

export function StatsMarquee({ className = "" }: { className?: string }) {
  return (
    <FadeInSection className={`mx-auto max-w-7xl overflow-hidden px-4 sm:px-8 ${className}`}>
      <p className="cs-eyebrow mb-8">
        Clear Street is replacing the legacy infrastructure used across capital markets
      </p>
      <MarqueeTicker speed={20}>
        {stats.map((s) => (
          <div key={s.label} className="flex w-[200px] shrink-0 flex-col items-center text-center">
            <div className="h-14 w-14">
              <RiveIcon src={s.riv} fallback={img(s.icon)} className="h-full w-full" />
            </div>
            <p className="cs-h3 mt-3 text-white">
              <CountUp value={s.value} />
            </p>
            <p className="cs-label-sm mt-1 text-[color:var(--on-brand-muted)]">{s.label}</p>
          </div>
        ))}
      </MarqueeTicker>
    </FadeInSection>
  );
}
