import Image from "next/image";

import { Button } from "@/components/ui/button";
import { montserrat, poppins } from "@/styles/fonts";
import { cn } from "@/lib/utils";

type SupportCardKind = "phone" | "email" | "chat";

type SupportCard = Readonly<{
  kind: SupportCardKind;
  iconSrc: string;
  iconBgClassName: string;
  title: string;
  description: string;
  contactLabel?: string;
  contactHref?: string;
  contactTextColor?: string;
}>;

const supportCards: readonly SupportCard[] = [
  {
    kind: "phone",
    iconSrc: "/icons/auth/phone-support.svg",
    iconBgClassName: "bg-[#2FA4C4]",
    title: "Phone Support",
    description: "Speak with a support representative",
    contactLabel: "(787) 555-0100",
    contactHref: "tel:+17875550100",
    contactTextColor: "#2B9DB8",
  },
  {
    kind: "email",
    iconSrc: "/icons/auth/email-support..svg",
    iconBgClassName: "bg-[#9E3E3A]",
    title: "Email Support",
    description: "Send us a detailed message",
    contactLabel: "support@tainonation.org",
    contactHref: "mailto:support@tainonation.org",
    contactTextColor: "#883333",
  },
  {
    kind: "chat",
    iconSrc: "/icons/auth/chat-support..svg",
    iconBgClassName: "bg-[#2FA4C4]",
    title: "Chat in Forums",
    description: "Post your concern in forums",
  },
] as const;

function SupportCardItem({ card }: Readonly<{ card: SupportCard }>) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-[#E8E5DE] bg-[#FAF9F9] px-5 py-6 text-center shadow-[0_16px_34px_-28px_rgba(28,45,38,0.18)] sm:px-6 sm:py-7 lg:px-7">
      <div
        className={cn(
          "mx-auto flex size-14 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:size-15 lg:size-16",
          card.iconBgClassName,
        )}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          height={46}
          src={card.iconSrc}
          width={46}
        />
      </div>

      <h3
        className={cn(
          montserrat.className,
          "mt-5 text-[1.3rem] font-semibold tracking-[-0.04em] text-[#173F4C] sm:text-[1.45rem] lg:text-[1.6rem]",
        )}
      >
        {card.title}
      </h3>
      <p
        className={cn(
          poppins.className,
          "mt-3 text-[0.95rem] leading-6 text-[#57534E] sm:text-[1rem]",
        )}
      >
        {card.description}
      </p>

      {card.kind === "chat" ? (
        <Button
          className="mx-auto mt-7 min-w-36 rounded-full bg-[linear-gradient(135deg,#2F7E94_0%,#1F667C_100%)]! text-white! shadow-[0_16px_34px_-18px_rgba(25,96,118,0.52)]! hover:brightness-105!"
          size="lg"
          type="button"
        >
          Start Chat
        </Button>
      ) : (
        <div className="mt-auto pt-7">
          <a
            className={cn(
              montserrat.className,
              "block text-[1.1rem] font-semibold tracking-[-0.03em] sm:text-[1.2rem] lg:text-[1.3rem]",
            )}
            href={card.contactHref}
            style={{ color: card.contactTextColor }}
          >
            {card.contactLabel}
          </a>
          <p
            className={cn(
              poppins.className,
              "mt-2 text-[0.875rem] leading-6 text-[#8A8A86] sm:text-[0.95rem]",
            )}
          >
            Mon-Fri: 9am - 6pm AST
          </p>
        </div>
      )}
    </article>
  );
}

export function SupportSection() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#FFFDEC] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex rounded-full border border-[#DCEBD6] bg-[#D7EFD3] px-6 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:px-8 sm:py-3">
            <p
              className={cn(
                poppins.className,
                "text-sm font-semibold tracking-[-0.02em] text-[#2C6C5B] sm:text-[0.95rem]",
              )}
            >
              We&apos;re Here to Help
            </p>
          </div>

          <h2
            className={cn(
              montserrat.className,
              "mt-7 text-[clamp(2rem,6vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#063025] sm:mt-8",
            )}
          >
            Need Assistance?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 tracking-[-0.01em] text-[#555048] sm:mt-5 sm:text-base lg:text-[1.05rem]">
            Our support team is available to help you with account access,
            enrollment questions, or technical issues.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {supportCards.map((card) => (
            <SupportCardItem key={card.kind} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
