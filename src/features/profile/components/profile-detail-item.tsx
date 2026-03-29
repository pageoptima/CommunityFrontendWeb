import { ProfileSvgIcon } from "./profile-svg-icon";

export function ProfileDetailItem({
  iconSrc,
  value,
}: Readonly<{
  iconSrc: string;
  value: string;
}>) {
  return (
    <div className="flex items-center gap-3 whitespace-normal sm:whitespace-nowrap">
      <ProfileSvgIcon sizeClassName="size-6 sm:size-7" src={iconSrc} />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#174451] sm:text-[18px] sm:leading-none lg:text-[19px]">
        {value}
      </span>
    </div>
  );
}
