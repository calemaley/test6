import { useParams, Link } from "react-router-dom";
import { getProject, projects } from "./data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? getProject(id) : null;

  if (!project) {
    return (
      <section className="section">
        <h1 className="section-title">Project not found</h1>
        <Link to="/projects" className="btn-secondary mt-4">
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <div className="bg-background">
      <section className="section">
        <div className="flex items-center justify-between gap-4">
          <h1 className="section-title">{project.title}</h1>
          <Link to="/projects" className="btn-secondary">
            All Projects
          </Link>
        </div>
        <p className="section-subtitle">Category: {project.category}</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-80 object-cover rounded-xl border"
          />
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="font-display font-bold text-primary">Summary</div>
            <p className="mt-2 text-foreground/70">{project.summary}</p>
            <ul className="mt-4 list-disc pl-5 text-sm text-foreground/70 space-y-1">
              <li>Scope: Design, installation and commissioning</li>
              <li>Standards: IEC, local grid code compliance</li>
              <li>
                Outcomes: Uptime improvement, safety alignment, energy savings
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.gallery.map((g, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <button className="group rounded-lg overflow-hidden border bg-white hover:shadow">
                  <img
                    src={g}
                    alt={`${project.title} ${i + 1}`}
                    className="h-36 w-full object-cover transition group-hover:scale-[1.03]"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                </DialogHeader>
                <img
                  src={g}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full rounded-md object-cover"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [
              "Objectives",
              "Reliability, safety, and cost efficiency with minimal downtime.",
            ],
            [
              "Challenges",
              "Tight timelines, complex interfaces and compliance constraints.",
            ],
            ["Results", "Exceeded performance targets; audited and certified."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="font-display font-bold text-primary">{t}</div>
              <p className="mt-2 text-foreground/70 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
