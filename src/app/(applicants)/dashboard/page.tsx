import { ApplicantProfileStatus } from "@/features/applicants/components/applicant-profile-status";
import { ApplicantStats } from "@/features/applicants/components/applicant-stats";
import { RecentApplications } from "@/features/applicants/components/recent-applications";
import { getCurrentUser } from "@/features/server/auth.queries";
import { getApplicantStats } from "@/features/applicants/queries/applicant-stats.query";
import { redirect } from "next/navigation";
import { getAppliedJobsForApplicant } from "@/features/applicants/server/applicant.queries";

const ApplicantDashboard = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  // Fetch stats
  const stats = await getApplicantStats();

  // Fetch recent applied jobs
  const appliedJobs = await getAppliedJobsForApplicant(user.id);

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Hello, <span className="capitalize">{user.name}</span>
        </h1>
        <p className="text-gray-500">
          Here is your daily activities and job alerts
        </p>
      </div>

      {/* Stats Row */}
      <ApplicantStats
        applied={stats?.applied ?? 0}
        saved={stats?.saved ?? 0}
        alerts={stats?.alerts ?? 0}
      />

      {/* Profile Completion Banner */}
      <ApplicantProfileStatus />

      {/* Recently Applied Table */}
      <RecentApplications applications={appliedJobs} />
    </div>
  );
};

export default ApplicantDashboard;
