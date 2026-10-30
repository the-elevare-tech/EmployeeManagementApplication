import { ReactNode } from "react";

export const metadata = {
  title: "Our Work",
  description: "Client projects and in-house products by Elevare Tech — multilingual websites, e-commerce stores, AI platforms, automation and dashboards.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Our Work | Elevare Tech", description: "Client projects and in-house products by Elevare Tech — multilingual websites, e-commerce stores, AI platforms, automation and dashboards.", url: "/projects" },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
