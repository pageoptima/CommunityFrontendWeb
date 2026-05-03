"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PageHeroSection } from "@/components/shared/page-hero-section";
import { Button } from "@/components/ui/button";
import { fadeInScaleItem, fadeInUpContainer, fadeInUpItem } from "@/lib/motion";

import sharedStyles from "../styles/home-shared.module.scss";

const memberAvatars = [
  { src: "/images/member1.png", alt: "Community member portrait 1" },
  { src: "/images/member2.png", alt: "Community member portrait 2" },
  { src: "/images/member3.png", alt: "Community member portrait 3" },
] as const;

export function HomeHero() {
  return (
    <PageHeroSection containerClassName={sharedStyles.sectionContainer}>
      <motion.h1
        className="text-foreground mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:mt-5 sm:text-5xl lg:mt-6 lg:text-6xl"
        variants={fadeInUpItem}
      >
        Welcome to the{" "}
        <span className={sharedStyles.gradientText}>Taíno Nation</span> Digital
        Platform
      </motion.h1>

      <motion.p
        className="text-muted-foreground mt-6 max-w-3xl text-base leading-7 sm:text-lg"
        variants={fadeInUpItem}
      >
        Reconnect with your ancestral roots, preserve your lineage, and join a
        sovereign community dedicated to honoring our Indigenous heritage and
        cultural identity.
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
          <span className="text-foreground font-semibold">5M+</span> Yucayeke
          Member Joined
        </motion.div>
      </motion.div>
    </PageHeroSection>
  );
}
