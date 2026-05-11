"use client";

import Link from "next/link";

import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { fadeInUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { montserrat, poppins } from "@/styles/fonts";

type HomeEnrollmentTipsCardProps = Readonly<{
  tips: ReadonlyArray<string>;
}>;

export function HomeEnrollmentTipsCard({ tips }: HomeEnrollmentTipsCardProps) {
  return (
    <motion.article
      className="rounded-[24px] bg-[linear-gradient(135deg,#2FCFC3_0%,#2B74D8_100%)] px-4.5 py-5.5 text-white shadow-[0_22px_54px_-38px_rgba(18,93,109,0.38)] sm:px-5.5 sm:py-6.5"
      variants={fadeInUpItem}
    >
      <Image
        src="/icons/home/enrollment/helpful-tips.svg"
        alt=""
        aria-hidden="true"
        className="size-11 sm:size-13"
        width={56}
        height={56}
      />

      <h3
        className={cn(
          montserrat.className,
          "mt-4 text-[clamp(1.45rem,2vw,2rem)] font-semibold tracking-[-0.05em]",
        )}
      >
        Helpful Tips
      </h3>

      <ul className="mt-4.5 space-y-4">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-white" />
            <p
              className={cn(
                poppins.className,
                "text-[0.84rem] leading-[1.5] text-white/92 sm:text-[0.9rem]",
              )}
            >
              {tip}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5.5">
        <Button
          asChild
          className="h-11 w-full rounded-full bg-white px-5 text-[0.9rem] text-[#0f4d4a] shadow-[0_16px_34px_-18px_rgba(18,93,109,0.42)] hover:bg-white/95"
          size="lg"
          variant="outline"
        >
          <Link href="/contact">
            <Image
              src="/icons/home/enrollment/support-call.svg"
              alt=""
              aria-hidden="true"
              className="size-4.5"
              width={20}
              height={20}
            />
            <span className="text-black">Get Enrollment Support</span>
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
