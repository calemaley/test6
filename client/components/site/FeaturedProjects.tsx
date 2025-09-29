import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const projects = [
  {
    id: "switchyard-walkway",
    title: "Switchyard Walkway & Bays",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F33aea13ea9494ee69c6c338a8d498329?format=webp&width=1200",
    tags: ["Medium-Voltage", "Construction"],
  },
  {
    id: "control-panel-assembly",
    title: "Field Cable Jointing",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fd28622a6527a4177b39f9bd581ebf55b?format=webp&width=1200",
    tags: ["Commissioning", "Wiring"],
  },
  {
    id: "field-cable-jointing",
    title: "Control Panel Assembly",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fa83e596cd398406589662ab8548e3500?format=webp&width=1200",
    tags: ["MV Cables", "Execution"],
  },
  {
    id: "transformer-yard-equipment",
    title: "Transformer Yard Equipment",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F41cf144db0c04ec085ea6ce20c2565d7?format=webp&width=1200",
    tags: ["Switchyard", "Assets"],
  },
];

export default function FeaturedProjects() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);

  return (
    <section className="section">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6 mb-8">
        <h2 className="section-title">Featured Projects</h2>
        <a href="/projects" className="inline-block btn-secondary mt-3 sm:mt-0">
          View All Projects
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <Dialog key={p.id}>
            <DialogTrigger asChild>
              <button
                onClick={() => setActive(p)}
                className="group relative overflow-hidden rounded-xl border bg-card text-left shadow-sm hover-card"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <div className="font-display font-bold text-primary">
                    {p.title}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs rounded-full bg-accent px-2 py-1 text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              {active && (
                <div>
                  <DialogHeader>
                    <DialogTitle>{active.title}</DialogTitle>
                    <DialogDescription>
                      Project case study preview
                    </DialogDescription>
                  </DialogHeader>
                  <img
                    src={active.img}
                    alt={active.title}
                    className="mt-2 mb-4 w-full rounded-lg object-cover"
                  />
                  <p className="text-foreground/70">
                    Highlights from our field execution, installation quality,
                    and safety-first delivery.
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
