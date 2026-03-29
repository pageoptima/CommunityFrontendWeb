import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import {
  footerBottomLinks,
  footerQuickLinks,
  footerSocialLinks,
  footerSupportLinks,
  type FooterLink,
  type FooterSocialLink,
} from "@/constants/footer";

type FooterLinkListProps = Readonly<{
  title: string;
  links: ReadonlyArray<FooterLink>;
}>;

function FooterLinkList({ title, links }: FooterLinkListProps) {
  return (
    <section>
      <h3 className="text-2xl font-medium text-white">{title}</h3>

      <ul className="mt-5 space-y-4 text-[17px] leading-7 text-white/80">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className="transition-colors hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SocialIconButton({ href, label, iconSrc }: FooterSocialLink) {
  return (
    <a
      aria-label={label}
      className="inline-flex size-10 items-center justify-center transition-transform hover:scale-105"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Image alt="" aria-hidden="true" height={24} src={iconSrc} width={24} />
    </a>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-[linear-gradient(180deg,#005862_0%,#053f48_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.45fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <Link
              className="inline-flex rounded-2xl bg-white px-6 py-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.01]"
              href="/"
            >
              <BrandMark compact />
            </Link>

            <p className="mt-8 max-w-xl text-[18px] leading-10 text-white/95 sm:text-[20px]">
              Preserving our Indigenous heritage through sovereign technology
              and community connection.
            </p>

            <div className="mt-10 h-px w-full max-w-140 bg-white/15" />

            <div className="mt-6 flex items-center gap-3">
              {footerSocialLinks.map((item) => (
                <SocialIconButton key={item.label} {...item} />
              ))}
            </div>
          </div>

          <FooterLinkList title="Quick Links" links={footerQuickLinks} />

          <FooterLinkList title="Support" links={footerSupportLinks} />

          <section>
            <h3 className="text-2xl font-medium text-white">Contact</h3>

            <div className="mt-5 space-y-4 text-[17px] leading-7 text-white/80">
              <a
                className="block transition-colors hover:text-white"
                href="tel:+17875550100"
              >
                (787) 555-0100
              </a>
              <a
                className="block transition-colors hover:text-white"
                href="mailto:info@tainonation.org"
              >
                info@tainonation.org
              </a>
              <address className="not-italic">
                123 Cacique Avenue
                <br />
                San Juan, PR 00901
              </address>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/95 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © 2024 Taíno Nation of Borikén. All rights reserved. Sovereign
            Indigenous Platform.
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:justify-end">
            {footerBottomLinks.map((link, index) => (
              <span key={link.label} className="flex items-center">
                {index > 0 ? (
                  <span className="mx-2 text-white/70">•</span>
                ) : null}
                <Link
                  className="transition-colors hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
