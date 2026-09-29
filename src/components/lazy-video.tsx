import { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks/use-in-view";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Rendered above the video; used for the brand gradient scrims. */
  children?: React.ReactNode;
  /**
   * How far outside the viewport the video should keep playing. A small
   * positive margin avoids a stall when the user reverses direction.
   */
  rootMargin?: string;
  style?: React.CSSProperties;
};

/**
 * Viewport-gated background video.
 *
 * The homepage mounted eleven `<video autoPlay loop>` elements on first
 * paint, all pointing at four unique CDN files, plus one with
 * `preload="none"` alongside `autoPlay` (a browser is free to satisfy
 * neither, so it just showed a poster). That is a lot of concurrent
 * media decode and mobile data spent on content nobody has scrolled to.
 *
 * This defers the network request and the decoder until the element is
 * near the viewport, pauses when it leaves, and never autoplays under
 * reduced motion — it holds the poster frame instead.
 */
export function LazyVideo({
  src,
  poster,
  className,
  children,
  rootMargin = "300px 0px",
  style,
}: LazyVideoProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, margin: rootMargin });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Only create the media element once we're close to the viewport.
  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !mounted) return;
    if (reduced) return;
    const play = el.play();
    if (play && typeof play.catch === "function") {
      // Autoplay can still be refused (low power mode, data saver).
      // The poster frame stays, which is an acceptable outcome.
      play.catch(() => {});
    }
  }, [mounted, reduced]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !mounted) return;
    if (inView || reduced) return;
    el.pause();
  }, [inView, mounted, reduced]);

  return (
    <div ref={ref} className={className} style={style}>
      {mounted && (
        <video
          ref={videoRef}
          aria-hidden
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          tabIndex={-1}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {children}
    </div>
  );
}
