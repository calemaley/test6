import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const animate = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              setValue(Math.floor(t * target));
              if (t < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value } as const;
}

export default function Stats() {
  const years = useCountUp(8);
  const projects = useCountUp(6);
  const uptime = useCountUp(99);

  return (
    <section className="section">
      <div className="relative overflow-hidden rounded-2xl text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fc639d8b88a3e448cbf81657d2db8e10f?alt=media&token=bb363018-09d5-42af-9391-d532002b2802&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-blue-600/80" />
        <div className="relative p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div ref={years.ref}>
              <div className="font-display text-5xl font-extrabold">
                {years.value}+
              </div>
              <div className="mt-2 text-white/80">Years in business</div>
            </div>
            <div ref={projects.ref}>
              <div className="font-display text-5xl font-extrabold">
                {projects.value}+
              </div>
              <div className="mt-2 text-white/80">Projects delivered</div>
            </div>
            <div ref={uptime.ref}>
              <div className="font-display text-5xl font-extrabold">
                {uptime.value}%
              </div>
              <div className="mt-2 text-white/80">Equipment uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
