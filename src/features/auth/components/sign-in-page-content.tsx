import Image from "next/image";

import { SignInBenefitCard } from "@/features/auth/components/sign-in-benefit-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

const benefitCards = [
  {
    iconSrc: "/icons/auth/idcard.svg",
    title: "View Your Tribal ID",
    description:
      "Access your official member identification and verification details.",
  },
  {
    iconSrc: "/icons/auth/clipboard.svg",
    title: "Track Application Status",
    description:
      "Monitor your enrollment progress and review application feedback.",
  },
  {
    iconSrc: "/icons/auth/explore.svg",
    title: "Explore Your Lineage",
    description: "View your documented maternal ancestry and family tree.",
  },
] as const;

export function SignInPageContent() {
  return (
    <main className="bg-[#f8f1dc] px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-10 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-4 lg:grid-cols-[minmax(0,0.97fr)_minmax(0,1.03fr)]">
          <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#26A8C0_0%,#2F98B4_100%)] px-6 py-6 text-white shadow-[0_28px_60px_-34px_rgba(18,93,109,0.42)] sm:px-8 sm:py-8 lg:min-h-190 lg:px-9 lg:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,70,88,0.16),transparent_28%)] opacity-80" />

            <div className="relative flex h-full flex-col">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/12 text-white shadow-[0_16px_28px_-18px_rgba(0,0,0,0.2)]">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 object-contain"
                  height={24}
                  src="/icons/auth/lightbulb.svg"
                  width={24}
                />
              </div>

              <div className="mt-6 max-w-md">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-[2.1rem]">
                  Access Your Tribal Portal
                </h2>
                <p className="mt-3 text-[15px] leading-6 text-white/90 sm:text-base">
                  Sign in to manage your enrollment application, view your
                  tribal profile, and connect with the Taíno community.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {benefitCards.map((card) => (
                  <SignInBenefitCard
                    key={card.title}
                    iconSrc={card.iconSrc}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[linear-gradient(180deg,#f7f7f7_0%,#ececec_100%)] shadow-[0_28px_60px_-40px_rgba(16,24,40,0.34)] lg:min-h-190">
            <div className="flex h-full items-center px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
              <SignInForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
