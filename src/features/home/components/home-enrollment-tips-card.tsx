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
      className="rounded-[28px] bg-[linear-gradient(135deg,#2FCFC3_0%,#2B74D8_100%)] px-5 py-7 text-white shadow-[0_22px_54px_-38px_rgba(18,93,109,0.38)] sm:px-7 sm:py-8"
      variants={fadeInUpItem}
    >
      <Image
        src="/icons/home/enrollment/helpful-tips.svg"
        alt=""
        aria-hidden="true"
        className="size-14 sm:size-16"
        width={56}
        height={56}
      />

      <h3
        className={cn(
          montserrat.className,
          "mt-5 text-[clamp(1.8rem,2.4vw,2.5rem)] font-semibold tracking-[-0.05em]",
        )}
      >
        Helpful Tips
      </h3>

      <ul className="mt-6 space-y-5">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-4">
            <CircleCheckBig className="mt-0.5 size-6 shrink-0 text-white" />
            <p
              className={cn(
                poppins.className,
                "text-[0.96rem] leading-6 text-white/92 sm:text-[1rem]",
              )}
            >
              {tip}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Button
          asChild
          className="h-12 w-full rounded-full bg-white px-6 text-[#0f4d4a] shadow-[0_16px_34px_-18px_rgba(18,93,109,0.42)] hover:bg-white/95"
          size="lg"
          variant="outline"
        >
          <Link href="/services">
            <Image
              src="/icons/home/enrollment/support-call.svg"
              alt=""
              aria-hidden="true"
              className="size-5"
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
