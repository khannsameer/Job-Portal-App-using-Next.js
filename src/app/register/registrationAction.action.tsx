"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";

export const registrationAction = async (registrationData: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}) => {
  const { name, userName, email, password, role } = registrationData;

  const hashPassword = await argon2.hash(password);

  await db
    .insert(users)
    .values({ name, userName, email, password: hashPassword, role });
};
