import type { LucideIcon } from "lucide-react";

import { FileCheck2, FileUp, TreePine, UserRound } from "lucide-react";

export type EnrollmentStep = Readonly<{
  step: number;
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  icon: LucideIcon;
  progress: number;
  isEnabled: boolean;
}>;

export type DashboardExpectationCard = Readonly<{
  iconSrc: string;
  title: string;
  tone: "sand" | "peach" | "lavender";
}>;

export const dashboardConfig = {
  hero: {
    title: {
      prefix: "Enrollment",
      highlight: "Application",
      suffix: "Portal",
    },
    description:
      "Start your enrollment application, track your progress, and reconnect with your Taíno heritage. Each step brings you closer to official tribal membership and community connection.",
  },
  enrollment: {
    eyebrow: "Enrollment Dashboard",
    description: "Complete your application and track your progress",
    applicationStatusLabel: "Application Status",
    applicationStatusValue: "Not Started",
    sectionTitle: "Your Enrollment Journey",
    steps: [
      {
        step: 1,
        title: "Personal Information",
        description: "Provide your basic details and contact information",
        ctaLabel: "Start Step 1",
        href: "/profile",
        icon: UserRound,
        progress: 0.26,
        isEnabled: true,
      },
      {
        step: 2,
        title: "Maternal Lineage",
        description: "Document your ancestral maternal line",
        ctaLabel: "Start Step 2",
        icon: TreePine,
        progress: 0,
        isEnabled: false,
      },
      {
        step: 3,
        title: "Document Upload",
        description: "Submit supporting lineage documents",
        ctaLabel: "Start Step 3",
        icon: FileUp,
        progress: 0,
        isEnabled: false,
      },
      {
        step: 4,
        title: "Review & Submit",
        description: "Final review and application submission",
        ctaLabel: "Start Step 4",
        icon: FileCheck2,
        progress: 0,
        isEnabled: false,
      },
    ] as const satisfies readonly EnrollmentStep[],
  },
  expectations: {
    title: "What to Expect During Enrollment",
    description:
      "Our enrollment process is designed to be thorough yet respectful, ensuring your heritage is properly documented while honoring your family's story.",
    cards: [
      {
        iconSrc: "/icons/dashboard/secure.svg",
        title: "Secure & Private",
        tone: "sand",
      },
      {
        iconSrc: "/icons/dashboard/progress.svg",
        title: "Save Your Progress",
        tone: "peach",
      },
      {
        iconSrc: "/icons/dashboard/support.svg",
        title: "Expert Support",
        tone: "lavender",
      },
    ] as const satisfies readonly DashboardExpectationCard[],
  },
} as const;
