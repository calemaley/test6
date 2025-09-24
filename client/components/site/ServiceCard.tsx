import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export type Media = { type: "image" | "video"; src: string };

export default function ServiceCard({
  title,
  blurb,
  media,
  gallery = [],
  detailVideo,
}: {
  title: string;
  blurb: string;
  media: Media;
  gallery?: string[];
  detailVideo?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Media>(media);
  const [zoom, setZoom] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.45 },
  };

  const cardBase = "group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl hover:-translate-y-0.5";
  const mediaCls = "h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]";

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setZoom(false); setActive(media); } }}>
      <DialogTrigger asChild>
        <motion.article {...fadeUp} className={`${cardBase} ring-1 ring-primary/10`}>          
          {media.type === "video" ? (
            <div className="relative">
              <video className={mediaCls} src={media.src} autoPlay muted loop playsInline />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <PlayCircle className="absolute right-3 bottom-3 h-7 w-7 text-white/90 drop-shadow" />
            </div>
          ) : (
            <img className={mediaCls} src={media.src} alt={title} />
          )}
          <div className="p-5">
            <div className="font-display text-lg font-bold text-primary">{title}</div>
            <p className="mt-2 text-foreground/70 text-sm">{blurb}</p>
          </div>
        </motion.article>
      </DialogTrigger>

      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>In-depth overview</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[1.25fr,0.75fr] items-start">
          <div className="rounded-xl border overflow-hidden bg-muted/30">
            {active.type === "image" ? (
              <div
                className={`relative w-full h-[360px] md:h-[460px] overflow-auto ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={() => setZoom((z) => !z)}
              >
                <img
                  src={active.src}
                  alt={title}
                  className={`w-full h-full object-cover ${zoom ? "scale-150" : "scale-100"} transition-transform duration-300`}
                />
              </div>
            ) : (
              <video className="w-full h-[360px] md:h-[460px] object-cover" src={active.src} controls playsInline />
            )}

            <div className="flex gap-3 p-3 bg-white/70 backdrop-blur border-t">
              {gallery.map((g, i) => (
                <button key={i} className={`h-16 w-24 overflow-hidden rounded-md border ${active.src === g ? "ring-2 ring-primary" : ""}`} onClick={() => { setActive({ type: "image", src: g }); setZoom(false); }}>
                  <img src={g} alt={`${title} ${i+1}`} className="h-full w-full object-cover" />
                </button>
              ))}
              {detailVideo && (
                <button className={`h-16 w-24 overflow-hidden rounded-md border grid place-items-center ${active.src === detailVideo ? "ring-2 ring-primary" : ""}`} onClick={() => { setActive({ type: "video", src: detailVideo }); setZoom(false); }}>
                  <PlayCircle className="h-6 w-6 text-primary" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-foreground/80">
              {blurb} We engineer end-to-end programs with rigorous QA/QC, safety alignment to IEC, and transparent delivery. Our team brings deep OEM experience and decades of operational insight to maximize uptime and ROI.
            </p>
            <ul className="list-disc pl-5 text-sm text-foreground/70 space-y-1">
              <li>Scope definition, BoQ/BoM and schedule baselines</li>
              <li>Protection coordination and relay settings</li>
              <li>Factory/Site Acceptance Tests with signed documentation</li>
              <li>Training, handover and performance monitoring</li>
            </ul>
            <div className="grid grid-cols-2 gap-3">
              {gallery.slice(0, 2).map((g, i) => (
                <img key={i} src={g} alt={`${title} extra ${i+1}`} className="rounded-md border object-cover h-28 w-full" />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
