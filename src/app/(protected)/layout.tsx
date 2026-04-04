import type { ReactNode } from "react";

import { PublicFooter } from "@/components/layout/public-footer";
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
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f8fbfb_0%,#eef6f3_100%)]">
      <ProtectedNavbar user={user} />
      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
