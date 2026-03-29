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
        "flex items-center gap-4 rounded-3xl px-6 py-6",
      )}
      variants={fadeInUpItem}
    >
      <CircleCheckBig className="size-6 shrink-0 text-white" />
      <span className="text-lg font-medium text-white">{label}</span>
    </motion.div>
  );
}
