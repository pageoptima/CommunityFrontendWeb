"use client";

import { motion } from "framer-motion";

import { fadeInUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { montserrat, poppins } from "@/styles/fonts";

export type HomeEnrollmentStepTone = Readonly<{
  bubbleClassName: string;
  numberClassName: string;
}>;

export type HomeEnrollmentStepCardProps = Readonly<{
  step: string;
  title: string;
  description: string;
  tone: HomeEnrollmentStepTone;
}>;

export function HomeEnrollmentStepCard({
  step,
  title,
  description,
  tone,
}: HomeEnrollmentStepCardProps) {
  return (
    <motion.article
      className="relative rounded-[28px] border border-black/10 bg-white px-6 pt-16 pb-8 text-center shadow-[0_18px_42px_-34px_rgba(16,24,40,0.24)] sm:px-7 sm:pb-9"
      variants={fadeInUpItem}
    >
      <div
        className={cn(
          "absolute top-0 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_18px_32px_-20px_rgba(0,0,0,0.28)]",
          tone.bubbleClassName,
        )}
      >
        <div className="text-center">
          <div
            className={cn(
              montserrat.className,
              "text-[2.05rem] leading-none font-medium sm:text-[2.35rem]",
              tone.numberClassName,
            )}
          >
            {step}
          </div>
          <div
            className={cn(
              poppins.className,
              "mt-1 text-[1rem] leading-none font-semibold sm:text-[1.05rem]",
              tone.numberClassName,
            )}
          >
            Step
          </div>
        </div>
      </div>

      <div className="min-h-18 sm:min-h-20">
        <h3
          className={cn(
            montserrat.className,
            "text-[1.45rem] leading-tight font-semibold tracking-[-0.04em] text-[#2D5F9F] sm:text-[1.6rem]",
          )}
        >
          {title}
        </h3>
      </div>
      <p
        className={cn(
          poppins.className,
          "mt-1 text-[1.03rem] leading-7 text-[#4E4B47] sm:mt-4 sm:text-[1.08rem]",
        )}
      >
        {description}
      </p>
    </motion.article>
  );
}
