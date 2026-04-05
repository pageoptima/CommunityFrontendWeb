import { format, isValid, parseISO } from "date-fns";
import { z } from "zod";

import type {
  AccountInfoResponse,
  EnrollmentAddressSummary,
  EnrollmentStepOneUpsertRequest,
} from "@/types/enrollment";

const phonePattern = /^[+()0-9\s-]{7,20}$/;
const educationLevelValueMap = {
  "high-school": "High School",
  associate: "Associate Degree",
  bachelors: "Bachelor's",
  masters: "Master's",
  doctorate: "Doctorate",
  "trade-school": "Trade School",
  other: "Other",
  "High School": "High School",
  "Associate Degree": "Associate Degree",
  "Bachelor's": "Bachelor's",
  "Master's": "Master's",
  Doctorate: "Doctorate",
  "Trade School": "Trade School",
  Other: "Other",
} as const;

const requiredString = (label: string) =>
  z.string().trim().min(1, `${label} is required`);
const requiredDateString = (label: string) =>
  requiredString(label).refine((value) => {
    const parsedDate = parseISO(value);

    return isValid(parsedDate) && format(parsedDate, "yyyy-MM-dd") === value;
  }, "Enter a valid date");

const optionalString = z.string().trim();

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
    municipalityOfBirth: optionalString,
    countryOfBirth: requiredString("Country of birth"),
  }),
  gender: z.object({
    gender: requiredString("Gender"),
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
    phoneType: requiredString("Phone type"),
    allowSMS: z.boolean(),
  }),
  currentAddress: z.object({
    street: requiredString("Street address"),
    apartment: optionalString,
    city: requiredString("City"),
    state: requiredString("State or province"),
    zipCode: requiredString("ZIP or postal code"),
    country: requiredString("Country"),
    yearsLived: requiredString("Years lived"),
  }),
  mailingAddress: z.object({
    street: requiredString("Street address"),
    apartment: optionalString,
    city: requiredString("City"),
    state: requiredString("State or province"),
    zipCode: requiredString("ZIP or postal code"),
    country: requiredString("Country"),
    yearsLived: requiredString("Years lived"),
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
    maritalStatus: requiredString("Marital status"),
    occupation: requiredString("Occupation"),
    educationLevel: requiredString("Education level"),
    languagesSpokenInput: requiredString("Languages spoken"),
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
    address.apartment,
    address.city,
    address.state,
    address.zipCode,
    address.country,
    address.yearsLived,
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
    readString(currentAddress.apartment).trim() ===
      readString(mailingAddress.apartment).trim() &&
    readString(currentAddress.city).trim() ===
      readString(mailingAddress.city).trim() &&
    readString(currentAddress.state).trim() ===
      readString(mailingAddress.state).trim() &&
    readString(currentAddress.zipCode).trim() ===
      readString(mailingAddress.zipCode).trim() &&
    readString(currentAddress.country).trim() ===
      readString(mailingAddress.country).trim() &&
    readString(currentAddress.yearsLived).trim() ===
      readString(mailingAddress.yearsLived).trim()
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
      dateOfBirth: readString(personalInfo?.dateOfBirth),
      cityOfBirth: readString(personalInfo?.cityOfBirth),
      municipalityOfBirth: readString(personalInfo?.municipalityOfBirth),
      countryOfBirth: readString(personalInfo?.countryOfBirth),
    },
    gender: {
      gender: readString(personalInfo?.gender),
      pronouns: readString(personalInfo?.pronouns),
    },
    contact: {
      email: readString(contact?.email) || readString(accountInfo?.user.email),
      phoneNumber: readString(contact?.phoneNumber),
      phoneType: readString(contact?.phoneType),
      allowSMS: readBoolean(contact?.allowSMS),
    },
    currentAddress: {
      street: readString(currentAddress?.street),
      apartment: readString(currentAddress?.apartment),
      city: readString(currentAddress?.city),
      state: readString(currentAddress?.state),
      zipCode: readString(currentAddress?.zipCode),
      country: readString(currentAddress?.country),
      yearsLived: readString(currentAddress?.yearsLived),
    },
    mailingAddress: {
      street: readString(mailingAddress?.street),
      apartment: readString(mailingAddress?.apartment),
      city: readString(mailingAddress?.city),
      state: readString(mailingAddress?.state),
      zipCode: readString(mailingAddress?.zipCode),
      country: readString(mailingAddress?.country),
      yearsLived: readString(mailingAddress?.yearsLived),
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
      maritalStatus: readString(personalInfo?.maritalStatus),
      occupation: readString(personalInfo?.occupation),
      educationLevel: normalizeEducationLevel(
        readString(personalInfo?.educationLevel),
      ),
      languagesSpokenInput: Array.isArray(personalInfo?.languagesSpoken)
        ? personalInfo.languagesSpoken.join(", ")
        : "",
      specialSkills: readString(personalInfo?.specialSkills),
    },
  };
}

function trimValue(value: string) {
  return value.trim();
}

function splitLanguages(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeEducationLevel(value: string) {
  const normalizedValue = value.trim();

  return (
    educationLevelValueMap[
      normalizedValue as keyof typeof educationLevelValueMap
    ] ?? normalizedValue
  );
}

export function mapEnrollmentStepOneFormToPayload(
  values: EnrollmentStepOneFormValues,
): EnrollmentStepOneUpsertRequest {
  return {
    legalName: {
      firstName: trimValue(values.legalName.firstName),
      middleName: trimValue(values.legalName.middleName),
      lastName: trimValue(values.legalName.lastName),
      maternalLastName: trimValue(values.legalName.maternalLastName),
      preferredName: trimValue(values.legalName.preferredName),
    },
    birthInfo: {
      dateOfBirth: trimValue(values.birthInfo.dateOfBirth),
      cityOfBirth: trimValue(values.birthInfo.cityOfBirth),
      municipalityOfBirth: trimValue(values.birthInfo.municipalityOfBirth),
      countryOfBirth: trimValue(values.birthInfo.countryOfBirth),
    },
    gender: {
      gender: trimValue(values.gender.gender),
      pronouns: trimValue(values.gender.pronouns),
    },
    contact: {
      email: trimValue(values.contact.email).toLowerCase(),
      phoneNumber: trimValue(values.contact.phoneNumber),
      phoneType: trimValue(values.contact.phoneType),
      allowSMS: values.contact.allowSMS,
    },
    currentAddress: {
      street: trimValue(values.currentAddress.street),
      apartment: trimValue(values.currentAddress.apartment),
      city: trimValue(values.currentAddress.city),
      state: trimValue(values.currentAddress.state),
      zipCode: trimValue(values.currentAddress.zipCode),
      country: trimValue(values.currentAddress.country),
      yearsLived: trimValue(values.currentAddress.yearsLived),
    },
    mailingAddress: {
      street: trimValue(values.mailingAddress.street),
      apartment: trimValue(values.mailingAddress.apartment),
      city: trimValue(values.mailingAddress.city),
      state: trimValue(values.mailingAddress.state),
      zipCode: trimValue(values.mailingAddress.zipCode),
      country: trimValue(values.mailingAddress.country),
      yearsLived: trimValue(values.mailingAddress.yearsLived),
    },
    emergencyContact: {
      fullName: trimValue(values.emergencyContact.fullName),
      relationship: trimValue(values.emergencyContact.relationship),
      phoneNumber: trimValue(values.emergencyContact.phoneNumber),
    },
    additionalInfo: {
      maritalStatus: trimValue(values.additionalInfo.maritalStatus),
      occupation: trimValue(values.additionalInfo.occupation),
      educationLevel: normalizeEducationLevel(
        trimValue(values.additionalInfo.educationLevel),
      ),
      languagesSpoken: splitLanguages(
        values.additionalInfo.languagesSpokenInput,
      ),
      specialSkills: trimValue(values.additionalInfo.specialSkills),
    },
  };
}
