"use server";

import { db } from "@/config/db";
import { eq, count } from "drizzle-orm";
import { getCurrentUser } from "@/features/server/auth.queries";
import { applications, jobAlerts, savedJobs } from "@/drizzle/schema";

export const getApplicantStats = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const [appliedCount] = await db
    .select({ total: count() })
    .from(applications)
    .where(eq(applications.applicantId, user.id));

  const [savedCount] = await db
    .select({ total: count() })
    .from(savedJobs)
    .where(eq(savedJobs.applicantId, user.id));

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
