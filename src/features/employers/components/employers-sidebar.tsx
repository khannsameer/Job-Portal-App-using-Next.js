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
import { log } from "util";

const base = "/employer-dashboard";

const navigationItems = [
  { name: "Overview", icon: LayoutDashboard, href: base },
  { name: "Employers Profile", icon: User, href: base + "/profile" },
  { name: "Post a Job", icon: Plus, href: base + "/jobs/create" },
  { name: "My Jobs", icon: Briefcase, href: base + "/jobs" },
  { name: "Saved Candidate", icon: Bookmark, href: base + "/saved" },
  { name: "Plans & Billing", icon: CreditCard, href: base + "/billing" },
  { name: "All Companies", icon: Building, href: base + "/companies" },
  { name: "Settings", icon: Settings, href: base + "/settings" },
];

const EmployerSidebar = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  function isLinkActive(href: string) {
    if (!href) return false;

    const normalizedHref = href.replace(/\/$/, "");

    if (normalizedHref === base) {
      return pathname === base;
    }

    return pathname.startsWith(normalizedHref);
  }

  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Employers Dashboard
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

export default EmployerSidebar;
