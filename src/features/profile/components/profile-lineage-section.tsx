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
      className="mt-12 overflow-hidden rounded-[32px] border border-[#d8d2c3] bg-[#fbf7e8] shadow-[0_24px_60px_-42px_rgba(80,85,65,0.22)]"
    >
      <ProfileLineageTabs
        activeTab={activeTab}
        idBase={tabPanelBaseId}
        onChange={setActiveTab}
      />

      <div className="px-5 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {activeTab === "lineage" ? (
          <div
            aria-labelledby={`${tabPanelBaseId}-lineage-tab`}
            id={`${tabPanelBaseId}-lineage-panel`}
            role="tabpanel"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-[2rem] leading-[1.05] font-semibold tracking-[-0.04em] text-[#245f6d] sm:text-[2.4rem] lg:text-[3rem]">
                  Maternal Lineage Summary
                </h2>
                <p className="mt-3 text-[1.02rem] leading-7 text-[#245f6d] sm:text-[1.1rem] lg:text-[1.25rem]">
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
            className="rounded-[24px] border border-dashed border-[#245f6d]/30 bg-white/60 px-6 py-12 text-center shadow-[0_16px_34px_-26px_rgba(36,95,109,0.16)]"
            id={`${tabPanelBaseId}-${activeTab}-panel`}
            role="tabpanel"
          >
            <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#245f6d]">
              {profileLineageTabLabels[activeTab]}
            </p>
            <p className="mt-2 text-[15px] leading-6 text-[#5f7174]">
              This section is not implemented yet. The lineage tab remains the
              active production section for now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
