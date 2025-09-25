import { useEffect, useMemo, useRef, useState } from "react";

export default function SnakeCursor({
  segments = 14,
  color = "#16a34a",
}: {
  segments?: number;
  color?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const pts = useRef<Array<{ x: number; y: number }>>([]);
  const raf = useRef<number | null>(null);

  const nodes = useMemo(() => Array.from({ length: segments }), [segments]);

  useEffect(() => {
    pts.current = Array.from({ length: segments }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const p = pts.current;
      // Head follows mouse
      p[0].x += (target.current.x - p[0].x) * 0.25;
      p[0].y += (target.current.y - p[0].y) * 0.25;
      // Each segment follows the previous
      for (let i = 1; i < p.length; i++) {
        p[i].x += (p[i - 1].x - p[i].x) * 0.35;
        p[i].y += (p[i - 1].y - p[i].y) * 0.35;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    setMounted(true);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [segments]);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {nodes.map((_, i) => {
        const p = pts.current[i] || { x: 0, y: 0 };
        const size = Math.max(4, 12 - i * 0.5);
        const opacity = Math.max(0.25, 1 - i * 0.06);
        const style: React.CSSProperties = {
          transform: `translate3d(${p.x - size / 2}px, ${p.y - size / 2}px, 0)`,
          width: size,
          height: size,
          background: color,
          opacity,
          borderRadius: 9999,
          boxShadow: `0 0 8px rgba(22,163,74,${0.15 * opacity})`,
        };
        return <span key={i} style={style} className="absolute" />;
      })}
    </div>
  );
}
