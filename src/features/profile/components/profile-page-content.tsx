import type { AuthUser } from "@/lib/auth";

import { ProfileAvatar } from "./profile-avatar";
import { ProfileSummary } from "./profile-summary";
import { profilePageCopy } from "./profile-page-data";

export function ProfilePageContent({ user }: Readonly<{ user: AuthUser }>) {
  return (
    <section
      aria-label={`Profile summary for ${profilePageCopy.name}`}
      className="mx-auto w-full max-w-6xl pt-8 sm:pt-10 lg:pt-12 xl:pt-16"
      data-auth-user-id={user.id}
    >
      <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-8 lg:text-left xl:gap-12">
        <ProfileAvatar
          name={profilePageCopy.name}
          portraitSrc={profilePageCopy.portraitSrc}
        />

        <ProfileSummary
          memberSince={profilePageCopy.memberSince}
          memberStatus={profilePageCopy.memberStatus}
          name={profilePageCopy.name}
        />
      </div>
    </section>
  );
}
