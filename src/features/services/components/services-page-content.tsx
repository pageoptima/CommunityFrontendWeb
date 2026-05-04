import { getServiceCategories } from "@/features/services/api/get-service-categories";
import { ServicesCategoriesSection } from "@/features/services/components/services-categories-section";
import { ServicesHero } from "@/features/services/components/services-hero";

export async function ServicesPageContent() {
  const categories = await getServiceCategories();

  return (
    <main className="bg-background">
      <ServicesHero />
      <ServicesCategoriesSection categories={categories} />
    </main>
  );
}
