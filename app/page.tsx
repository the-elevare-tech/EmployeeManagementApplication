"use client";

import { useState } from "react";

import Header from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import PageLoader from "@/components/page-loader";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PageLoader onFinish={() => setLoading(false)} />}

      <div
        className={`min-h-screen transition-all duration-700 ${
          loading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
        }`}
      >
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}