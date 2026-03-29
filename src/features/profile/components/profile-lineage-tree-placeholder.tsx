import { cn } from "@/lib/utils";

import styles from "../styles/profile-shared.module.scss";

export function ProfileLineageTreePlaceholder() {
  return (
    <div className={cn(styles.emptyStateRaised, "mt-5 px-4 py-8")}>
      <p className={cn(styles.emptyTitle, "text-[16px] sm:text-[17px]")}>
        Tree view preview
      </p>
      <p
        className={cn(
          styles.emptyDescription,
          "mt-2 text-[13px] sm:text-[14px]",
        )}
      >
        The maternal lineage tree will be connected to the backend data in a
        later pass.
      </p>
    </div>
  );
}
