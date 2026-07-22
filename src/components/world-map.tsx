import { useState, useRef, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types & data                                                      */
/* ------------------------------------------------------------------ */

interface ExchangeLocation {
  id: string;
  city: string;
  lat: number;
  lng: number;
  exchanges: string[];
  region: string;
  status?: "active" | "upcoming";
}

const locations: ExchangeLocation[] = [
  { id: "nyc", city: "New York", lat: 40.7128, lng: -74.006, exchanges: ["NYSE", "NASDAQ", "Cboe"], region: "North America" },
  { id: "chi", city: "Chicago", lat: 41.8781, lng: -87.6298, exchanges: ["CME", "ICE"], region: "North America" },
  { id: "lon", city: "London", lat: 51.5074, lng: -0.1278, exchanges: ["LSEG"], region: "Europe" },
  { id: "fra", city: "Frankfurt", lat: 50.1109, lng: 8.6821, exchanges: ["Eurex"], region: "Europe" },
  { id: "tlv", city: "Tel Aviv", lat: 32.0853, lng: 34.7818, exchanges: ["TASE"], region: "Middle East" },
  { id: "dxb", city: "Dubai", lat: 25.2048, lng: 55.2708, exchanges: ["Dubai Gold"], region: "Middle East & Africa", status: "upcoming" },
  { id: "hkg", city: "Hong Kong", lat: 22.3193, lng: 114.1694, exchanges: ["HKEX"], region: "Asia Pacific" },
  { id: "tyo", city: "Tokyo", lat: 35.6762, lng: 139.6503, exchanges: ["JPX"], region: "Asia Pacific" },
  { id: "sin", city: "Singapore", lat: 1.3521, lng: 103.8198, exchanges: ["SGX"], region: "Asia Pacific" },
  { id: "syd", city: "Sydney", lat: -33.8688, lng: 151.2093, exchanges: ["ASX"], region: "Asia Pacific" },
  { id: "sao", city: "São Paulo", lat: -23.5505, lng: -46.6333, exchanges: ["B3"], region: "South America", status: "upcoming" },
  { id: "bue", city: "Buenos Aires", lat: -34.6037, lng: -58.3816, exchanges: ["BCBA"], region: "South America", status: "upcoming" },
  { id: "jhb", city: "Johannesburg", lat: -26.2041, lng: 28.0473, exchanges: ["JSE"], region: "Middle East & Africa", status: "upcoming" },
];

const HQ = locations.find((l) => l.id === "nyc")!;

/* ------------------------------------------------------------------ */
/*  Region colours                                                    */
/* ------------------------------------------------------------------ */

const regionColor: Record<string, string> = {
  "North America": "#8b7aff",
  Europe: "#4fc3f7",
  "Middle East": "#ffb74d",
  "Middle East & Africa": "#ffb74d",
  "Asia Pacific": "#66bb6a",
  "South America": "#ef5350",
};

/* ------------------------------------------------------------------ */
/*  Simplified continent outlines (lat/lng polygons)                  */
/* ------------------------------------------------------------------ */

const continentPolygons: number[][][] = [
  // North America
  [
    [-170, 64], [-168, 55], [-150, 60], [-140, 58], [-135, 56], [-125, 49], [-124, 42],
    [-118, 34], [-105, 25], [-97, 19], [-90, 15], [-84, 10], [-80, 8], [-77, 18],
    [-82, 22], [-81, 25], [-82, 30], [-88, 30], [-95, 29], [-97, 36], [-95, 40],
    [-82, 41], [-75, 45], [-68, 44], [-67, 47], [-60, 47], [-58, 50], [-55, 52],
    [-60, 55], [-63, 58], [-68, 60], [-75, 62], [-85, 65], [-95, 68], [-105, 68],
    [-120, 70], [-135, 70], [-155, 72], [-165, 70],
  ],
  // South America
  [
    [-80, 10], [-77, 4], [-75, -1], [-80, -3], [-75, -15], [-70, -18],
    [-68, -22], [-67, -28], [-70, -40], [-73, -46], [-75, -52], [-70, -55],
    [-65, -55], [-60, -52], [-55, -34], [-50, -28], [-48, -22],
    [-45, -12], [-40, -3], [-50, 0], [-55, 5], [-60, 8], [-68, 10], [-73, 12],
  ],
  // Europe
  [
    [-10, 36], [-5, 36], [0, 38], [3, 43], [-2, 44], [-9, 43], [-10, 40],
  ],
  [
    [5, 44], [3, 43], [0, 46], [-5, 48], [-3, 53], [0, 51], [5, 47], [8, 48],
    [10, 54], [12, 55], [15, 54], [20, 55], [25, 56], [28, 60], [30, 62],
    [28, 65], [25, 68], [20, 70], [15, 69], [10, 63], [8, 58], [5, 55],
    [3, 52], [2, 51], [5, 47],
  ],
  // Africa
  [
    [-15, 30], [-17, 15], [-15, 10], [-8, 5], [0, 5], [5, 4], [10, 4],
    [12, 0], [15, -5], [20, -10], [25, -15], [30, -20], [35, -25],
    [33, -30], [28, -34], [20, -33], [18, -28], [15, -20], [12, -10],
    [10, 0], [12, 5], [15, 10], [20, 15], [25, 20], [30, 25], [32, 30],
    [35, 35], [30, 37], [20, 37], [10, 37], [5, 36], [0, 35],
  ],
  // Asia
  [
    [30, 35], [35, 37], [40, 38], [42, 42], [50, 38], [55, 37],
    [60, 25], [65, 25], [70, 20], [72, 18], [78, 8], [80, 12],
    [88, 22], [92, 20], [100, 15], [100, 0], [105, 2], [110, -5],
    [115, -8], [120, 0], [120, 10], [121, 22], [125, 30],
    [130, 33], [135, 35], [140, 40], [145, 45], [140, 52],
    [135, 55], [130, 50], [125, 45], [120, 53], [110, 55],
    [100, 52], [90, 48], [80, 42], [70, 38], [60, 40], [55, 42],
    [50, 45], [45, 42], [40, 42], [35, 40],
  ],
  // Russia (upper Asia)
  [
    [30, 62], [35, 60], [40, 58], [50, 55], [60, 55], [70, 58],
    [80, 55], [90, 55], [100, 55], [110, 55], [120, 58], [130, 55],
    [140, 55], [150, 58], [160, 60], [170, 65], [175, 68],
    [170, 72], [160, 73], [140, 73], [120, 72], [100, 72],
    [80, 70], [60, 68], [40, 68], [30, 65],
  ],
  // Australia
  [
    [115, -20], [120, -15], [130, -12], [135, -12], [140, -15],
    [145, -15], [150, -22], [153, -28], [150, -35], [145, -38],
    [140, -38], [135, -35], [130, -32], [125, -30], [118, -22],
    [115, -25],
  ],
];

/* ------------------------------------------------------------------ */
/*  3D math helpers                                                   */
/* ------------------------------------------------------------------ */

function latLngToXYZ(lat: number, lng: number, r: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c + z * s, y, -x * s + z * c];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x, y * c - z * s, y * s + z * c];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
): { sx: number; sy: number; z: number } | null {
  if (z < 0) return null; // behind globe
  return { sx: cx + x, sy: cy - y, z };
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotYRef = useRef(-0.45); // initial rotation to show NY facing viewer
  const rotXRef = useRef(0.25);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const [tooltip, setTooltip] = useState<{
    loc: ExchangeLocation;
    x: number;
    y: number;
  } | null>(null);

  const [size, setSize] = useState({ w: 1000, h: 500 });

  /* Resize observer */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const h = Math.max(360, Math.min(width * 0.55, 600));
      setSize({ w: width, h });
    });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  /* Draw loop */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size.w / 2;
    const cy = size.h / 2;
    const R = Math.min(size.w, size.h) * 0.38;

    const rY = rotYRef.current;
    const rX = rotXRef.current;
    const time = timeRef.current;

    // Clear
    ctx.clearRect(0, 0, size.w, size.h);

    // Globe background glow
    const bgGrad = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.6);
    bgGrad.addColorStop(0, "rgba(46, 33, 222, 0.15)");
    bgGrad.addColorStop(0.5, "rgba(46, 33, 222, 0.05)");
    bgGrad.addColorStop(1, "transparent");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size.w, size.h);

    // Globe sphere
    const globeGrad = ctx.createRadialGradient(
      cx - R * 0.25,
      cy - R * 0.25,
      R * 0.05,
      cx,
      cy,
      R,
    );
    globeGrad.addColorStop(0, "rgba(59, 41, 224, 0.4)");
    globeGrad.addColorStop(0.5, "rgba(30, 20, 140, 0.25)");
    globeGrad.addColorStop(0.85, "rgba(15, 10, 56, 0.35)");
    globeGrad.addColorStop(1, "rgba(1, 0, 31, 0.5)");

    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = globeGrad;
    ctx.fill();

    // Globe border ring
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(139, 122, 255, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Graticule (lat/lng grid lines)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lng = 0; lng <= 360; lng += 3) {
        const [x0, y0, z0] = latLngToXYZ(lat, lng, R);
        let [x1, y1, z1] = rotateY(x0, y0, z0, rY);
        [x1, y1, z1] = rotateX(x1, y1, z1, rX);
        const p = project(x1, y1, z1, cx, cy);
        if (p) {
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }
    for (let lng = -180; lng < 180; lng += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 3) {
        const [x0, y0, z0] = latLngToXYZ(lat, lng, R);
        let [x1, y1, z1] = rotateY(x0, y0, z0, rY);
        [x1, y1, z1] = rotateX(x1, y1, z1, rX);
        const p = project(x1, y1, z1, cx, cy);
        if (p) {
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }

    // Continents
    for (const poly of continentPolygons) {
      ctx.beginPath();
      let started = false;
      for (const [lng, lat] of poly) {
        const [x0, y0, z0] = latLngToXYZ(lat, lng, R * 1.002);
        let [x1, y1, z1] = rotateY(x0, y0, z0, rY);
        [x1, y1, z1] = rotateX(x1, y1, z1, rX);
        const p = project(x1, y1, z1, cx, cy);
        if (p) {
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Helper to project a location
    const projectLoc = (loc: ExchangeLocation) => {
      const [x0, y0, z0] = latLngToXYZ(loc.lat, loc.lng, R * 1.005);
      let [x1, y1, z1] = rotateY(x0, y0, z0, rY);
      [x1, y1, z1] = rotateX(x1, y1, z1, rX);
      return project(x1, y1, z1, cx, cy);
    };

    // Connection arcs from HQ
    const hqProj = projectLoc(HQ);
    const visibleLocs = locations
      .filter((l) => l.id !== "nyc")
      .map((loc) => ({ loc, proj: projectLoc(loc) }))
      .filter((item) => item.proj !== null);

    for (const { loc, proj } of visibleLocs) {
      if (!hqProj || !proj) continue;
      const color = regionColor[loc.region] || "#8b7aff";

      // Draw great-circle arc on globe surface
      const steps = 40;
      const arcPoints: { sx: number; sy: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Spherical interpolation (SLERP) on lat/lng
        const lat1 = (HQ.lat * Math.PI) / 180;
        const lng1 = (HQ.lng * Math.PI) / 180;
        const lat2 = (loc.lat * Math.PI) / 180;
        const lng2 = (loc.lng * Math.PI) / 180;

        const d =
          Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1),
          ) || 0.001;

        const A = Math.sin((1 - t) * d) / Math.sin(d);
        const B = Math.sin(t * d) / Math.sin(d);

        const x =
          A * Math.cos(lat1) * Math.cos(lng1) +
          B * Math.cos(lat2) * Math.cos(lng2);
        const y =
          A * Math.cos(lat1) * Math.sin(lng1) +
          B * Math.cos(lat2) * Math.sin(lng2);
        const z = A * Math.sin(lat1) + B * Math.sin(lat2);

        const latI = Math.atan2(z, Math.sqrt(x * x + y * y));
        const lngI = Math.atan2(y, x);

        // Lift arc above surface
        const lift = 1 + 0.04 * Math.sin(t * Math.PI) * (d / Math.PI);
        const [px, py, pz] = latLngToXYZ(
          (latI * 180) / Math.PI,
          (lngI * 180) / Math.PI,
          R * lift,
        );
        let [rx, ry, rz] = rotateY(px, py, pz, rY);
        [rx, ry, rz] = rotateX(rx, ry, rz, rX);
        const pp = project(rx, ry, rz, cx, cy);
        if (pp) arcPoints.push(pp);
      }

      if (arcPoints.length > 2) {
        // Arc glow
        ctx.beginPath();
        ctx.moveTo(arcPoints[0].sx, arcPoints[0].sy);
        for (let i = 1; i < arcPoints.length; i++) {
          ctx.lineTo(arcPoints[i].sx, arcPoints[i].sy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.08;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Main arc
        ctx.beginPath();
        ctx.moveTo(arcPoints[0].sx, arcPoints[0].sy);
        for (let i = 1; i < arcPoints.length; i++) {
          ctx.lineTo(arcPoints[i].sx, arcPoints[i].sy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Travelling dot along arc
        const dotIdx = Math.floor(
          ((time * 0.3 + locations.indexOf(loc) * 0.12) % 1) * arcPoints.length,
        );
        if (dotIdx < arcPoints.length) {
          const dp = arcPoints[dotIdx];
          ctx.beginPath();
          ctx.arc(dp.sx, dp.sy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // City markers
    const projectedCities: {
      loc: ExchangeLocation;
      sx: number;
      sy: number;
    }[] = [];

    for (const loc of locations) {
      const p = projectLoc(loc);
      if (!p) continue;
      projectedCities.push({ loc, sx: p.sx, sy: p.sy });

      const color = regionColor[loc.region] || "#8b7aff";
      const isHQ = loc.id === "nyc";

      // Outer pulse ring
      const pulseR = 10 + 4 * Math.sin(time * 2 + locations.indexOf(loc) * 0.7);
      const pulseA = 0.15 + 0.1 * Math.cos(time * 2 + locations.indexOf(loc) * 0.7);
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = pulseA;
      ctx.lineWidth = isHQ ? 1.5 : 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Inner ring
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, isHQ ? 6 : 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = isHQ ? 2 : 1.2;
      ctx.globalAlpha = 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Core dot
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, isHQ ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // City label
      ctx.font = isHQ
        ? `600 ${Math.max(9, R * 0.04)}px Inter, sans-serif`
        : `400 ${Math.max(8, R * 0.035)}px Inter, sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,${isHQ ? 0.85 : 0.6})`;
      ctx.textAlign = "center";
      ctx.fillText(isHQ ? "Headquarters" : loc.city, p.sx, p.sy - (isHQ ? 14 : 10));

      // "Coming soon" badge
      if (loc.status === "upcoming") {
        ctx.font = `400 ${Math.max(7, R * 0.025)}px Inter, sans-serif`;
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText("Coming soon", p.sx, p.sy + 14);
      }
    }

    // Store projected cities for hit-testing
    (canvas as any).__cities = projectedCities;

    // Auto-rotate
    if (autoRotateRef.current && !isDragging.current) {
      rotYRef.current += 0.002;
    }

    timeRef.current += 0.016;
    frameRef.current = requestAnimationFrame(draw);
  }, [size]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw]);

  /* Interaction handlers */
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    autoRotateRef.current = false;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      rotYRef.current += dx * 0.005;
      rotXRef.current = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, rotXRef.current + dy * 0.005),
      );
      lastMouse.current = { x: e.clientX, y: e.clientY };
      setTooltip(null);
    } else {
      // Hover hit-test
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cities = (canvas as any).__cities as
        | { loc: ExchangeLocation; sx: number; sy: number }[]
        | undefined;

      if (cities) {
        let found = false;
        for (const c of cities) {
          const dx = mx - c.sx;
          const dy = my - c.sy;
          if (dx * dx + dy * dy < 225) {
            setTooltip({ loc: c.loc, x: c.sx, y: c.sy });
            canvas.style.cursor = "pointer";
            found = true;
            break;
          }
        }
        if (!found) {
          setTooltip(null);
          canvas.style.cursor = "grab";
        }
      }
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    // Resume auto-rotate after 3 seconds
    setTimeout(() => {
      if (!isDragging.current) {
        autoRotateRef.current = true;
      }
    }, 3000);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        style={{
          width: size.w,
          height: size.h,
          cursor: "grab",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          isDragging.current = false;
          setTooltip(null);
        }}
        aria-label="Clear Street global exchange connectivity globe"
        role="img"
      />

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -120%)",
          }}
        >
          <div className="rounded-xl border border-white/10 bg-[#01001f]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: regionColor[tooltip.loc.region] || "#8b7aff" }}
              />
              <span className="font-sans text-[13px] font-semibold text-white">
                {tooltip.loc.city}
              </span>
              <span className="font-sans text-[11px] text-white/40">{tooltip.loc.region}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tooltip.loc.exchanges.map((ex) => (
                <span
                  key={ex}
                  className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-sans text-[11px] text-white/80"
                >
                  {ex}
                </span>
              ))}
            </div>
            {tooltip.loc.status === "upcoming" && (
              <p className="mt-1.5 font-sans text-[10px] text-amber-400/70">Coming soon</p>
            )}
          </div>
        </div>
      )}

      {/* Subtle instruction */}
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[10px] text-white/25">
        Drag to rotate
      </p>
    </div>
  );
}
