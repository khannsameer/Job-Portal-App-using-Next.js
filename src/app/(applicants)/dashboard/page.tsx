import { logoutUserAction } from "@/features/server/auth.actions";
import React from "react";

const ApplicantDashboard = () => {
  return (
    <div>
      <h1>applicant</h1>
      <button onClick={logoutUserAction}>Logout</button>
    </div>
  );
};

export default ApplicantDashboard;
