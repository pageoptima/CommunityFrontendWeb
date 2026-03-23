import type { ReactNode } from "react";

import { ProtectedNavbar } from "@/components/layout/protected-navbar";
import { getRequiredSessionUser } from "@/lib/auth-session";

type ProtectedLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const user = await getRequiredSessionUser();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbfb_0%,#eef6f3_100%)]">
      <ProtectedNavbar user={user} />
      <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
