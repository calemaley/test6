import { motion } from "framer-motion";

const milestones = [
  { year: 2012, title: "Founded", desc: "JBRANKY LTD is established to deliver reliable energy solutions." },
  { year: 2015, title: "First Hydropower EPC", desc: "Completed turnkey hydropower installation for a municipal client." },
  { year: 2019, title: "National Partnerships", desc: "Became a recognized partner to grid authorities and OEMs." },
  { year: 2023, title: "Healthcare Protection", desc: "Deployed Sollatek protection across multi-site hospital network." },
];

export default function About() {
  return (
    <div className="bg-background">
      <section className="section">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="section-title">About JBRANKY LTD</h1>
            <p className="section-subtitle">Innovation, reliability and safety in every watt.</p>
            <p className="mt-6 text-foreground/80">
              We are a premium energy solutions company specializing in hydropower plant systems, large power and medium-voltage infrastructure, and Sollatek power-protection products. Our multidisciplinary teams deliver feasibility, EPC, testing and lifecycle maintenance.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm border">
            <img src="https://images.pexels.com/photos/8294552/pexels-photo-8294552.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Team at work" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Milestones</h2>
        <div className="mt-8 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} className="relative md:grid md:grid-cols-2 md:gap-10">
                <div className="md:text-right md:pr-10">
                  <div className="font-display text-primary text-3xl font-extrabold">{m.year}</div>
                  <div className="font-semibold">{m.title}</div>
                </div>
                <div className="md:pl-10">
                  <p className="text-foreground/70">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Our Values</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["Safety First", "Uncompromising commitment to safety and compliance."],
            ["Integrity", "Transparent processes, honest communication, dependable delivery."],
            ["Sustainability", "Engineering for efficiency and environmental stewardship."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="font-display text-lg font-bold text-primary">{t}</div>
              <p className="mt-2 text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
