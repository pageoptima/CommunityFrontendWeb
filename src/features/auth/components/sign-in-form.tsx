"use client";

import Image from "next/image";
import type { HTMLInputTypeAttribute } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthFieldProps = Readonly<{
  name: SignInFieldName;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete?: string;
  errorMessage?: string;
  register: UseFormRegister<SignInFormValues>;
}>;

type SignInFieldName = "email" | "password";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

function AuthField({
  name,
  label,
  type,
  placeholder,
  autoComplete,
  errorMessage,
  register,
}: AuthFieldProps) {
  const fieldErrorId = `${name}-error`;

  return (
    <label className="block" htmlFor={name}>
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label} <span className="text-red-500">*</span>
      </span>

      <input
        autoComplete={autoComplete}
        className={cn(
          "text-foreground flex h-12 w-full rounded-xl border border-black/5 bg-white/65 px-4 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors outline-none placeholder:text-slate-400 focus:border-[#2b74d8]/40 focus:ring-2 focus:ring-[#2b74d8]/15",
          errorMessage &&
            "border-red-300 focus:border-red-400/50 focus:ring-red-200/50",
        )}
        id={name}
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

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onTouched",
  });

  const onSubmit = () => {
    // UI only for now. Backend integration comes later.
  };

  return (
    <form
      className="mx-auto flex w-full max-w-135 flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="text-center">
        <h1 className="text-foreground text-3xl font-semibold tracking-[-0.04em] sm:text-[2rem]">
          Login to{" "}
          <span className="bg-[linear-gradient(135deg,#24acc3_0%,#2b74d8_100%)] bg-clip-text text-transparent">
            Taíno Nation
          </span>
          ?
        </h1>
      </div>

      <div className="mt-8 space-y-5">
        <AuthField
          autoComplete="email"
          name="email"
          label="Email id"
          errorMessage={errors.email?.message}
          register={register}
          placeholder="Email id"
          type="email"
        />

        <AuthField
          autoComplete="current-password"
          name="password"
          label="Password"
          errorMessage={errors.password?.message}
          register={register}
          placeholder="Minimum 8 Character"
          type="password"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            {...register("rememberMe")}
            className="size-4 rounded border-slate-300 text-[#24acc3] accent-[#24acc3]"
            type="checkbox"
          />
          <span>Remember me</span>
        </label>

        <button
          className="cursor-pointer text-sm font-medium text-[#2b74d8] transition-colors hover:text-[#1f8ca5]"
          type="button"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        className="mt-6 h-12 rounded-xl text-base shadow-[0_16px_34px_-20px_rgba(36,172,195,0.75)]"
        fullWidth
        size="lg"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>

      <p className="mt-4 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <button
          className="cursor-pointer font-semibold text-[#2b74d8] transition-colors hover:text-[#1f8ca5]"
          type="button"
        >
          Sign up
        </button>
      </p>

      <div className="mt-8 text-center">
        <Image
          alt=""
          aria-hidden="true"
          className="mx-auto size-7 object-contain"
          height={28}
          src="/icons/auth/shield.svg"
          width={28}
        />
        <p className="mt-2 text-sm leading-[1.48] font-medium text-black">
          Your data is protected with bank-level encryption and stored on
          sovereign, community-owned servers.
        </p>
      </div>
    </form>
  );
}
