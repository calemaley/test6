import { motion } from "framer-motion";

const vids = {
  hydro1:
    "https://videos.pexels.com/video-files/6133235/6133235-hd_1920_1080_30fps.mp4",
  hydro2:
    "https://videos.pexels.com/video-files/7874813/7874813-hd_1080_1920_25fps.mp4",
  mv1: "https://videos.pexels.com/video-files/19667206/19667206-hd_1080_1920_30fps.mp4",
  mv2: "https://videos.pexels.com/video-files/3569286/3569286-hd_1280_720_24fps.mp4",
  solla1:
    "https://videos.pexels.com/video-files/856927/856927-hd_1920_1080_25fps.mp4",
};

const imgs = {
  hydroA:
    "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
  hydroB:
    "https://images.pexels.com/photos/635438/pexels-photo-635438.jpeg?auto=compress&cs=tinysrgb&w=1600",
  mvA: "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600",
  mvB: "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
  sollaA:
    "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  sollaB:
    "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

const card =
  "group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl hover:-translate-y-0.5";
const media =
  "h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.45 },
};

export default function Services() {
  return (
    <div className="bg-background">
      {/* Page Title */}
      <section className="section">
        <h1 className="section-title">What We Do</h1>
        <p className="section-subtitle">
          Hydropower • Large Power & Medium Voltage • Sollatek Protection
        </p>
      </section>

      {/* Hydropower – 3 Sections */}
      <section className="section">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">Hydropower Plant</h2>
          <span className="text-sm text-foreground/60">
            Feasibility • EPC • O&M
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.article {...fadeUp} className={card}>
            <video
              className={media}
              src={vids.hydro1}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Feasibility & Studies
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Hydrology, yield, grid interconnect, EIA and ROI modeling for
                bankable decisions.
              </p>
            </div>
          </motion.article>
          <motion.article {...fadeUp} className={card}>
            <img className={media} src={imgs.hydroA} alt="Hydropower EPC" />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                EPC Delivery
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Civil and electro-mechanical works, protection & controls, QA/QC
                and commissioning.
              </p>
            </div>
          </motion.article>
          <motion.article {...fadeUp} className={card}>
            <video
              className={media}
              src={vids.hydro2}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Operations & Maintenance
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Preventive programs, spares, performance tuning and lifecycle
                asset management.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Large Power & Medium Voltage – 3 Sections */}
      <section className="section">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">Large Power & Medium Voltage ⚡</h2>
          <span className="text-sm text-foreground/60">
            Design • Integration • Testing
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.article {...fadeUp} className={card}>
            <img className={media} src={imgs.mvA} alt="Substation Design" />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Substation Design
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                11–132kV layouts, grounding, protection coordination and SCADA.
              </p>
            </div>
          </motion.article>
          <motion.article {...fadeUp} className={card}>
            <video
              className={media}
              src={vids.mv1}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Grid Integration
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Interface studies, interconnect applications and utility
                approvals.
              </p>
            </div>
          </motion.article>
          <motion.article {...fadeUp} className={card}>
            <video
              className={media}
              src={vids.mv2}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Testing & Commissioning
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Primary/secondary injection, relay settings, FAT/SAT and
                handover.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Sollatek – 3 Sections */}
      <section className="section">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">Sollatek Products – 100% Protection</h2>
          <span className="text-sm text-foreground/60">
            Stabilizers • Surge • Conditioning
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.article {...fadeUp} className={card}>
            <img
              className={media}
              src={imgs.sollaA}
              alt="Voltage Stabilizers"
            />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Voltage Stabilizers
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Single/three-phase units ensuring steady voltage for sensitive
                loads.
              </p>
            </div>
          </motion.article>
          <motion.article {...fadeUp} className={card}>
            <video
              className={media}
              src={vids.solla1}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Surge Protection
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Protection against spikes, transients and sags for
                mission-critical equipment.
              </p>
            </div>
          </motion.article>
          <motion.article {...fadeUp} className={card}>
            <img className={media} src={imgs.sollaB} alt="Power Conditioning" />
            <div className="p-5">
              <div className="font-display text-lg font-bold text-primary">
                Power Conditioning
              </div>
              <p className="mt-2 text-foreground/70 text-sm">
                Filtering, regulation and monitoring for clean, reliable power
                24/7.
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
