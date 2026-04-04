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
    <header className="mx-auto max-w-4xl px-2 text-center sm:px-4">
      <h1 className="mx-auto max-w-[8.5ch] text-[clamp(2rem,14vw,5rem)] leading-[0.88] font-semibold tracking-[-0.06em] text-[#13181c] sm:max-w-none sm:leading-[0.95] sm:tracking-[-0.07em]">
        <span className="block sm:inline">{title.prefix}</span>{" "}
        <span className="block text-[#2bb5cb] sm:inline">
          {title.highlight}
        </span>
        <span className="block">{title.suffix}</span>
      </h1>

      <p className="mx-auto mt-4 max-w-[22rem] text-[0.95rem] leading-6 font-medium text-[#30383c] sm:mt-6 sm:max-w-3xl sm:text-base sm:leading-7 lg:text-lg">
        {description}
      </p>
    </header>
  );
}
