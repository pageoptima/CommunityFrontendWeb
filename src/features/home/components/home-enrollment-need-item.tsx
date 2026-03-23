import Image from "next/image";

import { cn } from "@/lib/utils";
import { montserrat } from "@/styles/fonts";

export type HomeEnrollmentNeedItemProps = Readonly<{
  iconSrc: string;
  title: string;
  description: string;
}>;

export function HomeEnrollmentNeedItem({
  iconSrc,
  title,
  description,
}: HomeEnrollmentNeedItemProps) {
  return (
    <li className="flex items-start gap-4 sm:gap-5">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#DDF3F8] sm:size-15">
        <Image
          alt=""
          aria-hidden="true"
          className="size-7 sm:size-8"
          src={iconSrc}
          width={32}
          height={32}
        />
      </div>

      <div className="min-w-0">
        <h4
          className={cn(
            montserrat.className,
            "text-[1.2rem] font-normal tracking-[-0.03em] text-[#111111] sm:text-[1.45rem]",
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            montserrat.className,
            "mt-1 text-[0.98rem] leading-6 text-[#6E6B67] sm:text-[1.05rem]",
          )}
        >
          {description}
        </p>
      </div>
    </li>
  );
}
