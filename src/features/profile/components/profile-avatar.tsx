import Image from "next/image";

import { SvgIcon } from "@/components/shared/svg-icon";

export function ProfileAvatar({
  name,
  portraitSrc,
}: Readonly<{
  name: string;
  portraitSrc: string;
}>) {
  return (
    <div className="relative shrink-0">
      <div className="relative size-[7.75rem] overflow-hidden rounded-full border-[4px] border-[#17879d] bg-[#e9f1ef] shadow-[0_18px_36px_-28px_rgba(16,47,52,0.28)] sm:size-[8.75rem] sm:border-[5px] lg:size-[10rem] lg:border-[6px] xl:size-[10.75rem]">
        <Image
          fill
          priority
          alt={`${name} portrait`}
          className="object-cover object-center"
          sizes="(max-width: 640px) 124px, (max-width: 1024px) 140px, (max-width: 1536px) 160px, 172px"
          src={portraitSrc}
        />
      </div>

      <SvgIcon
        className="absolute right-1 bottom-1 sm:right-1.5 sm:bottom-1.5 lg:right-2 lg:bottom-2"
        sizeClassName="size-[1.9rem] sm:size-[2.2rem] lg:size-[2.35rem] xl:size-[2.55rem]"
        src="/icons/profile/verified.svg"
      />
    </div>
  );
}
