export const profileConfig = {
  copy: {
    memberSince: "Member since January 15, 2023",
    memberStatus: "Enrolled Member",
    name: "Carmen María",
    portraitSrc: "/images/member1.png",
  },
  details: [
    {
      iconSrc: "/icons/profile/member.svg",
      value: "TN-2847-GUA",
    },
    {
      iconSrc: "/icons/profile/location.svg",
      value: "Yucayeke Guainía",
    },
    {
      iconSrc: "/icons/profile/calendar.svg",
      value: "Born: March 12, 1985",
    },
  ],
  lineageEntries: [
    {
      born: "March 12, 1985",
      generation: "1",
      generationLabel: "You (Current Generation)",
      name: "Carmen María Rodríguez Torres",
      place: "Arecibo, PR",
      status: "Verified",
      statusLabel: "Status",
    },
    {
      born: "March 12, 1985",
      generation: "2",
      generationLabel: "Mother",
      name: "María Elena Torres Rivera",
      place: "Arecibo, PR",
      status: "Verified",
      statusLabel: "Status",
    },
    {
      born: "March 12, 1985",
      generation: "3",
      generationLabel: "Maternal Grandmother",
      name: "Ana Isabel Rivera Colón",
      place: "Arecibo, PR",
      status: "Verified",
      statusLabel: "Status",
    },
  ],
  lineageStats: [
    {
      description: "Documented maternal line",
      label: "Generations",
      value: "6",
    },
    {
      description: "Supporting records verified",
      label: "Documents",
      value: "17",
    },
    {
      description: "Lineage traced back to 1847",
      label: "Years",
      value: "117",
    },
  ],
  lineageTabs: [
    {
      iconSrc: "/icons/profile/overview.svg",
      label: "Overview",
      value: "overview",
    },
    {
      iconSrc: "/icons/profile/lineage.svg",
      label: "Lineage",
      value: "lineage",
    },
    {
      iconSrc: "/icons/profile/yucayeke.svg",
      label: "Yucayeke",
      value: "yucayeke",
    },
    {
      iconSrc: "/icons/profile/documents.svg",
      label: "Documents",
      value: "documents",
    },
    {
      iconSrc: "/icons/profile/calendar.svg",
      label: "Activity",
      value: "activity",
    },
    {
      iconSrc: "/icons/profile/settings.svg",
      label: "Settings",
      value: "settings",
    },
  ],
  regionalMembers: [
    {
      memberId: "TN-1523-GUA",
      name: "Roberto Santos Rivera",
      portraitSrc: "/images/member1.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-1844-GUA",
      name: "Elena Mendez Cruz",
      portraitSrc: "/images/member2.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-1912-GUA",
      name: "Luis Antonio Torres",
      portraitSrc: "/images/member3.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2031-GUA",
      name: "María Isabel Rivera",
      portraitSrc: "/images/member2.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2178-GUA",
      name: "Carlos Javier Ortiz",
      portraitSrc: "/images/member1.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2295-GUA",
      name: "Ana Sofía Maldonado",
      portraitSrc: "/images/member3.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2410-GUA",
      name: "Daniela Cruz Vázquez",
      portraitSrc: "/images/member2.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2541-GUA",
      name: "Javier Morales Peña",
      portraitSrc: "/images/member1.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2667-GUA",
      name: "Lucía Pérez Santiago",
      portraitSrc: "/images/member3.png",
      role: "Regional Coordinator",
    },
    {
      memberId: "TN-2798-GUA",
      name: "Miguel Ángel Torres",
      portraitSrc: "/images/member2.png",
      role: "Regional Coordinator",
    },
  ],
} as const;

export type ProfileLineageTabValue =
  (typeof profileConfig.lineageTabs)[number]["value"];

export type ProfileLineageEntry = (typeof profileConfig.lineageEntries)[number];

export type ProfileRegionalMember =
  (typeof profileConfig.regionalMembers)[number];
