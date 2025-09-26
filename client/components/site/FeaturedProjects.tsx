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
    id: "mv-transformer-yard",
    title: "MV Transformer Yard & Cable Management",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F22f861ea4024480ab66572fc732eafee?format=webp&width=1200",
    tags: ["Medium-Voltage", "Construction"],
  },
  {
    id: "solar-array",
    title: "Solar PV Field Installation",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F78d103c562394236b50aaca6d58d8527?format=webp&width=1200",
    tags: ["Solar", "EPC"],
  },
  {
    id: "control-panel-wiring",
    title: "Control Panel Wiring & Commissioning",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fac12e975352a4cfdb7515339a8f3e37f?format=webp&width=1200",
    tags: ["Commissioning", "Testing"],
  },
  {
    id: "site-team-setup",
    title: "Site Team – Switchgear & Protection",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fcceb1714a00b45bb8f7584e434f5ac68?format=webp&width=1200",
    tags: ["Team", "Execution"],
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
                    Detailed case study content can include scope, timeline, kVA
                    ratings, compliance, safety notes, and outcomes.
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
