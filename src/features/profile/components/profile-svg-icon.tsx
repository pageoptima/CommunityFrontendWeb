import Image from "next/image";

import { cn } from "@/lib/utils";

export function ProfileSvgIcon({
  className,
  sizeClassName,
  src,
}: Readonly<{
  className?: string;
  sizeClassName: string;
  src: string;
}>) {
  return (
    <span className={cn("relative shrink-0", sizeClassName, className)}>
      <Image alt="" fill className="object-contain" sizes="100px" src={src} />
    </span>
  );
}
