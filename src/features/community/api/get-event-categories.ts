import { fallbackEventCategories } from "@/features/community/constants/event-categories";
import type { CommunityEventCategory } from "@/features/community/types/community-event";
import { endpoints } from "@/services/http/apis";
import { apiConnector } from "@/services/http/client";

export async function getEventCategories(): Promise<CommunityEventCategory[]> {
  try {
    const categories = await apiConnector<CommunityEventCategory[]>(
      "get",
      endpoints.EVENTS.CATEGORIES,
    );

    if (categories.length === 0) {
      return fallbackEventCategories;
    }

    return categories;
  } catch {
    return fallbackEventCategories;
  }
}
