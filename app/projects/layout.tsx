import { ReactNode } from "react";
import {Navbar} from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Projects",
  description:
    "See Elevare Tech's portfolio of web apps, dashboards, and custom software solutions.",
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
