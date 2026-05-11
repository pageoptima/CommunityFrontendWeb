"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUpItem } from "@/lib/motion";

import sharedStyles from "../styles/home-shared.module.scss";

type HomePlatformFeatureCardProps = {
  iconSrc: string;
  text: string;
};

export function HomePlatformFeatureCard({
  iconSrc,
  text,
}: HomePlatformFeatureCardProps) {
  return (
    <motion.article
      className={cn(
        sharedStyles.glassPanel,
        "min-h-64 rounded-3xl border border-white/25 px-5 py-5 text-white shadow-[0_16px_38px_-24px_rgba(0,0,0,0.36)] sm:px-6 sm:py-6",
      )}
      variants={fadeInUpItem}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
        height={56}
        src={iconSrc}
        width={56}
      />

      <p className="mt-8 text-[15px] leading-6 text-white/95 sm:mt-10 sm:text-base">
        {text}
      </p>
    </motion.article>
  );
}
