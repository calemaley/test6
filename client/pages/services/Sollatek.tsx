import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const sollatekProducts = [
  {
    name: "AVS 30",
    spec: "30A Automatic Voltage Switcher",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ffc6f2c0ce6a241baba67c489641b0916?format=webp&width=800",
  },
  {
    name: "TV GUARD",
    spec: "Socket-based surge and brownout protection",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F2fb4ec29e0bb47479e6335b383c45917?format=webp&width=800",
  },
  {
    name: "SVS Stabilizer",
    spec: "Single-phase automatic voltage stabilizer",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fb8c40b976b2141f9b3c6442591307952?format=webp&width=800",
  },
  {
    name: "VoltRight AVR (3-Phase)",
    spec: "Microprocessor controlled automatic voltage regulator",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fc53f0a5580304c0c84bf3074685c3d82?format=webp&width=800",
  },
  {
    name: "Solar PV Modules",
    spec: "High-efficiency PV panels for clean energy",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fcab6c155c8454211829e8626cae69dea?format=webp&width=800",
  },
];

const accessories = [
  {
    name: "MV Cable Termination Kit (Cold-shrink)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fff40287862b84c06bd6fa22d21d75870?format=webp&width=800",
  },
  {
    name: "Outdoor Cable Termination Set",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F89921a3907eb431fa09a449103699755?format=webp&width=800",
  },
  {
    name: "Ground Resistance Tester",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F146e41a559fe4a69bdc0bb7b1f209829?format=webp&width=800",
  },
  {
    name: "Cables & Turbine Components",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F88fb5cdeacef41a9b9b1debfa8cd7b12?format=webp&width=800",
  },
  {
    name: "MV Power Cables (Cross-section)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F8db10633201141b58fcf0be272c07cb6?format=webp&width=800",
  },
];

export default function Sollatek() {
  return (
    <div className="bg-background">
      <section className="section">
        <h1 className="section-title">Sollatek Products</h1>
        <p className="section-subtitle">
          Genuine Sollatek protection with 5-year warranty. Safeguard your
          equipment and ensure clean, stable power.
        </p>

        {/* Featured Sollatek range */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sollatekProducts.map((p) => (
            <div
              key={p.name}
              className="group overflow-hidden rounded-xl border bg-white shadow-sm hover-card"
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted/40">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white shadow">
                  5-year warranty
                </span>
              </div>
              <div className="p-4">
                <div className="font-display font-bold text-primary">
                  {p.name}
                </div>
                <div className="mt-1 text-sm text-foreground/70">{p.spec}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Accessories and tools we supply */}
        <h2 className="mt-12 font-display text-2xl font-extrabold text-primary">
          Accessories & Tools
        </h2>
        <p className="mt-1 text-foreground/70 text-sm">
          Terminations, testers and cabling to complete your protection and power
          quality projects.
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accessories.map((a) => (
            <div key={a.name} className="rounded-xl border bg-white shadow-sm">
              <div className="h-44 w-full overflow-hidden bg-muted/40">
                <img
                  src={a.img}
                  alt={a.name}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-sm font-medium text-foreground/80">
                {a.name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white bg-gradient-to-r from-primary to-secondary shadow-lg ring-1 ring-primary/30 transition hover:-translate-y-0.5 hover:shadow-xl after:absolute after:inset-0 after:bg-white/10 after:opacity-0 group-hover:after:opacity-100 after:transition"
          >
            <Sparkles className="h-5 w-5" />
            Purchase Inquiry
          </Link>
          <p className="mt-2 text-xs text-foreground/60">Fast response — sizing guidance and pricing included.</p>
        </div>
      </section>
    </div>
  );
}
