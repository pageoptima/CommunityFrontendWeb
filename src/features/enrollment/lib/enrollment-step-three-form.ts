import { z } from "zod";

import type {
  AccountInfoResponse,
  EnrollmentStepThreeCulturalConnection,
  EnrollmentStepThreeUpsertRequest,
} from "@/types/enrollment";

const culturalConnectionKeySchema = z
  .string()
  .trim()
  .min(1, "Invalid cultural connection key");

export const enrollmentStepThreeSchema = z.object({
  culturalConnectionKeys: z.array(culturalConnectionKeySchema),
});

export type EnrollmentStepThreeFormValues = z.infer<
  typeof enrollmentStepThreeSchema
>;

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function trimValue(value: string) {
  return value.trim();
}

function uniqueValues(values: readonly string[]) {
  return Array.from(new Set(values));
}

function readCulturalConnectionKey(value: unknown) {
  if (typeof value === "string") {
    return trimValue(value);
  }

  const record = readObject(value);

  if (!record) {
    return "";
  }

  const directKey = trimValue(readString(record.key));

  if (directKey) {
    return directKey;
  }

  const nestedConnection = readObject(record.culturalConnection);

  return trimValue(readString(nestedConnection?.key));
}

export function getEnrollmentStepThreeDefaultValues(
  accountInfo?: AccountInfoResponse | null,
): EnrollmentStepThreeFormValues {
  const keys = uniqueValues(
    (accountInfo?.enrollment?.culturalConnections ?? [])
      .map((connection) => readCulturalConnectionKey(connection))
      .filter(Boolean),
  );

  return {
    culturalConnectionKeys: keys,
  };
}

export function mapEnrollmentStepThreeFormToPayload(
  values: EnrollmentStepThreeFormValues,
  availableConnections?: readonly EnrollmentStepThreeCulturalConnection[],
): EnrollmentStepThreeUpsertRequest {
  const selectedKeys = uniqueValues(
    values.culturalConnectionKeys.map(trimValue).filter(Boolean),
  );

  if (!availableConnections?.length) {
    return {
      culturalConnectionKeys: selectedKeys,
    };
  }

  const allowedKeys = new Set(
    availableConnections.map((connection) => trimValue(connection.key)),
  );

  return {
    culturalConnectionKeys: selectedKeys.filter((key) => allowedKeys.has(key)),
  };
}
