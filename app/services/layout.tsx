// app/contact/layout.tsx
import { ReactNode } from "react";
import  Header  from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Services",
  description:
    "Web development, UI/UX design, AI automation, and custom software solutions from Elevare Tech.",
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Website Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 bg-white">
        {children}
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
