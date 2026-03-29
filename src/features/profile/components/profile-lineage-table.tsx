import styles from "../styles/profile-lineage-table.module.scss";
import { ProfileLineageEntryCard } from "./profile-lineage-entry-card";
import { profileConfig } from "../config/profile-config";

export function ProfileLineageTable() {
  return (
    <div className="relative mt-5">
      <div className="space-y-3.5 sm:space-y-4 lg:space-y-5">
        {profileConfig.lineageEntries.map((entry, index) => (
          <div
            key={entry.generation}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-2.5 sm:grid-cols-[3.4rem_minmax(0,1fr)] sm:gap-3 lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-4"
          >
            <div className="relative flex items-start justify-center pt-2">
              {index < profileConfig.lineageEntries.length - 1 ? (
                <div aria-hidden="true" className={styles.stem} />
              ) : null}

              <span className="relative z-10 inline-flex bg-[#fbf7e8] px-1 text-[2.7rem] leading-[0.9] font-semibold tracking-[-0.08em] text-black sm:text-[3.1rem] lg:text-[3.75rem]">
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
