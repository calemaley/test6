import { Link } from "react-router-dom";

const services = [
  {
    slug: "hydropower",
    title: "Hydropower Plant Solutions",
    desc: "Feasibility, EPC, O&M, and performance optimization.",
  },
  {
    slug: "medium-voltage",
    title: "Large Power & Medium-Voltage",
    desc: "Substations, grid integration, protection and testing.",
  },
  {
    slug: "sollatek",
    title: "Sollatek Products",
    desc: "Voltage stabilizers, surge & power conditioning with specs and PDFs.",
  },
];

export default function Services() {
  return (
    <div className="bg-background">
      <section className="section">
        <h1 className="section-title">Our Services</h1>
        <p className="section-subtitle">Expert engineering across generation, distribution, and protection.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="font-display text-lg font-bold text-primary group-hover:underline">{s.title}</div>
              <p className="mt-2 text-foreground/70">{s.desc}</p>
              <div className="mt-4 inline-block text-sm text-secondary font-semibold">Learn more →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
