import { getYucayekeHeroStats } from "@/features/yucayeke/api/get-community-meta";
import { YucayekeHero } from "@/features/yucayeke/components/yucayeke-hero";

export async function YucayekePageContent() {
  const heroStats = await getYucayekeHeroStats();

  return (
    <main className="bg-background">
      <YucayekeHero stats={heroStats} />
    </main>
  );
}
