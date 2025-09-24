import ServiceCard from "@/components/site/ServiceCard";
import { motion } from "framer-motion";

const vids = {
  hydro1: "https://videos.pexels.com/video-files/6133235/6133235-hd_1920_1080_30fps.mp4",
  hydro2: "https://videos.pexels.com/video-files/7874813/7874813-hd_1080_1920_25fps.mp4",
  mv1: "https://videos.pexels.com/video-files/19667206/19667206-hd_1080_1920_30fps.mp4",
  mv2: "https://videos.pexels.com/video-files/3569286/3569286-hd_1280_720_24fps.mp4",
  solla1: "https://videos.pexels.com/video-files/856927/856927-hd_1920_1080_25fps.mp4",
};

const imgs = {
  hydroA: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
  hydroB: "https://images.pexels.com/photos/635438/pexels-photo-635438.jpeg?auto=compress&cs=tinysrgb&w=1600",
  mvA: "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600",
  mvB: "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
  sollaA: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
  sollaB: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export default function Services() {
  return (
    <div className="bg-background">
      {/* Page Title */}
      <section className="section">
        <h1 className="section-title">What We Do</h1>
        <p className="section-subtitle">Hydropower • Large Power & Medium Voltage • Sollatek Protection</p>
      </section>

      {/* Hydropower – 3 Sections */}
      <section className="section">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">Hydropower Plant</h2>
          <span className="text-sm text-foreground/60">Feasibility • EPC • O&M</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Feasibility & Studies"
            blurb="Hydrology, yield, grid interconnect, EIA and ROI modeling for bankable decisions."
            media={{ type: "video", src: vids.hydro1 }}
            gallery={[imgs.hydroA, imgs.hydroB]}
            detailVideo={vids.hydro2}
          />
          <ServiceCard
            title="EPC Delivery"
            blurb="Civil and electro-mechanical works, protection & controls, QA/QC and commissioning."
            media={{ type: "image", src: imgs.hydroA }}
            gallery={[imgs.hydroB, imgs.hydroA]}
            detailVideo={vids.hydro2}
          />
          <ServiceCard
            title="Operations & Maintenance"
            blurb="Preventive programs, spares, performance tuning and lifecycle asset management."
            media={{ type: "video", src: vids.hydro2 }}
            gallery={[imgs.hydroA, imgs.hydroB]}
            detailVideo={vids.hydro1}
          />
        </div>
      </section>

      {/* Large Power & Medium Voltage – 3 Sections */}
      <section className="section">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">Large Power & Medium Voltage ⚡</h2>
          <span className="text-sm text-foreground/60">Design • Integration • Testing</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Substation Design"
            blurb="11–132kV layouts, grounding, protection coordination and SCADA."
            media={{ type: "image", src: imgs.mvA }}
            gallery={[imgs.mvA, imgs.mvB]}
            detailVideo={vids.mv1}
          />
          <ServiceCard
            title="Grid Integration"
            blurb="Interface studies, interconnect applications and utility approvals."
            media={{ type: "video", src: vids.mv1 }}
            gallery={[imgs.mvA, imgs.mvB]}
            detailVideo={vids.mv2}
          />
          <ServiceCard
            title="Testing & Commissioning"
            blurb="Primary/secondary injection, relay settings, FAT/SAT and handover."
            media={{ type: "video", src: vids.mv2 }}
            gallery={[imgs.mvB, imgs.mvA]}
            detailVideo={vids.mv1}
          />
        </div>
      </section>

      {/* Sollatek – 3 Sections */}
      <section className="section">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">Sollatek Products – 100% Protection</h2>
          <span className="text-sm text-foreground/60">Stabilizers • Surge • Conditioning</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Voltage Stabilizers"
            blurb="Single/three-phase units ensuring steady voltage for sensitive loads."
            media={{ type: "image", src: imgs.sollaA }}
            gallery={[imgs.sollaA, imgs.sollaB]}
            detailVideo={vids.solla1}
          />
          <ServiceCard
            title="Surge Protection"
            blurb="Protection against spikes, transients and sags for mission-critical equipment."
            media={{ type: "video", src: vids.solla1 }}
            gallery={[imgs.sollaA, imgs.sollaB]}
            detailVideo={vids.solla1}
          />
          <ServiceCard
            title="Power Conditioning"
            blurb="Filtering, regulation and monitoring for clean, reliable power 24/7."
            media={{ type: "image", src: imgs.sollaB }}
            gallery={[imgs.sollaB, imgs.sollaA]}
            detailVideo={vids.solla1}
          />
        </div>
      </section>
    </div>
  );
}
