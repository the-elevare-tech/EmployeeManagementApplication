"use client";

import { useState } from "react";
import PageLoader from "@/components/page-loader";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TechMarquee } from "@/components/home/TechMarquee";
import { StatsSection } from "@/components/home/StatsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTAStrip } from "@/components/home/CTAStrip";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PageLoader onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <HomeHero />
          <TrustStrip />
          <ServicesGrid />
          <TechMarquee />
          <StatsSection />
          <ProcessSection />
          <CTAStrip />
        </>
      )}
    </>
  );
}
