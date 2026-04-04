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
      <div className="flex flex-col gap-4 bg-[#0b625d] px-5 py-6 text-white sm:gap-5 sm:px-8 sm:py-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p
            className={cn(
              sharedStyles.headerTitle,
              "text-[1.5rem] leading-tight font-semibold sm:text-[1.75rem] lg:text-[2rem]",
            )}
          >
            {eyebrow}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/82 sm:text-base">
            {description}
          </p>
        </div>

        <div className="max-w-fit rounded-2xl border border-white/14 bg-white/8 px-4 py-3 text-left lg:max-w-none lg:border-transparent lg:bg-transparent lg:px-0 lg:py-1 lg:text-right">
          <p className="text-xs font-medium tracking-[0.08em] text-white/80 uppercase">
            {applicationStatusLabel}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#f4cc4f]">
            {applicationStatusValue}
          </p>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-10">
        <h2
          className={cn(
            sharedStyles.sectionTitle,
            "text-xl leading-tight font-semibold sm:text-2xl",
          )}
        >
          {sectionTitle}
        </h2>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <EnrollmentStepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
