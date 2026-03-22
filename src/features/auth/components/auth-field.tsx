"use client";

import type { HTMLInputTypeAttribute } from "react";

import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

type AuthFieldProps<TFieldValues extends FieldValues> = Readonly<{
  name: Path<TFieldValues>;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete?: string;
  errorMessage?: string;
  register: UseFormRegister<TFieldValues>;
}>;

export function AuthField<TFieldValues extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  autoComplete,
  errorMessage,
  register,
}: AuthFieldProps<TFieldValues>) {
  const fieldErrorId = `${String(name)}-error`;

  return (
    <label className="block" htmlFor={String(name)}>
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label} <span className="text-red-500">*</span>
      </span>

      <input
        autoComplete={autoComplete}
        className={cn(
          "text-foreground flex h-12 w-full rounded-xl border border-black/5 bg-[#F2F2F2] px-4 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors outline-none placeholder:text-slate-400 focus:border-[#2b74d8]/40 focus:ring-2 focus:ring-[#2b74d8]/15",
          errorMessage &&
            "border-red-300 focus:border-red-400/50 focus:ring-red-200/50",
        )}
        id={String(name)}
        placeholder={placeholder}
        type={type}
        aria-describedby={errorMessage ? fieldErrorId : undefined}
        aria-invalid={errorMessage ? "true" : "false"}
        {...register(name)}
      />

      {errorMessage ? (
        <p className="mt-2 text-sm font-medium text-red-600" id={fieldErrorId}>
          {errorMessage}
        </p>
      ) : null}
    </label>
  );
}
