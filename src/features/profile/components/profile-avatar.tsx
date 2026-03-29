import Image from "next/image";

import { ProfileSvgIcon } from "./profile-svg-icon";

export function ProfileAvatar({
  name,
  portraitSrc,
}: Readonly<{
  name: string;
  portraitSrc: string;
}>) {
  return (
    <div className="relative shrink-0">
      <div className="relative size-50 overflow-hidden rounded-full border-[7px] border-[#17879d] bg-[#e9f1ef] shadow-[0_24px_48px_-28px_rgba(16,47,52,0.35)] sm:size-60 sm:border-[9px] lg:size-65 lg:border-[9px] xl:size-75 xl:border-10">
        <Image
          fill
          priority
          alt={`${name} portrait`}
          className="object-cover object-center"
          sizes="(max-width: 640px) 200px, (max-width: 1280px) 260px, (max-width: 1536px) 300px, 300px"
          src={portraitSrc}
        />
      </div>

      <ProfileSvgIcon
        className="absolute right-2.5 bottom-2.5 sm:right-2.5 sm:bottom-2.5 lg:right-2 lg:bottom-2 xl:right-3 xl:bottom-3"
        sizeClassName="size-[48px] sm:size-[60px] lg:size-[50px] xl:size-[80px]"
        src="/icons/profile/verified.svg"
      />
    </div>
  );
}
