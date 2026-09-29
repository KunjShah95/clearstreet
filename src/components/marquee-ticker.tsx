import { type ReactNode } from "react";

interface MarqueeTickerProps {
  children: ReactNode[];
  speed?: number;
}

/**
 * Infinite horizontal ticker.
 *
 * The track renders the items twice and translates by exactly -50%, so
 * for the loop to be seamless the two halves must be identical *and*
 * the gap between them must be accounted for. The previous version used
 * `gap-8` on the flex track, which makes the track width
 * `2W + (2n-1)·gap` while -50% is `W + (n-0.5)·gap` — leaving a
 * half-gap jump at the seam on every loop. Moving the spacing inside
 * each item makes each half self-contained and exactly half the track.
 */
export function MarqueeTicker({ children, speed = 30 }: MarqueeTickerProps) {
  return (
    <div className="cs-marquee">
      <div
        data-cs-marquee=""
        className="cs-marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* The repeat is a visual seam, not content — hidden from
            assistive tech so the stats are not announced twice. */}
        <ul className="cs-marquee-group" aria-label="Platform metrics">
          {children.map((child, i) => (
            <li className="cs-marquee-item" key={`a-${i}`}>
              {child}
            </li>
          ))}
        </ul>
        <ul className="cs-marquee-group" aria-hidden="true">
          {children.map((child, i) => (
            <li className="cs-marquee-item" key={`b-${i}`}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
