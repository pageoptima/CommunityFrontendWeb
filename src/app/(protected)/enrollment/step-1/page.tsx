import { EnrollmentStepHero } from "@/features/enrollment/components/enrollment-step-hero";

const stepOneHeroContent = {
  step: 1,
  totalSteps: 4,
  title: "Maternal Lineage Documentation",
  description:
    "Start your enrollment application, track your progress, and reconnect with your Taino heritage. Each step brings you closer to official tribal membership and community connection.",
} as const;

export default function EnrollmentStep1Page() {
  return (
    <EnrollmentStepHero
      {...stepOneHeroContent}
      className="-mx-4 sm:-mx-6 lg:-mx-8"
    />
  );
}
