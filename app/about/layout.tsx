import { ReactNode } from "react";

export const metadata = {
  title: "About Us",
  description: "Meet Elevare Tech, a software studio in Faisalabad, Pakistan founded in 2025, building web, mobile and AI products for clients in 7 countries.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Us | Elevare Tech", description: "Meet Elevare Tech, a software studio in Faisalabad, Pakistan founded in 2025, building web, mobile and AI products for clients in 7 countries.", url: "/about" },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
