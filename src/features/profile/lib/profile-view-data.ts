import { formatMemberId, type AuthUser } from "@/lib/auth";
import type {
  AccountInfoResponse,
  EnrollmentDocumentBucket,
  EnrollmentDocumentRecord,
  EnrollmentDocumentType,
  EnrollmentMaternalLineageSummary,
  EnrollmentStepState,
} from "@/types/enrollment";

import {
  type ProfileActivityData,
  profileConfig,
  type ProfileCopy,
  type ProfileDetail,
  type ProfileDocumentsData,
  type ProfileLineageEntry,
  type ProfileLineageStat,
  type ProfileLineageTreeData,
  type ProfileOverviewData,
  type ProfileRegionalMember,
  type ProfileSettingsData,
  type ProfileYucayekeData,
} from "../config/profile-config";

type BuildProfileViewDataArgs = Readonly<{
  accountInfo?: AccountInfoResponse | null;
  authUser: AuthUser;
}>;

export type ProfileViewData = Readonly<{
  activityData: ProfileActivityData;
  copy: ProfileCopy;
  details: readonly ProfileDetail[];
  lineageEntries: readonly ProfileLineageEntry[];
  lineageStats: readonly ProfileLineageStat[];
  overviewData: ProfileOverviewData;
  yucayekeData: ProfileYucayekeData;
  documentsData: ProfileDocumentsData;
  lineageTreeData: ProfileLineageTreeData;
  settingsData: ProfileSettingsData;
  regionalMembers: readonly ProfileRegionalMember[];
}>;

const fallbackCopy = profileConfig.copy;
const fallbackDetails = profileConfig.details;
const fallbackLineageEntries = profileConfig.lineageEntries;
const fallbackLineageTree = profileConfig.lineageTree;
const fallbackLineageStats = profileConfig.lineageStats;
const fallbackOverview = profileConfig.overview;
const fallbackYucayeke = profileConfig.yucayeke;
const fallbackDocuments = profileConfig.documents;
const fallbackActivity = profileConfig.activity;
const fallbackSettings = profileConfig.settings;
const fallbackRegionalMembers = profileConfig.regionalMembers;

const lineageRelationRank: Readonly<
  Record<NonNullable<EnrollmentMaternalLineageSummary["relation"]>, number>
> = {
  MOTHER: 0,
  GRANDMOTHER: 1,
  GREAT_GRANDMOTHER: 2,
  GREAT_GREAT_GRANDMOTHER: 3,
  GREAT_GREAT_GREAT_GRANDMOTHER: 4,
};

const lineageRelationLabel: Readonly<
  Record<NonNullable<EnrollmentMaternalLineageSummary["relation"]>, string>
> = {
  MOTHER: "Mother",
  GRANDMOTHER: "Maternal Grandmother",
  GREAT_GRANDMOTHER: "Great Grandmother",
  GREAT_GREAT_GRANDMOTHER: "Great Great Grandmother",
  GREAT_GREAT_GREAT_GRANDMOTHER: "Great Great Great Grandmother",
};

const documentTypeLabels: Readonly<Record<EnrollmentDocumentType, string>> = {
  USER_PHOTO: "User Photo",
  BIRTH_CERTIFICATE: "Birth Certificate",
  FAMILY_RECORD: "Lineage Birth Certificates",
  FAMILY_PHOTO: "Lineage Photos",
  ADDITIONAL_EVIDENCE: "Additional Evidence",
};

function readText(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value.trim();
}

function toStatusLabel(value: string | null | undefined) {
  const normalizedValue = readText(value);

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDateLabel(value: string | null | undefined) {
  const normalizedValue = readText(value);

  if (!normalizedValue) {
    return "";
  }

  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateTimeLabel(value: string | null | undefined) {
  const normalizedValue = readText(value);

  if (!normalizedValue) {
    return "";
  }

  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getTimeValue(value: string | null | undefined) {
  const normalizedValue = readText(value);

  if (!normalizedValue) {
    return 0;
  }

  const timestamp = new Date(normalizedValue).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function buildFullName(parts: readonly (string | null | undefined)[]) {
  const values = parts.map(readText).filter(Boolean);

  return values.join(" ");
}

function formatPhoneLabel(value: string | null | undefined) {
  const normalizedValue = readText(value);

  if (!normalizedValue) {
    return "";
  }

  const digits = normalizedValue.replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return normalizedValue;
}

function formatKeyToLabel(value: string | null | undefined) {
  const normalizedValue = readText(value);

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function resolveLocation(accountInfo?: AccountInfoResponse | null) {
  const currentAddress =
    accountInfo?.enrollment?.addresses.find(
      (address) => address.type === "CURRENT",
    ) ?? accountInfo?.enrollment?.addresses[0];
  const parts = [
    readText(currentAddress?.city),
    readText(currentAddress?.state),
    readText(currentAddress?.country),
  ].filter(Boolean);

  if (parts.length > 0) {
    return parts.join(", ");
  }

  const birthCity = readText(
    accountInfo?.enrollment?.personalInfo?.cityOfBirth,
  );
  const birthCountry = readText(
    accountInfo?.enrollment?.personalInfo?.countryOfBirth,
  );

  if (birthCity || birthCountry) {
    return [birthCity, birthCountry].filter(Boolean).join(", ");
  }

  return "";
}

function resolveCurrentAddressLabel(accountInfo?: AccountInfoResponse | null) {
  const currentAddress =
    accountInfo?.enrollment?.addresses.find(
      (address) => address.type === "CURRENT",
    ) ?? accountInfo?.enrollment?.addresses[0];

  if (!currentAddress) {
    return "";
  }

  const parts = [
    readText(currentAddress.street),
    readText(currentAddress.city),
    readText(currentAddress.state),
    readText(currentAddress.country),
  ].filter(Boolean);

  return parts.join(", ");
}

function resolveAddressByType(
  accountInfo: AccountInfoResponse | null | undefined,
  type: "CURRENT" | "MAILING",
) {
  return accountInfo?.enrollment?.addresses.find(
    (address) => address.type === type,
  );
}

function getResolvedStepState(accountInfo?: AccountInfoResponse | null) {
  return accountInfo?.enrollmentStep ?? accountInfo?.enrollment?.steps;
}

function countCompletedSteps(stepState?: EnrollmentStepState) {
  if (!stepState) {
    return null;
  }

  const completed = Object.values(stepState).filter(Boolean).length;
  return `${completed} / ${Object.keys(stepState).length}`;
}

type DocumentMap = Record<EnrollmentDocumentType, EnrollmentDocumentRecord[]>;

function createEmptyDocumentMap(): DocumentMap {
  return {
    USER_PHOTO: [],
    BIRTH_CERTIFICATE: [],
    FAMILY_RECORD: [],
    FAMILY_PHOTO: [],
    ADDITIONAL_EVIDENCE: [],
  };
}

function toDocumentArray(bucket: EnrollmentDocumentBucket) {
  if (!bucket.documents) {
    return [];
  }

  return Array.isArray(bucket.documents)
    ? bucket.documents
    : [bucket.documents];
}

function getDocumentMap(
  buckets: readonly EnrollmentDocumentBucket[] | undefined,
): DocumentMap {
  const map = createEmptyDocumentMap();

  for (const bucket of buckets ?? []) {
    map[bucket.type] = toDocumentArray(bucket);
  }

  return map;
}

function getDocumentCount(
  buckets: readonly EnrollmentDocumentBucket[] | undefined,
) {
  let count = 0;

  for (const bucket of buckets ?? []) {
    if (!bucket.documents) {
      continue;
    }

    count += Array.isArray(bucket.documents) ? bucket.documents.length : 1;
  }

  return count;
}

function formatDocumentFileSize(fileSizeInBytes: number) {
  if (fileSizeInBytes >= 1024 * 1024) {
    return `${(fileSizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (fileSizeInBytes >= 1024) {
    return `${Math.round(fileSizeInBytes / 1024)} KB`;
  }

  return `${fileSizeInBytes} B`;
}

function getDocumentDisplayName(fileName: string) {
  const normalizedValue = readText(fileName);

  if (!normalizedValue) {
    return "Uploaded document";
  }

  const fileNameSegments = normalizedValue.split("/");

  return fileNameSegments[fileNameSegments.length - 1] || normalizedValue;
}

function getMissingRequiredDocuments(documentMap: DocumentMap) {
  const missingDocuments: string[] = [];

  if (documentMap.USER_PHOTO.length < 1) {
    missingDocuments.push("User Photo");
  }

  if (documentMap.BIRTH_CERTIFICATE.length < 1) {
    missingDocuments.push("Birth Certificate");
  }

  if (documentMap.FAMILY_RECORD.length < 1) {
    missingDocuments.push("Mother's Birth Certificate");
  }

  if (documentMap.FAMILY_RECORD.length < 2) {
    missingDocuments.push("Grandmother's Birth Certificate");
  }

  if (documentMap.FAMILY_PHOTO.length < 1) {
    missingDocuments.push("Mother's Photo");
  }

  if (documentMap.FAMILY_PHOTO.length < 2) {
    missingDocuments.push("Grandmother's Photo");
  }

  return missingDocuments;
}

function getRequiredCoverageValue(documentMap: DocumentMap) {
  const uploadedCount =
    Math.min(documentMap.USER_PHOTO.length, 1) +
    Math.min(documentMap.BIRTH_CERTIFICATE.length, 1) +
    Math.min(documentMap.FAMILY_RECORD.length, 2) +
    Math.min(documentMap.FAMILY_PHOTO.length, 2);

  return `${uploadedCount} / 6`;
}

function getApprovedDocumentCount(
  documents: readonly EnrollmentDocumentRecord[],
) {
  return documents.filter(
    (document) => readText(document.status).toUpperCase() === "APPROVED",
  ).length;
}

function getPendingDocumentCount(
  documents: readonly EnrollmentDocumentRecord[],
) {
  return documents.filter((document) => {
    const normalizedStatus = readText(document.status).toUpperCase();
    return normalizedStatus !== "APPROVED" && normalizedStatus !== "REJECTED";
  }).length;
}

function getYearsTraced(entries: readonly ProfileLineageEntry[]) {
  const years = entries
    .map((entry) => {
      const match = entry.born.match(/\b(18|19|20)\d{2}\b/);
      return match ? Number(match[0]) : null;
    })
    .filter((year): year is number => typeof year === "number");

  if (years.length === 0) {
    return null;
  }

  const earliestYear = Math.min(...years);
  const currentYear = new Date().getFullYear();

  return String(Math.max(currentYear - earliestYear, 0));
}

function mapLineageEntries(accountInfo?: AccountInfoResponse | null) {
  const personalInfo = accountInfo?.enrollment?.personalInfo;
  const selfFallback = fallbackLineageEntries[0];
  const selfName =
    buildFullName([
      personalInfo?.firstName,
      personalInfo?.middleName,
      personalInfo?.lastName,
    ]) || selfFallback?.name;
  const selfBorn =
    formatDateLabel(personalInfo?.dateOfBirth) || selfFallback?.born;
  const selfPlace =
    [
      readText(personalInfo?.cityOfBirth),
      readText(personalInfo?.countryOfBirth),
    ]
      .filter(Boolean)
      .join(", ") || selfFallback?.place;
  const entries: ProfileLineageEntry[] = [
    {
      born: selfBorn || "Unknown",
      generation: "1",
      generationLabel:
        selfFallback?.generationLabel ?? "You (Current Generation)",
      name: selfName || "Member",
      place: selfPlace || "Unknown",
      status: selfFallback?.status ?? "Verified",
      statusLabel: selfFallback?.statusLabel ?? "Status",
    },
  ];

  const maternalLineages = [
    ...(accountInfo?.enrollment?.maternalLineages ?? []),
  ]
    .filter((lineage) =>
      Boolean(
        readText(lineage.fullName) ||
        readText(lineage.placeOfBirth) ||
        readText(lineage.regionOfOrigin),
      ),
    )
    .sort((leftLineage, rightLineage) => {
      const leftRank = leftLineage.relation
        ? lineageRelationRank[leftLineage.relation]
        : 99;
      const rightRank = rightLineage.relation
        ? lineageRelationRank[rightLineage.relation]
        : 99;

      return leftRank - rightRank;
    });

  for (const [index, lineage] of maternalLineages.entries()) {
    const fallbackEntry = fallbackLineageEntries[index + 1];
    const generationIndex = index + 2;
    const birthDate = formatDateLabel(lineage.dateOfBirth);
    const bornValue =
      birthDate ||
      (typeof lineage.approximateBirthYear === "number"
        ? String(lineage.approximateBirthYear)
        : fallbackEntry?.born) ||
      "Unknown";
    const placeValue =
      readText(lineage.placeOfBirth) ||
      readText(lineage.regionOfOrigin) ||
      fallbackEntry?.place ||
      "Unknown";
    const generationLabel =
      (lineage.relation ? lineageRelationLabel[lineage.relation] : "") ||
      fallbackEntry?.generationLabel ||
      `Generation ${generationIndex}`;

    entries.push({
      born: bornValue,
      generation: String(generationIndex),
      generationLabel,
      name:
        readText(lineage.fullName) || fallbackEntry?.name || "Unknown Ancestor",
      place: placeValue,
      status: fallbackEntry?.status ?? "Verified",
      statusLabel: fallbackEntry?.statusLabel ?? "Status",
    });
  }

  return entries.length > 1 ? entries : fallbackLineageEntries;
}

function mapOverviewData(
  accountInfo?: AccountInfoResponse | null,
): ProfileOverviewData {
  const enrollment = accountInfo?.enrollment;
  const personalInfo = enrollment?.personalInfo;
  const contact = enrollment?.contact;
  const stepState = getResolvedStepState(accountInfo);
  const completedSteps = countCompletedSteps(stepState);
  const totalDocuments = getDocumentCount(enrollment?.documents);
  const lineageRecordCount = (enrollment?.maternalLineages ?? []).filter(
    (lineage) =>
      Boolean(readText(lineage.fullName) || readText(lineage.placeOfBirth)),
  ).length;

  const enrollmentStatus =
    toStatusLabel(accountInfo?.enrollmentStatus ?? enrollment?.status) ||
    fallbackOverview.metrics[0]?.value;

  const preferredName =
    readText(personalInfo?.preferredName) ||
    buildFullName([
      personalInfo?.firstName,
      personalInfo?.middleName,
      personalInfo?.lastName,
    ]);
  const languagesSpoken = (personalInfo?.languagesSpoken ?? [])
    .map((item) => readText(item))
    .filter(Boolean)
    .join(", ");
  const emergencyContact = readText(enrollment?.emergencyContact?.fullName);
  const currentAddress = resolveCurrentAddressLabel(accountInfo);
  const fromApiCulturalConnections = (enrollment?.culturalConnections ?? [])
    .map(
      (connection) =>
        readText(connection.description) || formatKeyToLabel(connection.key),
    )
    .filter(Boolean);

  return {
    checklist: fallbackOverview.checklist.map((item, index) => {
      const stepKey = String(index + 1) as keyof EnrollmentStepState;
      return {
        completed: stepState?.[stepKey] ?? item.completed,
        label: item.label,
      };
    }),
    contactFacts: [
      {
        ...fallbackOverview.contactFacts[0],
        value:
          readText(contact?.email) ||
          readText(accountInfo?.user?.email) ||
          fallbackOverview.contactFacts[0].value,
      },
      {
        ...fallbackOverview.contactFacts[1],
        value:
          formatPhoneLabel(contact?.phoneNumber) ||
          fallbackOverview.contactFacts[1].value,
      },
      {
        ...fallbackOverview.contactFacts[2],
        value: currentAddress || fallbackOverview.contactFacts[2].value,
      },
      {
        ...fallbackOverview.contactFacts[3],
        value: emergencyContact || fallbackOverview.contactFacts[3].value,
      },
    ],
    culturalConnections:
      fromApiCulturalConnections.length > 0
        ? fromApiCulturalConnections
        : fallbackOverview.culturalConnections,
    description: fallbackOverview.description,
    metrics: [
      {
        ...fallbackOverview.metrics[0],
        value: enrollmentStatus || fallbackOverview.metrics[0].value,
      },
      {
        ...fallbackOverview.metrics[1],
        value: completedSteps || fallbackOverview.metrics[1].value,
      },
      {
        ...fallbackOverview.metrics[2],
        value:
          totalDocuments > 0
            ? String(totalDocuments)
            : fallbackOverview.metrics[2].value,
      },
      {
        ...fallbackOverview.metrics[3],
        value:
          lineageRecordCount > 0
            ? String(lineageRecordCount)
            : fallbackOverview.metrics[3].value,
      },
    ],
    personalFacts: [
      {
        ...fallbackOverview.personalFacts[0],
        value: preferredName || fallbackOverview.personalFacts[0].value,
      },
      {
        ...fallbackOverview.personalFacts[1],
        value:
          readText(personalInfo?.occupation) ||
          fallbackOverview.personalFacts[1].value,
      },
      {
        ...fallbackOverview.personalFacts[2],
        value:
          readText(personalInfo?.educationLevel) ||
          fallbackOverview.personalFacts[2].value,
      },
      {
        ...fallbackOverview.personalFacts[3],
        value: languagesSpoken || fallbackOverview.personalFacts[3].value,
      },
    ],
    title: fallbackOverview.title,
  };
}

function mapYucayekeData(
  accountInfo?: AccountInfoResponse | null,
): ProfileYucayekeData {
  const enrollment = accountInfo?.enrollment;
  const personalInfo = enrollment?.personalInfo;
  const stepState = getResolvedStepState(accountInfo);
  const completedSteps = countCompletedSteps(stepState);
  const totalDocuments = getDocumentCount(enrollment?.documents);
  const lineageEntries = (enrollment?.maternalLineages ?? []).filter(
    (lineage) => Boolean(readText(lineage.fullName)),
  );
  const culturalConnections = (enrollment?.culturalConnections ?? [])
    .map(
      (connection) =>
        readText(connection.description) || formatKeyToLabel(connection.key),
    )
    .filter(Boolean);
  const currentAddress = resolveAddressByType(accountInfo, "CURRENT");
  const currentTerritoryParts = [
    readText(currentAddress?.city),
    readText(currentAddress?.state),
    readText(currentAddress?.country),
  ].filter(Boolean);
  const currentTerritory = currentTerritoryParts.join(", ");
  const communityName = readText(currentAddress?.city)
    ? `Yucayeke ${readText(currentAddress?.city)}`
    : fallbackYucayeke.communityName;
  const lineageRegions = Array.from(
    new Set(
      lineageEntries
        .map((lineage) => readText(lineage.regionOfOrigin))
        .filter(Boolean),
    ),
  );
  const languages = (personalInfo?.languagesSpoken ?? [])
    .map((language) => readText(language))
    .filter(Boolean);
  const contactMethod =
    formatPhoneLabel(enrollment?.contact?.phoneNumber) ||
    readText(enrollment?.contact?.email) ||
    readText(accountInfo?.user?.email);
  const statusLabel =
    toStatusLabel(accountInfo?.enrollmentStatus ?? enrollment?.status) ||
    fallbackYucayeke.rhythm[0].value;

  const circles = [
    {
      detail: currentTerritory || fallbackYucayeke.circles[0].detail,
      name:
        buildFullName([
          personalInfo?.firstName,
          personalInfo?.middleName,
          personalInfo?.lastName,
        ]) || fallbackYucayeke.circles[0].name,
      role: fallbackYucayeke.circles[0].role,
    },
    ...[...lineageEntries]
      .sort((leftLineage, rightLineage) => {
        const leftRank = leftLineage.relation
          ? lineageRelationRank[leftLineage.relation]
          : 99;
        const rightRank = rightLineage.relation
          ? lineageRelationRank[rightLineage.relation]
          : 99;

        return leftRank - rightRank;
      })
      .slice(0, 2)
      .map((lineage) => ({
        detail:
          readText(lineage.placeOfBirth) ||
          readText(lineage.regionOfOrigin) ||
          fallbackYucayeke.circles[1].detail,
        name: readText(lineage.fullName) || fallbackYucayeke.circles[1].name,
        role:
          (lineage.relation ? lineageRelationLabel[lineage.relation] : "") ||
          fallbackYucayeke.circles[1].role,
      })),
  ];

  return {
    circles: circles.length > 1 ? circles : fallbackYucayeke.circles,
    communityName,
    description: fallbackYucayeke.description,
    metrics: [
      {
        ...fallbackYucayeke.metrics[0],
        value: completedSteps || fallbackYucayeke.metrics[0].value,
      },
      {
        ...fallbackYucayeke.metrics[1],
        value:
          lineageEntries.length > 0
            ? String(lineageEntries.length)
            : fallbackYucayeke.metrics[1].value,
      },
      {
        ...fallbackYucayeke.metrics[2],
        value:
          totalDocuments > 0
            ? String(totalDocuments)
            : fallbackYucayeke.metrics[2].value,
      },
      {
        ...fallbackYucayeke.metrics[3],
        value:
          culturalConnections.length > 0
            ? String(culturalConnections.length)
            : fallbackYucayeke.metrics[3].value,
      },
    ],
    rhythm: [
      {
        ...fallbackYucayeke.rhythm[0],
        value: statusLabel,
      },
      {
        ...fallbackYucayeke.rhythm[1],
        value: contactMethod || fallbackYucayeke.rhythm[1].value,
      },
      {
        ...fallbackYucayeke.rhythm[2],
        value:
          culturalConnections[0] ||
          readText(personalInfo?.specialSkills) ||
          fallbackYucayeke.rhythm[2].value,
      },
      {
        ...fallbackYucayeke.rhythm[3],
        value: fallbackYucayeke.rhythm[3].value,
      },
    ],
    territoryFacts: [
      {
        ...fallbackYucayeke.territoryFacts[0],
        value: currentTerritory || fallbackYucayeke.territoryFacts[0].value,
      },
      {
        ...fallbackYucayeke.territoryFacts[1],
        value:
          readText(personalInfo?.municipalityOfBirth) ||
          readText(personalInfo?.cityOfBirth) ||
          fallbackYucayeke.territoryFacts[1].value,
      },
      {
        ...fallbackYucayeke.territoryFacts[2],
        value:
          lineageRegions.join(", ") || fallbackYucayeke.territoryFacts[2].value,
      },
      {
        ...fallbackYucayeke.territoryFacts[3],
        value: languages.join(", ") || fallbackYucayeke.territoryFacts[3].value,
      },
    ],
    title: fallbackYucayeke.title,
  };
}

function mapDocumentsData(
  accountInfo?: AccountInfoResponse | null,
): ProfileDocumentsData {
  const documentMap = getDocumentMap(accountInfo?.enrollment?.documents);
  const allDocuments = Object.values(documentMap)
    .flat()
    .sort(
      (leftDocument, rightDocument) =>
        new Date(rightDocument.uploadedAt).getTime() -
        new Date(leftDocument.uploadedAt).getTime(),
    );

  if (allDocuments.length === 0) {
    return fallbackDocuments;
  }

  const approvedCount = getApprovedDocumentCount(allDocuments);
  const pendingCount = getPendingDocumentCount(allDocuments);

  return {
    categories: [
      {
        ...fallbackDocuments.categories[0],
        count: String(documentMap.USER_PHOTO.length),
      },
      {
        ...fallbackDocuments.categories[1],
        count: String(documentMap.BIRTH_CERTIFICATE.length),
      },
      {
        ...fallbackDocuments.categories[2],
        count: String(documentMap.FAMILY_RECORD.length),
      },
      {
        ...fallbackDocuments.categories[3],
        count: String(documentMap.FAMILY_PHOTO.length),
      },
      {
        ...fallbackDocuments.categories[4],
        count: String(documentMap.ADDITIONAL_EVIDENCE.length),
      },
    ],
    description: fallbackDocuments.description,
    metrics: [
      {
        ...fallbackDocuments.metrics[0],
        value: String(allDocuments.length),
      },
      {
        ...fallbackDocuments.metrics[1],
        value: getRequiredCoverageValue(documentMap),
      },
      {
        ...fallbackDocuments.metrics[2],
        value: String(approvedCount),
      },
      {
        ...fallbackDocuments.metrics[3],
        value: String(pendingCount),
      },
    ],
    missingRequired: getMissingRequiredDocuments(documentMap),
    title: fallbackDocuments.title,
    uploads: allDocuments.slice(0, 8).map((document) => ({
      category: documentTypeLabels[document.type],
      id: document.id,
      name: getDocumentDisplayName(document.fileName),
      size: formatDocumentFileSize(document.fileSize),
      status: toStatusLabel(document.status) || "Pending",
      uploadedAt: formatDateLabel(document.uploadedAt) || "Unknown date",
      url: document.url,
    })),
  };
}

function mapActivityData({
  accountInfo,
  authUser,
}: Readonly<{
  accountInfo?: AccountInfoResponse | null;
  authUser: AuthUser;
}>): ProfileActivityData {
  const enrollment = accountInfo?.enrollment;
  const stepState = getResolvedStepState(accountInfo);
  const documentMap = getDocumentMap(enrollment?.documents);
  const allDocuments = Object.values(documentMap)
    .flat()
    .sort(
      (leftDocument, rightDocument) =>
        getTimeValue(rightDocument.uploadedAt) -
        getTimeValue(leftDocument.uploadedAt),
    );
  const pendingDocumentsCount = getPendingDocumentCount(allDocuments);
  const completedSteps = countCompletedSteps(stepState);

  type RawActivityEvent = {
    description: string;
    id: string;
    rawDate: string;
    timestamp: number;
    title: string;
    tone: "success" | "warning" | "info";
  };

  const events: RawActivityEvent[] = [];
  const accountCreatedAt = readText(authUser.createdAt);

  if (accountCreatedAt) {
    events.push({
      description: "Your profile account was created.",
      id: "activity-account-created",
      rawDate: accountCreatedAt,
      timestamp: getTimeValue(accountCreatedAt),
      title: "Account Created",
      tone: "success",
    });
  }

  const acceptedConsents = [...(enrollment?.consent ?? [])]
    .filter((consent) => consent.accepted && readText(consent.acceptedAt))
    .sort(
      (leftConsent, rightConsent) =>
        getTimeValue(rightConsent.acceptedAt) -
        getTimeValue(leftConsent.acceptedAt),
    );

  for (const consent of acceptedConsents.slice(0, 3)) {
    if (!consent.acceptedAt) {
      continue;
    }

    events.push({
      description: `${consent.title} accepted.`,
      id: `activity-consent-${consent.id}`,
      rawDate: consent.acceptedAt,
      timestamp: getTimeValue(consent.acceptedAt),
      title: "Consent Accepted",
      tone: "success",
    });
  }

  for (const document of allDocuments.slice(0, 6)) {
    const normalizedStatus = readText(document.status).toUpperCase();
    const tone =
      normalizedStatus === "APPROVED"
        ? "success"
        : normalizedStatus === "REJECTED"
          ? "warning"
          : "info";

    events.push({
      description: `${getDocumentDisplayName(document.fileName)} (${formatDocumentFileSize(document.fileSize)}) · ${toStatusLabel(document.status) || "Pending"}.`,
      id: `activity-document-${document.id}`,
      rawDate: document.uploadedAt,
      timestamp: getTimeValue(document.uploadedAt),
      title: `${documentTypeLabels[document.type]} Uploaded`,
      tone,
    });
  }

  const sortedEvents = events
    .filter((event) => event.timestamp > 0)
    .sort(
      (leftEvent, rightEvent) => rightEvent.timestamp - leftEvent.timestamp,
    );

  if (sortedEvents.length === 0) {
    return fallbackActivity;
  }

  const latestEventDate = sortedEvents[0]?.rawDate;
  const missingRequiredDocuments = getMissingRequiredDocuments(documentMap);
  const nextActions: string[] = [];

  if (stepState && !stepState["3"]) {
    nextActions.push("Complete Cultural Connections in Step 3.");
  }

  if (missingRequiredDocuments.length > 0) {
    nextActions.push("Upload missing required documents in Step 4.");
  }

  if (pendingDocumentsCount > 0) {
    nextActions.push("Check pending document review updates.");
  }

  return {
    description: fallbackActivity.description,
    events: sortedEvents.slice(0, 8).map((event) => ({
      dateLabel:
        formatDateTimeLabel(event.rawDate) ||
        formatDateLabel(event.rawDate) ||
        "Unknown date",
      description: event.description,
      id: event.id,
      title: event.title,
      tone: event.tone,
    })),
    metrics: [
      {
        ...fallbackActivity.metrics[0],
        value: String(sortedEvents.length),
      },
      {
        ...fallbackActivity.metrics[1],
        value: completedSteps || fallbackActivity.metrics[1].value,
      },
      {
        ...fallbackActivity.metrics[2],
        value: String(pendingDocumentsCount),
      },
      {
        ...fallbackActivity.metrics[3],
        value:
          formatDateLabel(latestEventDate) || fallbackActivity.metrics[3].value,
      },
    ],
    nextActions:
      nextActions.length > 0 ? nextActions : [...fallbackActivity.nextActions],
    title: fallbackActivity.title,
  };
}

function mapSettingsData({
  accountInfo,
  authUser,
}: Readonly<{
  accountInfo?: AccountInfoResponse | null;
  authUser: AuthUser;
}>): ProfileSettingsData {
  const enrollment = accountInfo?.enrollment;
  const stepState = getResolvedStepState(accountInfo);
  const completedSteps = countCompletedSteps(stepState);
  const documentMap = getDocumentMap(enrollment?.documents);
  const allDocuments = Object.values(documentMap).flat();
  const approvedDocumentsCount = getApprovedDocumentCount(allDocuments);
  const pendingDocumentsCount = getPendingDocumentCount(allDocuments);
  const requiredConsents = (enrollment?.consent ?? []).filter(
    (consent) => consent.required,
  );
  const acceptedRequiredConsentsCount = requiredConsents.filter(
    (consent) => consent.accepted,
  ).length;
  const hasAllRequiredConsents =
    requiredConsents.length > 0 &&
    acceptedRequiredConsentsCount === requiredConsents.length;
  const email =
    readText(enrollment?.contact?.email) ||
    readText(accountInfo?.user?.email) ||
    readText(authUser.email);
  const phone = formatPhoneLabel(enrollment?.contact?.phoneNumber);
  const enrollmentStatus =
    toStatusLabel(accountInfo?.enrollmentStatus ?? enrollment?.status) ||
    fallbackSettings.accountFacts[3].value;

  return {
    accountFacts: [
      {
        ...fallbackSettings.accountFacts[0],
        value:
          accountInfo?.user?.id || authUser.id
            ? formatMemberId(accountInfo?.user?.id ?? authUser.id)
            : fallbackSettings.accountFacts[0].value,
      },
      {
        ...fallbackSettings.accountFacts[1],
        value: email || fallbackSettings.accountFacts[1].value,
      },
      {
        ...fallbackSettings.accountFacts[2],
        value: phone || fallbackSettings.accountFacts[2].value,
      },
      {
        ...fallbackSettings.accountFacts[3],
        value: enrollmentStatus || fallbackSettings.accountFacts[3].value,
      },
      {
        ...fallbackSettings.accountFacts[4],
        value: completedSteps || fallbackSettings.accountFacts[4].value,
      },
    ],
    description: fallbackSettings.description,
    preferences: [
      {
        ...fallbackSettings.preferences[0],
        enabled: Boolean(email),
      },
      {
        ...fallbackSettings.preferences[1],
        enabled:
          enrollment?.contact?.allowSMS ??
          fallbackSettings.preferences[1].enabled,
      },
      {
        ...fallbackSettings.preferences[2],
        enabled:
          pendingDocumentsCount > 0 || fallbackSettings.preferences[2].enabled,
      },
      {
        ...fallbackSettings.preferences[3],
        enabled: Boolean(stepState) || fallbackSettings.preferences[3].enabled,
      },
    ],
    securityItems: [
      {
        ...fallbackSettings.securityItems[0],
        description:
          requiredConsents.length > 0
            ? hasAllRequiredConsents
              ? "All required consents accepted for this profile."
              : "Some required consents are still pending."
            : fallbackSettings.securityItems[0].description,
        statusLabel:
          requiredConsents.length > 0
            ? `${acceptedRequiredConsentsCount}/${requiredConsents.length} Accepted`
            : fallbackSettings.securityItems[0].statusLabel,
        tone:
          requiredConsents.length > 0
            ? hasAllRequiredConsents
              ? "good"
              : "warn"
            : "neutral",
      },
      {
        ...fallbackSettings.securityItems[1],
        description:
          pendingDocumentsCount > 0
            ? "Pending document reviews may require follow-up."
            : "No pending document reviews at the moment.",
        statusLabel:
          pendingDocumentsCount > 0
            ? `${pendingDocumentsCount} Pending`
            : `${approvedDocumentsCount} Approved`,
        tone: pendingDocumentsCount > 0 ? "warn" : "good",
      },
      {
        ...fallbackSettings.securityItems[2],
        description: enrollment
          ? "Account is active and connected to enrollment data."
          : "Account is active, but enrollment has not been started yet.",
        statusLabel: enrollment ? "Active" : "Limited",
        tone: enrollment ? "good" : "neutral",
      },
    ],
    title: fallbackSettings.title,
  };
}

export function buildProfileViewData({
  accountInfo,
  authUser,
}: BuildProfileViewDataArgs): ProfileViewData {
  const userName = readText(accountInfo?.user?.name) || readText(authUser.name);
  const enrollmentName =
    buildFullName([
      accountInfo?.enrollment?.personalInfo?.firstName,
      accountInfo?.enrollment?.personalInfo?.middleName,
      accountInfo?.enrollment?.personalInfo?.lastName,
    ]) || readText(accountInfo?.enrollment?.personalInfo?.preferredName);
  const name = enrollmentName || userName || fallbackCopy.name;
  const statusLabel =
    toStatusLabel(accountInfo?.enrollment?.status) || fallbackCopy.memberStatus;
  const createdAtLabel = formatDateLabel(authUser.createdAt);
  const memberSince = createdAtLabel
    ? `Member since ${createdAtLabel}`
    : fallbackCopy.memberSince;
  const location =
    resolveLocation(accountInfo) || fallbackDetails[1]?.value || "";
  const birthDateLabel =
    formatDateLabel(accountInfo?.enrollment?.personalInfo?.dateOfBirth) ||
    fallbackDetails[2]?.value.replace("Born: ", "");
  const details: ProfileDetail[] = [
    {
      iconSrc: fallbackDetails[0]?.iconSrc ?? "/icons/profile/member.svg",
      value:
        accountInfo?.user?.id || authUser.id
          ? formatMemberId(accountInfo?.user?.id ?? authUser.id)
          : fallbackDetails[0]?.value,
    },
    {
      iconSrc: fallbackDetails[1]?.iconSrc ?? "/icons/profile/location.svg",
      value: location || fallbackDetails[1]?.value,
    },
    {
      iconSrc: fallbackDetails[2]?.iconSrc ?? "/icons/profile/calendar.svg",
      value: birthDateLabel
        ? `Born: ${birthDateLabel}`
        : fallbackDetails[2]?.value,
    },
  ];
  const lineageEntries = mapLineageEntries(accountInfo);
  const totalDocuments = getDocumentCount(accountInfo?.enrollment?.documents);
  const yearsTraced = getYearsTraced(lineageEntries);
  const lineageStats: ProfileLineageStat[] = [
    {
      ...fallbackLineageStats[0],
      value: String(lineageEntries.length),
    },
    {
      ...fallbackLineageStats[1],
      value:
        totalDocuments > 0
          ? String(totalDocuments)
          : fallbackLineageStats[1].value,
    },
    {
      ...fallbackLineageStats[2],
      value: yearsTraced ?? fallbackLineageStats[2].value,
    },
  ];

  return {
    activityData: mapActivityData({ accountInfo, authUser }),
    copy: {
      memberSince,
      memberStatus: statusLabel,
      name,
      portraitSrc: fallbackCopy.portraitSrc,
    },
    details,
    lineageTreeData: fallbackLineageTree,
    lineageEntries,
    lineageStats,
    overviewData: mapOverviewData(accountInfo),
    yucayekeData: mapYucayekeData(accountInfo),
    documentsData: mapDocumentsData(accountInfo),
    settingsData: mapSettingsData({ accountInfo, authUser }),
    regionalMembers: fallbackRegionalMembers,
  };
}
