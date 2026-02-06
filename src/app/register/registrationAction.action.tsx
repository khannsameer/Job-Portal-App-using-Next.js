"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";

export const registrationAction = async (registrationData: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}) => {
  const { name, userName, email, password, role } = registrationData;

  await db.insert(users).values({ name, userName, email, password, role });
};
