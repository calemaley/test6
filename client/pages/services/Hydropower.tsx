import { Link } from "react-router-dom";

export default function Hydropower() {
  return (
    <div className="bg-background">
      <section className="section">
        <h1 className="section-title">Hydropower Plant Solutions</h1>
        <p className="section-subtitle">From feasibility to commissioning and maintenance.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["Feasibility Studies", "Hydrological analysis, yield forecasts, EIA, ROI."],
            ["EPC Delivery", "Civil, electro-mechanical, protection & controls."],
            ["O&M", "Preventive maintenance, spares, performance optimization."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="font-display font-bold text-primary">{t}</div>
              <p className="mt-2 text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/contact" className="btn-primary">Request a Consultation</Link>
        </div>
      </section>
    </div>
  );
}
