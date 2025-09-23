import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const testimonials = [
  {
    quote:
      "JBRANKY delivered our substation upgrade on time with impeccable safety compliance.",
    author: "Head of Operations, Industrial Client",
  },
  {
    quote:
      "Their hydropower team is world-class. Efficiency gains surpassed projections.",
    author: "Project Director, Energy Authority",
  },
  {
    quote:
      "Sollatek solutions from JBRANKY have protected our sensitive equipment 24/7.",
    author: "Facilities Manager, Hospital Network",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  useEffect(() => {
    if (!emblaApi) return;
    let raf = 0;
    const step = () => {
      emblaApi?.scrollBy(0.25, true);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [emblaApi]);

  return (
    <section className="section">
      <div className="text-center mb-10">
        <h2 className="section-title">What our clients say</h2>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="embla__slide flex-[0_0_86%] md:flex-[0_0_40%]">
              <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-lg text-foreground/90">“{t.quote}”</p>
                <p className="mt-4 text-sm text-foreground/60">{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
