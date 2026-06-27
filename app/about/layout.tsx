import { ReactNode } from "react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Elevare Tech — our mission, team, and commitment to delivering innovative technology solutions for businesses.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
