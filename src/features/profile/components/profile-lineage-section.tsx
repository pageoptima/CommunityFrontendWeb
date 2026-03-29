"use client";

import { useId, useState } from "react";

import { ProfileLineageStatCards } from "./profile-lineage-stat-cards";
import { ProfileLineageTabs } from "./profile-lineage-tabs";
import { ProfileLineageTable } from "./profile-lineage-table";
import { ProfileLineageTreePlaceholder } from "./profile-lineage-tree-placeholder";
import { ProfileLineageViewToggle } from "./profile-lineage-view-toggle";
import {
  profileConfig,
  type ProfileLineageTabValue,
} from "../config/profile-config";

type ViewMode = "table" | "tree";

const profileLineageTabLabels = Object.fromEntries(
  profileConfig.lineageTabs
    .filter((tab) => tab.value !== "lineage")
    .map((tab) => [tab.value, tab.label]),
) as Record<Exclude<ProfileLineageTabValue, "lineage">, string>;

export function ProfileLineageSection() {
  const [activeTab, setActiveTab] = useState<ProfileLineageTabValue>("lineage");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const tabPanelBaseId = useId();

  return (
    <section
      aria-label="Maternal lineage summary"
      className="mt-8 w-full overflow-hidden rounded-[24px] border border-[#d8d2c3] bg-[#fbf7e8] shadow-[0_22px_52px_-40px_rgba(80,85,65,0.2)] sm:mt-10"
    >
      <ProfileLineageTabs
        activeTab={activeTab}
        idBase={tabPanelBaseId}
        onChange={setActiveTab}
      />

      <div className="px-3.5 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
        {activeTab === "lineage" ? (
          <div
            aria-labelledby={`${tabPanelBaseId}-lineage-tab`}
            id={`${tabPanelBaseId}-lineage-panel`}
            role="tabpanel"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
              <div className="max-w-3xl">
                <h2 className="text-[1.45rem] leading-[1.05] font-semibold tracking-[-0.04em] text-[#245f6d] sm:text-[1.7rem] lg:text-[2rem]">
                  Maternal Lineage Summary
                </h2>
                <p className="mt-2 text-[0.88rem] leading-5 text-[#245f6d] sm:text-[0.93rem] lg:text-[0.98rem]">
                  Your documented ancestral line connecting you to Indigenous
                  Taíno heritage
                </p>
              </div>

              <ProfileLineageViewToggle
                value={viewMode}
                onChange={setViewMode}
              />
            </div>

            {viewMode === "table" ? (
              <ProfileLineageTable />
            ) : (
              <ProfileLineageTreePlaceholder />
            )}

            <ProfileLineageStatCards />
          </div>
        ) : (
          <div
            aria-labelledby={`${tabPanelBaseId}-${activeTab}-tab`}
            className="rounded-[18px] border border-dashed border-[#245f6d]/30 bg-white/60 px-4 py-8 text-center shadow-[0_16px_34px_-26px_rgba(36,95,109,0.16)]"
            id={`${tabPanelBaseId}-${activeTab}-panel`}
            role="tabpanel"
          >
            <p className="text-[16px] font-semibold tracking-[-0.03em] text-[#245f6d] sm:text-[17px]">
              {profileLineageTabLabels[activeTab]}
            </p>
            <p className="mt-2 text-[13px] leading-5 text-[#5f7174] sm:text-[14px]">
              This section is not implemented yet. The lineage tab remains the
              active production section for now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
