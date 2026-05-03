export type YucayekeHighlightTone = "teal" | "copper" | "green";

export type YucayekeHighlight = Readonly<{
  description: string;
  iconSrc: string;
  title: string;
  tone: YucayekeHighlightTone;
}>;

export const yucayekeWelcomeContent = {
  title: "Welcome to Guainía",
  paragraphs: [
    "Guainía was one of the most prominent coastal Yucayeke regions in pre-colonial Borikén, strategically positioned along the northwest shores. This region was known for its skilled fishermen, expert canoe builders, and thriving maritime trade networks that connected communities across the Caribbean.",
    "The people of Guainía developed sophisticated fishing techniques, sustainable coastal management practices, and maintained strong spiritual connections to the ocean. Today, descendants from this region continue to honor these traditions while building modern community bonds.",
  ],
  map: {
    alt: "Illustrated topographic map of the Guainía coastal region",
    src: "/images/yucayeke-map.svg",
  },
} as const;

export const yucayekeHighlights: readonly YucayekeHighlight[] = [
  {
    title: "Maritime Heritage",
    description:
      "Deep connection to ocean traditions, fishing practices, and coastal stewardship.",
    iconSrc: "/icons/yucayeke/maritime-heritage.svg",
    tone: "teal",
  },
  {
    title: "Trade Networks",
    description:
      "Historical hub for inter-island commerce and cultural exchange across the Caribbean.",
    iconSrc: "/icons/yucayeke/trade-networks.svg",
    tone: "copper",
  },
  {
    title: "Strong Community",
    description:
      "Active member network with regular gatherings, cultural events, and shared support.",
    iconSrc: "/icons/yucayeke/strong-community.svg",
    tone: "green",
  },
] as const;
