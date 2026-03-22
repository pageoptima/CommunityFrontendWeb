"use client";

import { motion } from "framer-motion";

import { HomeHeritageCard } from "@/features/home/components/home-heritage-card";
import { HomeMissionFeature } from "@/features/home/components/home-mission-feature";
import { fadeInUpContainer, fadeInUpItem } from "@/lib/motion";

const heritageCards = [
  {
    iconSrc: "/icons/home/heritage/sovereignty-first.svg",
    title: "Sovereign Data",
    description:
      "Your information belongs to the Taíno community. We maintain complete sovereignty over our data, ensuring it remains protected, private, and culturally respected.",
    tone: "mint",
  },
  {
    iconSrc: "/icons/home/heritage/cultural-identity.svg",
    title: "Cultural Identity",
    description:
      "Receive your official Tribal ID, trace your maternal lineage, and connect with your ancestral Yucayeke to strengthen your Indigenous identity.",
    tone: "cream",
  },
  {
    iconSrc: "/icons/home/heritage/community-hub.svg",
    title: "Community Help",
    description:
      "Access health services, legal assistance, cultural events, and community resources designed specifically for Taíno Nation members.",
    tone: "lilac",
  },
] as const;

const missionItems = [
  "Culturally Respectful Design",
  "Secure & Private",
  "Mobile & Web Access",
] as const;

export function HomeHeritageSection() {
  return (
    <motion.section
      className="overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={fadeInUpContainer}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            className="inline-flex items-center rounded-full bg-[#e8f8f3] px-5 py-2 text-sm font-semibold text-[#2c7d6f]"
            variants={fadeInUpItem}
          >
            About Our Platform
          </motion.span>

          <motion.h2
            className="text-foreground mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            variants={fadeInUpItem}
          >
            Preserving{" "}
            <span className="bg-[linear-gradient(135deg,#2fcfc3_0%,#2b74d8_100%)] bg-clip-text text-transparent">
              Heritage
            </span>{" "}
            Through Technology
          </motion.h2>

          <motion.p
            className="text-muted-foreground mt-5 text-base leading-7 sm:text-lg"
            variants={fadeInUpItem}
          >
            The Taíno Nation Digital Platform is a sovereign, community-owned
            system designed to honor our ancestors, preserve our lineage, and
            strengthen our bonds as Indigenous descendants of Borikén.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 grid gap-5 lg:grid-cols-3"
          variants={fadeInUpContainer}
        >
          {heritageCards.map((card) => (
            <HomeHeritageCard
              key={card.title}
              description={card.description}
              iconSrc={card.iconSrc}
              title={card.title}
              tone={card.tone}
            />
          ))}
        </motion.div>

        <motion.article
          className="mt-16 rounded-4xl bg-[linear-gradient(135deg,#3876b8_0%,#2379d2_100%)] px-6 py-10 text-white shadow-[0_24px_60px_-36px_rgba(23,91,156,0.45)] sm:px-8 lg:px-10 lg:py-12"
          variants={fadeInUpItem}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="max-w-105">
              <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Our Mission
              </h3>

              <p className="mt-6 text-sm leading-7 text-white/92 sm:text-base">
                To create a secure, culturally grounded digital platform that
                empowers Taíno descendants to reclaim their heritage, document
                their lineage, and participate in a thriving Indigenous
                community. We honor the wisdom of our ancestors while embracing
                modern technology to ensure our culture, traditions, and
                identity endure for generations to come.
              </p>
            </div>

            <div className="grid gap-5">
              {missionItems.map((item) => (
                <HomeMissionFeature key={item} label={item} />
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
}
