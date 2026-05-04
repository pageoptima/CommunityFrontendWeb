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
} as const;

const serviceCategoryPresentationByKey: Record<string, ServiceCategory> = {
  health: {
    description: "Medical, mental health, and holistic care.",
    iconSrc: "/icons/services/health-wellness.svg",
    title: "Health & Wellness",
    tone: "teal",
  },
  legal: {
    description: "Rights advocacy and legal support.",
    iconSrc: "/icons/services/legal-assistance.svg",
    title: "Legal Assistance",
    tone: "olive",
  },
  education: {
    description: "Learning and skill development.",
    iconSrc: "/icons/services/education-training.svg",
    title: "Education & Training",
    tone: "slate",
  },
  support: {
    description: "Emergency and ongoing assistance.",
    iconSrc: "/icons/services/community-support.svg",
    title: "Community Support",
    tone: "forest",
  },
  cultural: {
    description: "Language, arts, and traditions.",
    iconSrc: "/icons/services/cultural-programme.svg",
    title: "Cultural Programs",
    tone: "olive",
  },
  youth: {
    description: "Programs for children and teens.",
    iconSrc: "/icons/services/youth-service.svg",
    title: "Youth Services",
    tone: "sea",
  },
  elder: {
    description: "Support for senior community members.",
    iconSrc: "/icons/services/elder-care.svg",
    title: "Elder Care",
    tone: "stone",
  },
  housing: {
    description: "Shelter and housing assistance.",
    iconSrc: "/icons/services/housing-support.svg",
    title: "Housing Support",
    tone: "indigo",
  },
};

export function getServiceCategoryPresentation(category: {
  icon: string;
  key: string;
  name: string;
}): ServiceCategory {
  const normalizedKey = category.key.trim().toLowerCase();
  const normalizedIcon = category.icon.trim().toLowerCase();

  const mapped =
    serviceCategoryPresentationByKey[normalizedKey] ??
    serviceCategoryPresentationByKey[normalizedIcon];

  if (mapped) {
    return mapped;
  }

  return {
    title: category.name,
    description: "Explore services, support options, and member resources.",
    iconSrc: "/icons/services/community-support.svg",
    tone: "forest",
  };
}
