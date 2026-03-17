import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/db";
import { employers, jobs, users } from "@/drizzle/schema";
import { JobCard } from "@/features/employers/jobs/components/jobCards";
import { desc, eq } from "drizzle-orm";
import { Search } from "lucide-react";

async function getFeaturedJobs() {
  return await db
    .select({
      job: jobs,
      employer: employers,
      user: users,
    })
    .from(jobs)
    .leftJoin(employers, eq(jobs.employerId, employers.id))
    .leftJoin(users, eq(employers.id, users.id))
    .orderBy(desc(jobs.createdAt))
    .limit(6);
}

export default async function Home() {
  const featuredJobs = await getFeaturedJobs();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="bg-gray-50 py-20 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Find a job that suits <br className="hidden md:block" />
              your interest & skills.
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Discover thousands of job opportunities with top companies. Your
              next career move starts right here.
            </p>

            <form
              action="/jobs"
              method="GET"
              className="max-w-3xl mx-auto bg-white p-2 rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2 border"
            >
              <div className="flex-1 flex items-center pl-4 w-full">
                <Search className="w-5 h-5 text-gray-400" />

                <Input
                  name="search"
                  type="text"
                  placeholder="Job title, keyword ..."
                  className="border-0 focus-visible:ring-0 shadow-none text-base"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8"
              >
                Search Jobs
              </Button>
            </form>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-semibold mb-6">Featured Jobs</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map(({ job, employer }) => (
                <JobCard
                  key={job.id}
                  job={{
                    ...job,
                    companyName: employer?.name ?? null,
                    companyLogo: null, // no error
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
