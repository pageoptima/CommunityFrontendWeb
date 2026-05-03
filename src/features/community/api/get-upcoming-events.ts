import { fallbackUpcomingEvents } from "@/features/community/constants/upcoming-events";
import type { CommunityEventApiItem } from "@/features/community/types/community-event";
import { endpoints } from "@/services/http/apis";
import { apiConnector } from "@/services/http/client";

export async function getUpcomingCommunityEvents(): Promise<
  CommunityEventApiItem[]
> {
  try {
    const events = await apiConnector<CommunityEventApiItem[]>(
      "get",
      endpoints.EVENTS.LIST,
    );

    if (events.length === 0) {
      return fallbackUpcomingEvents;
    }

    return events;
  } catch {
    return [];
  }
}
