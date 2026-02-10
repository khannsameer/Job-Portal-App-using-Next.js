import EmployerProfileCompletionStatus from "@/features/employers/components/employer-profile-Status";
import StatsCard from "@/features/employers/components/employer-stats";
import { getCurrentUser } from "@/features/server/auth.queries";
import { redirect } from "next/navigation";

const EmployerDashboard = async () => {
  const user = await getCurrentUser();
  //   console.log("users data employer", user);

  if (!user) return redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Hello, <span className="capitalize">{user?.name.toLowerCase()}</span>
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activities and application
        </p>
      </div>

      <StatsCard />
      <EmployerProfileCompletionStatus />
    </div>
  );
};

export default EmployerDashboard;
