import { motion } from "framer-motion";
import { Bolt, ShieldCheck, Waves } from "lucide-react";

const services = [
  {
    title: "Hydropower Plant Solutions",
    desc: "Feasibility, installation, operations & maintenance for reliable generation.",
    Icon: Waves,
    color: "from-primary to-blue-400",
  },
  {
    title: "Large Power & Medium-Voltage",
    desc: "Industrial infrastructure, grid integration and comprehensive testing.",
    Icon: Bolt,
    color: "from-secondary to-emerald-400",
  },
  {
    title: "Sollatek Protection",
    desc: "Voltage stabilizers, surge protection and power conditioning systems.",
    Icon: ShieldCheck,
    color: "from-emerald-400 to-secondary",
  },
];

export default function ServiceHighlights() {
  return (
    <section className="section">
      <div className="flex items-end justify-between gap-6 mb-8">
        <h2 className="section-title">End-to-End Power Expertise</h2>
        <a href="/services" className="hidden md:inline-block btn-secondary">
          Explore Services
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map(({ title, desc, Icon, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.05 * i, duration: 0.5 }}
            className="group rounded-xl border bg-white p-6 shadow-sm transition hover-card"
          >
            <div
              className={`mb-4 h-12 w-12 rounded-lg bg-gradient-to-br ${color} grid place-items-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold text-primary">
              {title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
