import { ReactNode } from "react";

export const metadata = {
  title: "Careers",
  description: "Join Elevare Tech in Faisalabad, Pakistan. Internships and roles in web development, AI and design.",
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers | Elevare Tech", description: "Join Elevare Tech in Faisalabad, Pakistan. Internships and roles in web development, AI and design.", url: "/careers" },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
