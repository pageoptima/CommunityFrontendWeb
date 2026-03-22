"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUpItem } from "@/lib/motion";

type HeritageCardTone = "mint" | "cream" | "lilac";

const toneClasses: Record<HeritageCardTone, string> = {
  mint: "bg-[linear-gradient(180deg,#EAFFFD_0%,#FFFFFF_100%)]",
  cream: "bg-[linear-gradient(180deg,#FFF8EA_0%,#FFFFFF_100%)]",
  lilac: "bg-[linear-gradient(180deg,#EFEAFF_0%,#FFFFFF_100%)]",
};

type HeritageCardProps = {
  iconSrc: string;
  title: string;
  description: string;
  tone: HeritageCardTone;
};

export function HomeHeritageCard({
  iconSrc,
  title,
  description,
  tone,
}: HeritageCardProps) {
  return (
    <motion.article
      className={cn(
        "border-border/70 rounded-2xl border p-6 shadow-[0_18px_40px_-34px_rgba(16,47,52,0.28)]",
        toneClasses[tone],
      )}
      variants={fadeInUpItem}
    >
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl">
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
          height={56}
          src={iconSrc}
          width={56}
        />
      </div>

      <h3 className="text-foreground mt-5 max-w-116.25 text-2xl leading-[1.2] font-semibold">
        {title}
      </h3>

      <p className="text-foreground/80 mt-4 text-[15px] leading-6">
        {description}
      </p>
    </motion.article>
  );
}
