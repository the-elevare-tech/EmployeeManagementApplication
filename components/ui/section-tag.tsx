import { cn } from "@/utils/utils";

interface SectionTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function SectionTag({ children, className, ...props }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-block font-medium text-sm text-brand mb-4",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
