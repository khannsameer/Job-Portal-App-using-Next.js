"use client";

import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { applicantNavItems } from "@/config/constant";
import { logoutUserAction } from "@/features/server/auth.actions";
import { isActiveLink } from "@/lib/navigation-uitls";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const ApplicantSidebar = () => {
  const pathname = usePathname();
  // console.log("pathname: ", pathname);

  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
      <div className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Applicant Dashboard
        </h2>
      </div>

      <nav className="px-3 space-y-1">
        {applicantNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActiveLink(pathname, item.href, item.exact);

          // console.log("pathname:   item.href ", item.href);

          return (
            <Link
              key={item.name}
              href={item.href || "#"}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                active
                  ? "text-primary bg-primary/10" // Note: bg-blue-300 might be too dark, added opacity or stick to your class
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all w-full">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-md rounded-2xl">
            <AlertDialogHeader className="flex flex-col items-center text-center gap-2">
              <AlertDialogTitle className="text-lg font-semibold">
                Log out of your account?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-sm text-muted-foreground">
                You will be signed out and need to log in again to access your
                dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-4 flex gap-2">
              <AlertDialogCancel className="rounded-lg">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={() => logoutUserAction()}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Log out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ApplicantSidebar;
