"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { fadeInUpContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PageHeroSectionProps = Readonly<{
  backgroundClassName?: string;
  children: ReactNode;
  containerClassName: string;
}>;

const defaultBackgroundClassName =
  "bg-[radial-gradient(circle_at_top,rgba(47,207,195,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(43,116,216,0.12),transparent_28%)]";

export function PageHeroSection({
  backgroundClassName = defaultBackgroundClassName,
  children,
  containerClassName,
}: PageHeroSectionProps) {
  return (
    <motion.section
      className="relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInUpContainer}
    >
      <div className={cn("absolute inset-0", backgroundClassName)} />

      <div
        className={cn(
          containerClassName,
          "relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24",
        )}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
