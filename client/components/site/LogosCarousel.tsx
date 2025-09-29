import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const logos = [
  {
    name: "YETU",
    svg: (
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F1caa239000c64be293c5785261ff0be9%2Fbc689f03b21944faacc4cc286fed9672?format=webp&width=800"
        alt="YETU logo"
        className="h-10 w-auto object-contain md:h-12"
      />
    ),
  },
  {
    name: "Sollatek",
    svg: (
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F1caa239000c64be293c5785261ff0be9%2Fea5a6d477beb44f188a58d91e59a8595?format=webp&width=800"
        alt="Sollatek logo"
        className="h-10 w-auto object-contain md:h-12"
      />
    ),
  },
  {
    name: "GNC",
    svg: (
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F1caa239000c64be293c5785261ff0be9%2Fa458a1e985fd47a5ac1c3fcc34c49523?format=webp&width=800"
        alt="GNC logo"
        className="h-10 w-auto object-contain md:h-12"
      />
    ),
  },
  {
    name: "CHINT",
    svg: (
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F1caa239000c64be293c5785261ff0be9%2F8c4f5733d3834f0faf843c1ca459093c?format=webp&width=800"
        alt="CHINT logo"
        className="h-10 w-auto object-contain md:h-12"
      />
    ),
  },
];

export default function LogosCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

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
        <p className="text-sm uppercase tracking-widest text-foreground/50">
          Trusted by industry leaders
        </p>
      </div>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {logos.map((l) => (
            <div
              key={l.name}
              className="embla__slide flex-[0_0_180px] grid place-items-center"
            >
              <div className="rounded-md bg-white p-2 shadow-sm border hover-card">
                {l.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
