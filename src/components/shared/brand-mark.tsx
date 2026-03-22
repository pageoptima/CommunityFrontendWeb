import { cn } from "@/lib/utils";

const brandMarkVariants = {
  compact: {
    container: "inline-flex items-center gap-2",
    mark: "flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#35d6c1_0%,#2b74d8_100%)] shadow-[0_14px_30px_-18px_rgba(43,116,216,0.8)]",
    iconSize: 18,
    label: "text-foreground text-[1.5rem] font-semibold tracking-[-0.03em]",
  },
  default: {
    container: "inline-flex items-center gap-3",
    mark: "flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#35d6c1_0%,#2b74d8_100%)] shadow-[0_14px_30px_-18px_rgba(43,116,216,0.8)]",
    iconSize: 22,
    label: "text-foreground text-xl font-semibold tracking-[-0.03em]",
  },
} as const;

type BrandMarkProps = Readonly<{
  className?: string;
  label?: string;
  showLabel?: boolean;
  compact?: boolean;
}>;

export function BrandMark({
  className,
  label = "Taíno Nation",
  showLabel = true,
  compact = false,
}: BrandMarkProps) {
  const variant = compact
    ? brandMarkVariants.compact
    : brandMarkVariants.default;

  return (
    <div className={cn(variant.container, className)}>
      <div className={variant.mark}>
        <svg
          aria-hidden="true"
          fill="none"
          height={variant.iconSize}
          viewBox="0 0 24 22"
          width={variant.iconSize}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L21 18H3L12 2Z" fill="white" />
        </svg>
      </div>
      {showLabel ? <span className={variant.label}>{label}</span> : null}
    </div>
  );
}
