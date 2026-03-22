import Image from "next/image";

import { AuthInfoCard } from "@/features/auth/components/auth-info-card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { SignUpSupportSection } from "@/features/auth/components/sign-up-support-section";

const nextSteps = [
  "Create your account and verify your email address",
  "Complete your enrollment application with personal and lineage information",
  "Upload supporting documents to verify your maternal lineage",
  "Our review team will carefully examine your application",
  "Receive your Tribal ID and Yukayeke assignment upon approval",
] as const;

const authInfoCards = [
  {
    iconSrc: "/icons/auth/timeline-clock.svg",
    title: "Estimated Timeline",
    description:
      "Complete enrollment process typically takes 4-6 weeks from application submission to approval",
    className: "bg-[rgba(217,217,217,0.28)]",
  },
  {
    iconSrc: "/icons/auth/shield-privacy.svg",
    title: "Your Privacy Matters",
    description:
      "All personal information is encrypted and stored securely on sovereign servers. We never share your data with third parties.",
    className: "bg-[#F4FBF3]",
  },
  {
    iconSrc: "/icons/auth/community-users.svg",
    title: "Join Our Community",
    description:
      "2,847 members have already reconnected with their heritage. You'll be part of a growing Indigenous community.",
    className: "bg-[rgba(217,217,217,0.28)]",
  },
] as const;

export function SignUpPageContent() {
  return (
    <main className="pt-6 sm:pt-8 lg:pt-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[#FAF9F9] shadow-[0_28px_60px_-40px_rgba(16,24,40,0.34)]">
              <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <SignUpForm />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#26A8C0_0%,#2F98B4_100%)] px-6 py-6 text-white shadow-[0_28px_60px_-34px_rgba(18,93,109,0.42)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,70,88,0.16),transparent_28%)] opacity-80" />

                <div className="relative flex h-full flex-col">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                    height={64}
                    src="/icons/auth/lightbulb.svg"
                    width={64}
                  />

                  <div className="mt-6 max-w-md">
                    <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-[2.1rem]">
                      What Happens Next?
                    </h2>
                  </div>

                  <ol className="mt-10 space-y-5 sm:space-y-6">
                    {nextSteps.map((step, index) => (
                      <li key={step} className="flex items-start gap-4">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/80 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <p className="pt-0.5 text-[15px] leading-6 text-white/95 sm:text-base">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {authInfoCards.map((card) => (
                  <AuthInfoCard
                    key={card.title}
                    iconSrc={card.iconSrc}
                    title={card.title}
                    description={card.description}
                    className={card.className}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 lg:mt-24">
        <SignUpSupportSection />
      </div>
    </main>
  );
}
