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
    <article className="relative overflow-hidden rounded-[20px] border-2 border-[#215A64] bg-[#ECFBF9] px-5 py-5 shadow-[0_12px_28px_-22px_rgba(36,95,109,0.45)] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
      <div className="min-w-0 pr-10">
        <h3 className="text-[24px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#215A64] sm:text-[27px] lg:text-[30px]">
          {name}
        </h3>
        <p className="mt-2 text-[18px] font-medium tracking-[-0.03em] text-[#215A64] sm:text-[20px] lg:text-[22px]">
          {generationLabel}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3 lg:gap-x-12">
        <div className="flex items-baseline gap-1 text-[18px] text-[#215A64] sm:text-[19px] lg:text-[20px]">
          <span>Born:</span>
          <span className="font-bold text-[#215A64]">{born}</span>
        </div>

        <div className="flex items-baseline gap-1 text-[18px] text-[#215A64] sm:text-[19px] lg:text-[20px]">
          <span>Place:</span>
          <span className="font-bold text-[#215A64]">{place}</span>
        </div>

        <div className="flex items-baseline gap-1 text-[18px] text-[#215A64] sm:text-[19px] lg:text-[20px]">
          <span>{statusLabel}:</span>
          <span className="font-bold text-[#19A417]">{status}</span>
        </div>
      </div>

      <SvgIcon
        className="absolute top-4 right-4"
        sizeClassName="size-10 sm:size-11"
        src="/icons/profile/verified-green.svg"
      />
    </article>
  );
}
