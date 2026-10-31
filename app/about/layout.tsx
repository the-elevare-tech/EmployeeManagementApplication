import { ReactNode } from "react";

export const metadata = {
  title: "About Us",
  description: "Meet Elevare Tech, a software development company with offices in Lahore and San Francisco, building web, mobile and AI products since 2025.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Us | Elevare Tech", description: "Meet Elevare Tech, a software development company with offices in Lahore and San Francisco, building web, mobile and AI products since 2025.", url: "/about" },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
