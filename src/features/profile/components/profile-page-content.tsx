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
      className="mx-auto w-full max-w-5xl pt-0 sm:pt-1 lg:pt-2 xl:pt-3"
      data-auth-user-id={user.id}
    >
      <div className="mr-auto flex max-w-[48rem] flex-col items-start gap-4 text-left lg:flex-row lg:items-center lg:gap-4 xl:max-w-[52rem] xl:gap-5">
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
