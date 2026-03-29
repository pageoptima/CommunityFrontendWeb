import { SvgIcon } from "@/components/shared/svg-icon";
import { cn } from "@/lib/utils";

export function ProfileActionButton({
  className,
  iconSrc,
  label,
}: Readonly<{
  className: string;
  iconSrc: string;
  label: string;
}>) {
  return (
    <button
      aria-label={label}
      className={cn(
        "inline-flex h-17.5 w-20 cursor-pointer items-center justify-center rounded-[14px] transition-colors focus-visible:ring-2 focus-visible:ring-[#1f8ca5] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none sm:w-20.5",
        className,
      )}
      type="button"
    >
      <SvgIcon sizeClassName="size-[38px]" src={iconSrc} />
    </button>
  );
}
