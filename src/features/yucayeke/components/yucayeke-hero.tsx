"use client";

import { motion } from "framer-motion";

import { PageHeroSection } from "@/components/shared/page-hero-section";
import type { YucayekeHeroStats } from "@/features/yucayeke/types/community-meta";
import { fadeInUpItem } from "@/lib/motion";

import sharedStyles from "../styles/yucayeke-shared.module.scss";

type YucayekeHeroProps = Readonly<{
  stats: YucayekeHeroStats;
}>;

const statsLabels = [
  { key: "totalMembers", label: "Total Members" },
  { key: "activeMembers", label: "Active Members" },
  { key: "upcomingEvents", label: "Upcoming Events" },
] as const;

const numberFormatter = new Intl.NumberFormat("en-US");

export function YucayekeHero({ stats }: YucayekeHeroProps) {
  return (
    <PageHeroSection containerClassName={sharedStyles.sectionContainer}>
      <motion.h1
        className="text-foreground mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:mt-5 sm:text-5xl lg:mt-6 lg:text-6xl"
        variants={fadeInUpItem}
      >
        Yucayeke <span className={sharedStyles.gradientText}>Guainía</span>
      </motion.h1>

      <motion.p
        className="text-muted-foreground mt-6 max-w-3xl text-base leading-7 sm:text-lg"
        variants={fadeInUpItem}
      >
        Northwest coastal region known for rich fishing traditions, maritime
        heritage, and strong community bonds. Your maternal lineage connects you
        to this ancestral territory.
      </motion.p>

      <motion.div
        className="divide-border/90 mt-5 flex w-full max-w-[38rem] flex-col divide-y sm:mt-6 sm:flex-row sm:divide-x sm:divide-y-0"
        variants={fadeInUpItem}
      >
        {statsLabels.map((item) => (
          <div
            className="flex-1 px-2.5 py-2.5 sm:px-3 sm:py-2.5"
            key={item.key}
          >
            <p className="text-primary text-[1.05rem] leading-tight font-semibold tracking-tight sm:text-[1.35rem]">
              {numberFormatter.format(stats[item.key])}
            </p>
            <p className="text-foreground mt-0.5 text-[0.8rem] leading-5 font-normal whitespace-nowrap sm:text-[0.86rem] sm:leading-5">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>
    </PageHeroSection>
  );
}
