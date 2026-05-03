import { getUpcomingCommunityEvents } from "@/features/community/api/get-upcoming-events";
import { CommunityFeaturedAnnouncementsSection } from "@/features/community/components/community-featured-announcements-section";
import type { CommunityEventApiItem } from "@/features/community/types/community-event";
import { CommunityHero } from "@/features/community/components/community-hero";

function getRegistrationCount(event: CommunityEventApiItem) {
  return event.registrationCount ?? event._count?.registrations ?? 0;
}

export async function CommunityPageContent() {
  const upcomingEvents = await getUpcomingCommunityEvents();
  const featuredEvents = [...upcomingEvents]
    .sort(
      (left, right) => getRegistrationCount(right) - getRegistrationCount(left),
    )
    .slice(0, 2);

  return (
    <main className="bg-background">
      <CommunityHero />
      <CommunityFeaturedAnnouncementsSection events={featuredEvents} />
    </main>
  );
}
