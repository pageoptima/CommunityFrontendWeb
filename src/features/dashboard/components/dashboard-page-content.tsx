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
      className="mx-auto flex w-full max-w-7xl flex-col gap-8 pt-1 sm:gap-10 sm:pt-3 lg:gap-12 lg:pt-4"
    >
      <DashboardHeroSection description={hero.description} title={hero.title} />
      <DashboardEnrollmentSection {...enrollment} />
      <DashboardExpectationsSection {...expectations} />
      <SupportSection />
    </section>
  );
}
