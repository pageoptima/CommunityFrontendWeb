import { ServicesCategoriesSection } from "@/features/services/components/services-categories-section";
import { ServicesHero } from "@/features/services/components/services-hero";

export function ServicesPageContent() {
  return (
    <main className="bg-background">
      <ServicesHero />
      <ServicesCategoriesSection />
    </main>
  );
}
