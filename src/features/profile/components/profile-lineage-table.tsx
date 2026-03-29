import { ProfileLineageEntryCard } from "./profile-lineage-entry-card";
import { profileConfig } from "../config/profile-config";

export function ProfileLineageTable() {
  return (
    <div className="relative mt-8">
      <div className="space-y-5 sm:space-y-6 lg:space-y-7">
        {profileConfig.lineageEntries.map((entry, index) => (
          <div
            key={entry.generation}
            className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-5 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-6"
          >
            <div className="relative flex items-start justify-center pt-2">
              {index < profileConfig.lineageEntries.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[3.05rem] bottom-[-1.4rem] left-1/2 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,#215A64_0_8px,transparent_8px_18px)] sm:top-[3.25rem] sm:bottom-[-1.55rem] lg:top-[3.5rem] lg:bottom-[-1.7rem]"
                />
              ) : null}

              <span className="relative z-10 inline-flex bg-[#fbf7e8] px-2 text-[4rem] leading-none font-semibold tracking-[-0.08em] text-black sm:text-[4.5rem] lg:text-[5.5rem]">
                {entry.generation}
              </span>
            </div>

            <ProfileLineageEntryCard
              born={entry.born}
              generationLabel={entry.generationLabel}
              name={entry.name}
              place={entry.place}
              status={entry.status}
              statusLabel={entry.statusLabel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
