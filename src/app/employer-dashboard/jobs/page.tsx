import { JobForm } from "@/features/employers/components/employer-job-form";

const Jobs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-5 text-2xl font-bold tracking-tight">Post a New Job</h1>
      <JobForm />
    </div>
  );
};

export default Jobs;
