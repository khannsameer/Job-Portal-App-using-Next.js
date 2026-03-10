"use server";

import { db } from "@/config/db";
import { eq, count } from "drizzle-orm";
import { getCurrentUser } from "@/features/server/auth.queries";
import { jobApplications, jobAlerts, savedJobs } from "@/drizzle/schema";

export const getApplicantStats = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  // Applied Jobs
  const [appliedCount] = await db
    .select({ total: count() })
    .from(jobApplications)
    .where(eq(jobApplications.applicantId, user.id));

  // Saved Jobs
  const [savedCount] = await db
    .select({ total: count() })
    .from(savedJobs)
    .where(eq(savedJobs.applicantId, user.id));

  // Job Alerts
  const [alertsCount] = await db
    .select({ total: count() })
    .from(jobAlerts)
    .where(eq(jobAlerts.userId, user.id));

  return {
    applied: appliedCount?.total ?? 0,
    saved: savedCount?.total ?? 0,
    alerts: alertsCount?.total ?? 0,
  };
};
