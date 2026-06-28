import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://www.elevaretech.site";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Elevare Tech",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "hr@elevaretech.site",
    sameAs: [
      "https://www.linkedin.com/company/elevare-tech",
      "https://www.facebook.com/people/Elevare-Tech/61579593726351/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hr@elevaretech.site",
      url: `${SITE_URL}/contact`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Elevare Tech",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Elevare Tech main pages",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "About Us", url: `${SITE_URL}/about` },
      { "@type": "ListItem", position: 2, name: "Services", url: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Projects", url: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 4, name: "Careers", url: `${SITE_URL}/careers` },
      { "@type": "ListItem", position: 5, name: "Contact Us", url: `${SITE_URL}/contact` },
    ],
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elevaretech.site"),
  title: {
    default: "Elevare Tech - Innovative Technology Solutions",
    template: "%s | Elevare Tech",
  },
  description:
    "Elevare Tech empowers businesses with innovative technology solutions — web development, UI/UX design, AI automation, and custom software.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Elevare Tech",
    title: "Elevare Tech - Innovative Technology Solutions",
    description:
      "We empower businesses with innovative technology solutions, transforming digital challenges into seamless, scalable experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevare Tech - Innovative Technology Solutions",
    description:
      "We empower businesses with innovative technology solutions, transforming digital challenges into seamless, scalable experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CursorGlow />
        <Navbar />
        <PageTransition>
          <main className="flex-1 mt-16">{children}</main>
        </PageTransition>
        <Footer />
    <Analytics />
      </body>
    </html>
  );
}
