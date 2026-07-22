import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/use-in-view";

/**
 * Animates a numeric value counting up when it scrolls into view.
 * `value` is a display string like "~550M", "$28.4B", "94%" — the
 * leading numeric portion is parsed and tweened, prefix/suffix preserved.
 */
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(() => zeroed(value));

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/-?\d[\d,.]*/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const numStr = match[0];
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + numStr.length);

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

function zeroed(value: string): string {
  const match = value.match(/-?\d[\d,.]*/);
  if (!match) return value;
  const numStr = match[0];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index ?? 0) + numStr.length);
  return `${prefix}${(0).toFixed(decimals)}${suffix}`;
}
