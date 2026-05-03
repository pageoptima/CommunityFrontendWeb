import { NextRequest, NextResponse } from "next/server";

import { getFallbackUpcomingEventsByCategory } from "@/features/community/constants/upcoming-events";
import type { CommunityEventApiItem } from "@/features/community/types/community-event";
import { endpoints } from "@/services/http/apis";
import { apiConnector } from "@/services/http/client";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  try {
    const payload = await apiConnector<CommunityEventApiItem[]>(
      "get",
      endpoints.EVENTS.LIST,
      undefined,
      undefined,
      {
        params: category ? { category } : undefined,
      },
    );

    if (payload.length === 0) {
      return NextResponse.json(getFallbackUpcomingEventsByCategory(category));
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(getFallbackUpcomingEventsByCategory(category));
  }
}
