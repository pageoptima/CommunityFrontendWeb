export function ProfileLineageTreePlaceholder() {
  return (
    <div className="mt-5 rounded-[18px] border border-dashed border-[#245f6d]/30 bg-white/60 px-4 py-8 text-center shadow-[0_16px_34px_-26px_rgba(36,95,109,0.16)]">
      <p className="text-[16px] font-semibold tracking-[-0.03em] text-[#245f6d] sm:text-[17px]">
        Tree view preview
      </p>
      <p className="mt-2 text-[13px] leading-5 text-[#5f7174] sm:text-[14px]">
        The maternal lineage tree will be connected to the backend data in a
        later pass.
      </p>
    </div>
  );
}
