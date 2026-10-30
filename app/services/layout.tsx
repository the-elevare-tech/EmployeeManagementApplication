import { ReactNode } from "react";

export const metadata = {
  title: "Services",
  description: "Web development, e-commerce, SaaS, mobile apps, UI/UX design, AI agents & automation, machine learning, data analytics and cloud services from Elevare Tech.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Elevare Tech", description: "Web development, e-commerce, SaaS, mobile apps, UI/UX design, AI agents & automation, machine learning, data analytics and cloud services from Elevare Tech.", url: "/services" },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
