import { ApplicantProfileStatus } from "@/features/applicants/components/applicant-profile-status";
import { ApplicantStats } from "@/features/applicants/components/applicant-stats";
import { RecentApplications } from "@/features/applicants/components/recent-applications";
import { getCurrentUser } from "@/features/server/auth.queries";
import { redirect } from "next/navigation";

const ApplicantDashboard = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

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
      {/* stats row */}
      <ApplicantStats />

      {/* alert banner */}
      <ApplicantProfileStatus />

      {/* 3. Recently Applied Table */}
      <RecentApplications />
    </div>
  );
};

export default ApplicantDashboard;
