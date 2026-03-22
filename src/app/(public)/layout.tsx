import type { ReactNode } from "react";

import { PublicNavbar } from "@/components/layout/public-navbar";

type PublicLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}
