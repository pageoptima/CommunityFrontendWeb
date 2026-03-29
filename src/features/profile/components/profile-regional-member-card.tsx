import Image from "next/image";

import { Button } from "@/components/ui/button";

type ProfileRegionalMemberCardProps = Readonly<{
  memberId: string;
  name: string;
  portraitSrc: string;
  role: string;
}>;

export function ProfileRegionalMemberCard({
  memberId,
  name,
  portraitSrc,
  role,
}: ProfileRegionalMemberCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-[26px] bg-[#efefef] px-4 py-4 shadow-[0_14px_34px_-28px_rgba(16,47,52,0.24)] sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-5 lg:min-h-[96px] lg:px-4 lg:py-3 xl:min-h-[125px] xl:px-6 xl:py-4">
      <div className="flex min-w-0 items-center gap-4 lg:gap-3 xl:gap-5">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-[3px] border-[#155f61] bg-white shadow-[0_10px_24px_-16px_rgba(16,47,52,0.4)] sm:size-22 sm:border-[4px] lg:size-[56px] xl:size-[82px]">
          <Image
            fill
            alt={name}
            className="object-cover object-center"
            sizes="(max-width: 640px) 80px, 88px"
            src={portraitSrc}
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[17px] leading-tight font-medium tracking-[-0.03em] text-[#4b4b4b] sm:text-[19px] lg:text-[14px] xl:text-[20px]">
            {name}
          </h3>
          <p className="mt-1 truncate text-[13px] leading-tight text-[#5f5f5f] sm:text-[14px] lg:text-[10px] xl:text-[15px]">
            {role} • Member ID: {memberId}
          </p>
        </div>
      </div>

      <Button
        aria-label={`View ${name}`}
        className="h-[56px] w-full rounded-[18px] bg-[#215A64] px-6 text-[18px] font-semibold tracking-[-0.02em] text-white shadow-[0_16px_30px_-22px_rgba(16,47,52,0.34)] hover:bg-[#1b4a52] hover:text-white sm:h-[70px] sm:w-[150px] sm:self-center sm:px-8 sm:text-[22px] lg:h-[46px] lg:w-[96px] lg:px-4 lg:text-[14px] xl:h-[70px] xl:w-[154px] xl:px-8 xl:text-[22px]"
        variant="ghost"
        size="xl"
        type="button"
      >
        View
      </Button>
    </article>
  );
}
