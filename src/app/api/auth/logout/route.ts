import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, AUTH_PROFILE_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const cookieOptions = {
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };

  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...cookieOptions,
    httpOnly: true,
  });
  response.cookies.set(AUTH_PROFILE_COOKIE_NAME, "", cookieOptions);

  return response;
}
