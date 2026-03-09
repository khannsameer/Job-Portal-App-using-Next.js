import Link from "next/link";
import { CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentApplicationsProps {
  applications: any[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  if (applications.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        You haven't applied to any jobs yet.
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <h3 className="font-semibold text-gray-900">Recently Applied</h3>

        <Link
          href="/dashboard/applied-jobs"
          className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="w-[40%] pl-6">Job</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map(({ application, job, employer }) => (
            <TableRow key={application.id} className="hover:bg-gray-50">
              {/* Job Info */}
              <TableCell className="pl-6 py-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                    {employer?.name?.slice(0, 2).toUpperCase() || "CO"}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {job.title}
                      </span>

                      {job.jobType && (
                        <Badge className="rounded-full px-2 py-0.5 text-[10px] font-normal border-0">
                          {job.jobType}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>

                      <span>
                        {job.minSalary} - {job.maxSalary} {job.salaryPeriod}
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Date */}
              <TableCell className="text-sm text-gray-500">
                {new Date(application.appliedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>

              {/* Status */}
              <TableCell>
                <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  {application.status}
                </div>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right pr-6">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
