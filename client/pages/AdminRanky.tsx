import { useEffect, useState } from "react";

export default function AdminRanky() {
  const [service, setService] = useState(0);
  const [consult, setConsult] = useState(0);
  const [general, setGeneral] = useState(0);

  useEffect(() => {
    const read = (k: string) => Number(localStorage.getItem(k) || "0");
    setService(read("metrics:service"));
    setConsult(read("metrics:consultation"));
    setGeneral(read("metrics:general"));
  }, []);

  const reset = () => {
    localStorage.removeItem("metrics:service");
    localStorage.removeItem("metrics:consultation");
    localStorage.removeItem("metrics:general");
    setService(0);
    setConsult(0);
    setGeneral(0);
  };

  return (
    <section className="section">
      <h1 className="section-title">Admin Dashboard</h1>
      <p className="section-subtitle">
        Quote and consultation metrics (local device storage)
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-foreground/60">Request Service</div>
          <div className="font-display text-4xl font-extrabold text-primary">
            {service}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-foreground/60">Book Consultation</div>
          <div className="font-display text-4xl font-extrabold text-primary">
            {consult}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-foreground/60">General Inquiry</div>
          <div className="font-display text-4xl font-extrabold text-primary">
            {general}
          </div>
        </div>
      </div>
      <button onClick={reset} className="btn-secondary mt-8">
        Reset Counters
      </button>
    </section>
  );
}
