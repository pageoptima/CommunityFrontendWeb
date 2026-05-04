export const servicesHeroContent = {
  badge: "Member Resources",
  title: "Community Services Directory",
  description:
    "Comprehensive support services designed exclusively for Taíno Nation members. Access health care, legal assistance, educational programs, and community resources to support your wellbeing and growth.",
} as const;

export type ServiceCategoryTone =
  | "teal"
  | "olive"
  | "slate"
  | "forest"
  | "sea"
  | "stone"
  | "indigo";

export type ServiceCategory = Readonly<{
  description: string;
  iconSrc: string;
  title: string;
  tone: ServiceCategoryTone;
}>;

export const servicesCategoriesContent = {
  title: "Service Categories",
  description:
    "Browse our comprehensive directory of services organized by category. Select a service area to explore available support, contact details, and access options.",
  categories: [
    {
      title: "Health & Wellness",
      description: "Medical, mental health, and holistic care.",
      iconSrc: "/icons/services/health-wellness.svg",
      tone: "teal",
    },
    {
      title: "Legal Assistance",
      description: "Rights advocacy and legal support.",
      iconSrc: "/icons/services/legal-assistance.svg",
      tone: "olive",
    },
    {
      title: "Education & Training",
      description: "Learning and skill development.",
      iconSrc: "/icons/services/education-training.svg",
      tone: "slate",
    },
    {
      title: "Community Support",
      description: "Emergency and ongoing assistance.",
      iconSrc: "/icons/services/community-support.svg",
      tone: "forest",
    },
    {
      title: "Cultural Programs",
      description: "Language, arts, and traditions.",
      iconSrc: "/icons/services/cultural-programme.svg",
      tone: "olive",
    },
    {
      title: "Youth Services",
      description: "Programs for children and teens.",
      iconSrc: "/icons/services/youth-service.svg",
      tone: "sea",
    },
    {
      title: "Elder Care",
      description: "Support for senior community members.",
      iconSrc: "/icons/services/elder-care.svg",
      tone: "stone",
    },
    {
      title: "Housing Support",
      description: "Shelter and housing assistance.",
      iconSrc: "/icons/services/housing-support.svg",
      tone: "indigo",
    },
  ] as const satisfies readonly ServiceCategory[],
} as const;
