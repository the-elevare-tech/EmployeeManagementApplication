import { ReactNode } from "react";
import {Navbar} from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Careers",
  description:
    "Join Elevare Tech. Explore open positions and grow your career in software development and technology.",
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
