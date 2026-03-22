import { HomeHero } from "@/features/home/components/home-hero";
import { HomeHeritageSection } from "@/features/home/components/home-heritage-section";

export function HomePageContent() {
  return (
    <main className="bg-background">
      <HomeHero />
      <HomeHeritageSection />
    </main>
  );
}
