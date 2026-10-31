import { ReactNode } from "react";

export const metadata = {
  title: "Contact Us",
  description: "Contact Elevare Tech for a free 30-minute consultation. Reply within 24 hours. Offices in Lahore (2 PM to 12 AM PKT) and San Francisco (9 AM to 5 PM PT).",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Us | Elevare Tech", description: "Contact Elevare Tech for a free 30-minute consultation. Reply within 24 hours. Offices in Lahore (2 PM to 12 AM PKT) and San Francisco (9 AM to 5 PM PT).", url: "/contact" },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
