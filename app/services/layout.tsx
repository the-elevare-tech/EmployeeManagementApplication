import { ReactNode } from "react";
import {Navbar} from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Services",
  description:
    "Web development, UI/UX design, AI automation, and custom software solutions from Elevare Tech.",
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
