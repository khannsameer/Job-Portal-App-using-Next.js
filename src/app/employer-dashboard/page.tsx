import { logoutUserAction } from "@/features/server/auth.actions";

const EmployerDashboard = () => {
  return (
    <div>
      <h1>Employer Dashboard</h1>
      <button onClick={logoutUserAction}>Logout</button>
    </div>
  );
};

export default EmployerDashboard;
