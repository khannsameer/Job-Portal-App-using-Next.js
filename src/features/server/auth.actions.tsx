"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { invalidDateSession } from "./use-cases/sessions";

import crypto from "crypto";

// logout user
export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return redirect("/login");

  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  await invalidDateSession(hashedToken);

  cookieStore.delete("session");

  return redirect("/login");
};
