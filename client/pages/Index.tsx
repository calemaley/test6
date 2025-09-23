import Hero from "@/components/site/Hero";
import ServiceHighlights from "@/components/site/ServiceHighlights";
import LogosCarousel from "@/components/site/LogosCarousel";
import Testimonials from "@/components/site/Testimonials";
import Stats from "@/components/site/Stats";

export default function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <ServiceHighlights />
      <Stats />
      <LogosCarousel />
      <Testimonials />
    </div>
  );
}
