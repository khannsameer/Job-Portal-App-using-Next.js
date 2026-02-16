interface EditJobPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { jobId } = await params;

  const numericJobId = Number(jobId);

  if (Number.isNaN(numericJobId)) {
    throw new Error("Invalid job ID");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Edit Job</h1>
      <p>Editing job with ID: {numericJobId}</p>
    </div>
  );
}
