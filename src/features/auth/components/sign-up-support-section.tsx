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
    <article className="flex h-full flex-col rounded-[28px] border-2 border-[#E8E5DE] bg-[#FAF9F9] px-6 py-7 text-center shadow-[0_18px_42px_-34px_rgba(28,45,38,0.2)] sm:px-7 sm:py-8">
      <div
        className={cn(
          "mx-auto flex size-16 items-center justify-center rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:size-18",
          card.iconBgClassName,
        )}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-6 w-6 object-contain sm:h-7 sm:w-7"
          height={46}
          src={card.iconSrc}
          width={46}
        />
      </div>

      <h3
        className={cn(
          montserrat.className,
          "mt-6 text-[1.55rem] font-semibold tracking-[-0.04em] text-[#173F4C] sm:text-[1.8rem]",
        )}
      >
        {card.title}
      </h3>
      <p
        className={cn(
          poppins.className,
          "mt-4 text-[1.03rem] leading-7 text-[#57534E] sm:text-[1.1rem]",
        )}
      >
        {card.description}
      </p>

      {card.kind === "chat" ? (
        <Button
          className="mx-auto mt-8 min-w-44 rounded-full bg-[linear-gradient(135deg,#2F7E94_0%,#1F667C_100%)]! text-white! shadow-[0_18px_40px_-18px_rgba(25,96,118,0.58)]! hover:brightness-105!"
          size="xl"
          type="button"
        >
          Start Chat
        </Button>
      ) : (
        <div className="mt-auto pt-8">
          <a
            className={cn(
              montserrat.className,
              "block text-[24px] font-semibold tracking-[-0.03em]",
            )}
            style={{ color: card.contactTextColor }}
            href={card.contactHref}
          >
            {card.contactLabel}
          </a>
          <p
            className={cn(
              poppins.className,
              "mt-2 text-[0.98rem] leading-6 text-[#8A8A86] sm:text-[1.02rem]",
            )}
          >
            Mon-Fri: 9am - 6pm AST
          </p>
        </div>
      )}
    </article>
  );
}

export function SignUpSupportSection() {
  return (
    <section className="bg-[#FFFDEC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex rounded-full border border-[#DCEBD6] bg-[#D7EFD3] px-10 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
            <p
              className={cn(
                poppins.className,
                "text-[1.05rem] font-semibold tracking-[-0.02em] text-[#2C6C5B] sm:text-[1.15rem]",
              )}
            >
              We&apos;re Here to Help
            </p>
          </div>

          <h2
            className={cn(
              montserrat.className,
              "mt-10 text-[clamp(2.6rem,4.8vw,4.25rem)] font-semibold tracking-[-0.05em] text-[#063025]",
            )}
          >
            Need Assistance?
          </h2>
          <p className="mx-auto mt-7 max-w-6xl text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.45] tracking-[-0.02em] text-[#555048]">
            Our support team is available to help you with account access,
            enrollment questions, or technical issues.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {supportCards.map((card) => (
            <SupportCardItem key={card.kind} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
