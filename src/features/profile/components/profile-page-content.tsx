import type { AuthUser } from "@/lib/auth";

import { ProfileAvatar } from "./profile-avatar";
import { ProfileLineageSection } from "./profile-lineage-section";
import { ProfileRegionalMembersSection } from "./profile-regional-members-section";
import { ProfileSummary } from "./profile-summary";
import { profileConfig } from "../config/profile-config";

export function ProfilePageContent({ user }: Readonly<{ user: AuthUser }>) {
  return (
    <section
      aria-label={`Profile summary for ${profileConfig.copy.name}`}
      className="mx-auto w-full max-w-6xl pt-8 sm:pt-10 lg:pt-12 xl:pt-16"
      data-auth-user-id={user.id}
    >
      <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-8 lg:text-left xl:gap-12">
        <ProfileAvatar
          name={profileConfig.copy.name}
          portraitSrc={profileConfig.copy.portraitSrc}
        />

        <ProfileSummary
          memberSince={profileConfig.copy.memberSince}
          memberStatus={profileConfig.copy.memberStatus}
          name={profileConfig.copy.name}
        />
      </div>

      <ProfileLineageSection />

      <ProfileRegionalMembersSection />
    </section>
  );
}
