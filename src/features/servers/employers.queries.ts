import { db } from "@/config/db";
import { getCurrentUser } from "../server/auth.queries";
import { employers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getCurrentEmployerDetails = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;
  if (currentUser.role !== "employer") return null;

  const [employer] = await db
    .select()
    .from(employers)
    .where(eq(employers.id, currentUser.id));

  if (!employer) {
    return {
      ...currentUser,
      employerDetails: null,
      isProfileCompleted: false,
    };
  }
  // console.log(employer);
  const isProfileCompleted = Boolean(
    employer?.name?.trim() &&
    employer?.description?.trim() &&
    employer?.organizationType &&
    employer?.yearOfEstablishment !== null,
  );

  return { ...currentUser, employerDetails: employer, isProfileCompleted };
};
