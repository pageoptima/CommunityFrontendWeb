"use client";

import { motion } from "framer-motion";

import { HomePlatformFeatureCard } from "@/features/home/components/home-platform-feature-card";
import { fadeInUpContainer, fadeInUpItem } from "@/lib/motion";

const platformFeatureIcons = {
  identification: "/icons/home/platform-features/id-card.svg",
  lineage: "/icons/home/platform-features/family-tree.svg",
  documents: "/icons/home/platform-features/document-vault.svg",
} as const;

const platformFeatures = [
  {
    iconType: "identification",
    text: "Receive your official Taíno Nation identification card with a unique member number, photo, and verification details.",
  },
  {
    iconType: "lineage",
    text: "Document and visualize your maternal lineage with an interactive family tree showing your ancestral connections.",
  },
  {
    iconType: "documents",
    text: "Store and access your enrollment documents, certificates, and lineage records securely in your personal vault.",
  },
  {
    iconType: "identification",
    text: "Stay informed with announcements, news, and important updates from tribal leadership and community organizers.",
  },
  {
    iconType: "lineage",
    text: "Discover and register for cultural ceremonies, educational workshops, regional gatherings, and community celebrations.",
  },
  {
    iconType: "documents",
    text: "Access health services, legal assistance, educational resources, and community support programs exclusively for members.",
  },
  {
    iconType: "identification",
    text: "Connect with other members from your assigned Yucayeke region and participate in regional community activities.",
  },
  {
    iconType: "lineage",
    text: "Download our iOS and Android apps to access your profile, documents, and community features on the go.",
  },
  {
    iconType: "documents",
    text: "Access educational resources, language lessons, historical archives, and cultural preservation materials.",
  },
] as const;

export function HomePlatformFeaturesSection() {
  return (
    <motion.section
      className="overflow-hidden bg-[linear-gradient(180deg,#004D43_0%,#0080B3_100%)] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUpContainer}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            variants={fadeInUpItem}
          >
            Platform Features
          </motion.span>

          <motion.h2
            className="mt-10 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[4.4rem] lg:leading-[1.05]"
            variants={fadeInUpItem}
          >
            Everything You Need in One Place
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-6xl text-lg leading-8 text-white/90 sm:text-xl"
            variants={fadeInUpItem}
          >
            Our comprehensive platform provides all the tools and resources you
            need to connect with your heritage, access services, and participate
            in community life.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={fadeInUpContainer}
        >
          {platformFeatures.map((feature) => (
            <HomePlatformFeatureCard
              key={feature.text}
              iconSrc={platformFeatureIcons[feature.iconType]}
              text={feature.text}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
