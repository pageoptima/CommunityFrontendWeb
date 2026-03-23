const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

export const endpoints = {
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
    STEP_2_MATERNAL_LINEAGE: normalizePath("/enrollment/step2"),
  },
} as const;
