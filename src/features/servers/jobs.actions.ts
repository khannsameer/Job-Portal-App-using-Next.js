"use server";

import { db } from "@/config/db";
import { JobFormData, jobSchema } from "../employers/jobs/jobs.schema";
import { jobs } from "@/drizzle/schema";
import { getCurrentUser } from "../server/auth.queries";
import { and, eq } from "drizzle-orm";

export const createJobAction = async (data: JobFormData) => {
  try {
    const { success, data: result, error } = jobSchema.safeParse(data);
    if (!success) {
      console.log("❌ ZOD ERRORS:", error.flatten());
      console.log("❌ RECEIVED DATA:", data);

      return {
        status: "ERROR",
        message: error.issues[0].message,
      };
    }

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized" };
    }

    await db.insert(jobs).values({ ...result, employerId: currentUser.id });
    return { status: "SUCCESS", message: "Job posted successfully" };

    // console.log("server job post data: ", data);
    // console.log("server job post data 2: ", result);
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};

// Replace 'JobFormValues' with your Zod schema type
export const updateJobAction = async (jobId: number, values: any) => {
  try {
    const currentUser = await getCurrentUser();

    // Security check
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized" };
    }

    // Perform the Update
    await db
      .update(jobs)
      .set({
        ...values,
        updatedAt: new Date(), // Always update the timestamp
      })
      .where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));

    // Refresh the jobs list page so the new data shows up immediately
    // revalidatePath("/employer-dashboard/jobs");

    return { status: "SUCCESS", message: "Job updated successfully" };
  } catch (error) {
    return { status: "ERROR", message: "Failed to update job" };
  }
};
