import { JobForm } from "@/features/employers/components/employer-job-form";
import { getJobByIdAction } from "@/features/servers/jobs.actions";
import { redirect } from "next/navigation";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  //  unwrap params (Next.js 15+ requirement)
  const { jobId } = await params;

  const numericJobId = Number(jobId);

  // Invalid ID → redirect
  if (isNaN(numericJobId)) {
    redirect("/employer-dashboard/jobslist");
  }

  // Fetch job data
  const { status, data: job } = await getJobByIdAction(numericJobId);
  // console.log("Job data after id:::", job);

  // If job doesn't exist → redirect
  if (status === "ERROR" || !job) {
    redirect("/employer-dashboard/jobslist");
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Job: {job.title}</h1>
      </div>

      <JobForm initialData={job} isEditMode />
    </div>
  );
}
