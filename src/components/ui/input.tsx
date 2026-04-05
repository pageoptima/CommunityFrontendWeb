"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const inputBaseClassName =
  "text-foreground flex min-h-11 w-full rounded-xl border border-black/5 bg-[#f2f2f2] px-4 text-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors outline-none placeholder:text-[#9ca3a7] focus-visible:border-[#2b74d8]/35 focus-visible:ring-2 focus-visible:ring-[#2b74d8]/12 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-12";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(inputBaseClassName, className)}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input, inputBaseClassName };
