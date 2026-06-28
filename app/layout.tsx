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
];

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elevaretech.site"),
  title: {
    default: "Elevare Tech - Innovative Technology Solutions",
    template: "%s | Elevare Tech",
  },
  description:
    "Elevare Tech empowers businesses with innovative technology solutions — web development, UI/UX design, AI automation, and custom software.",
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
