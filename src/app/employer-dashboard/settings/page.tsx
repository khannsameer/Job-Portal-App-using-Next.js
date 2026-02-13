// "use server";

import EmployerSettingForm from "@/features/employers/components/employer-setting-form";
import { EmployerProfileData } from "@/features/employers/employers.schema";
import { getCurrentEmployerDetails } from "@/features/servers/employers.queries";
import { redirect } from "next/navigation";

const EmployerSettings = async () => {
  const currentEmployer = await getCurrentEmployerDetails();
  if (!currentEmployer) return redirect("/login");

  // console.log("Current Employer:", currentEmployer);

  return (
    <div>
      <EmployerSettingForm
        initialData={{
          name: currentEmployer.employerDetails?.name ?? "",
          description: currentEmployer.employerDetails?.description ?? "",
          organizationType: (currentEmployer.employerDetails
            ?.organizationType ??
            "") as EmployerProfileData["organizationType"],
          teamSize: (currentEmployer.employerDetails?.teamSize ??
            "") as EmployerProfileData["teamSize"],
          location: currentEmployer.employerDetails?.location ?? "",
          websiteUrl: currentEmployer.employerDetails?.websiteUrl ?? "",
          yearOfEstablishment:
            currentEmployer.employerDetails?.yearOfEstablishment?.toString() ??
            "",
        }}
      />
    </div>
  );
};

export default EmployerSettings;
