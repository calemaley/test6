import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { articleContent } from "./content";

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

function parseBlocks(body: string) {
  const raw = body
    .replace(/\r\n?/g, "\n")
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return raw.map((block) => {
    if (block.startsWith("## ")) return { type: "h2", text: block.slice(3) } as const;
    if (block.startsWith("> ")) return { type: "quote", text: block.slice(2) } as const;
    if (block.includes("\n- ") || block.startsWith("- ")) {
      const items = block
        .split("\n")
        .filter((l) => l.startsWith("- "))
        .map((l) => l.slice(2));
      return { type: "ul", items } as const;
    }
    return { type: "p", text: block } as const;
  });
}

export default function Article() {
  const { slug } = useParams();
  const meta = slug ? articleContent[slug] : undefined;
  if (!meta) {
    return (
      <section className="section">
        <h1 className="section-title">Article not found</h1>
        <Link to="/blog" className="btn-secondary mt-4">
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="bg-background">
      <section className="section">
        <div className="mb-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm hover:bg-accent transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
        <AnimatedTitle text={meta.title} />
        <p className="section-subtitle">
          Expert analysis, practical checklists, and implementation advice.
        </p>
        <img
          src={meta.hero}
          alt={meta.title}
          className="mt-6 w-full h-80 object-cover rounded-2xl border"
        />
      </section>

      <section className="section">
        <div className="prose prose-lg max-w-none">
          {parseBlocks(meta.body).map((b, i) => {
            if (b.type === "h2")
              return (
                <motion.h2
                  key={`h2-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="mt-10 mb-3 font-display text-2xl text-primary"
                >
                  {b.text}
                </motion.h2>
              );
            if (b.type === "ul")
              return (
                <motion.ul
                  key={`ul-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="list-disc pl-6"
                >
                  {b.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </motion.ul>
              );
            if (b.type === "quote")
              return (
                <motion.blockquote
                  key={`q-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="border-l-4 pl-4 italic text-foreground/80"
                >
                  {b.text}
                </motion.blockquote>
              );
            return (
              <motion.p
                key={`p-${i}`}
                initial={{ opacity: 0, y: 20, skewY: 3 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.03 }}
                className={`bg-gradient-to-r ${gradients[i % gradients.length]} bg-clip-text text-transparent opacity-90 drop-shadow-sm`}
              >
                {b.text}
              </motion.p>
            );
          })}

          {(meta.images ?? []).map((img, k) => (
            <motion.img
              key={`img-${k}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              src={img.src}
              alt={img.alt}
              className="my-8 w-full rounded-xl border shadow-sm"
            />
          ))}
        </div>
      </section>
    </article>
  );
}
