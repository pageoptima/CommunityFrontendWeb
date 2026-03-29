import { cn } from "@/lib/utils";

type ViewMode = "table" | "tree";

export function ProfileLineageViewToggle({
  value,
  onChange,
}: Readonly<{
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}>) {
  const isTable = value === "table";

  return (
    <div className="inline-flex w-full max-w-[20rem] rounded-[12px] bg-[#285e68] p-2 shadow-[0_18px_34px_-24px_rgba(16,47,52,0.45)] sm:w-auto sm:max-w-none">
      <button
        aria-pressed={isTable}
        className={cn(
          "min-w-0 flex-1 cursor-pointer rounded-[9px] px-4 py-2.5 text-[16px] font-medium transition-colors sm:min-w-28 sm:px-6 sm:py-3 sm:text-[20px]",
          isTable
            ? "bg-[#e7f7fb] text-[#245c67]"
            : "text-white hover:bg-white/8",
        )}
        type="button"
        onClick={() => onChange("table")}
      >
        Table
      </button>
      <button
        aria-pressed={!isTable}
        className={cn(
          "min-w-0 flex-1 cursor-pointer rounded-[9px] px-4 py-2.5 text-[16px] font-medium transition-colors sm:min-w-28 sm:px-6 sm:py-3 sm:text-[20px]",
          !isTable
            ? "bg-[#e7f7fb] text-[#245c67]"
            : "text-white hover:bg-white/8",
        )}
        type="button"
        onClick={() => onChange("tree")}
      >
        Tree
      </button>
    </div>
  );
}
