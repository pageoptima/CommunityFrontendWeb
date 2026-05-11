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
        "min-h-52 rounded-[1.4rem] border border-white/25 px-4 py-4 text-white shadow-[0_16px_38px_-24px_rgba(0,0,0,0.36)] sm:px-5 sm:py-5",
      )}
      variants={fadeInUpItem}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
        height={56}
        src={iconSrc}
        width={56}
      />

      <p className="mt-5 text-[0.88rem] leading-[1.5] text-white/95 sm:mt-6 sm:text-[0.92rem]">
        {text}
      </p>
    </motion.article>
  );
}
