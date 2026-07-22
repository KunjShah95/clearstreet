import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/use-in-view";

type RiveIconProps = {
  src: string;
  fallback?: string;
  className?: string;
};

export function RiveIcon({ src, fallback, className }: RiveIconProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, margin: "-10% 0px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!inView || !canvasRef.current) return;

    let anim: InstanceType<typeof import("@rive-app/react-canvas")["Rive"]>;
    let cancelled = false;

    import("@rive-app/react-canvas")
      .then(({ Rive: RiveClass }) => {
        if (cancelled) return;
        anim = new RiveClass({
          src,
          canvas: canvasRef.current!,
          autoplay: true,
          stateMachines: "State Machine 1",
          onLoad: () => {
            if (!cancelled) {
              anim.resizeDrawingSurfaceToCanvas();
              setLoaded(true);
            }
          },
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      anim?.cleanup();
    };
  }, [inView, src]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {!loaded && fallback && (
        <img
          src={fallback}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      )}
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
