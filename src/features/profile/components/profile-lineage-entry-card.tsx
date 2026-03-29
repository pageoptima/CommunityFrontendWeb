import { SvgIcon } from "@/components/shared/svg-icon";

type ProfileLineageEntryCardProps = Readonly<{
  born: string;
  generationLabel: string;
  name: string;
  place: string;
  status: string;
  statusLabel: string;
}>;

export function ProfileLineageEntryCard({
  born,
  generationLabel,
  name,
  place,
  status,
  statusLabel,
}: ProfileLineageEntryCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[16px] border-2 border-[#215A64] bg-[#ECFBF9] px-3.5 py-3.5 shadow-[0_12px_28px_-22px_rgba(36,95,109,0.45)] sm:px-4 sm:py-4 lg:px-5 lg:py-4">
      <div className="min-w-0 pr-7">
        <h3 className="text-[17px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#215A64] sm:text-[19px] lg:text-[21px]">
          {name}
        </h3>
        <p className="mt-1 text-[13px] font-medium tracking-[-0.03em] text-[#215A64] sm:text-[14px] lg:text-[15px]">
          {generationLabel}
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 lg:gap-x-8">
        <div className="flex items-baseline gap-1 text-[13px] text-[#215A64] sm:text-[14px] lg:text-[15px]">
          <span>Born:</span>
          <span className="font-bold text-[#215A64]">{born}</span>
        </div>

        <div className="flex items-baseline gap-1 text-[13px] text-[#215A64] sm:text-[14px] lg:text-[15px]">
          <span>Place:</span>
          <span className="font-bold text-[#215A64]">{place}</span>
        </div>

        <div className="flex items-baseline gap-1 text-[13px] text-[#215A64] sm:text-[14px] lg:text-[15px]">
          <span>{statusLabel}:</span>
          <span className="font-bold text-[#19A417]">{status}</span>
        </div>
      </div>

      <SvgIcon
        className="absolute top-3 right-3"
        sizeClassName="size-6 sm:size-7"
        src="/icons/profile/verified-green.svg"
      />
    </article>
  );
}
