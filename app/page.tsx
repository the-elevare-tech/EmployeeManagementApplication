import { HomeHero } from "@/components/home/HomeHero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CTAStrip } from "@/components/home/CTAStrip";
import { Manifesto } from "@/components/home/Manifesto";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TechMarquee />
      <ServicesGrid />
      <Manifesto />
      <FeaturedWork />
      <ProcessSection />
      <StatsSection />
      <CTAStrip />
    </>
  );
}
