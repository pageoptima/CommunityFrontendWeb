"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SvgIcon } from "@/components/shared/svg-icon";

import { ProfileRegionalMemberCard } from "./profile-regional-member-card";
import { filterRegionalMembers } from "./profile-regional-members-utils";
import { profileConfig } from "../config/profile-config";

export function ProfileRegionalMembersSection() {
  const [query, setQuery] = useState("");
  const filteredMembers = filterRegionalMembers(
    profileConfig.regionalMembers,
    query,
  );

  return (
    <section
      aria-label="Regional community members"
      className="mt-16 pb-4 sm:mt-20"
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-[2rem] leading-[1.05] font-semibold tracking-[-0.05em] whitespace-nowrap text-[#245f6d] sm:text-[2.4rem] lg:text-[2.5rem] xl:text-[2.4rem]">
            Regional Community Members
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center xl:flex-none xl:justify-end xl:gap-4">
          <label className="sr-only" htmlFor="regional-members-search">
            Search members
          </label>

          <input
            id="regional-members-search"
            className="h-[56px] w-full rounded-[16px] border border-[#c8d7dc] bg-white px-6 text-center text-[18px] tracking-[-0.02em] text-[#384347] transition outline-none focus:border-[#215A64] focus:ring-2 focus:ring-[#215A64]/15 sm:flex-1 sm:text-[19px] lg:h-[48px] lg:max-w-[18rem] lg:px-4 lg:text-[14px] xl:h-[56px] xl:w-[28rem] xl:max-w-[28rem] xl:px-6 xl:text-[18px]"
            placeholder="Search Members"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Button
            className="h-[56px] w-full rounded-[16px] border-2 border-[#215A64] bg-white px-5 text-[20px] font-semibold tracking-[-0.02em] text-[#215A64] shadow-none hover:bg-[#f4fbfc] hover:text-[#215A64] sm:w-[240px] sm:px-6 lg:h-[48px] lg:w-[132px] lg:px-4 lg:text-[15px] xl:h-[56px] xl:w-[180px] xl:px-4 xl:text-[18px]"
            leftIcon={
              <SvgIcon
                sizeClassName="size-7 lg:size-5 xl:size-6"
                src="/icons/profile/filter.svg"
                toneColor="#215A64"
              />
            }
            variant="ghost"
            type="button"
          >
            Filter
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6 xl:gap-x-10 xl:gap-y-8">
        {filteredMembers.map((member) => (
          <ProfileRegionalMemberCard
            key={member.memberId}
            memberId={member.memberId}
            name={member.name}
            portraitSrc={member.portraitSrc}
            role={member.role}
          />
        ))}
      </div>

      {filteredMembers.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-dashed border-[#245f6d]/30 bg-white/70 px-6 py-12 text-center">
          <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#245f6d]">
            No members found
          </p>
          <p className="mt-2 text-[15px] leading-6 text-[#5f7174]">
            Try a different name or member ID.
          </p>
        </div>
      ) : null}
    </section>
  );
}
