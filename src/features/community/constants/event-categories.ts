import type { CommunityEventCategory } from "@/features/community/types/community-event";

export const fallbackEventCategories: CommunityEventCategory[] = [
  {
    id: "fallback-category-cultural-events",
    key: "cultural_events",
    name: "Cultural Events",
    description: "Ceremonies, festivals, and traditional celebrations",
    icon: "cultural_events",
  },
  {
    id: "fallback-category-workshops",
    key: "workshops",
    name: "Workshops",
    description: "Hands-on learning and skill development sessions",
    icon: "workshops",
  },
  {
    id: "fallback-category-ceremonies",
    key: "ceremonies",
    name: "Ceremonies",
    description: "Sacred rituals and spiritual gatherings",
    icon: "ceremonies",
  },
  {
    id: "fallback-category-social-events",
    key: "social_events",
    name: "Social Events",
    description: "Community gatherings and networking",
    icon: "social_events",
  },
] as const;
