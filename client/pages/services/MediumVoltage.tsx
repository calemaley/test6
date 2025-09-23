import { Link } from "react-router-dom";

export default function MediumVoltage() {
  return (
    <div className="bg-background">
      <section className="section">
        <h1 className="section-title">Large Power & Medium-Voltage</h1>
        <p className="section-subtitle">
          Substations, switchgear, protection and grid interconnection.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            [
              "Design & Build",
              "11kV–132kV substations, cable routing, grounding.",
            ],
            [
              "Testing & Commissioning",
              "Primary/secondary injection, relay settings, FAT/SAT.",
            ],
            [
              "Safety & Compliance",
              "IEC standards, arc-flash, thermography, audits.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="font-display font-bold text-primary">{t}</div>
              <p className="mt-2 text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/contact" className="btn-primary">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
