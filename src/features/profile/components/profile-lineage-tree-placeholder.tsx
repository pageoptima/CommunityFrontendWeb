export function ProfileLineageTreePlaceholder() {
  return (
    <div className="mt-8 rounded-[24px] border border-dashed border-[#245f6d]/30 bg-white/60 px-6 py-12 text-center shadow-[0_16px_34px_-26px_rgba(36,95,109,0.16)]">
      <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#245f6d]">
        Tree view preview
      </p>
      <p className="mt-2 text-[15px] leading-6 text-[#5f7174]">
        The maternal lineage tree will be connected to the backend data in a
        later pass.
      </p>
    </div>
  );
}
