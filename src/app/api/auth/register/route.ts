import { NextResponse } from "next/server";

import {
  type AuthRegisterRequest,
  type AuthSessionResponse,
  normalizeEmail,
  normalizeNamePart,
  toAuthUser,
} from "@/lib/auth";
import { endpoints } from "@/services/http/apis";
import { apiConnector } from "@/services/http/client";

import { issueAuthSession, mapAuthErrorResponse } from "../_shared";

type JwtPayload = Readonly<{
  email?: string;
  name?: string;
  role?: string;
  sub?: string;
}>;

type RegisterBackendUser = Partial<AuthSessionResponse["user"]> & {
  _id?: string;
  password?: string;
  userId?: string;
};

type RegisterBackendResponse = {
  accessToken?: string;
  data?: {
    accessToken?: string;
    user?: RegisterBackendUser;
  };
  user?: RegisterBackendUser;
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

function decodeJwtPayload(token: string) {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(payload)) as JwtPayload;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function pickAccessToken(payload: RegisterBackendResponse) {
  return payload.accessToken ?? payload.data?.accessToken;
}

function pickBackendUser(payload: RegisterBackendResponse) {
  if (payload.user) {
    return payload.user;
  }

  if (payload.data?.user) {
    return payload.data.user;
  }

  const asRecord = payload as unknown;
  if (isRecord(asRecord)) {
    const maybeData = asRecord.data;

    if (isRecord(maybeData) && isRecord(maybeData.user)) {
      return maybeData.user as RegisterBackendUser;
    }
  }

  return undefined;
}

export async function POST(request: Request) {
  const body = (await request
    .json()
    .catch(() => null)) as Partial<AuthRegisterRequest> | null;

  if (!body?.name || !body?.email || !body?.password) {
    return NextResponse.json(
      { message: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  const name = normalizeNamePart(body.name);

  if (!name) {
    return NextResponse.json({ message: "Name is required." }, { status: 400 });
  }

  let payload: RegisterBackendResponse;

  try {
    payload = await apiConnector<RegisterBackendResponse>(
      "post",
      endpoints.AUTH.REGISTER,
      {
        name,
        email: normalizeEmail(body.email),
        password: body.password,
      },
    );
  } catch (error) {
    return mapAuthErrorResponse(
      error,
      "Unable to create your account. Please try again in a moment.",
    );
  }

  const accessToken = pickAccessToken(payload);

  if (!accessToken) {
    return NextResponse.json(
      {
        message:
          "Unable to create your account right now due to an invalid auth response.",
      },
      { status: 502 },
    );
  }

  const backendUser = pickBackendUser(payload);
  const tokenPayload = decodeJwtPayload(accessToken);

  const resolvedUser: AuthSessionResponse["user"] = toAuthUser({
    id:
      backendUser?.id ??
      backendUser?._id ??
      backendUser?.userId ??
      tokenPayload?.sub ??
      "unknown",
    name:
      backendUser?.name ??
      tokenPayload?.name ??
      body.name?.trim() ??
      tokenPayload?.email ??
      normalizeEmail(body.email),
    email:
      backendUser?.email ?? tokenPayload?.email ?? normalizeEmail(body.email),
    role: backendUser?.role ?? tokenPayload?.role ?? "USER",
    createdAt: backendUser?.createdAt,
    updatedAt: backendUser?.updatedAt,
  });

  return issueAuthSession(
    {
      accessToken,
      user: resolvedUser,
    },
    false,
    201,
  );
}
