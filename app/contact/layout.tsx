import { ReactNode } from "react";

export const metadata = {
  title: "Contact Us",
  description: "Contact Elevare Tech for a free 30-minute consultation. Reply within 24 hours. Working hours 2 PM to 12 AM PKT.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Us | Elevare Tech", description: "Contact Elevare Tech for a free 30-minute consultation. Reply within 24 hours. Working hours 2 PM to 12 AM PKT.", url: "/contact" },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
