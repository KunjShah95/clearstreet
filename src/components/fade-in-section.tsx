import { type ReactNode, createContext, useContext } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks/use-in-view";

/**
 * Scroll reveal.
 *
 * The reveal is expressed as a `cs-reveal` class plus an `is-in` modifier
 * rather than inline `opacity`/`transform`, for two reasons:
 *
 *  - The hidden state lives in CSS, so a `<noscript>` override (in
 *    styles.css) can un-hide everything when JS never runs. Previously
 *    the inline `opacity: 0` could strand a section at zero opacity
 *    permanently if IntersectionObserver didn't fire.
 *  - The end state is the element's natural state, so there is nothing
 *    to restore if the transition is skipped.
 */
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
      className={`cs-reveal${inView ? " is-in" : ""}${clipReveal ? " cs-reveal-clip" : ""} ${className}`}
      style={
        {
          "--cs-reveal-delay": `${delay}s`,
          "--cs-reveal-y": `${y}px`,
        } as React.CSSProperties
      }
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

/**
 * Wrap a grid or list so each direct child reveals in sequence.
 *
 * The per-item offset is applied by `nth-child` in styles.css rather
 * than by reading a sibling index in a ref callback. The previous
 * implementation set `indexRef.current` inside the ref callback, which
 * React invokes *after* the style prop has already been evaluated on
 * that render — so every item computed index 0 and the whole grid
 * animated in unison. CSS offsets are correct on the first paint and
 * need no extra render to apply.
 */
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
      <div
        ref={ref}
        className={`cs-stagger${inView ? " is-in" : ""} ${className}`}
        style={{ "--cs-stagger-step": `${staggerDelay}s` } as React.CSSProperties}
      >
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { inView } = useContext(StaggerContext);

  return <div className={`cs-stagger-item${inView ? " is-in" : ""} ${className}`}>{children}</div>;
}

/**
 * Convenience wrapper for the common case: a section that reveals its
 * heading block and then staggers a grid of children. Kept out of the
 * two primitives above so their APIs stay minimal.
 */
export function StaggerGrid({
  children,
  className = "",
  staggerDelay = 0.09,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <Stagger className={className} staggerDelay={reduced ? 0 : staggerDelay}>
      {children}
    </Stagger>
  );
}
