import { type ReactNode, createContext, useContext, useRef } from "react";
import { useInView } from "../hooks/use-in-view";

export function FadeInSection({
  children,
  className = "",
  delay = 0,
  y = 32,
  once = true,
  clipReveal = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  clipReveal?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once,
    margin: "0px 0px -10% 0px",
    amount: 0.15,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: clipReveal ? 1 : inView ? 1 : 0,
        transform: clipReveal ? "none" : inView ? "translateY(0)" : `translateY(${y}px)`,
        clipPath: clipReveal
          ? inView
            ? "inset(0% 0% 0% 0%)"
            : "inset(8% 0% 8% 0%)"
          : "none",
        transition: clipReveal
          ? `clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
          : `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContextValue {
  inView: boolean;
  baseDelay: number;
}

const StaggerContext = createContext<StaggerContextValue>({
  inView: false,
  baseDelay: 0.09,
});

/** Wrap a grid/list of items; each direct StaggerItem reveals in sequence on scroll. */
export function Stagger({
  children,
  className = "",
  staggerDelay = 0.09,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    margin: "0px 0px -10% 0px",
    amount: 0.1,
  });

  return (
    <StaggerContext.Provider value={{ inView, baseDelay: staggerDelay }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { inView, baseDelay } = useContext(StaggerContext);
  const indexRef = useRef<number | null>(null);

  return (
    <div
      ref={(el) => {
        if (el && indexRef.current === null) {
          // Find our index among siblings to create staggered delay
          const parent = el.parentElement;
          if (parent) {
            indexRef.current = Array.from(parent.children).indexOf(el);
          } else {
            indexRef.current = 0;
          }
        }
      }}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(indexRef.current ?? 0) * baseDelay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(indexRef.current ?? 0) * baseDelay}s`,
      }}
    >
      {children}
    </div>
  );
}
