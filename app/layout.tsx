import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

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
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
