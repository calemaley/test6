import { Link } from "react-router-dom";

const services = [
  { slug: "hydropower", title: "Hydropower Plant Solutions", desc: "Feasibility, EPC, O&M, and performance optimization." },
  { slug: "medium-voltage", title: "Large Power & Medium-Voltage", desc: "Substations, grid integration, protection and testing." },
  { slug: "sollatek", title: "Sollatek Products", desc: "Voltage stabilizers, surge & power conditioning with specs and PDFs." },
];

export default function Services() {
  return (
    <div className="bg-background">
      {/* Section 1: Name header only */}
      <section className="section">
        <h1 className="section-title">Services</h1>
      </section>

      {/* Section 2: Services Grid */}
      <section className="section">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="font-display text-lg font-bold text-primary group-hover:underline">{s.title}</div>
              <p className="mt-2 text-foreground/70">{s.desc}</p>
              <div className="mt-4 inline-block text-sm text-secondary font-semibold">Learn more →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: Capabilities */}
      <section className="section">
        <h2 className="section-title">Capabilities</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["Design & Engineering", "Electrical design, protection, SCADA and controls."],
            ["Procurement", "OEM sourcing, vendor management, logistics."],
            ["Construction (EPC)", "Civil, electro-mechanical, installation & wiring."],
            ["Testing & Commissioning", "Primary/secondary injection, relay settings, FAT/SAT."],
            ["Operations & Maintenance", "Preventive programs, spares, uptime optimization."],
            ["HSE & Compliance", "IEC, NFPA, national grid codes and safety audits."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="font-display font-bold text-primary">{t}</div>
              <p className="mt-2 text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Delivery Process */}
      <section className="section">
        <h2 className="section-title">Our Delivery Process</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-6">
          {[
            "Discovery",
            "Feasibility",
            "Design",
            "Build",
            "Commission",
            "Maintain",
          ].map((step, i) => (
            <div key={step} className="rounded-xl border bg-white p-4 text-center">
              <div className="font-display text-primary font-bold">{i + 1}</div>
              <div className="mt-1 text-sm">{step}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Industries */}
      <section className="section">
        <h2 className="section-title">Industries we serve</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Utilities","Manufacturing","Healthcare","Oil & Gas","Mining","Data Centers","Public Sector"].map((i) => (
            <span key={i} className="rounded-full border px-4 py-2 text-sm bg-white">{i}</span>
          ))}
        </div>
      </section>

      {/* Section 6: Compliance & Certifications */}
      <section className="section">
        <h2 className="section-title">Compliance & Certifications</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {["ISO 9001","ISO 45001","IEC Standards","Utility Vendor"].map((b) => (
            <div key={b} className="rounded-xl border bg-white p-6 text-center shadow-sm">
              <div className="font-display font-bold text-primary">{b}</div>
              <div className="mt-1 text-sm text-foreground/60">Audited and certified</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="section">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-8 md:p-12 text-white">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="font-display text-2xl md:text-3xl font-extrabold">Ready to power your project?</div>
              <p className="mt-2 text-white/85">Book a consultation or request a detailed scope and quote.</p>
            </div>
            <Link to="/contact" className="btn-secondary bg-white text-primary border-white hover:bg-white/90">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
