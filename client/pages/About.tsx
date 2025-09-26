import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const milestones = [
  {
    year: 2025,
    title: "Commissioned Projects Successfully",
    desc: "All delivered programs have been commissioned to client expectations, including KPLC reactive power projects under Chint; electrical design, terminations, testing and commissioning for Magiro Hydropower; KTDA hydro projects under Jiangxi Water and Hydropower Construction K Limited.",
  },
];

const team = [
  {
    name: "JOSEPH MICHIEKA",
    role: "PROJECTS MANAGER / DIRECTOR",
    img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Leads project delivery, stakeholder coordination and commissioning oversight across hydropower and MV programs.",
  },
  {
    name: "LILIAN MUTHURI",
    role: "ACCOUNTANT / DIRECTOR",
    img: "https://images.pexels.com/photos/3775536/pexels-photo-3775536.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Oversees finance, compliance and efficient allocation of project resources.",
  },
  {
    name: "NORMAN ODERO",
    role: "ELECTRICAL ENGINEER",
    img: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Electrical design, terminations, testing and commissioning across MV systems and hydropower.",
  },
  {
    name: "GODFREY MWENDA",
    role: "CIVIL ENGINEER",
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Civil works leadership for intakes, penstocks, powerhouses and substation civils.",
  },
  {
    name: "Emmanuel Ouya",
    role: "IT MANAGER",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "IT systems, reliability and productivity tooling that support engineering delivery.",
  },
];

export default function About() {
  return (
    <div className="bg-background">
      {/* Company Overview */}
      <section className="section">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="rounded-xl overflow-hidden shadow-sm border">
            <img
              src="https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Substation equipment and engineers"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="section-title">Who we are</h2>
            <p className="section-subtitle">
              Engineering excellence across generation, distribution and
              protection.
            </p>
            <ul className="mt-6 space-y-3 text-foreground/80">
              <li>• Hydropower feasibility, EPC, commissioning and O&M</li>
              <li>• Large Power & Medium-Voltage: 11–132kV substations, protection, testing</li>
              <li>• Sollatek protection: stabilizers, surge, power conditioning and monitoring</li>
              <li>• Safety-first culture aligned to IEC standards and regulatory frameworks</li>
              <li>• Trusted industry partner: Sollatek East Africa Limited</li>
              <li>• Projects delivered: Chint projects, Magiro projects, Hydrobox projects, Jiangxi Water & Hydropower Construction, KTDA projects, Como Energy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values as Section 2 */}
      <section className="section">
        <h2 className="section-title">Our Values</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {(() => {
            const valueVideos = [
              "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fb0cb66bee8f84f67bc3186df000d51f0?alt=media&token=ff1b4c9f-a82a-4935-9701-19169263d925&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
              "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ffe405992740c48ef8509551d1540740a?alt=media&token=19498474-7147-472f-a39f-fdca8d52738d&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
            ];
            return [
              [
                "Innovation",
                "We are passionate about creating new ideas for power solutions.",
              ],
              [
                "Excellence",
                "We vow to do our best to exceed our customers' expectations.",
              ],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="relative overflow-hidden rounded-xl border p-0 shadow-sm hover-card"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={valueVideos[i % valueVideos.length]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 p-6">
                  <div className="font-display text-lg font-bold text-white">
                    {t}
                  </div>
                  <p className="mt-2 text-white/85">{d}</p>
                </div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* Milestones - alternating timeline */}
      <section className="section">
        <h2 className="section-title">Milestones</h2>
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-border" />
          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4 }}
                  className={`relative grid items-center gap-6 md:grid-cols-2 ${left ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  <div
                    className={`md:pr-10 ${left ? "text-right" : "text-left md:text-left"}`}
                  >
                    <div className="font-display text-4xl md:text-5xl font-extrabold text-primary">
                      {m.year}
                    </div>
                  </div>
                  <div className="md:pl-10">
                    <div className="relative overflow-hidden rounded-2xl border p-0 shadow-sm hover-card">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={(() => {
                          const vids = [
                            "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F14896cdbcbe74b8791e325a74957eca3?alt=media&token=8990d292-f1df-4be8-96d2-2d4df0832e24&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
                            "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ff3617627b7cd430c9a39247dc35b39ae?alt=media&token=f366edb1-9805-4da2-a82c-e64db39532b7&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
                            "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F2d6473d7bc364923a1e41851481e628a?alt=media&token=bff2a154-4265-4518-bf09-3d92048cec2c&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
                            "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F27cad907f55b4932abf1b0ed48cfdbe3?alt=media&token=75cd9513-2305-4e1d-9c61-6a6386e914cd&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
                            "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F9080cdfb990a41d1ab1e57063ad5ba81?alt=media&token=bb2f337b-d20d-4d96-8cfd-0b3f7efbc1a2&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
                            "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ff966f09f828f4b93974e3b0ff80e7bec?alt=media&token=3f38f61e-9d01-4799-a60b-47277c10a638&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e",
                          ];
                          return vids[i % vids.length];
                        })()}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/55" />
                      <div className="relative z-10 p-6">
                        <div className="font-display text-xl font-bold text-white">
                          {m.title}
                        </div>
                        <p className="mt-2 text-white/85">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section">
        <div className="grid gap-8 md:grid-cols-[320px,1fr] items-center">
          <div className="rounded-2xl overflow-hidden border shadow-sm">
            <img
              src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Founder portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-display text-2xl md:text-3xl font-extrabold text-primary">
              From the Founder
            </div>
            <p className="mt-3 text-foreground/80 text-lg">
              Our mission is simple: engineer reliable power that fuels growth
              and protects what matters. We pair deep technical rigor with a
              safety-first culture and transparent delivery.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <svg
                viewBox="0 0 300 80"
                className="h-12 w-auto text-foreground/70"
              >
                <path
                  d="M10 50 C 50 10, 120 90, 180 30 S 280 70, 290 40"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div className="font-display font-bold">John B. Ranky</div>
                <div className="text-sm text-foreground/60">Founder & CEO</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="section">
        <h2 className="section-title">Meet our team</h2>
        <p className="section-subtitle">
          Leadership you can trust for complex energy programs.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Dialog key={member.name}>
              <DialogTrigger asChild>
                <button className="group overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:shadow-lg">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="p-5">
                    <div className="font-display text-lg font-bold text-primary">
                      {member.name}
                    </div>
                    <div className="mt-1 text-sm text-foreground/60">
                      {member.role}
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{member.name}</DialogTitle>
                  <DialogDescription>{member.role}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 md:grid-cols-[260px,1fr] items-start">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-foreground/80">{member.bio}</p>
                    <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                      <li>• 20+ delivered programs across hydropower and MV</li>
                      <li>• IEC, NFPA and local regulatory compliance</li>
                      <li>• Strong stakeholder and vendor management</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </div>
  );
}
