"use client";

import { logoutUserAction } from "@/features/server/auth.actions";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Plus,
  Briefcase,
  Bookmark,
  CreditCard,
  Building,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  name: string;
  icon: React.ElementType;
  href: string;
};

// base URL
const base = "/dashboard";

const navigationItems: NavigationItem[] = [
  { name: "Home", icon: LayoutDashboard, href: base + "/" },
  { name: "Find Jobs", icon: User, href: base + "/find-jobs" },
  { name: "Applied", icon: Plus, href: base + "/applications" },
  { name: "Saved Jobs", icon: Bookmark, href: base + "/saved-jobs" },
  { name: "Settings", icon: Settings, href: base + "/settings" },
];

const ApplicantSidebar = () => {
  const pathname = usePathname();
  // console.log("pathname", pathname);

  function isLinkActive(href: string) {
    const normalizedPathname = pathname.replace(/\/$/, "");
    const normalizedHref = href.replace(/\/$/, "");

    // Overview (base route) → exact match only
    if (normalizedHref === base) {
      return normalizedPathname === base;
    }

    // All other routes → exact match only
    return normalizedPathname === normalizedHref;
  }

  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Applicant Dashboard
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                active
                  ? "bg-blue-300 text-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  active ? "text-black" : "text-muted-foreground",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={logoutUserAction}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Log-out
        </button>
      </div>
    </div>
  );
};

export default ApplicantSidebar;
