import { Link } from "react-router-dom";

export default function Placeholder({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle">
          {subtitle ?? "This page is ready to be filled with tailored content. Share details and I'll build it out next."}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/contact" className="btn-primary">Request a Quote</Link>
          <Link to="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
