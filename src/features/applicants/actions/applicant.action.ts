"use server";

import { db } from "@/config/db";
import { applicants, resumes, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  applicantSettingsSchema,
  ApplicantSettingsSchema,
} from "../applicant-schema";
import { getCurrentUser } from "@/features/server/auth.queries";

export const createApplicantProfile = async (data: ApplicantSettingsSchema) => {
  try {
    // 1️ Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return { status: "ERROR", message: "Unauthorized" };
    }

    // 2️ Validate data using Zod
    const parsed = applicantSettingsSchema.safeParse(data);

    if (!parsed.success) {
      return {
        status: "ERROR",
        message: parsed.error.issues[0].message,
      };
    }

    const {
      name,
      phoneNumber,
      avatarUrl,
      location,
      dateOfBirth,
      nationality,
      gender,
      maritalStatus,
      education,
      experience,
      websiteUrl,
      biography,
      resumeUrl,
      resumeName,
      resumeSize,
    } = parsed.data;

    // 3️ Start Transaction
    await db.transaction(async (tx) => {
      //  Update users table (always update)
      await tx
        .update(users)
        .set({
          name,
          phoneNumber,
          avatarUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));

      //  UPSERT applicants table
      await tx
        .insert(applicants)
        .values({
          id: user.id,
          location,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          nationality,
          gender,
          maritalStatus,
          education,
          experience,
          websiteUrl,
          biography,
        })
        .onDuplicateKeyUpdate({
          set: {
            location,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            nationality,
            gender,
            maritalStatus,
            education,
            experience,
            websiteUrl,
            biography,
          },
        });

      //  UPSERT resume table (if resume exists)
      if (resumeUrl && resumeName) {
        await tx
          .insert(resumes)
          .values({
            applicantId: user.id,
            fileUrl: resumeUrl,
            fileName: resumeName,
            fileSize: resumeSize,
          })
          .onDuplicateKeyUpdate({
            set: {
              fileUrl: resumeUrl,
              fileName: resumeName,
              fileSize: resumeSize,
              updatedAt: new Date(),
            },
          });
      }
    });

    return {
      status: "SUCCESS",
      message: "Profile saved successfully!",
    };
  } catch (error) {
    console.error("CREATE / UPDATE PROFILE ERROR:", error);

    return {
      status: "ERROR",
      message: "Failed to save profile. Please try again.",
    };
  }
};
