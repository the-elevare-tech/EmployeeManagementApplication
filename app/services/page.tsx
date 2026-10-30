"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { CTAStrip } from "@/components/home/CTAStrip";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { ServiceCatalog } from "@/components/services/ServiceCatalog";
import { PricingTeaser } from "@/components/services/PricingTeaser";
import { SERVICES, getService } from "@/lib/services";

export default function ServicesPage() {
  const router = useRouter();

  // Old links like /services#ai-automation now go to the service's own page
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && getService(hash)) router.replace(`/services/${hash}`);
  }, [router]);

  return (
    <>
      <PageHero
        label="What we do"
        title="End-to-end technology"
        highlight="services that ship."
        description="Strategy, design, engineering, AI and support — ten services, one senior team, from first idea to production."
      >
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-text-2 backdrop-blur transition-colors hover:border-brand/50 hover:text-text-1"
              >
                <Icon size={14} className="text-text-3 transition-colors group-hover:text-brand" />
                {s.short}
              </Link>
            );
          })}
        </div>
      </PageHero>

      <ServiceExplorer />
      <ServiceCatalog />
      <TechMarquee />
      <ProcessSection />
      <PricingTeaser />
      <CTAStrip />
    </>
  );
}
