"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { submitAuthRequest } from "@/features/auth/lib/auth-submit";
import {
  appendNextQuery,
  getSafeRedirectPath,
  normalizeNamePart,
} from "@/lib/auth";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .pipe(z.email("Enter a valid email address")),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[+()0-9\s-]{7,20}$/, "Enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    agreeToTerms: z.boolean().refine(Boolean, {
      message: "You must agree to the terms before continuing",
    }),
    receiveUpdates: z.boolean(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignUpRequestBody = {
  name: string;
  email: string;
  password: string;
};

function ConsentLine({
  name,
  children,
  register,
}: Readonly<{
  name: keyof Pick<SignUpFormValues, "agreeToTerms" | "receiveUpdates">;
  children: ReactNode;
  register: UseFormRegister<SignUpFormValues>;
}>) {
  return (
    <div className="flex items-start gap-3">
      <input
        className="mt-1 size-4 rounded border-slate-300 text-[#24acc3] accent-[#24acc3]"
        id={name}
        aria-labelledby={`${name}-description`}
        type="checkbox"
        {...register(name)}
      />
      <div
        className="text-[15px] leading-6 text-slate-700"
        id={`${name}-description`}
      >
        {children}
      </div>
    </div>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      receiveUpdates: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: SignUpFormValues) => {
    clearErrors("root");

    const firstName = normalizeNamePart(values.firstName);
    const lastName = normalizeNamePart(values.lastName);
    const name = [firstName, lastName].filter(Boolean).join(" ");

    if (!name) {
      setError("root", {
        type: "server",
        message: "Please enter a valid first and last name.",
      });
      return;
    }

    const payload: SignUpRequestBody = {
      name,
      email: values.email.trim().toLowerCase(),
      password: values.password,
    };

    await submitAuthRequest({
      endpoint: "/api/auth/register",
      payload,
      redirectTo: getSafeRedirectPath(searchParams.get("next")),
      router,
      onError: (message) =>
        setError("root", {
          type: "server",
          message,
        }),
      fallbackMessage:
        "Unable to reach the registration service. Please try again in a moment.",
    });
  };

  return (
    <form
      className="mx-auto flex w-full max-w-172 flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="text-center">
        <h1 className="text-foreground text-3xl font-semibold tracking-[-0.04em] sm:text-[2rem]">
          New to{" "}
          <span className="bg-[linear-gradient(135deg,#24acc3_0%,#2b74d8_100%)] bg-clip-text text-transparent">
            Taíno Nation
          </span>
          ?
        </h1>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {errors.root?.message ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 sm:col-span-2">
            {errors.root.message}
          </div>
        ) : null}

        <AuthField
          autoComplete="given-name"
          name="firstName"
          label="First Name"
          errorMessage={errors.firstName?.message}
          register={register}
          placeholder="First Name"
          type="text"
        />

        <AuthField
          autoComplete="family-name"
          name="lastName"
          label="Last Name"
          errorMessage={errors.lastName?.message}
          register={register}
          placeholder="Last Name"
          type="text"
        />
      </div>

      <div className="mt-5 space-y-5">
        <AuthField
          autoComplete="email"
          name="email"
          label="Email Id"
          errorMessage={errors.email?.message}
          register={register}
          placeholder="Email Id"
          type="email"
        />

        <AuthField
          autoComplete="tel"
          name="phoneNumber"
          label="Phone No."
          errorMessage={errors.phoneNumber?.message}
          register={register}
          placeholder="Phone No."
          type="tel"
        />

        <AuthField
          autoComplete="new-password"
          name="password"
          label="Create Password"
          errorMessage={errors.password?.message}
          register={register}
          placeholder="Minimum 8 Character"
          type="password"
        />

        <AuthField
          autoComplete="new-password"
          name="confirmPassword"
          label="Confirm Password"
          errorMessage={errors.confirmPassword?.message}
          register={register}
          placeholder="Match the Password"
          type="password"
        />
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <ConsentLine name="agreeToTerms" register={register}>
            I agree to the{" "}
            <Link
              className="text-[#2b74d8] underline-offset-2 transition-colors hover:text-[#1f8ca5] hover:underline"
              href="/terms-of-service"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-[#2b74d8] underline-offset-2 transition-colors hover:text-[#1f8ca5] hover:underline"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            , and acknowledge that my data will be stored on sovereign Taíno
            Nation servers.
          </ConsentLine>

          {errors.agreeToTerms?.message ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {errors.agreeToTerms.message}
            </p>
          ) : null}
        </div>

        <div>
          <ConsentLine name="receiveUpdates" register={register}>
            Send me updates about enrollment status, community events, and
            important announcements
          </ConsentLine>
        </div>
      </div>

      <Button
        className="mt-8 h-14 rounded-xl text-base shadow-[0_16px_34px_-20px_rgba(36,172,195,0.75)]"
        fullWidth
        size="lg"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingText="Creating account..."
        type="submit"
      >
        Join Now
      </Button>

      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          className="font-semibold text-[#2b74d8] transition-colors hover:text-[#1f8ca5]"
          href={appendNextQuery("/sign-in", searchParams.get("next"))}
        >
          Sign In
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
