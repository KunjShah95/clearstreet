import { useEffect, useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  amount?: number;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { once = false, margin = "0px", amount = 0 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse margin: "0px 0px -10% 0px" or just "0px"
    const rootMargin = margin;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observerRef.current?.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: amount || undefined },
    );

    observerRef.current.observe(el);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [once, margin, amount]);

  return { ref, inView };
}
