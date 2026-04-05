"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { requestJson } from "@/services/http/fetcher";
import type {
  AccountInfoResponse,
  ActiveConsent,
  ConsentAcceptRequest,
  EnrollmentStepOneUpsertRequest,
  EnrollmentStepOneUpsertResponse,
} from "@/types/enrollment";

export const accountQueryKeys = {
  info: ["account", "info"] as const,
};

type EnrollmentStartResponse = Record<string, unknown>;
type ConsentAcceptResponse = Record<string, unknown>;

export const enrollmentQueryKeys = {
  activeConsents: ["enrollment", "consent", "active"] as const,
};

export function useAccountInfoQuery() {
  return useQuery({
    queryKey: accountQueryKeys.info,
    queryFn: () =>
      requestJson<AccountInfoResponse>("/api/account/info", {
        fallbackMessage:
          "Unable to load the account enrollment information right now.",
      }),
    staleTime: 60 * 1000,
  });
}

export function useActiveConsentsQuery(enabled = false) {
  return useQuery({
    queryKey: enrollmentQueryKeys.activeConsents,
    queryFn: () =>
      requestJson<ActiveConsent[]>("/api/consent/active", {
        fallbackMessage:
          "Unable to load the consent records for this enrollment.",
      }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useStartEnrollmentMutation() {
  return useMutation({
    mutationFn: () =>
      requestJson<EnrollmentStartResponse>("/api/enrollment/start", {
        method: "POST",
        fallbackMessage:
          "Unable to start the enrollment application right now.",
      }),
  });
}

export function useAcceptEnrollmentConsentsMutation() {
  return useMutation({
    mutationFn: (payload: ConsentAcceptRequest) =>
      requestJson<ConsentAcceptResponse, ConsentAcceptRequest>(
        "/api/consent/accept",
        {
          method: "POST",
          body: payload,
          fallbackMessage: "Unable to save the required consents right now.",
        },
      ),
  });
}

export function useEnrollmentStepOneUpsertMutation() {
  return useMutation({
    mutationFn: (payload: EnrollmentStepOneUpsertRequest) =>
      requestJson<
        EnrollmentStepOneUpsertResponse,
        EnrollmentStepOneUpsertRequest
      >("/api/enrollment/step1/upsert", {
        method: "POST",
        body: payload,
        fallbackMessage:
          "Unable to save your step 1 enrollment information right now.",
      }),
  });
}

export type { EnrollmentStepOneUpsertResponse };
