import { type ReactNode } from "react";

interface MarqueeTickerProps {
  children: ReactNode[];
  speed?: number;
}

export function MarqueeTicker({ children, speed = 30 }: MarqueeTickerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex gap-8"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
