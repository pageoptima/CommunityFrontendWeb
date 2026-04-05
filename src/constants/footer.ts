export type FooterLink = Readonly<{
  label: string;
  href: string;
}>;

export type FooterSocialLink = Readonly<{
  label: string;
  href: string;
  iconSrc: string;
}>;

export const footerQuickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Enrollment Process", href: "/enrollment" },
  { label: "Yucayeke Regions", href: "/yucayeke" },
  { label: "Member Services", href: "/services" },
  { label: "Community Events", href: "/community" },
  { label: "Cultural Resources", href: "/community" },
] as const satisfies ReadonlyArray<FooterLink>;

export const footerSupportLinks = [
  { label: "Help Center", href: "/services" },
  { label: "Enrollment FAQ", href: "/enrollment" },
  { label: "Contact Support", href: "/services" },
  { label: "Document Assistance", href: "/services" },
  { label: "Technical Support", href: "/services" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const satisfies ReadonlyArray<FooterLink>;

export const footerSocialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    iconSrc: "/icons/facebook.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    iconSrc: "/icons/instagram.svg",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    iconSrc: "/icons/twitter.svg",
  },
] as const satisfies ReadonlyArray<FooterSocialLink>;

export const footerBottomLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
] as const satisfies ReadonlyArray<FooterLink>;
