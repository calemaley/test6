import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const logos = [
  { name: "ISO 9001", text: true },
  { name: "IEC Certified", text: true },
  { name: "Govt Vendor", text: true },
  { name: "Energy Safe", text: true },
  { name: "PowerGrid Partner", text: true },
  { name: "HydroPro", text: true },
];

export default function LogosCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 2200);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="section pt-10">
      <div className="text-center mb-6">
        <p className="text-sm uppercase tracking-widest text-foreground/50">Trusted by industry leaders</p>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {logos.map((l) => (
            <div key={l.name} className="embla__slide flex-[0_0_160px] grid place-items-center">
              <div className="h-12 w-[150px] rounded-md border bg-white grid place-items-center text-foreground/60 text-sm font-semibold">
                {l.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
