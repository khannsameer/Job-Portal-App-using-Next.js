import { getJobById } from "@/features/employers/jobs/server/jobs.queries";
import { notFound } from "next/navigation";

interface EditJobPageProps {
  params: Promise<{ jobId: string }>;
}

const JobsDetailedPage = async ({ params }: EditJobPageProps) => {
  const { jobId } = await params;

  const parsedJobId = Number(jobId);

  if (isNaN(parsedJobId)) return notFound();

  const job = await getJobById(parsedJobId);

  console.log("job: ", job);

  if (!job) return notFound();

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6"></nav>

      {/* Job details */}
      <div>{parsedJobId}</div>
    </>
  );
};

export default JobsDetailedPage;
