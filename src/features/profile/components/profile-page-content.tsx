import {
  BadgeInfo,
  Mail,
  ShieldCheck,
  UserRound,
  IdCard,
  type LucideIcon,
} from "lucide-react";

import { formatMemberId, type AuthUser } from "@/lib/auth";

function InfoCard({
  icon: Icon,
  title,
  value,
  description,
}: Readonly<{
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}>) {
  return (
    <div className="border-border bg-surface rounded-[28px] border p-5 shadow-[0_18px_34px_-26px_rgba(16,47,52,0.28)]">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#e4f7f4_0%,#d7ebff_100%)] text-[#1f8ca5]">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-foreground text-sm font-semibold">{title}</p>
          <p className="text-foreground mt-1 text-lg font-semibold tracking-[-0.02em]">
            {value}
          </p>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProfilePageContent({ user }: Readonly<{ user: AuthUser }>) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="border-border bg-surface overflow-hidden rounded-[32px] border shadow-[0_28px_60px_-40px_rgba(16,47,52,0.28)]">
        <div className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,207,195,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(43,116,216,0.12),transparent_30%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.28em] text-[#1f8ca5] uppercase">
                Protected Area
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                My Profile
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
                This page will be implemented soon. You are logged in and your
                session is active.
              </p>
            </div>

            <div className="border-border flex items-center gap-4 rounded-[28px] border bg-white/80 p-4 shadow-[0_18px_34px_-26px_rgba(16,47,52,0.26)] backdrop-blur">
              <div className="flex size-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#35d6c1_0%,#2b74d8_100%)] text-xl font-semibold text-white shadow-[0_14px_30px_-18px_rgba(43,116,216,0.8)]">
                {user.name
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase() ?? "")
                  .join("")}
              </div>

              <div className="min-w-0">
                <p className="text-foreground truncate text-base font-semibold">
                  {user.name}
                </p>
                <p className="text-muted-foreground truncate text-sm">
                  {user.email}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#e8f6fb] px-3 py-1 text-xs font-semibold text-[#1f8ca5]">
                  <ShieldCheck className="size-3.5" />
                  Verified member
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard
          icon={UserRound}
          title="Logged in as"
          value={user.name}
          description="Your authenticated account is loaded from a secure httpOnly cookie."
        />

        <InfoCard
          icon={IdCard}
          title="Member ID"
          value={formatMemberId(user.id)}
          description="This is a temporary member identifier for the dummy profile screen."
        />

        <InfoCard
          icon={Mail}
          title="Access"
          value={user.role}
          description="Role information is available for future authorization checks."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="border-border bg-surface rounded-[32px] border p-6 shadow-[0_18px_34px_-26px_rgba(16,47,52,0.24)] sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#e4f7f4_0%,#d7ebff_100%)] text-[#1f8ca5]">
              <BadgeInfo className="size-5" />
            </div>

            <div>
              <h2 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
                What you can expect here
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-slate-600">
                This area will eventually show your account details, enrollment
                progress, lineage data, and community membership summary.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Enrollment status",
              "Family lineage records",
              "Document uploads",
              "Notifications and alerts",
            ].map((item) => (
              <div
                key={item}
                className="border-border bg-surface-muted text-foreground rounded-2xl border px-4 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="border-border rounded-[32px] border bg-[linear-gradient(135deg,#143f3a_0%,#1f5f7a_100%)] p-6 text-white shadow-[0_22px_44px_-28px_rgba(16,47,52,0.45)] sm:p-8">
          <p className="text-sm font-semibold tracking-[0.24em] text-white/75 uppercase">
            Security note
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Your session is protected
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-white/88">
            The access token stays in an httpOnly cookie, so browser scripts
            cannot read it directly. That keeps the sign-in flow aligned with
            production auth practices.
          </p>

          <div className="mt-6 rounded-2xl border border-white/12 bg-white/8 p-4">
            <p className="text-sm font-semibold text-white">Current user</p>
            <p className="mt-2 text-sm text-white/88">{user.name}</p>
            <p className="text-sm text-white/72">{user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
