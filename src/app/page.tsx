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
        {/* HERO SECTION */}
        <section className="relative bg-linear-to-br from-blue-50 via-white to-purple-50 py-24 lg:py-32 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Find a job that matches <br />
              <span className="text-blue-600">your passion & skills</span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Explore thousands of opportunities from top companies and build
              your dream career today.
            </p>

            {/* SEARCH BAR */}
            <form
              action="/jobs"
              method="GET"
              className="max-w-3xl mx-auto bg-white rounded-full shadow-xl flex items-center overflow-hidden border"
            >
              <div className="flex-1 flex items-center px-5">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  name="search"
                  placeholder="Job title, keyword..."
                  className="border-0 focus-visible:ring-0 shadow-none text-base"
                />
              </div>

              <Button
                type="submit"
                className="rounded-full px-8 m-2 bg-black hover:bg-gray-800"
              >
                Search Jobs
              </Button>
            </form>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Jobs Posted", value: "10K+" },
              { label: "Companies", value: "2K+" },
              { label: "Candidates", value: "15K+" },
              { label: "Success Rate", value: "95%" },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold text-blue-600">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED JOBS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Jobs
              </h2>

              <a href="/jobs" className="text-blue-600 text-sm font-medium">
                View all →
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map(({ job, employer }) => (
                <JobCard
                  key={job.id}
                  job={{
                    ...job,
                    companyName: employer?.name ?? null,
                    companyLogo: null,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white text-center">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to take the next step?
            </h2>

            <p className="mb-8 text-gray-300">
              Create your profile and start applying to top jobs today.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">
                Get Started
              </Button>

              <Button
                variant="ghost"
                className="border-white/40 text-white hover:bg-white/20 rounded-full px-6 backdrop-blur-sm"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
