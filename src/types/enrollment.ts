export type ActiveConsent = Readonly<{
  id: string;
  key: string;
  title: string;
  content: string;
  required: boolean;
  version: number;
}>;

export type ConsentAcceptRequest = Readonly<{
  acceptRequired: boolean;
}>;

export type EnrollmentStepKey = "1" | "2" | "3" | "4";

export type EnrollmentStepState = Readonly<Record<EnrollmentStepKey, boolean>>;

export type AccountInfoUser = Readonly<{
  id: string;
  name: string;
  email: string;
  role: string;
}>;

export type AccountEnrollmentConsent = Readonly<{
  id: string;
  key: string;
  version: number;
  title: string;
  accepted: boolean;
  acceptedAt: string | null;
  required: boolean;
}>;

export type EnrollmentDocumentBucket = Readonly<{
  type: string;
  isSingle: boolean;
  documents: unknown[] | null;
}>;

export type EnrollmentPersonalInfoSummary = Readonly<{
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  preferredName: string | null;
  maternalLastName: string | null;
  dateOfBirth: string | null;
  cityOfBirth: string | null;
  municipalityOfBirth: string | null;
  countryOfBirth: string | null;
  gender: string | null;
  pronouns: string | null;
  maritalStatus: string | null;
  occupation: string | null;
  educationLevel: string | null;
  languagesSpoken: string[];
  specialSkills: string | null;
}>;

export type AccountEnrollmentInfo = Readonly<{
  id: string;
  status: string;
  consentAccepted: boolean;
  user: AccountInfoUser;
  personalInfo: EnrollmentPersonalInfoSummary | null;
  contact: unknown | null;
  addresses: unknown[];
  emergencyContact: unknown | null;
  maternalLineages: unknown[];
  culturalConnections: unknown[];
  consent: AccountEnrollmentConsent[];
  documents: EnrollmentDocumentBucket[];
  steps: EnrollmentStepState;
}>;

export type AccountInfoResponse = Readonly<{
  user: AccountInfoUser;
  enrollment: AccountEnrollmentInfo | null;
  enrollmentStep?: EnrollmentStepState;
  enrollmentStatus?: string | null;
  hasEnrollment: boolean;
}>;
