"use client";

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

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
        <Link
          className="font-semibold text-[#2b74d8] transition-colors hover:text-[#1f8ca5]"
          href="/sign-up"
        >
          Sign up
        </Link>
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
