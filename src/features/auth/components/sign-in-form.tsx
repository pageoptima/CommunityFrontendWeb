"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AuthTrustNote } from "@/features/auth/components/auth-trust-note";
import { AuthField } from "@/features/auth/components/auth-field";
import { submitAuthRequest } from "@/features/auth/lib/auth-submit";
import { cn } from "@/lib/utils";
import { appendNextQuery, getSafeRedirectPath } from "@/lib/auth";
import sharedStyles from "@/features/auth/styles/auth-shared.module.scss";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: SignInFormValues) => {
    clearErrors("root");

    await submitAuthRequest({
      endpoint: "/api/auth/login",
      payload: values,
      redirectTo: getSafeRedirectPath(searchParams.get("next")),
      router,
      onError: (message) =>
        setError("root", {
          type: "server",
          message,
        }),
      fallbackMessage:
        "Unable to reach the sign-in service. Please try again in a moment.",
    });
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
          <span className={sharedStyles.gradientText}>Taíno Nation</span>?
        </h1>
      </div>

      <div className="mt-8 space-y-5">
        {errors.root?.message ? (
          <div className={sharedStyles.formError}>{errors.root.message}</div>
        ) : null}

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
          className={cn(
            sharedStyles.linkAccent,
            "cursor-pointer text-sm font-medium",
          )}
          type="button"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        className={cn(
          sharedStyles.submitButtonShadow,
          "mt-6 h-12 rounded-xl text-base",
        )}
        fullWidth
        size="lg"
        loading={isSubmitting}
        loadingText="Logging in..."
        type="submit"
      >
        Log in
      </Button>

      <p className="mt-4 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          className={cn(sharedStyles.linkAccent, "font-semibold")}
          href={appendNextQuery("/sign-up", searchParams.get("next"))}
        >
          Sign up
        </Link>
      </p>

      <AuthTrustNote />
    </form>
  );
}
