import { ReactNode } from "react";

export const metadata = {
  title: "Terms of Service",
  description: "Read Elevare Tech terms and conditions for using our services.",
  alternates: { canonical: "/support/terms" },
  openGraph: { title: "Terms of Service | Elevare Tech", description: "Read Elevare Tech terms and conditions for using our services.", url: "/support/terms" },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
