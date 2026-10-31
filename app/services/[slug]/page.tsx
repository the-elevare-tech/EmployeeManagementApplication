import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/lib/services";
import { ServiceDetail } from "@/components/services/ServiceDetail";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: { absolute: `${s.title} Services | Elevare Tech` },
    description: `${s.tagline} ${s.summary} Elevare Tech, with offices in Lahore and San Francisco.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.title} | Elevare Tech`, description: s.tagline, images: [s.image ?? s.shot] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    provider: { "@type": "Organization", name: "Elevare Tech", url: "https://www.elevaretech.site" },
    areaServed: "Worldwide",
    url: `https://www.elevaretech.site/services/${s.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetail slug={s.slug} />
    </>
  );
}
