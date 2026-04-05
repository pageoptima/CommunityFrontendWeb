import { SupportSection } from "@/components/shared/support-section";
import { dashboardConfig } from "@/features/dashboard/config/dashboard-config";

import { DashboardEnrollmentSection } from "./dashboard-enrollment-section";
import { DashboardExpectationsSection } from "./dashboard-expectations-section";
import { DashboardHeroSection } from "./dashboard-hero-section";

export function DashboardPageContent() {
  const { enrollment, expectations, hero } = dashboardConfig;

  return (
    <section
      aria-label="Enrollment application dashboard"
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 pt-24 sm:gap-9 sm:pt-28 lg:gap-12 lg:pt-32"
    >
      <DashboardHeroSection description={hero.description} title={hero.title} />
      <DashboardEnrollmentSection
        applicationStatusLabel={enrollment.applicationStatusLabel}
        description={enrollment.description}
        eyebrow={enrollment.eyebrow}
        sectionTitle={enrollment.sectionTitle}
      />
      <DashboardExpectationsSection {...expectations} />
      <SupportSection />
    </section>
  );
}
