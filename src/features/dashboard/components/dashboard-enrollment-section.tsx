import type { EnrollmentStep } from "@/features/dashboard/config/dashboard-config";
import { cn } from "@/lib/utils";

import { EnrollmentStepCard } from "./enrollment-step-card";
import sharedStyles from "../styles/dashboard-shared.module.scss";

type DashboardEnrollmentSectionProps = Readonly<{
  eyebrow: string;
  description: string;
  applicationStatusLabel: string;
  applicationStatusValue: string;
  sectionTitle: string;
  steps: readonly EnrollmentStep[];
}>;

export function DashboardEnrollmentSection({
  eyebrow,
  description,
  applicationStatusLabel,
  applicationStatusValue,
  sectionTitle,
  steps,
}: DashboardEnrollmentSectionProps) {
  return (
    <section className={sharedStyles.sectionPanel}>
      <div className="flex flex-col gap-3 bg-[#0b625d] px-4 py-5 text-white sm:gap-5 sm:px-8 sm:py-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p
            className={cn(
              sharedStyles.headerTitle,
              "text-[1.25rem] leading-tight font-semibold sm:text-[1.75rem] lg:text-[2rem]",
            )}
          >
            {eyebrow}
          </p>
          <p className="mt-1.5 max-w-[18rem] text-[0.95rem] leading-6 text-white/82 sm:mt-2 sm:max-w-none sm:text-base">
            {description}
          </p>
        </div>

        <div className="max-w-fit self-start rounded-[20px] border border-white/14 bg-white/8 px-3.5 py-2.5 text-left lg:max-w-none lg:self-auto lg:border-transparent lg:bg-transparent lg:px-0 lg:py-1 lg:text-right">
          <p className="text-[0.7rem] font-medium tracking-[0.12em] text-white/80 uppercase sm:text-xs sm:tracking-[0.08em]">
            {applicationStatusLabel}
          </p>
          <p className="mt-1 text-[1.05rem] font-semibold text-[#f4cc4f] sm:text-sm">
            {applicationStatusValue}
          </p>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-8 sm:py-10">
        <h2
          className={cn(
            sharedStyles.sectionTitle,
            "text-[1.85rem] leading-tight font-semibold sm:text-2xl",
          )}
        >
          {sectionTitle}
        </h2>

        <div className="mt-5 grid gap-3.5 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <EnrollmentStepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
