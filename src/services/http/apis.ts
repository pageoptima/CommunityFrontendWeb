const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

export const endpoints = {
  ACCOUNT: {
    INFO: normalizePath("/account/info"),
  },
  EVENTS: {
    LIST: normalizePath("/events"),
  },
  PROFILE: {
    INFO: normalizePath("/profile"),
  },
  AUTH: {
    REGISTER: normalizePath("/auth/register"),
    LOGIN: normalizePath("/auth/login"),
  },
  CONSENT: {
    ACTIVE: normalizePath("/consent/active"),
    ACCEPT: normalizePath("/consent/accept"),
  },
  ENROLLMENT: {
    START: normalizePath("/enrollment/start"),
    STEP_1_PERSONAL_INFO: normalizePath("/enrollment/step1"),
    STEP_1_PERSONAL_INFO_UPSERT: normalizePath("/enrollment/step1/upsert"),
    STEP_2_MATERNAL_LINEAGE: normalizePath("/enrollment/step2"),
    STEP_2_MATERNAL_LINEAGE_UPSERT: normalizePath("/enrollment/step2/upsert"),
    STEP_3_CULTURAL_CONNECTION: normalizePath("/enrollment/step3"),
    STEP_3_CULTURAL_CONNECTION_LIST: normalizePath(
      "/enrollment/step3/cultural-connection-list",
    ),
    STEP_3_CULTURAL_CONNECTION_UPSERT: normalizePath(
      "/enrollment/step3/upsert",
    ),
  },
  DOCUMENT: {
    LIST: normalizePath("/document/list"),
    UPLOAD: normalizePath("/document/upload"),
  },
} as const;
