import Image from "next/image";

import { cn } from "@/lib/utils";

type SvgIconProps = Readonly<{
  className?: string;
  sizeClassName: string;
  src: string;
}>;

export function SvgIcon({ className, sizeClassName, src }: SvgIconProps) {
  return (
    <span className={cn("relative shrink-0", sizeClassName, className)}>
      <Image alt="" fill className="object-contain" sizes="100px" src={src} />
    </span>
  );
}
