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

export type EnrollmentDocumentType =
  | "USER_PHOTO"
  | "BIRTH_CERTIFICATE"
  | "FAMILY_RECORD"
  | "FAMILY_PHOTO"
  | "ADDITIONAL_EVIDENCE";

export type EnrollmentDocumentStatus = string;

export type EnrollmentDocumentRecord = Readonly<{
  id: string;
  type: EnrollmentDocumentType;
  status: EnrollmentDocumentStatus;
  fileName: string;
  fileKey: string;
  fileSize: number;
  mimeType?: string | null;
  url: string;
  verifiedByAdmin: boolean;
  rejectedReason: string | null;
  uploadedAt: string;
}>;

export type EnrollmentDocumentBucket = Readonly<{
  type: EnrollmentDocumentType;
  isSingle: boolean;
  documents: EnrollmentDocumentRecord | EnrollmentDocumentRecord[] | null;
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

export type EnrollmentContactSummary = Readonly<{
  email: string | null;
  phoneNumber: string | null;
  phoneType: string | null;
  allowSMS: boolean | null;
}>;

export type EnrollmentAddressSummary = Readonly<{
  type?: string | null;
  street: string | null;
  apartment: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  yearsLived: string | null;
}>;

export type EnrollmentEmergencyContactSummary = Readonly<{
  fullName: string | null;
  relationship: string | null;
  phoneNumber: string | null;
}>;

export type EnrollmentMaternalLineageRelationValue =
  | "MOTHER"
  | "GRANDMOTHER"
  | "GREAT_GRANDMOTHER"
  | "GREAT_GREAT_GRANDMOTHER"
  | "GREAT_GREAT_GREAT_GRANDMOTHER";

export type EnrollmentMaternalLineageLivingStatusValue = "LIVING" | "DECEASED";

export type EnrollmentMaternalLineageSummary = Readonly<{
  id?: string | null;
  relation: EnrollmentMaternalLineageRelationValue | null;
  fullName: string | null;
  maidenName: string | null;
  dateOfBirth: string | null;
  placeOfBirth: string | null;
  // Backend payload currently may return "LivingStatus" (capital L) in /account/info.
  LivingStatus?: EnrollmentMaternalLineageLivingStatusValue | null;
  livingStatus: EnrollmentMaternalLineageLivingStatusValue | null;
  approximateBirthYear: number | null;
  regionOfOrigin: string | null;
  familyOccupation: string | null;
  additionalNotes: string | null;
}>;

export type EnrollmentCulturalConnectionSummary = Readonly<{
  id?: string | null;
  key: string | null;
  description: string | null;
}>;

export type AccountEnrollmentInfo = Readonly<{
  id: string;
  status: string;
  consentAccepted: boolean;
  user: AccountInfoUser;
  personalInfo: EnrollmentPersonalInfoSummary | null;
  contact: EnrollmentContactSummary | null;
  addresses: EnrollmentAddressSummary[];
  emergencyContact: EnrollmentEmergencyContactSummary | null;
  maternalLineages: EnrollmentMaternalLineageSummary[];
  culturalConnections: EnrollmentCulturalConnectionSummary[];
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

export type EnrollmentStepOneLegalName = Readonly<{
  firstName: string;
  middleName?: string;
  lastName: string;
  maternalLastName?: string;
  preferredName?: string;
}>;

export type EnrollmentStepOneBirthInfo = Readonly<{
  dateOfBirth: string;
  cityOfBirth: string;
  municipalityOfBirth: string;
  countryOfBirth: string;
}>;

export type EnrollmentStepOneGenderValue =
  | "MALE"
  | "FEMALE"
  | "NON_BINARY"
  | "TWO_SPIRIT"
  | "SELF_DESCRIBE"
  | "PREFER_NOT_TO_SAY"
  | "OTHER";

export type EnrollmentStepOneGenderInfo = Readonly<{
  gender: EnrollmentStepOneGenderValue;
  pronouns?: string;
}>;

export type EnrollmentStepOnePhoneTypeValue = "MOBILE" | "HOME" | "WORK";

export type EnrollmentStepOneContactInfo = Readonly<{
  email: string;
  phoneNumber: string;
  phoneType: EnrollmentStepOnePhoneTypeValue;
  allowSMS?: boolean;
}>;

export type EnrollmentStepOneAddressInfo = Readonly<{
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}>;

export type EnrollmentStepOneEmergencyContact = Readonly<{
  fullName: string;
  relationship: string;
  phoneNumber: string;
}>;

export type EnrollmentStepOneMaritalStatusValue =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED";

export type EnrollmentStepOneAdditionalInfo = Readonly<{
  maritalStatus?: EnrollmentStepOneMaritalStatusValue;
  occupation?: string;
  educationLevel?: string;
  languagesSpoken?: string[];
  specialSkills?: string;
}>;

export type EnrollmentStepOneUpsertRequest = Readonly<{
  legalName: EnrollmentStepOneLegalName;
  birthInfo: EnrollmentStepOneBirthInfo;
  gender: EnrollmentStepOneGenderInfo;
  contact: EnrollmentStepOneContactInfo;
  currentAddress: EnrollmentStepOneAddressInfo;
  mailingAddress: EnrollmentStepOneAddressInfo;
  emergencyContact: EnrollmentStepOneEmergencyContact;
  additionalInfo: EnrollmentStepOneAdditionalInfo;
}>;

export type EnrollmentStepOneUpsertResponse = Readonly<{
  success: boolean;
}>;

export type EnrollmentStepTwoMaternalLineage = Readonly<{
  id?: string;
  relation: EnrollmentMaternalLineageRelationValue;
  fullName: string;
  maidenName?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  livingStatus: EnrollmentMaternalLineageLivingStatusValue;
  approximateBirthYear?: number;
  regionOfOrigin?: string;
  familyOccupation?: string;
  additionalNotes?: string;
}>;

export type EnrollmentStepTwoUpsertRequest = Readonly<{
  maternalLineages: EnrollmentStepTwoMaternalLineage[];
}>;

export type EnrollmentStepTwoUpsertResponse = Readonly<{
  success: boolean;
}>;

export type EnrollmentStepThreeCulturalConnection = Readonly<{
  key: string;
  description: string;
}>;

export type EnrollmentStepThreeCulturalConnectionListResponse =
  readonly EnrollmentStepThreeCulturalConnection[];

export type EnrollmentStepThreeUpsertRequest = Readonly<{
  culturalConnectionKeys: string[];
}>;

export type EnrollmentStepThreeUpsertResponse = Readonly<{
  success: boolean;
}>;

export type EnrollmentDocumentListResponse =
  readonly EnrollmentDocumentBucket[];

export type EnrollmentDocumentUploadResponse = Readonly<{
  message: string;
  document: EnrollmentDocumentRecord;
}>;
