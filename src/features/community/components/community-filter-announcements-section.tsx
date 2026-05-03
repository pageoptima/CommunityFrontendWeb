"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { format, formatDistanceToNow } from "date-fns";

import { CommunityFilterAnnouncementCard } from "@/features/community/components/community-filter-announcement-card";
import { getCommunityEventTone } from "@/features/community/constants/community-event-card-tones";
import {
  isRegisterCommunityEventUnauthorizedError,
  useCommunityEventCategoriesQuery,
  useCommunityEventsByCategoryQuery,
  useRegisterCommunityEventMutation,
} from "@/features/community/hooks/community-event-queries";
import type {
  CommunityEventApiItem,
  CommunityEventCategory,
} from "@/features/community/types/community-event";
import { appendNextQuery, SIGN_IN_PATH } from "@/lib/auth";
import { cn } from "@/lib/utils";

import sharedStyles from "../styles/community-shared.module.scss";

type CommunityFilterAnnouncementsSectionProps = Readonly<{
  initialCategories: CommunityEventCategory[];
  initialEvents: CommunityEventApiItem[];
  isAuthenticated: boolean;
}>;

const ALL_UPDATES_KEY = "all";

const categoryIconByKey: Record<string, string> = {
  ceremonies: "/icons/community/ceremonies.svg",
  cultural_events: "/icons/community/cultural-events.svg",
  social_events: "/icons/community/social-events.svg",
  workshops: "/icons/community/workshops.svg",
};

function formatEventDate(dateTime: string) {
  return format(new Date(dateTime), "MMMM do");
}

function formatEventTimeRange(startDateTime: string, endDateTime: string) {
  return `${format(new Date(startDateTime), "h:mm a")} - ${format(new Date(endDateTime), "h:mm a")}`;
}

function getRegistrationCount(event: CommunityEventApiItem) {
  return event.registrationCount ?? event._count?.registrations ?? 0;
}

function buildFilterCardProps(event: CommunityEventApiItem) {
  const badgeLabel = event.category?.name ?? "Event";
  const publishedAgo = formatDistanceToNow(new Date(event.createdAt), {
    addSuffix: true,
  });

  return {
    attendeeCount: getRegistrationCount(event),
    badgeLabel,
    dateLabel: formatEventDate(event.startDateTime),
    description: event.description,
    locationLabel: event.location ?? "Location to be announced",
    metaLabel: `${badgeLabel} • ${publishedAgo}`,
    timeLabel: formatEventTimeRange(event.startDateTime, event.endDateTime),
    title: event.title,
    tone: getCommunityEventTone(event.category?.key),
  } as const;
}

function getCategoryIconStyle(iconPath: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${iconPath})`,
    WebkitMaskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    backgroundColor: "currentColor",
    maskImage: `url(${iconPath})`,
    maskPosition: "center",
    maskRepeat: "no-repeat",
    maskSize: "contain",
  };
}

export function CommunityFilterAnnouncementsSection({
  initialCategories,
  initialEvents,
  isAuthenticated,
}: CommunityFilterAnnouncementsSectionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategoryKey, setSelectedCategoryKey] =
    useState(ALL_UPDATES_KEY);
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const categoryQuery = useCommunityEventCategoriesQuery(initialCategories);
  const filteredEventsQuery = useCommunityEventsByCategoryQuery(
    selectedCategoryKey === ALL_UPDATES_KEY ? null : selectedCategoryKey,
  );
  const registerMutation = useRegisterCommunityEventMutation();

  const categories = categoryQuery.data ?? initialCategories;
  const events = useMemo(() => {
    if (selectedCategoryKey === ALL_UPDATES_KEY) {
      return initialEvents;
    }

    return filteredEventsQuery.data ?? [];
  }, [filteredEventsQuery.data, initialEvents, selectedCategoryKey]);

  async function handleRegister(eventId: string) {
    if (registeredEventIds.includes(eventId) || pendingEventId === eventId) {
      return;
    }

    if (!isAuthenticated) {
      router.push(appendNextQuery(SIGN_IN_PATH, pathname));
      return;
    }

    setPendingEventId(eventId);

    try {
      await registerMutation.mutateAsync(eventId);
      setRegisteredEventIds((currentEventIds) =>
        currentEventIds.includes(eventId)
          ? currentEventIds
          : [...currentEventIds, eventId],
      );
    } catch (error) {
      if (isRegisterCommunityEventUnauthorizedError(error)) {
        router.push(appendNextQuery(SIGN_IN_PATH, pathname));
        return;
      }

      console.error(error);
    } finally {
      setPendingEventId((currentEventId) =>
        currentEventId === eventId ? null : currentEventId,
      );
    }
  }

  return (
    <section className="bg-[#fffef7] py-8 sm:py-10 lg:py-12">
      <div className={cn(sharedStyles.sectionContainer, "relative")}>
        <div className="max-w-xl">
          <h2 className="text-[1.8rem] font-semibold tracking-tight text-[#0d4d49] sm:text-[2rem]">
            Filter Announcements
          </h2>
          <p className="mt-1.5 text-[0.96rem] leading-6 text-[#171717]/66">
            Filter updates and explore announcements
          </p>
        </div>

        <div className="mt-5 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-3">
            <button
              className={cn(
                "cursor-pointer rounded-full border px-5 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap transition-colors",
                selectedCategoryKey === ALL_UPDATES_KEY
                  ? "border-[#004d43] bg-[#004d43] text-[#ffffff]"
                  : "border-[#004d43] bg-[rgba(0,77,67,0.08)] text-[#174e47] hover:bg-[rgba(0,77,67,0.12)]",
              )}
              type="button"
              onClick={() => setSelectedCategoryKey(ALL_UPDATES_KEY)}
            >
              All Updates
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap transition-colors",
                  selectedCategoryKey === category.key
                    ? "border-[#004d43] bg-[#004d43] text-[#ffffff]"
                    : "border-[#004d43] bg-[rgba(0,77,67,0.08)] text-[#174e47] hover:bg-[rgba(0,77,67,0.12)]",
                )}
                type="button"
                onClick={() => setSelectedCategoryKey(category.key)}
              >
                {categoryIconByKey[category.key] ? (
                  <span
                    aria-hidden="true"
                    className="size-[1.1rem] shrink-0"
                    style={getCategoryIconStyle(
                      categoryIconByKey[category.key],
                    )}
                  />
                ) : null}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {filteredEventsQuery.isLoading ? (
          <p className="mt-5 text-sm text-[#171717]/64">
            Loading announcements...
          </p>
        ) : null}

        {events.length > 0 ? (
          <div className="mt-5 grid gap-4">
            {events.map((event) => (
              <CommunityFilterAnnouncementCard
                key={event.id}
                {...buildFilterCardProps(event)}
                isRegistered={registeredEventIds.includes(event.id)}
                isRegistering={pendingEventId === event.id}
                onRegister={() => void handleRegister(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.2rem] border border-[#c7dcd7] bg-white px-5 py-5 text-[0.95rem] text-[#171717]/70">
            No announcements are available for this category right now.
          </div>
        )}
      </div>
    </section>
  );
}
