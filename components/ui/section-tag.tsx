import { cn } from "@/utils/utils";

interface SectionTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function SectionTag({ children, className, ...props }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-block font-medium uppercase tracking-[0.08em] text-[11px] md:text-xs text-[#94A3B8] mb-4",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
