import { EnrollmentStepHero } from "@/features/enrollment/components/enrollment-step-hero";
import { EnrollmentProgressSection } from "@/features/enrollment/components/enrollment-progress-section";
import { EnrollmentStepOneForm } from "@/features/enrollment/components/enrollment-step-one-form";

const stepOneHeroContent = {
  step: 1,
  totalSteps: 4,
  title: "Personal Information",
  description:
    "Provide the personal, contact, and address details needed to begin your enrollment application and establish your official member record.",
} as const;

export default function EnrollmentStep1Page() {
  return (
    <>
      <EnrollmentStepHero
        {...stepOneHeroContent}
        className="-mx-4 sm:-mx-6 lg:-mx-8"
      />
      <EnrollmentProgressSection
        className="-mx-4 sm:-mx-6 lg:-mx-8"
        currentStage={stepOneHeroContent.step}
      />
      <section className="-mx-4 bg-[#FFFDEC] sm:-mx-6 lg:-mx-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <EnrollmentStepOneForm />
        </div>
      </section>
    </>
  );
}
