import { profileConfig } from "../config/profile-config";

function ProfileLineageStatCard({
  description,
  label,
  value,
}: Readonly<{
  description: string;
  label: string;
  value: string;
}>) {
  return (
    <article className="flex min-h-[200px] flex-col items-center justify-center rounded-[24px] bg-[#2d756d] px-6 py-9 text-center shadow-[0_18px_40px_-30px_rgba(36,95,109,0.35)] sm:min-h-[220px] sm:px-8 sm:py-10 lg:min-h-[188px] lg:px-6 lg:py-8 xl:min-h-[220px] xl:px-8 xl:py-12">
      <p className="text-[clamp(3rem,4.2vw,4.5rem)] leading-none font-semibold tracking-[-0.08em] text-white lg:text-[3.15rem] xl:text-[4.8rem]">
        {value}
      </p>

      <p className="mt-3 text-[clamp(1.45rem,2vw,2rem)] leading-none font-semibold tracking-[-0.04em] text-white lg:text-[1.65rem] xl:text-[2.25rem]">
        {label}
      </p>

      <p className="mt-2 max-w-[18rem] text-[14px] leading-6 font-semibold text-white/80 sm:text-[15px] lg:text-[13px] xl:max-w-none xl:text-[16px]">
        {description}
      </p>
    </article>
  );
}

export function ProfileLineageStatCards() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-6">
      {profileConfig.lineageStats.map((stat) => (
        <ProfileLineageStatCard
          key={stat.value}
          description={stat.description}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
}
