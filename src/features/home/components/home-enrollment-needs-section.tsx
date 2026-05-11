"use client";

import { motion } from "framer-motion";

import { fadeInUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { poppins } from "@/styles/fonts";

import {
  HomeEnrollmentNeedItem,
  type HomeEnrollmentNeedItemProps,
} from "@/features/home/components/home-enrollment-need-item";

type HomeEnrollmentNeedsSectionProps = Readonly<{
  items: ReadonlyArray<HomeEnrollmentNeedItemProps>;
}>;

export function HomeEnrollmentNeedsSection({
  items,
}: HomeEnrollmentNeedsSectionProps) {
  return (
    <motion.div
      className="flex h-full flex-col justify-center pr-0 lg:pr-4"
      variants={fadeInUpItem}
    >
      <h3
        className={cn(
          poppins.className,
          "text-[clamp(1.8rem,2.5vw,2.6rem)] font-semibold tracking-[-0.05em] text-[#174F4A]",
        )}
      >
        What You&apos;ll Need?
      </h3>

      <ul className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">
        {items.map((item) => (
          <HomeEnrollmentNeedItem key={item.title} {...item} />
        ))}
      </ul>
    </motion.div>
  );
}
