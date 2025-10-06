import { useEffect, useMemo, useRef } from "react";

type SnakeCursorProps = {
  segments?: number;
  color?: string;
};

export default function SnakeCursor({
  segments = 14,
  color = "#16a34a",
}: SnakeCursorProps) {
  const target = useRef({ x: 0, y: 0 });
  const pts = useRef<Array<{ x: number; y: number }>>([]);
  const dots = useRef<HTMLSpanElement[]>([]);
  const raf = useRef<number | null>(null);

  const nodes = useMemo(() => Array.from({ length: segments }), [segments]);

  useEffect(() => {
    // Initialize points
    pts.current = Array.from({ length: segments }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const onMove = (e: MouseEvent | PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    // Support both pointer and mouse events
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const p = pts.current;
      // Head follows target
      p[0].x += (target.current.x - p[0].x) * 0.25;
      p[0].y += (target.current.y - p[0].y) * 0.25;
      // Each segment follows the previous
      for (let i = 1; i < p.length; i++) {
        p[i].x += (p[i - 1].x - p[i].x) * 0.35;
        p[i].y += (p[i - 1].y - p[i].y) * 0.35;
      }

      // Update DOM nodes directly (no React re-render needed)
      for (let i = 0; i < p.length; i++) {
        const el = dots.current[i];
        if (!el) continue;
        const size = Math.max(4, 12 - i * 0.5);
        const opacity = Math.max(0.25, 1 - i * 0.06);
        el.style.transform = `translate3d(${p[i].x - size / 2}px, ${p[i].y - size / 2}px, 0)`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = `${opacity}`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [segments]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      {nodes.map((_, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          ref={(el) => {
            if (el) dots.current[i] = el;
          }}
          className="absolute rounded-full"
          style={{ background: color, boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}
        />
      ))}
    </div>
  );
}
