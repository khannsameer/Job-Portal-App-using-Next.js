"use server";

import { db } from "@/config/db";
import { getCurrentUser } from "../server/auth.queries";
import { employers } from "@/drizzle/schema";
import { EmployerProfileData } from "../employers/employers.schema";
import { eq } from "drizzle-orm";

export async function updateEmployerProfileAction(data: EmployerProfileData) {
  try {
    const currentUser = await getCurrentUser();
    console.log("Current User:", currentUser);
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized" };
    }

    const {
      name,
      description,
      yearOfEstablishment,
      location,
      websiteUrl,
      organizationType,
      teamSize,
    } = data;

    const updatedEmployer = await db
      .update(employers)
      .set({
        name,
        description,
        location,
        websiteUrl,
        organizationType,
        teamSize,
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
      })
      .where(eq(employers.id, currentUser.id));

    console.log("Updated Row:", updatedEmployer);

    return { status: "SUCCESS", message: "Profile update successfully" };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, Please try again",
    };
  }
}
