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
      className="rounded-[28px] bg-[linear-gradient(135deg,#2FCFC3_0%,#2B74D8_100%)] px-6 py-8 text-white shadow-[0_22px_54px_-38px_rgba(18,93,109,0.38)] sm:px-8 sm:py-10"
      variants={fadeInUpItem}
    >
      <Image
        src="/icons/home/enrollment/helpful-tips.svg"
        alt=""
        aria-hidden="true"
        className="size-16 sm:size-[4.6rem]"
        width={64}
        height={64}
      />

      <h3
        className={cn(
          montserrat.className,
          "mt-6 text-[clamp(2.1rem,2.8vw,3rem)] font-semibold tracking-[-0.05em]",
        )}
      >
        Helpful Tips
      </h3>

      <ul className="mt-8 space-y-6">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-4">
            <CircleCheckBig className="mt-0.5 size-7 shrink-0 text-white" />
            <p
              className={cn(
                poppins.className,
                "text-[1.02rem] leading-7 text-white/92 sm:text-[1.08rem]",
              )}
            >
              {tip}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          asChild
          className="h-14 w-full rounded-full bg-white px-8 text-[#0f4d4a] shadow-[0_16px_34px_-18px_rgba(18,93,109,0.42)] hover:bg-white/95"
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
