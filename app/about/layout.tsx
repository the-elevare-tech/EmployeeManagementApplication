import { ReactNode } from "react";
import {Navbar} from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Elevare Tech — our mission, team, and commitment to delivering innovative technology solutions for businesses.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
