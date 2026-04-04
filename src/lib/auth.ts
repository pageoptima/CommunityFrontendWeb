export const AUTH_COOKIE_NAME = "community_auth_token";
export const AUTH_PROFILE_COOKIE_NAME = "community_auth_profile";
export const SIGN_IN_PATH = "/sign-in";
export const SIGN_UP_PATH = "/sign-up";
export const DEFAULT_POST_LOGIN_PATH = "/dashboard";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthLoginRequest = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthRegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthSessionResponse = {
  accessToken: string;
  user: AuthUser;
};

export type AuthLoginResponse = AuthSessionResponse;

type JwtPayload = {
  exp?: number;
  sub?: string;
  email?: string;
  role?: string;
  name?: string;
};

type CookieGetter = {
  get(name: string): { value: string } | undefined;
};

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4;
  const padded = padding
    ? `${normalized}${"=".repeat(4 - padding)}`
    : normalized;

  if (typeof globalThis.atob === "function") {
    return globalThis.atob(padded);
  }

  const nodeBuffer = globalThis.Buffer;

  if (nodeBuffer) {
    return nodeBuffer.from(padded, "base64").toString("utf8");
  }

  throw new Error("Unable to decode token payload.");
}

function decodeJwtPayload<T>(token: string): T | null {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(payload)) as T;
  } catch {
    return null;
  }
}

export function getTokenMaxAge(token: string) {
  const payload = decodeJwtPayload<JwtPayload>(token);

  if (!payload?.exp) {
    return undefined;
  }

  const remainingSeconds = payload.exp - Math.floor(Date.now() / 1000);
  return Math.max(remainingSeconds, 0);
}

export function encodeAuthProfile(user: AuthUser) {
  return encodeURIComponent(JSON.stringify(user));
}

export function parseAuthProfile(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(value)) as AuthUser;
  } catch {
    return null;
  }
}

export function formatMemberId(userId: string) {
  return `TN-${userId.replace(/-/g, "").slice(0, 4).toUpperCase()}`;
}

export function normalizeNamePart(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function toAuthUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function appendNextQuery(path: string, next?: string | null) {
  if (!next) {
    return path;
  }

  return `${path}?next=${encodeURIComponent(getSafeRedirectPath(next))}`;
}

function getUserFromToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const payload = decodeJwtPayload<JwtPayload>(token);

  if (!payload?.sub && !payload?.email) {
    return null;
  }

  const tokenUser: AuthUser = {
    id: payload.sub ?? "unknown",
    name: payload.name ?? payload.email ?? "Member",
    email: payload.email ?? "",
    role: payload.role ?? "USER",
  };

  return tokenUser;
}

export function getAuthenticatedUser(cookies: CookieGetter) {
  const tokenUser = getUserFromToken(cookies.get(AUTH_COOKIE_NAME)?.value);

  if (!tokenUser) {
    return null;
  }

  const profileUser = parseAuthProfile(
    cookies.get(AUTH_PROFILE_COOKIE_NAME)?.value,
  );

  if (!profileUser) {
    return tokenUser;
  }

  return {
    ...tokenUser,
    name: profileUser.name ?? tokenUser.name,
    createdAt: profileUser.createdAt ?? tokenUser.createdAt,
    updatedAt: profileUser.updatedAt ?? tokenUser.updatedAt,
  };
}

export function getSafeRedirectPath(value?: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_POST_LOGIN_PATH;
  }

  return value;
}
