import { db } from "@/config/db";
import { getCurrentUser } from "../server/auth.queries";
import {
  applicants,
  employers,
  jobApplications,
  jobs,
  resumes,
  users,
} from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const getCurrentEmployerDetails = async () => {
  const currentUser = await getCurrentUser();
  // console.log("current users::", currentUser);

  if (!currentUser) return null;
  if (currentUser.role !== "employer") return null;

  const [employer] = await db
    .select()
    .from(employers)
    .where(eq(employers.id, currentUser.id));

  // console.log("Employer:::", employer);

  // if (!employer) {
  //   return {
  //     ...currentUser,
  //     employerDetails: null,
  //     isProfileCompleted: false,
  //   };
  // }
  // console.log(employer);
  const isProfileCompleted = Boolean(
    employer?.name?.trim() &&
    employer?.description?.trim() &&
    currentUser?.avatarUrl &&
    employer?.organizationType &&
    employer?.yearOfEstablishment !== null,
  );

  return { ...currentUser, employerDetails: employer, isProfileCompleted };
};

export async function getEmployerApplications(employerId: number) {
  const applications = await db
    .select({
      application: jobApplications,
      job: jobs,
      user: users,
      applicant: applicants,
      resume: resumes,
    })
    .from(jobApplications)
    // 1. Join Jobs to know WHICH job they applied for
    .innerJoin(jobs, eq(jobApplications.jobId, jobs.id))
    // 2. Join Users to get the applicant's Name, Email, and Avatar
    .innerJoin(users, eq(jobApplications.applicantId, users.id))
    // 3. Join Applicants for extra details (location, etc.)
    .leftJoin(applicants, eq(jobApplications.applicantId, applicants.id))
    // 4. Join Resumes to get the actual PDF file link
    .leftJoin(resumes, eq(jobApplications.resumeId, resumes.id))
    // 5. FILTER: Only show applications for jobs posted by THIS employer
    .where(eq(jobs.employerId, employerId))
    // 6. Sort: Newest applications first
    .orderBy(desc(jobApplications.appliedAt));

  return applications;
}
