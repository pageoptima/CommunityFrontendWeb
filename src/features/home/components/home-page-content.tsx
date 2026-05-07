import { HomeHero } from "@/features/home/components/home-hero";
import { HomeHeritageSection } from "@/features/home/components/home-heritage-section";
import { HomePlatformFeaturesSection } from "@/features/home/components/home-platform-features-section";
import { HomeEnrollmentProcessSection } from "./home-enrollment-process-section";

export function HomePageContent() {
  return (
    <main className="bg-background">
      <HomeHero />
      <HomeHeritageSection />
      <HomeEnrollmentProcessSection />
      <HomePlatformFeaturesSection />
    </main>
  );
}
