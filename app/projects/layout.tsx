import { ReactNode } from "react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Projects",
  description:
    "See Elevare Tech's portfolio of web apps, dashboards, and custom software solutions.",
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
