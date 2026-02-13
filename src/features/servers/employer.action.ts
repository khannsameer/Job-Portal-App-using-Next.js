"use server";

import { db } from "@/config/db";
import { getCurrentUser } from "../server/auth.queries";
import { employers } from "@/drizzle/schema";
import { EmployerProfileData } from "../employers/employers.schema";
import { eq } from "drizzle-orm";

interface IFormInput {
  username: string;
  email: string;
  name: string;
  description: string;
  yearOfEstablishment: string;
  organizationType: string;
  teamSize: string;
  websiteUrl: string;
  location: string;
}

export async function updateEmployerProfileAction(data: IFormInput) {
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
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
        location,
        websiteUrl,
        organizationType,
        teamSize,
      })
      .where(eq(employers.id, currentUser.id));
    console.log("employers", updatedEmployer);

    return { status: "SUCCESS", message: "Profile update successfully" };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, Please try again",
    };
  }
}
