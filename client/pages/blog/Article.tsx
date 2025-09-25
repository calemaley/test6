import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const articles: Record<string, { title: string; hero: string }> = {
  "hydropower-efficiency-myths": {
    title: "Hydropower Efficiency Myths",
    hero: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  "mv-substation-safety-checklist": {
    title: "MV Substation Safety Checklist",
    hero: "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  "why-sollatek-for-hospitals": {
    title: "Why Sollatek for Hospitals",
    hero: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  "grid-scale-storage-trends": {
    title: "Grid-Scale Storage Trends",
    hero: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
};

function AnimatedTitle({ text }: { text: string }) {
  return (
    <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: i * 0.02 }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  );
}

const gradients = [
  "from-primary to-emerald-500",
  "from-secondary to-blue-600",
  "from-blue-600 to-emerald-400",
  "from-emerald-500 to-primary",
];

const paragraphs = Array.from({ length: 60 }).map((_, i) =>
  `In the evolving landscape of modern energy, JBRANKY LTD champions resilient infrastructure and protection-first design. Section ${i + 1}: we examine grid dynamics, hydrological variance, relay coordination, and practical lessons learned in the field. Our teams combine scientific rigor with operational pragmatism—turning complex constraints into measurable outcomes.`,
);

export default function Article() {
  const { slug } = useParams();
  const meta = slug ? articles[slug] : undefined;
  if (!meta) {
    return (
      <section className="section">
        <h1 className="section-title">Article not found</h1>
        <Link to="/blog" className="btn-secondary mt-4">Back to Blog</Link>
      </section>
    );
  }

  return (
    <article className="bg-background">
      <section className="section">
        <div className="mb-4">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm hover:bg-accent transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
        <AnimatedTitle text={meta.title} />
        <p className="section-subtitle">Long-form article with immersive visuals and motion.</p>
        <img src={meta.hero} alt={meta.title} className="mt-6 w-full h-80 object-cover rounded-2xl border" />
      </section>

      <section className="section">
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20, skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.03 }}
              className="text-foreground/90"
            >
              {p}
            </motion.p>
          ))}

          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            src={meta.hero}
            alt="related visual"
            className="my-8 w-full rounded-xl border shadow-sm"
          />
        </div>
      </section>
    </article>
  );
}
