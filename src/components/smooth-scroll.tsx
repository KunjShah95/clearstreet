import { useEffect, type ReactNode, useRef } from "react";

export function getLenis() {
  // Lenis is now lazy-loaded; expose via a global for other consumers
  return (window as any).__lenisInstance ?? null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId: number;

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });
      instanceRef.current = lenis;
      (window as any).__lenisInstance = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
        (window as any).__lenisInstance = null;
      }
    };
  }, []);

  return <>{children}</>;
}
