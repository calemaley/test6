import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

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
  {
    quote:
      "Professional, responsive, and technically superior—JBRANKY is our preferred MV partner.",
    author: "Electrical Manager, Manufacturing Plant",
  },
  {
    quote:
      "From feasibility to commissioning, execution was flawless and transparent.",
    author: "Program Lead, Public Sector Utility",
  },
];

const videoUrls = [
  "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fc639d8b88a3e448cbf81657d2db8e10f?alt=media&token=bb363018-09d5-42af-9391-d532002b2802&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
  "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fb119b8ffe279469db3e1f3e2a4ef3082?alt=media&token=0603722e-5e04-4194-aa67-f66d30d68071&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
  "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F92876b0001ec4e33a91008a26064e29e?alt=media&token=2c4351fc-6f28-4e3d-80cb-57a5b9e81ce0&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
  "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fd81021f04e0546dc91811231bd63c1a8?alt=media&token=c6be6a9f-84f2-4f49-823e-7e9f6ad13d05&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect as any);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi],
  );

  return (
    <section className="section">
      <div className="text-center mb-10">
        <h2 className="section-title">What our clients say</h2>
        <p className="section-subtitle">
          Verified testimonials from long-term industrial, healthcare and
          public-sector partners.
        </p>
      </div>
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={scrollPrev}
          className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-2 shadow hover:bg-accent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={scrollNext}
          className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-2 shadow hover:bg-accent"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-4 md:gap-6 px-2">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="embla__slide min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%]"
              >
                <motion.blockquote
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className="relative h-full overflow-hidden rounded-2xl border shadow-md p-0"
                >
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={videoUrls[i % videoUrls.length]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative z-10 p-8">
                    <Quote className="h-8 w-8 text-white/90" />
                    <p className="mt-4 text-xl leading-relaxed text-white/90">
                      “{t.quote}”
                    </p>
                    <footer className="mt-6 text-sm font-semibold text-white/80">
                      {t.author}
                    </footer>
                  </div>
                </motion.blockquote>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${i === selected ? "bg-primary" : "bg-foreground/20 hover:bg-foreground/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
