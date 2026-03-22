import { cn } from "@/lib/utils";

type BrandMarkProps = Readonly<{
  className?: string;
  label?: string;
  showLabel?: boolean;
}>;

export function BrandMark({
  className,
  label = "Taíno Nation",
  showLabel = true,
}: BrandMarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#35d6c1_0%,#2b74d8_100%)] shadow-[0_14px_30px_-18px_rgba(43,116,216,0.8)]">
        <svg
          aria-hidden="true"
          fill="none"
          height="22"
          viewBox="0 0 24 22"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L21 18H3L12 2Z" fill="white" />
        </svg>
      </div>
      {showLabel ? (
        <span className="text-foreground text-xl font-semibold tracking-[-0.03em]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
