import { ReactNode } from "react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Elevare Tech. Reach out for project inquiries, partnerships, or support.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
