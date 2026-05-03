import { CommunityQuickLinkCard } from "@/features/community/components/community-quick-link-card";
import { communityQuickLinks } from "@/features/community/constants/community-quick-links";
import { cn } from "@/lib/utils";

import sharedStyles from "../styles/community-shared.module.scss";

export function CommunityQuickLinksSection() {
  return (
    <section className="bg-[#f8dfcf] py-10 sm:py-12 lg:py-14">
      <div className={cn(sharedStyles.sectionContainer, "relative")}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.95rem] font-semibold tracking-tight text-[#431313] sm:text-[2.15rem]">
            Quick Links
          </h2>
          <p className="mt-2.5 text-[1rem] leading-7 text-[#4c4c4c]/80 sm:text-[1.06rem]">
            Access important community resources and information without digging
            through multiple pages.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-9 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {communityQuickLinks.map((linkItem) => (
            <CommunityQuickLinkCard key={linkItem.title} {...linkItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
