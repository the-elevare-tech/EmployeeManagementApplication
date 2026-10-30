import { ReactNode } from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "Learn about Elevare Tech privacy practices and how we protect your data.",
  alternates: { canonical: "/support/privacy" },
  openGraph: { title: "Privacy Policy | Elevare Tech", description: "Learn about Elevare Tech privacy practices and how we protect your data.", url: "/support/privacy" },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
