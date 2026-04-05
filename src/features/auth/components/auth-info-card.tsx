import Image from "next/image";

import { cn } from "@/lib/utils";

type AuthInfoCardProps = Readonly<{
  iconSrc: string;
  title: string;
  description: string;
  className?: string;
}>;

export function AuthInfoCard({
  iconSrc,
  title,
  description,
  className,
}: AuthInfoCardProps) {
  return (
    <article
      className={cn(
        "rounded-[1.65rem] border border-[#24acc3]/55 bg-[#FAF9F9] px-4 py-4 shadow-[0_18px_40px_-32px_rgba(16,24,40,0.24)] sm:px-5 sm:py-5",
        className,
      )}
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        <Image
          alt=""
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 object-contain"
          height={24}
          src={iconSrc}
          width={24}
        />

        <div className="min-w-0">
          <h3 className="text-[1.02rem] font-semibold tracking-[-0.03em] text-[#335f6c] sm:text-[1.12rem]">
            {title}
          </h3>
          <p className="mt-2 max-w-xl text-[0.92rem] leading-6 text-slate-700 sm:text-[0.96rem]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
