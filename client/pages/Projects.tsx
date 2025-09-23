import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Project = {
  id: string;
  title: string;
  category: "Hydropower" | "Medium-Voltage" | "Sollatek";
  img: string;
};

const allProjects: Project[] = [
  { id: "p1", title: "Run-of-River Plant", category: "Hydropower", img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: "p2", title: "Substation 132kV", category: "Medium-Voltage", img: "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: "p3", title: "Hospital Protection", category: "Sollatek", img: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: "p4", title: "Grid Integration", category: "Medium-Voltage", img: "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200" },
  { id: "p5", title: "Intake Rehabilitation", category: "Hydropower", img: "https://images.pexels.com/photos/635438/pexels-photo-635438.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

export default function Projects() {
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const filtered = useMemo(() => (filter === "All" ? allProjects : allProjects.filter(p => p.category === filter)), [filter]);

  return (
    <div className="bg-background">
      <section className="section">
        <h1 className="section-title">Projects & Case Studies</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {["All", "Hydropower", "Medium-Voltage", "Sollatek"].map((c) => (
            <button key={c} onClick={() => setFilter(c as any)} className={`rounded-full border px-4 py-2 text-sm ${filter === c ? "bg-primary text-white" : "bg-white hover:bg-accent"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Dialog key={p.id}>
              <DialogTrigger asChild>
                <button onClick={() => setActive(p)} className="group overflow-hidden rounded-xl border bg-card text-left shadow-sm">
                  <img src={p.img} alt={p.title} className="h-48 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="p-4">
                    <div className="font-display font-bold text-primary">{p.title}</div>
                    <div className="mt-1 text-xs text-foreground/60">{p.category}</div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                {active && (
                  <div>
                    <img src={active.img} alt={active.title} className="mb-4 w-full rounded-lg object-cover" />
                    <h3 className="font-display text-xl font-bold text-primary">{active.title}</h3>
                    <p className="mt-2 text-foreground/70">Scope, challenges, and outcomes with performance metrics.</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </div>
  );
}
