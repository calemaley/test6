import { useMemo, useState } from "react";

const posts = [
  { id: "b1", title: "Hydropower Efficiency Myths", category: "Hydropower" },
  { id: "b2", title: "MV Substation Safety Checklist", category: "Medium-Voltage" },
  { id: "b3", title: "Why Sollatek for Hospitals", category: "Sollatek" },
  { id: "b4", title: "Grid-Scale Storage Trends", category: "Industry" },
];

export default function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => posts.filter(p => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(query.toLowerCase())), [query, cat]);

  return (
    <section className="section">
      <h1 className="section-title">Insights & News</h1>
      <div className="mt-6 flex flex-wrap gap-3 items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts..." className="rounded-md border px-3 py-2" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-md border px-3 py-2">
          {['All','Hydropower','Medium-Voltage','Sollatek','Industry'].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.map(p => (
          <article key={p.id} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-primary">{p.title}</h3>
            <p className="mt-2 text-foreground/70 text-sm">Category: {p.category}</p>
            <button className="mt-4 btn-secondary">Read more</button>
          </article>
        ))}
      </div>
    </section>
  );
}
