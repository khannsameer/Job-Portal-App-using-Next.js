"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";

type LoginData = {
  email: string;
  password: string;
};

export const loginUserAction = async (LoginData: LoginData) => {
  try {
    const { email, password } = LoginData;
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return { status: "ERROR", message: "Invalid Email or Password" };
    }
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return { status: "ERROR", message: "Invalid Email or Password" };
    }
    return { status: "SUCCESS", message: "Login Successful" };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};
