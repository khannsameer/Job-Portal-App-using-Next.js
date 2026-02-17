import { logoutUserAction } from "@/features/server/auth.actions";

const ApplicantDashboard = async () => {
  return (
    <div>
      <h1>Hello Applicant</h1>
      <button onClick={logoutUserAction}>Logout</button>
    </div>
  );
};

export default ApplicantDashboard;
