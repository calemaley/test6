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
    id: "hydro-alpha",
    title: "Hydropower Plant – Alpha Dam",
    img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Hydropower", "Installation"],
  },
  {
    id: "mv-substation",
    title: "132kV Substation Upgrade",
    img: "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Medium-Voltage", "Testing"],
  },
  {
    id: "sollatek-hq",
    title: "Hospital Equipment Protection – Sollatek",
    img: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Sollatek", "Protection"],
  },
  {
    id: "grid-integration",
    title: "Industrial Grid Integration",
    img: "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Large Power", "Integration"],
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
