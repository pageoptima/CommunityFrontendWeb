import { format, isValid, parseISO } from "date-fns";
import { z } from "zod";

import type {
  AccountInfoResponse,
  EnrollmentAddressSummary,
  EnrollmentStepOneUpsertRequest,
} from "@/types/enrollment";

const phonePattern = /^[+()0-9\s-]{7,20}$/;
const dateInputPattern = /^\d{4}-\d{2}-\d{2}$/;

export const enrollmentStepOneGenderValues = [
  "MALE",
  "FEMALE",
  "NON_BINARY",
  "TWO_SPIRIT",
  "SELF_DESCRIBE",
  "PREFER_NOT_TO_SAY",
  "OTHER",
] as const;

export const enrollmentStepOneGenderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Non-binary", value: "NON_BINARY" },
  { label: "Two-Spirit", value: "TWO_SPIRIT" },
  { label: "Self-describe", value: "SELF_DESCRIBE" },
  { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
  { label: "Other", value: "OTHER" },
] as const;

export const enrollmentStepOnePhoneTypeValues = [
  "MOBILE",
  "HOME",
  "WORK",
] as const;

export const enrollmentStepOnePhoneTypeOptions = [
  { label: "Mobile", value: "MOBILE" },
  { label: "Home", value: "HOME" },
  { label: "Work", value: "WORK" },
] as const;

export const enrollmentStepOneMaritalStatusValues = [
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
] as const;

export const enrollmentStepOneMaritalStatusOptions = [
  { label: "Single", value: "SINGLE" },
  { label: "Married", value: "MARRIED" },
  { label: "Divorced", value: "DIVORCED" },
  { label: "Widowed", value: "WIDOWED" },
] as const;

const requiredString = (label: string) =>
  z.string().trim().min(1, `${label} is required`);
const optionalString = z.string().trim();

function createRequiredSelectionSchema<
  TValues extends readonly [string, ...string[]],
>(label: string, allowedValues: TValues) {
  return requiredString(label).refine(
    (value) =>
      allowedValues.includes(normalizeSelectionValue(value) as TValues[number]),
    `Select a valid ${label.toLowerCase()}`,
  );
}

function createOptionalSelectionSchema<
  TValues extends readonly [string, ...string[]],
>(label: string, allowedValues: TValues) {
  return optionalString.refine(
    (value) =>
      value === "" ||
      allowedValues.includes(normalizeSelectionValue(value) as TValues[number]),
    `Select a valid ${label.toLowerCase()}`,
  );
}

const requiredDateString = (label: string) =>
  requiredString(label).refine((value) => {
    const parsedDate = parseISO(value);

    return isValid(parsedDate) && format(parsedDate, "yyyy-MM-dd") === value;
  }, "Enter a valid date");

export const enrollmentStepOneSchema = z.object({
  legalName: z.object({
    firstName: requiredString("First name"),
    middleName: optionalString,
    lastName: requiredString("Last name"),
    maternalLastName: optionalString,
    preferredName: optionalString,
  }),
  birthInfo: z.object({
    dateOfBirth: requiredDateString("Date of birth"),
    cityOfBirth: requiredString("City or town of birth"),
    municipalityOfBirth: requiredString("Municipality of birth"),
    countryOfBirth: requiredString("Country of birth"),
  }),
  gender: z.object({
    gender: createRequiredSelectionSchema(
      "gender identity",
      enrollmentStepOneGenderValues,
    ),
    pronouns: optionalString,
  }),
  contact: z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .pipe(z.email("Enter a valid email address")),
    phoneNumber: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(phonePattern, "Enter a valid phone number"),
    phoneType: createRequiredSelectionSchema(
      "phone type",
      enrollmentStepOnePhoneTypeValues,
    ),
    allowSMS: z.boolean(),
  }),
  currentAddress: z.object({
    street: requiredString("Street address"),
    city: requiredString("City"),
    state: requiredString("State or province"),
    zipCode: requiredString("ZIP or postal code"),
    country: requiredString("Country"),
  }),
  mailingAddress: z.object({
    street: requiredString("Street address"),
    city: requiredString("City"),
    state: requiredString("State or province"),
    zipCode: requiredString("ZIP or postal code"),
    country: requiredString("Country"),
  }),
  sameAsCurrentAddress: z.boolean(),
  emergencyContact: z.object({
    fullName: requiredString("Emergency contact name"),
    relationship: requiredString("Relationship"),
    phoneNumber: z
      .string()
      .trim()
      .min(1, "Emergency contact phone number is required")
      .regex(phonePattern, "Enter a valid phone number"),
  }),
  additionalInfo: z.object({
    maritalStatus: createOptionalSelectionSchema(
      "marital status",
      enrollmentStepOneMaritalStatusValues,
    ),
    occupation: optionalString,
    educationLevel: optionalString,
    languagesSpokenInput: optionalString,
    specialSkills: optionalString,
  }),
});

export type EnrollmentStepOneFormValues = z.infer<
  typeof enrollmentStepOneSchema
>;

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function trimValue(value: string) {
  return value.trim();
}

function toOptionalString(value: string) {
  const trimmedValue = trimValue(value);

  return trimmedValue || undefined;
}

function normalizeSelectionValue(value: string) {
  return trimValue(value)
    .replace(/[\s-]+/g, "_")
    .toUpperCase();
}

function normalizeKnownSelection<TValues extends readonly string[]>(
  value: unknown,
  allowedValues: TValues,
) {
  const normalizedValue = normalizeSelectionValue(readString(value));

  return allowedValues.includes(normalizedValue as TValues[number])
    ? (normalizedValue as TValues[number])
    : "";
}

function resolveRequiredSelection<TValues extends readonly string[]>(
  value: string,
  allowedValues: TValues,
) {
  const normalizedValue = normalizeKnownSelection(value, allowedValues);

  if (!normalizedValue) {
    throw new Error("Encountered an invalid step 1 selection value.");
  }

  return normalizedValue;
}

function resolveOptionalSelection<TValues extends readonly string[]>(
  value: string,
  allowedValues: TValues,
) {
  const normalizedValue = normalizeKnownSelection(value, allowedValues);

  return normalizedValue || undefined;
}

function normalizeDateInputValue(value: unknown) {
  const normalizedValue = trimValue(readString(value));

  if (!normalizedValue) {
    return "";
  }

  if (dateInputPattern.test(normalizedValue)) {
    return normalizedValue;
  }

  const isoDatePrefix = normalizedValue.slice(0, 10);

  if (dateInputPattern.test(isoDatePrefix)) {
    return isoDatePrefix;
  }

  const parsedDate = parseISO(normalizedValue);

  return isValid(parsedDate) ? format(parsedDate, "yyyy-MM-dd") : "";
}

function toIsoDateString(value: string) {
  return `${trimValue(value)}T00:00:00.000Z`;
}

function splitLanguages(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeAddressType(value: string | null | undefined) {
  return (
    value
      ?.trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "") ?? ""
  );
}

function resolveAddress(
  addresses: readonly EnrollmentAddressSummary[] | undefined,
  expectedType: "current" | "mailing",
  fallbackIndex: number,
) {
  if (!addresses?.length) {
    return null;
  }

  const matchedAddress =
    addresses.find((address) => {
      const addressType = normalizeAddressType(address.type);

      if (expectedType === "current") {
        return addressType.includes("current");
      }

      return addressType.includes("mailing");
    }) ?? addresses[fallbackIndex];

  return matchedAddress ?? null;
}

function hasAddressContent(address: EnrollmentAddressSummary | null) {
  if (!address) {
    return false;
  }

  return [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ].some((value) => Boolean(readString(value).trim()));
}

function areAddressesEqual(
  currentAddress: EnrollmentAddressSummary | null,
  mailingAddress: EnrollmentAddressSummary | null,
) {
  if (!currentAddress || !mailingAddress) {
    return false;
  }

  return (
    readString(currentAddress.street).trim() ===
      readString(mailingAddress.street).trim() &&
    readString(currentAddress.city).trim() ===
      readString(mailingAddress.city).trim() &&
    readString(currentAddress.state).trim() ===
      readString(mailingAddress.state).trim() &&
    readString(currentAddress.zipCode).trim() ===
      readString(mailingAddress.zipCode).trim() &&
    readString(currentAddress.country).trim() ===
      readString(mailingAddress.country).trim()
  );
}

export function getEnrollmentStepOneDefaultValues(
  accountInfo?: AccountInfoResponse | null,
): EnrollmentStepOneFormValues {
  const personalInfo = accountInfo?.enrollment?.personalInfo;
  const contact = accountInfo?.enrollment?.contact;
  const currentAddress = resolveAddress(
    accountInfo?.enrollment?.addresses,
    "current",
    0,
  );
  const mailingAddress = resolveAddress(
    accountInfo?.enrollment?.addresses,
    "mailing",
    1,
  );
  const emergencyContact = accountInfo?.enrollment?.emergencyContact;

  return {
    legalName: {
      firstName: readString(personalInfo?.firstName),
      middleName: readString(personalInfo?.middleName),
      lastName: readString(personalInfo?.lastName),
      maternalLastName: readString(personalInfo?.maternalLastName),
      preferredName: readString(personalInfo?.preferredName),
    },
    birthInfo: {
      dateOfBirth: normalizeDateInputValue(personalInfo?.dateOfBirth),
      cityOfBirth: readString(personalInfo?.cityOfBirth),
      municipalityOfBirth: readString(personalInfo?.municipalityOfBirth),
      countryOfBirth: readString(personalInfo?.countryOfBirth),
    },
    gender: {
      gender: normalizeKnownSelection(
        personalInfo?.gender,
        enrollmentStepOneGenderValues,
      ),
      pronouns: readString(personalInfo?.pronouns),
    },
    contact: {
      email: readString(contact?.email) || readString(accountInfo?.user.email),
      phoneNumber: readString(contact?.phoneNumber),
      phoneType: normalizeKnownSelection(
        contact?.phoneType,
        enrollmentStepOnePhoneTypeValues,
      ),
      allowSMS: readBoolean(contact?.allowSMS),
    },
    currentAddress: {
      street: readString(currentAddress?.street),
      city: readString(currentAddress?.city),
      state: readString(currentAddress?.state),
      zipCode: readString(currentAddress?.zipCode),
      country: readString(currentAddress?.country),
    },
    mailingAddress: {
      street: readString(mailingAddress?.street),
      city: readString(mailingAddress?.city),
      state: readString(mailingAddress?.state),
      zipCode: readString(mailingAddress?.zipCode),
      country: readString(mailingAddress?.country),
    },
    sameAsCurrentAddress:
      hasAddressContent(currentAddress) &&
      hasAddressContent(mailingAddress) &&
      areAddressesEqual(currentAddress, mailingAddress),
    emergencyContact: {
      fullName: readString(emergencyContact?.fullName),
      relationship: readString(emergencyContact?.relationship),
      phoneNumber: readString(emergencyContact?.phoneNumber),
    },
    additionalInfo: {
      maritalStatus: normalizeKnownSelection(
        personalInfo?.maritalStatus,
        enrollmentStepOneMaritalStatusValues,
      ),
      occupation: readString(personalInfo?.occupation),
      educationLevel: readString(personalInfo?.educationLevel),
      languagesSpokenInput: Array.isArray(personalInfo?.languagesSpoken)
        ? personalInfo.languagesSpoken.join(", ")
        : "",
      specialSkills: readString(personalInfo?.specialSkills),
    },
  };
}

export function mapEnrollmentStepOneFormToPayload(
  values: EnrollmentStepOneFormValues,
): EnrollmentStepOneUpsertRequest {
  const middleName = toOptionalString(values.legalName.middleName);
  const maternalLastName = toOptionalString(values.legalName.maternalLastName);
  const preferredName = toOptionalString(values.legalName.preferredName);
  const pronouns = toOptionalString(values.gender.pronouns);
  const maritalStatus = resolveOptionalSelection(
    values.additionalInfo.maritalStatus,
    enrollmentStepOneMaritalStatusValues,
  );
  const occupation = toOptionalString(values.additionalInfo.occupation);
  const educationLevel = toOptionalString(values.additionalInfo.educationLevel);
  const languagesSpoken = splitLanguages(
    values.additionalInfo.languagesSpokenInput,
  );
  const specialSkills = toOptionalString(values.additionalInfo.specialSkills);

  return {
    legalName: {
      firstName: trimValue(values.legalName.firstName),
      ...(middleName ? { middleName } : {}),
      lastName: trimValue(values.legalName.lastName),
      ...(maternalLastName ? { maternalLastName } : {}),
      ...(preferredName ? { preferredName } : {}),
    },
    birthInfo: {
      dateOfBirth: toIsoDateString(values.birthInfo.dateOfBirth),
      cityOfBirth: trimValue(values.birthInfo.cityOfBirth),
      municipalityOfBirth: trimValue(values.birthInfo.municipalityOfBirth),
      countryOfBirth: trimValue(values.birthInfo.countryOfBirth),
    },
    gender: {
      gender: resolveRequiredSelection(
        values.gender.gender,
        enrollmentStepOneGenderValues,
      ),
      ...(pronouns ? { pronouns } : {}),
    },
    contact: {
      email: trimValue(values.contact.email).toLowerCase(),
      phoneNumber: trimValue(values.contact.phoneNumber),
      phoneType: resolveRequiredSelection(
        values.contact.phoneType,
        enrollmentStepOnePhoneTypeValues,
      ),
      allowSMS: values.contact.allowSMS,
    },
    currentAddress: {
      street: trimValue(values.currentAddress.street),
      city: trimValue(values.currentAddress.city),
      state: trimValue(values.currentAddress.state),
      zipCode: trimValue(values.currentAddress.zipCode),
      country: trimValue(values.currentAddress.country),
    },
    mailingAddress: {
      street: trimValue(values.mailingAddress.street),
      city: trimValue(values.mailingAddress.city),
      state: trimValue(values.mailingAddress.state),
      zipCode: trimValue(values.mailingAddress.zipCode),
      country: trimValue(values.mailingAddress.country),
    },
    emergencyContact: {
      fullName: trimValue(values.emergencyContact.fullName),
      relationship: trimValue(values.emergencyContact.relationship),
      phoneNumber: trimValue(values.emergencyContact.phoneNumber),
    },
    additionalInfo: {
      ...(maritalStatus ? { maritalStatus } : {}),
      ...(occupation ? { occupation } : {}),
      ...(educationLevel ? { educationLevel } : {}),
      ...(languagesSpoken.length > 0 ? { languagesSpoken } : {}),
      ...(specialSkills ? { specialSkills } : {}),
    },
  };
}
