import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-[#0C1929] py-24 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-8">
          Ready to transform your business?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto">
              Contact sales
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base w-full sm:w-auto">
              View our projects <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
