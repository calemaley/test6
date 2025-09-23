import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const videoSrc = "https://videos.pexels.com/video-files/6133235/6133235-hd_1920_1080_30fps.mp4";

export default function Hero() {
  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-primary/60" />

      <div className="relative z-10 container mx-auto container-padding h-full grid content-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl"
        >
          Powering a Sustainable Future with Precision & Protection.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-4 text-white/85 max-w-2xl text-base md:text-lg"
        >
          Hydropower plant solutions, large power & medium-voltage systems, and Sollatek products for total equipment protection.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link to="/contact" className="btn-primary text-base">Request a Quote</Link>
          <Link to="/services" className="btn-secondary text-base">Our Services</Link>
        </motion.div>
      </div>
    </section>
  );
}
