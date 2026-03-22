"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { fadeInUpItem } from "@/lib/motion";

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
      className="min-h-72.5 rounded-3xl border border-white/25 bg-white/12 px-6 py-6 text-white shadow-[0_16px_38px_-24px_rgba(0,0,0,0.36)] backdrop-blur-[2px] sm:px-7 sm:py-7"
      variants={fadeInUpItem}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="h-14 w-14 shrink-0 object-contain"
        height={73}
        src={iconSrc}
        width={73}
      />

      <p className="mt-12 text-[17px] leading-7 text-white/95 sm:mt-14">
        {text}
      </p>
    </motion.article>
  );
}
