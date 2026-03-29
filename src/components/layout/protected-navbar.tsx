"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Bell, ChevronDown, LogOut, Menu, ShieldCheck, X } from "lucide-react";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import { formatMemberId, type AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Profile", href: "/my-profile" },
  { label: "Yucayeke", href: "/yucayeke" },
  { label: "Community", href: "/community" },
  { label: "Services", href: "/services" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProtectedNavbar({ user }: Readonly<{ user: AuthUser }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLogoutError(null);
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      router.replace("/sign-in");
      router.refresh();
    } catch {
      setLogoutError("Unable to sign out right now. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="border-border/80 bg-surface/95 supports-backdrop-filter:bg-surface/85 flex items-center justify-between gap-4 rounded-full border px-4 py-3 shadow-[0_24px_60px_-38px_rgba(16,47,52,0.26)] backdrop-blur-xl">
          <Link href="/my-profile" className="shrink-0">
            <BrandMark compact />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-surface-muted text-[#3D3DA0]!"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              aria-label="Notifications"
              className="text-foreground hover:bg-surface focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex size-11 items-center justify-center rounded-full bg-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              type="button"
            >
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-[#ea384c]" />
            </button>

            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full px-2 py-1.5 outline-none [&::-webkit-details-marker]:hidden">
                <div className="relative flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#35d6c1_0%,#2b74d8_100%)] text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(43,116,216,0.8)]">
                  {getInitials(user.name)}
                  <span className="absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-full border-2 border-white bg-[#17a2b8] text-[10px] text-white">
                    <ShieldCheck className="size-2.5" />
                  </span>
                </div>

                <div className="text-left leading-tight">
                  <p className="text-foreground text-sm font-semibold">
                    {user.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Member ID: {formatMemberId(user.id)}
                  </p>
                </div>

                <ChevronDown className="text-muted-foreground size-4 transition-transform group-open:rotate-180" />
              </summary>

              <div className="border-border bg-surface absolute top-[calc(100%+0.75rem)] right-0 w-56 rounded-2xl border p-2 shadow-[0_24px_48px_-30px_rgba(16,47,52,0.38)]">
                <button
                  className="text-foreground hover:bg-surface-muted flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors"
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut className="size-4" />
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
                {logoutError ? (
                  <p className="px-3 py-2 text-xs leading-5 text-red-600">
                    {logoutError}
                  </p>
                ) : null}
              </div>
            </details>
          </div>

          <Button
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
            size="icon"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-border bg-surface mt-3 rounded-3xl border p-4 shadow-[0_24px_60px_-38px_rgba(16,47,52,0.26)] lg:hidden">
            <div className="border-border bg-surface-muted flex items-center gap-3 rounded-2xl border p-3">
              <div className="relative flex size-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#35d6c1_0%,#2b74d8_100%)] text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(43,116,216,0.8)]">
                {getInitials(user.name)}
                <span className="absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-full border-2 border-white bg-[#17a2b8] text-[10px] text-white">
                  <ShieldCheck className="size-2.5" />
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-semibold">
                  {user.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
            </div>

            <nav className="mt-4 grid gap-1">
              {navItems.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                      isActive
                        ? "bg-surface-muted text-[#3D3DA0]!"
                        : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Button
              className="mt-4"
              fullWidth
              variant="outline"
              onClick={handleLogout}
              loading={isLoggingOut}
              loadingText="Signing out..."
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
            {logoutError ? (
              <p className="mt-3 text-sm leading-6 text-red-600">
                {logoutError}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
