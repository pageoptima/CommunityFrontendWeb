"use client";

import Link from "next/link";

import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { fadeInUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { poppins } from "@/styles/fonts";

const supportLinkStyle = {
  color: "#24ACC3",
  textDecorationColor: "#24ACC3",
  textDecorationLine: "underline",
  textUnderlineOffset: "4px",
} as const;

export function HomeEnrollmentCta() {
  return (
    <motion.div className="mt-12 text-center" variants={fadeInUpItem}>
      <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-white/70 shadow-[0_10px_24px_-18px_rgba(16,24,40,0.2)]">
        <Image
          src="/icons/home/enrollment/application.svg"
          alt=""
          aria-hidden="true"
          className="size-5"
          width={20}
          height={20}
        />
      </div>

      <Button
        asChild
        className="mx-auto h-14 w-full max-w-lg rounded-full bg-[linear-gradient(135deg,#2FCFC3_0%,#2B74D8_100%)]! px-8! text-[1rem]! font-semibold! shadow-[0_18px_38px_-20px_rgba(35,120,186,0.52)]! hover:brightness-105!"
        size="lg"
      >
        <Link href="/enrollment">
          <Image
            src="/icons/home/enrollment/application.svg"
            alt=""
            aria-hidden="true"
            className="size-5"
            width={20}
            height={20}
          />
          <span className="text-white">Begin Your Application</span>
        </Link>
      </Button>

      <p
        className={cn(
          poppins.className,
          "mt-4 text-[1.02rem] leading-6 text-[#2a2927]",
        )}
      >
        Questions?{" "}
        <Link
          className="font-semibold text-[#24ACC3] underline underline-offset-4 hover:decoration-[#24ACC3]"
          style={supportLinkStyle}
          href="/enrollment"
        >
          Read our enrollment FAQ
        </Link>{" "}
        or{" "}
        <Link
          className="font-semibold text-[#24ACC3] underline underline-offset-4 hover:decoration-[#24ACC3]"
          style={supportLinkStyle}
          href="/services"
        >
          contact us
        </Link>
      </p>
    </motion.div>
  );
}
