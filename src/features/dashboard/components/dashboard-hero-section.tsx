type DashboardHeroSectionProps = Readonly<{
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  description: string;
}>;

export function DashboardHeroSection({
  title,
  description,
}: DashboardHeroSectionProps) {
  return (
    <header className="mx-auto max-w-5xl px-1 text-center sm:px-4">
      <h1 className="text-[clamp(2.55rem,11vw,5rem)] leading-[0.92] font-semibold tracking-[-0.06em] text-[#13181c] sm:leading-[0.95] sm:tracking-[-0.07em]">
        {title.prefix} <span className="text-[#2bb5cb]">{title.highlight}</span>
        <span className="block">{title.suffix}</span>
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 font-medium text-[#30383c] sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
        {description}
      </p>
    </header>
  );
}
