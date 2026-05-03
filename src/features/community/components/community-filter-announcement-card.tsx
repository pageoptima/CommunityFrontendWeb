import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  communityEventBadgeClasses,
  communityEventCardClasses,
  communityUpcomingEventIconWrapClass,
  type CommunityEventCardTone,
} from "@/features/community/constants/community-event-card-tones";

type CommunityFilterAnnouncementCardProps = Readonly<{
  attendeeCount: number;
  badgeLabel: string;
  dateLabel: string;
  description: string;
  isRegistering: boolean;
  isRegistered: boolean;
  locationLabel: string;
  metaLabel: string;
  onRegister: () => void;
  timeLabel: string;
  title: string;
  tone: CommunityEventCardTone;
}>;

export function CommunityFilterAnnouncementCard({
  attendeeCount,
  badgeLabel,
  dateLabel,
  description,
  isRegistering,
  isRegistered,
  locationLabel,
  metaLabel,
  onRegister,
  timeLabel,
  title,
  tone,
}: CommunityFilterAnnouncementCardProps) {
  const buttonClassName = isRegistered
    ? "!bg-[#aa2628] hover:!bg-[#aa2628]"
    : "!bg-[#004d43] hover:!brightness-105";

  return (
    <article
      className={`rounded-[1.4rem] border bg-white px-5 py-5 ${communityEventCardClasses[tone]} sm:px-6 sm:py-6`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div
              className={`flex size-[3.7rem] shrink-0 items-center justify-center rounded-full border-[3px] ${communityUpcomingEventIconWrapClass}`}
            >
              <Image
                alt=""
                aria-hidden="true"
                height={32}
                src="/icons/events/events-upcoming.svg"
                width={32}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 text-[1.45rem] leading-[1.18] font-semibold tracking-[-0.04em] text-[#0d4d49]">
                <span>{title} -</span>
                <span className="whitespace-nowrap">{dateLabel}</span>
              </h3>

              <p className="mt-1.5 text-[0.96rem] leading-6 text-[#171717]/68">
                {metaLabel}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex min-w-[6.25rem] shrink-0 justify-center rounded-full px-4 py-1 text-[0.98rem] leading-none font-semibold tracking-[-0.04em] ${communityEventBadgeClasses[tone]}`}
          >
            {badgeLabel}
          </span>
        </div>

        <p className="max-w-[62rem] text-[0.98rem] leading-[1.45] text-[#171717]/74">
          {description}
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2.5 text-[0.9rem] text-[#171717] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <div className="inline-flex items-center gap-2">
              <Image
                alt=""
                aria-hidden="true"
                height={16}
                src="/icons/events/events-location.svg"
                width={16}
              />
              <span className="leading-5">{locationLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <Image
                alt=""
                aria-hidden="true"
                height={16}
                src="/icons/events/events-time.svg"
                width={16}
              />
              <span className="leading-5">{timeLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <Image
                alt=""
                aria-hidden="true"
                height={16}
                src="/icons/events/events-attending.svg"
                width={16}
              />
              <span className="leading-5">{attendeeCount} attending</span>
            </div>
          </div>

          <Button
            className={`h-11 min-w-[10.5rem] !rounded-[0.9rem] text-[1.05rem] font-semibold !text-white shadow-none ${buttonClassName}`}
            disabled={isRegistering}
            onClick={onRegister}
            type="button"
            variant="ghost"
          >
            {isRegistering
              ? "Registering..."
              : isRegistered
                ? "Registered"
                : "Register"}
          </Button>
        </div>
      </div>
    </article>
  );
}
