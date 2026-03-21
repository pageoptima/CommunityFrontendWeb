const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const env = {
  apiBaseUrl: apiBaseUrl ?? "",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;
