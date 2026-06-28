import { ReactNode } from "react";
import {Navbar} from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";


export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Elevare Tech. Reach out for project inquiries, partnerships, or support.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
