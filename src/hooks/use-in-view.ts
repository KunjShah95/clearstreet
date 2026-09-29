import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  amount?: number;
}

/**
 * IntersectionObserver wrapper used by every scroll reveal on the site.
 *
 * Two safety properties matter here, because callers hide their content
 * with `opacity: 0` until this reports `true`:
 *
 *  1. If `IntersectionObserver` is unavailable, we report `true` from the
 *     first render. Returning `false` forever would strand the entire
 *     page at zero opacity.
 *  2. If the observer is constructed but never delivers an initial
 *     callback (which happens when a node is detached and reattached by
 *     client-side routing), `observedRef` lets callers fail open.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) {
  const { once = false, margin = "0px", amount = 0 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observerRef.current?.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold: amount || undefined },
    );

    observerRef.current.observe(el);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [once, margin, amount]);

  return { ref, inView };
}

/**
 * True when the user has asked the OS to minimise animation.
 * Returns `false` during SSR so markup is identical on both passes.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
