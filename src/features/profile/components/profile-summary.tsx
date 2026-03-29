import { Button } from "@/components/ui/button";

import { ProfileActionButton } from "./profile-action-button";
import { ProfileDetailItem } from "./profile-detail-item";
import { ProfileSvgIcon } from "./profile-svg-icon";
import { profileDetails } from "./profile-page-data";

type ProfileSummaryProps = Readonly<{
  name: string;
  memberSince: string;
  memberStatus: string;
}>;

export function ProfileSummary({
  name,
  memberSince,
  memberStatus,
}: ProfileSummaryProps) {
  return (
    <div className="min-w-0 flex-1 text-left">
      <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-2 lg:flex-nowrap">
        <h1 className="max-w-[12ch] text-[clamp(2.6rem,9vw,4.1rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-[#135e71] sm:max-w-none sm:text-[clamp(3rem,4vw,4.3rem)] lg:w-95 lg:text-[58px] lg:leading-none xl:h-19.25 xl:w-118.75 xl:text-[77px] xl:leading-19.25">
          {name}
        </h1>

        <div className="inline-flex h-10.5 shrink-0 items-center gap-2 rounded-full border border-[#1f8ca5] bg-[#e5f5fa] px-4 text-[14px] font-semibold text-[#0f4f5f] shadow-[0_10px_26px_-18px_rgba(31,140,165,0.6)] sm:text-[15px] lg:w-40 lg:justify-center lg:px-0 lg:text-[13px] xl:w-44 xl:text-[14px]">
          <ProfileSvgIcon
            sizeClassName="size-4 lg:size-3.5 xl:size-4"
            src="/icons/profile/verified.svg"
          />
          {memberStatus}
        </div>
      </div>

      <p className="mt-4 text-[19px] font-semibold tracking-[-0.04em] text-[#2f3336] sm:mt-5 sm:text-[26px] lg:text-[24px] xl:text-[30px]">
        {memberSince}
      </p>

      <div className="mt-7 grid justify-items-start gap-4 sm:grid-cols-2 sm:justify-items-start sm:gap-x-8 sm:gap-y-5 lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 xl:gap-x-10">
        {profileDetails.map((detail) => (
          <ProfileDetailItem
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
            <ProfileSvgIcon
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
          <ProfileActionButton
            className="h-[60px] w-full bg-[#2b6674] text-white shadow-[0_16px_30px_-22px_rgba(16,47,52,0.45)] hover:bg-[#245c68] sm:h-[70px] sm:w-[80px] lg:h-[52px] lg:w-[52px] xl:h-[70px] xl:w-[80px]"
            iconSrc="/icons/profile/download.svg"
            label="Download profile"
          />

          <ProfileActionButton
            className="h-[60px] w-full bg-[#95b1bc] text-white shadow-[0_16px_30px_-22px_rgba(16,47,52,0.2)] hover:bg-[#86a3af] sm:h-[70px] sm:w-[80px] lg:h-[52px] lg:w-[52px] xl:h-[70px] xl:w-[80px]"
            iconSrc="/icons/profile/share.svg"
            label="Share profile"
          />
        </div>
      </div>
    </div>
  );
}
