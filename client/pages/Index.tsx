import Hero from "@/components/site/Hero";
import ServiceHighlights from "@/components/site/ServiceHighlights";
import LogosCarousel from "@/components/site/LogosCarousel";
import Testimonials from "@/components/site/Testimonials";
import Stats from "@/components/site/Stats";
import FeaturedProjects from "@/components/site/FeaturedProjects";
import SectionReveal from "@/components/site/SectionReveal";

export default function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <SectionReveal>
        <ServiceHighlights />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <FeaturedProjects />
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <Stats />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <LogosCarousel />
      </SectionReveal>
      <SectionReveal>
        <Testimonials />
      </SectionReveal>
    </div>
  );
}
