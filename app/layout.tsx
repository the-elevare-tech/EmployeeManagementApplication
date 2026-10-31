import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Spotlight } from "@/components/layout/Spotlight";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const SITE_URL = "https://www.elevaretech.site";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "Elevare Tech",
    alternateName: ["ElevareTech", "Elevare Technologies"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    description:
      "Elevare Tech is a software development company with offices in Lahore, Pakistan and San Francisco, USA, building websites, web apps, mobile apps, AI agents and automation for businesses worldwide.",
    foundingDate: "2025",
    email: "hr@elevaretech.site",
    telephone: "+92-346-0618820",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Pace Shopping Mall, Model Town Link Road",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "680 Folsom Street",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94107",
        addressCountry: "US",
      },
    ],
    areaServed: ["Worldwide", "Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Canada", "Australia"],
    knowsAbout: [
      "Web Development", "E-commerce Development", "SaaS Development", "Mobile App Development", "UI/UX Design",
      "AI Agents", "Workflow Automation", "Machine Learning", "Data Analytics", "Cloud & DevOps",
    ],
    sameAs: [
      "https://www.linkedin.com/company/elevare-tech",
      "https://www.facebook.com/people/Elevare-Tech/61579593726351/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hr@elevaretech.site",
      telephone: "+92-346-0618820",
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English", "Urdu"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Elevare Tech",
    alternateName: "ElevareTech",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

const DEFAULT_TITLE = "Elevare Tech | Software, Web & AI Development Company";
const DEFAULT_DESC =
  "Elevare Tech is a software development company in Lahore and San Francisco building websites, web apps, mobile apps, AI agents and automation for businesses worldwide. Book a free consultation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Elevare Tech" },
  description: DEFAULT_DESC,
  applicationName: "Elevare Tech",
  keywords: [
    "Elevare Tech", "ElevareTech", "software development company Pakistan", "web development company Lahore", "software company San Francisco",
    "AI automation agency", "AI agents development", "mobile app development", "e-commerce development",
    "SaaS development", "Next.js development", "custom software development", "UI/UX design agency",
  ],
  authors: [{ name: "Elevare Tech", url: SITE_URL }],
  creator: "Elevare Tech",
  publisher: "Elevare Tech",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Elevare Tech",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESC },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain font-sans antialiased">
        <Spotlight />
        <ScrollProgress />
        <CommandMenu />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <PageTransition>
          <main className="relative isolate flex-1 mt-16">
            {/* ambient top glow + grid, shared by every page */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[820px] overflow-hidden">
              <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
              <div className="aurora-drift absolute left-[10%] top-[-220px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.22),transparent)] blur-2xl" />
              <div className="aurora-drift-2 absolute right-[5%] top-[-180px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.22),transparent)] blur-2xl" />
            </div>
            {children}
          </main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
