"use client";

import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";

import { fadeInUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

import sharedStyles from "../styles/home-shared.module.scss";

type HomeMissionFeatureProps = {
  label: string;
};

export function HomeMissionFeature({ label }: HomeMissionFeatureProps) {
  return (
    <motion.div
      className={cn(
        sharedStyles.glassPanel,
        "flex items-center gap-3 rounded-3xl px-5 py-5 sm:px-6 sm:py-6",
      )}
      variants={fadeInUpItem}
    >
      <CircleCheckBig className="size-5 shrink-0 text-white sm:size-6" />
      <span className="text-base font-medium text-white sm:text-lg">
        {label}
      </span>
    </motion.div>
  );
}
