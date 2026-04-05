import { cn } from "@/lib/utils";

type EnrollmentStepHeroProps = Readonly<{
  className?: string;
  description: string;
  step: number;
  title: string;
  totalSteps: number;
}>;

export function EnrollmentStepHero({
  className,
  description,
  step,
  title,
  totalSteps,
}: EnrollmentStepHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,#08584f_0%,#0b7a69_48%,#0d9488_100%)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_82%_78%,rgba(47,207,195,0.18),transparent_22%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[36%] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))] lg:block" />
      <div className="absolute -right-20 bottom-0 size-64 rounded-full border border-white/10 bg-white/6 blur-3xl sm:size-80" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[23rem] flex-col justify-end pt-24 pb-12 sm:min-h-[26rem] sm:pt-28 sm:pb-16 lg:min-h-[29rem] lg:pt-32 lg:pb-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-white/55 bg-white/6 px-4 py-2 text-sm font-medium tracking-[-0.03em] text-white/92 backdrop-blur-sm sm:px-5 sm:text-base">
              Step {step} of {totalSteps}
            </div>

            <h1 className="mt-6 max-w-[12ch] text-[clamp(2.55rem,7vw,5.5rem)] leading-[0.92] font-semibold tracking-[-0.07em] text-white sm:mt-7 sm:max-w-none">
              {title}
            </h1>

            <p className="mt-5 max-w-4xl text-[1rem] leading-7 text-white/88 sm:mt-6 sm:text-[1.12rem] sm:leading-8 lg:text-[1.3rem] lg:leading-[1.45]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
