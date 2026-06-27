import { ReactNode } from "react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Careers",
  description:
    "Join Elevare Tech. Explore open positions and grow your career in software development and technology.",
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
