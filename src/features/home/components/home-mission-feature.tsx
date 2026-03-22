"use client";

import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";

import { fadeInUpItem } from "@/lib/motion";

type HomeMissionFeatureProps = {
  label: string;
};

export function HomeMissionFeature({ label }: HomeMissionFeatureProps) {
  return (
    <motion.div
      className="flex items-center gap-4 rounded-3xl bg-white/12 px-6 py-6 backdrop-blur-[2px]"
      variants={fadeInUpItem}
    >
      <CircleCheckBig className="size-6 shrink-0 text-white" />
      <span className="text-lg font-medium text-white">{label}</span>
    </motion.div>
  );
}
