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

type RegisterBackendUser = AuthSessionResponse["user"] & {
  password?: string;
};

type RegisterBackendResponse = {
  accessToken: string;
  user: RegisterBackendUser;
};

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

  return issueAuthSession(
    {
      accessToken: payload.accessToken,
      user: toAuthUser(payload.user),
    },
    false,
    201,
  );
}
