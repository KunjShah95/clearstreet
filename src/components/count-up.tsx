import { useEffect, useRef } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks/use-in-view";

/**
 * Animates a numeric value counting up when it scrolls into view.
 *
 * `value` is a display string like "~550M", "$28.4bn", "94% YoY" — the
 * leading numeric portion is parsed and tweened, prefix/suffix kept.
 *
 * The tween writes straight to the text node. The previous version drove
 * it through `useState`, which re-rendered the component on all ~60
 * frames per second; with seven of these inside a marquee that is a
 * few hundred wasted renders per second during scroll for text that
 * only ever changes its own `textContent`.
 */
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true, margin: "-10% 0px" });
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (!node) return;

    const parsed = parseDisplay(value);

    if (reduced || !parsed) {
      node.textContent = value;
      return;
    }

    const { target, decimals, prefix, suffix } = parsed;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1000 / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        node.textContent = value;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span
      ref={(el) => {
        ref.current = el;
        nodeRef.current = el;
      }}
    >
      {zeroed(value)}
    </span>
  );
}

function parseDisplay(value: string) {
  const match = value.match(/-?\d[\d,.]*/);
  if (!match) return null;
  const numStr = match[0];
  const target = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index ?? 0) + numStr.length);
  return { target, decimals, prefix, suffix };
}

function zeroed(value: string): string {
  const parsed = parseDisplay(value);
  if (!parsed) return value;
  return `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
}
