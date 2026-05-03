import type {
  CommunityMeta,
  YucayekeHeroStats,
} from "@/features/yucayeke/types/community-meta";
import { endpoints } from "@/services/http/apis";
import { apiConnector } from "@/services/http/client";

const UPCOMING_EVENTS_PLACEHOLDER_COUNT = 15;

const fallbackHeroStats: YucayekeHeroStats = {
  totalMembers: 247,
  activeMembers: 189,
  upcomingEvents: UPCOMING_EVENTS_PLACEHOLDER_COUNT,
};

function coerceCount(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export async function getYucayekeHeroStats(): Promise<YucayekeHeroStats> {
  try {
    const meta = await apiConnector<CommunityMeta>(
      "get",
      endpoints.ACCOUNT.COMMUNITY_META,
    );

    return {
      totalMembers: coerceCount(
        meta.totalUsersCount,
        fallbackHeroStats.totalMembers,
      ),
      activeMembers: coerceCount(
        meta.activeUserCounts,
        fallbackHeroStats.activeMembers,
      ),
      upcomingEvents: UPCOMING_EVENTS_PLACEHOLDER_COUNT,
    };
  } catch {
    return fallbackHeroStats;
  }
}
