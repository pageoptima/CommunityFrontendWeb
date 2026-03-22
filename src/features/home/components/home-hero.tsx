"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeInScaleItem, fadeInUpContainer, fadeInUpItem } from "@/lib/motion";

const memberAvatars = [
  { src: "/images/member1.png", alt: "Community member portrait 1" },
  { src: "/images/member2.png", alt: "Community member portrait 2" },
  { src: "/images/member3.png", alt: "Community member portrait 3" },
] as const;

export function HomeHero() {
  return (
    <motion.section
      className="relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInUpContainer}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,207,195,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(43,116,216,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pt-24 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.h1
            className="text-foreground max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            variants={fadeInUpItem}
          >
            Welcome to the{" "}
            <span className="bg-[linear-gradient(135deg,#2fcfc3_0%,#2b74d8_100%)] bg-clip-text text-transparent">
              Taíno Nation
            </span>{" "}
            Digital Platform
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-6 max-w-3xl text-base leading-7 sm:text-lg"
            variants={fadeInUpItem}
          >
            Reconnect with your ancestral roots, preserve your lineage, and join
            a sovereign community dedicated to honoring our Indigenous heritage
            and cultural identity.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            variants={fadeInUpItem}
          >
            <Button size="xl" rightIcon={<ArrowRight />}>
              Start Your Enrollment
            </Button>
            <Button variant="outline" size="xl">
              Explore Community
            </Button>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            variants={fadeInUpItem}
          >
            <motion.div
              className="flex items-center -space-x-3"
              variants={fadeInUpContainer}
            >
              {memberAvatars.map((member) => (
                <motion.div
                  key={member.src}
                  className="border-surface bg-surface overflow-hidden rounded-full border-2"
                  variants={fadeInScaleItem}
                >
                  <Image
                    alt={member.alt}
                    className="h-11 w-11 object-cover"
                    height={44}
                    priority={false}
                    src={member.src}
                    width={44}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-muted-foreground text-sm leading-6"
              variants={fadeInUpItem}
            >
              <span className="text-foreground font-semibold">5M+</span>{" "}
              Yucayeke Member Joined
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
