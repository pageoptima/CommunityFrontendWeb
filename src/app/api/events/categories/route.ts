import { NextResponse } from "next/server";

import { fallbackEventCategories } from "@/features/community/constants/event-categories";
import type { CommunityEventCategory } from "@/features/community/types/community-event";
import { endpoints } from "@/services/http/apis";
import { apiConnector } from "@/services/http/client";

export async function GET() {
  try {
    const payload = await apiConnector<CommunityEventCategory[]>(
      "get",
      endpoints.EVENTS.CATEGORIES,
    );

    if (payload.length === 0) {
      return NextResponse.json(fallbackEventCategories);
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(fallbackEventCategories);
  }
}
