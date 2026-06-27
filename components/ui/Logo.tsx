interface LogoProps {
  /** Mark height in px — width scales from 43:49 aspect ratio */
  size?: number;
  className?: string;
  variant?: "nav" | "footer";
}

const VIEWBOX_WIDTH = 43;
const VIEWBOX_HEIGHT = 49;

export function LogoMark({ size = 28, className = "", variant = "nav" }: LogoProps) {
  const height = size;
  const width = Math.round(size * (VIEWBOX_WIDTH / VIEWBOX_HEIGHT));
  const barColor = variant === "footer" ? "#F1F5F9" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 43 49"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.5 49L27 37L42.5 21V49H37.5Z"
        fill="#38BDF8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 49V35.5L35.5 0V20L8 49H0Z"
        fill={barColor}
      />
    </svg>
  );
}

interface LogoFullProps extends LogoProps {
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export function Logo({
  size = 28,
  variant = "nav",
  showWordmark = true,
  className = "",
  wordmarkClassName,
}: LogoFullProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} variant={variant} />
      {showWordmark && (
        <span className={wordmarkClassName ?? "font-sans font-semibold text-[15px] tracking-[0.05em] text-white"}>
          ELEVARE TECH
        </span>
      )}
    </span>
  );
}
