"use client";

import { HomeHero } from "@/components/home/HomeHero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TechMarquee } from "@/components/home/TechMarquee";
import { StatsSection } from "@/components/home/StatsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
// import { Testimonials } from "@/components/home/Testimonials";
import { CTAStrip } from "@/components/home/CTAStrip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ServicesGrid />
      <TechMarquee />
      <StatsSection />
      <ProcessSection />
      {/* <Testimonials /> */}
      <CTAStrip />
    </>
  );
}