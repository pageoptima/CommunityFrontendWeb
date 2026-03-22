import type { ReactNode } from "react";

import { PublicFooter } from "@/components/layout/public-footer";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { cn } from "@/lib/utils";

type SiteShellProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <PublicNavbar />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
