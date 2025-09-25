import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gradient-to-b from-white to-accent/20">
      <div className="section grid gap-10 md:grid-cols-4">
        <div className="transition hover:-translate-y-0.5">
          <div className="font-display text-2xl font-extrabold text-primary">JBRANKY LTD</div>
          <p className="mt-3 text-sm text-foreground/70">
            Premium solutions in hydropower, large power & medium-voltage systems,
            and Sollatek protection across industrial, commercial and government sectors.
          </p>
        </div>
        <div className="transition hover:-translate-y-0.5">
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-foreground/70">
            <li><Link className="hover:text-primary" to="/about">Who We Are</Link></li>
            <li><Link className="hover:text-primary" to="/services">What We Do</Link></li>
            <li><Link className="hover:text-primary" to="/projects">Projects</Link></li>
            <li><Link className="hover:text-primary" to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="transition hover:-translate-y-0.5">
          <div className="font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-foreground/70 text-sm">
            <li>Phone: +254 000 000 000</li>
            <li>Email: info@jbranky.com</li>
            <li>HQ: Nairobi, Kenya</li>
          </ul>
        </div>
        <div className="transition hover:-translate-y-0.5">
          <div className="font-semibold mb-3">Get Started</div>
          <Link to="/contact" className="btn-primary">Request a Quote</Link>
          <p className="mt-3 text-xs text-foreground/60">We respond within 1 business day.</p>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto container-padding py-6 text-xs text-foreground/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} JBRANKY LTD. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-foreground/50">Powering reliability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
