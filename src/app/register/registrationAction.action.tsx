"use server";

import { db } from "@/config/db";
import { applicants, employers, users } from "@/drizzle/schema";
import {
  RegisterUserData,
  registerUserSchema,
} from "@/features/auth/auth.schema";
import { createSessionAndSetCookies } from "@/features/server/use-cases/sessions";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";

export const registrationAction = async (
  registrationData: RegisterUserData,
) => {
  try {
    const { data, error } = registerUserSchema.safeParse(registrationData);
    if (error) return { status: "ERROR", message: error.issues[0].message };
    const { name, userName, email, password, role } = data;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email === email)
        return {
          status: "ERROR",
          message: "Email Already Exists",
        };
      else
        return {
          status: "ERROR",
          message: "UserName Already Exists",
        };
    }

    const hashPassword = await argon2.hash(password);

    await db.transaction(async (tx) => {
      const [result] = await tx
        .insert(users)
        .values({ name, userName, email, password: hashPassword, role });

      if (role === "applicant") {
        await tx.insert(applicants).values({ id: result.insertId });
      } else {
        await tx.insert(employers).values({ id: result.insertId });
      }
      await createSessionAndSetCookies(result.insertId, tx);
    });

    return {
      status: "SUCCESS",
      message: "Registration Completed Successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};
