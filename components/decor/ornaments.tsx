type IconProps = {
  className?: string;
};

/** Bunga raya (hibiscus) linework — Malaysia's national flower, used as a recurring motif. */
export function HibiscusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="32"
          cy="18"
          rx="7"
          ry="14"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A gold hairline divider with a hibiscus mark at the centre. */
export function SectionDivider({ className }: IconProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className ?? ""}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60 sm:w-20" />
      <HibiscusIcon className="size-6 text-primary" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60 sm:w-20" />
    </div>
  );
}

/** Songket-inspired corner flourish, meant to sit in the corners of the hero frame. */
export function CornerFlourish({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 40 C4 18 18 4 40 4" strokeWidth="1.5" />
      <path d="M4 60 C4 28 28 4 60 4" opacity="0.6" />
      <path d="M4 80 C4 38 38 4 80 4" opacity="0.35" />
      <circle cx="40" cy="4" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="4" cy="40" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
