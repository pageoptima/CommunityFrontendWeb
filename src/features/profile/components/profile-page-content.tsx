import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const profileDetails = [
  {
    iconSrc: "/icons/profile/member.svg",
    value: "TN-2847-GUA",
  },
  {
    iconSrc: "/icons/profile/location.svg",
    value: "Yucayeke Guainía",
  },
  {
    iconSrc: "/icons/profile/calendar.svg",
    value: "Born: March 12, 1985",
  },
] as const;

function SvgIcon({
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

function DetailItem({
  iconSrc,
  value,
}: Readonly<{
  iconSrc: string;
  value: string;
}>) {
  return (
    <div className="flex items-center gap-3 whitespace-normal sm:whitespace-nowrap">
      <SvgIcon sizeClassName="size-6 sm:size-7" src={iconSrc} />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#174451] sm:text-[18px] sm:leading-none lg:text-[19px]">
        {value}
      </span>
    </div>
  );
}

function ActionButton({
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
        "inline-flex h-[70px] w-[80px] items-center justify-center rounded-[14px] transition-colors focus-visible:ring-2 focus-visible:ring-[#1f8ca5] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none sm:w-[82px]",
        className,
      )}
      type="button"
    >
      <SvgIcon sizeClassName="size-[38px]" src={iconSrc} />
    </button>
  );
}

export function ProfilePageContent({ user }: Readonly<{ user: AuthUser }>) {
  const profileName = "Carmen María";
  const memberSince = "Member since January 15, 2023";
  const memberStatus = "Enrolled Member";

  return (
    <section
      aria-label={`Profile summary for ${profileName}`}
      className="mx-auto w-full max-w-6xl pt-8 sm:pt-10 lg:pt-12 xl:pt-16"
      data-auth-user-id={user.id}
    >
      <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-8 lg:text-left xl:gap-12">
        <div className="relative shrink-0">
          <div className="relative size-[200px] overflow-hidden rounded-full border-[7px] border-[#17879d] bg-[#e9f1ef] shadow-[0_24px_48px_-28px_rgba(16,47,52,0.35)] sm:size-[240px] sm:border-[9px] lg:size-[260px] lg:border-[9px] xl:size-[300px] xl:border-[10px]">
            <Image
              fill
              priority
              alt={`${profileName} portrait`}
              className="object-cover object-center"
              sizes="(max-width: 640px) 200px, (max-width: 1280px) 260px, (max-width: 1536px) 300px, 300px"
              src="/images/member1.png"
            />
          </div>

          <SvgIcon
            className="absolute right-[10px] bottom-[10px] sm:right-[10px] sm:bottom-[10px] lg:right-[8px] lg:bottom-[8px] xl:right-[12px] xl:bottom-[12px]"
            sizeClassName="size-[48px] sm:size-[60px] lg:size-[50px] xl:size-[80px]"
            src="/icons/profile/verified.svg"
          />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-2 lg:flex-nowrap">
            <h1 className="max-w-[12ch] text-[clamp(2.6rem,9vw,4.1rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-[#135e71] sm:max-w-none sm:text-[clamp(3rem,4vw,4.3rem)] lg:w-[380px] lg:text-[58px] lg:leading-[1] xl:h-[77px] xl:w-[475px] xl:text-[77px] xl:leading-[77px]">
              {profileName}
            </h1>

            <div className="inline-flex h-[41px] shrink-0 items-center gap-2 rounded-full border border-[#1f8ca5] bg-[#e5f5fa] px-4 text-[14px] font-semibold text-[#0f4f5f] shadow-[0_10px_26px_-18px_rgba(31,140,165,0.6)] sm:text-[15px] lg:w-[160px] lg:justify-center lg:px-0 lg:text-[13px] xl:w-[176px] xl:text-[14px]">
              <SvgIcon
                sizeClassName="size-4 lg:size-[14px] xl:size-4"
                src="/icons/profile/verified.svg"
              />
              {memberStatus}
            </div>
          </div>

          <p className="mt-4 text-[19px] font-semibold tracking-[-0.04em] text-[#2f3336] sm:mt-5 sm:text-[26px] lg:text-[24px] xl:text-[30px]">
            {memberSince}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 xl:gap-x-10">
            {profileDetails.map((detail) => (
              <DetailItem
                key={detail.value}
                iconSrc={detail.iconSrc}
                value={detail.value}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              variant="ghost"
              className="h-[60px] w-full rounded-[14px] bg-[#215A64] px-6 text-[18px] font-medium tracking-[-0.02em] text-white shadow-[0_16px_30px_-22px_rgba(16,47,52,0.45)] hover:bg-[#1b4a52] hover:text-white sm:h-[70px] sm:w-[260px] sm:min-w-[260px] sm:px-8 sm:text-[20px] lg:h-[52px] lg:w-[170px] lg:px-4 lg:text-[14px] xl:h-[70px] xl:w-[258px] xl:px-8 xl:text-[21px]"
              leftIcon={
                <SvgIcon
                  sizeClassName="size-7 sm:size-8 lg:size-4 xl:size-8"
                  src="/icons/profile/edit.svg"
                />
              }
              size="xl"
              type="button"
            >
              Edit Profile
            </Button>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              <ActionButton
                className="h-[60px] w-full bg-[#2b6674] text-white shadow-[0_16px_30px_-22px_rgba(16,47,52,0.45)] hover:bg-[#245c68] sm:h-[70px] sm:w-[80px] lg:h-[52px] lg:w-[52px] xl:h-[70px] xl:w-[80px]"
                iconSrc="/icons/profile/download.svg"
                label="Download profile"
              />

              <ActionButton
                className="h-[60px] w-full bg-[#95b1bc] text-white shadow-[0_16px_30px_-22px_rgba(16,47,52,0.2)] hover:bg-[#86a3af] sm:h-[70px] sm:w-[80px] lg:h-[52px] lg:w-[52px] xl:h-[70px] xl:w-[80px]"
                iconSrc="/icons/profile/share.svg"
                label="Share profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
