import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const logos = [
  {
    name: "ISO 9001",
    svg: (
      <svg viewBox="0 0 160 48" className="h-10 w-[150px] text-primary">
        <rect
          rx="8"
          width="160"
          height="48"
          fill="currentColor"
          opacity="0.08"
        />
        <circle cx="28" cy="24" r="12" fill="currentColor" />
        <text
          x="56"
          y="30"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="#0A2A4F"
        >
          ISO 9001
        </text>
      </svg>
    ),
  },
  {
    name: "IEC Certified",
    svg: (
      <svg viewBox="0 0 160 48" className="h-10 w-[150px] text-primary">
        <rect
          rx="8"
          width="160"
          height="48"
          fill="currentColor"
          opacity="0.08"
        />
        <path d="M20 14h16v20H20z" fill="currentColor" />
        <text
          x="56"
          y="30"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="#0A2A4F"
        >
          IEC
        </text>
      </svg>
    ),
  },
  {
    name: "Govt Vendor",
    svg: (
      <svg viewBox="0 0 160 48" className="h-10 w-[150px] text-primary">
        <rect
          rx="8"
          width="160"
          height="48"
          fill="currentColor"
          opacity="0.08"
        />
        <polygon points="24,12 36,24 24,36 12,24" fill="currentColor" />
        <text
          x="56"
          y="30"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill="#0A2A4F"
        >
          Govt Vendor
        </text>
      </svg>
    ),
  },
  {
    name: "Energy Safe",
    svg: (
      <svg viewBox="0 0 160 48" className="h-10 w-[150px] text-primary">
        <rect
          rx="8"
          width="160"
          height="48"
          fill="currentColor"
          opacity="0.08"
        />
        <path
          d="M20 32c8-6 16-6 24 0"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="56"
          y="30"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill="#0A2A4F"
        >
          Energy Safe
        </text>
      </svg>
    ),
  },
  {
    name: "PowerGrid Partner",
    svg: (
      <svg viewBox="0 0 160 48" className="h-10 w-[150px] text-primary">
        <rect
          rx="8"
          width="160"
          height="48"
          fill="currentColor"
          opacity="0.08"
        />
        <path
          d="M16 16h20M16 24h20M16 32h20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="56"
          y="30"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="12"
          fill="#0A2A4F"
        >
          PowerGrid Partner
        </text>
      </svg>
    ),
  },
  {
    name: "HydroPro",
    svg: (
      <svg viewBox="0 0 160 48" className="h-10 w-[150px] text-primary">
        <rect
          rx="8"
          width="160"
          height="48"
          fill="currentColor"
          opacity="0.08"
        />
        <path d="M28 12c6 6 6 18 0 24C22 30 22 18 28 12z" fill="currentColor" />
        <text
          x="56"
          y="30"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill="#0A2A4F"
        >
          HydroPro
        </text>
      </svg>
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
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {logos.map((l) => (
            <div
              key={l.name}
              className="embla__slide flex-[0_0_180px] grid place-items-center"
            >
              <div className="rounded-md bg-white p-2 shadow-sm border">
                {l.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
