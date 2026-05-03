import Image from "next/image";
import Link from "next/link";

import type { CommunityQuickLinkItem } from "@/features/community/constants/community-quick-links";

type CommunityQuickLinkCardProps = Readonly<{
  description: CommunityQuickLinkItem["description"];
  href: CommunityQuickLinkItem["href"];
  iconBackgroundClassName: CommunityQuickLinkItem["iconBackgroundClassName"];
  iconSrc: CommunityQuickLinkItem["iconSrc"];
  title: CommunityQuickLinkItem["title"];
}>;

export function CommunityQuickLinkCard({
  description,
  href,
  iconBackgroundClassName,
  iconSrc,
  title,
}: CommunityQuickLinkCardProps) {
  return (
    <Link
      className="group flex h-full min-h-[14rem] flex-col rounded-[1.5rem] border border-black/12 bg-white px-5 py-5 shadow-[0_20px_44px_-36px_rgba(31,41,55,0.24)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-34px_rgba(31,41,55,0.26)] sm:min-h-[14.5rem] sm:px-6 sm:py-6"
      href={href}
    >
      <div
        className={`flex size-[3.05rem] items-center justify-center rounded-[0.85rem] text-white shadow-[0_16px_28px_-20px_rgba(17,24,39,0.34)] ${iconBackgroundClassName}`}
      >
        <Image alt="" aria-hidden="true" height={26} src={iconSrc} width={26} />
      </div>

      <h3 className="mt-5 text-[1.7rem] leading-[1.14] font-semibold tracking-[-0.04em] text-[#2d2d2d] sm:text-[1.88rem]">
        {title}
      </h3>

      <p className="mt-4 max-w-[24rem] text-[1rem] leading-7 text-[#4a4a4a]/88 sm:text-[1.04rem]">
        {description}
      </p>
    </Link>
  );
}
