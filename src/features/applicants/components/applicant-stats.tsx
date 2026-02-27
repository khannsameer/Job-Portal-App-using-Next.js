import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Bookmark, Bell } from "lucide-react";

interface Props {
  applied: number;
  saved: number;
  alerts: number;
}

export const ApplicantStats = ({ applied, saved, alerts }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Applied Jobs */}
      <Card className="bg-blue-50 border-blue-100 shadow-sm">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{applied}</p>
            <p className="text-sm font-medium text-gray-500">Applied jobs</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* Saved Jobs */}
      <Card className="bg-orange-50 border-orange-100 shadow-sm">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{saved}</p>
            <p className="text-sm font-medium text-gray-500">Favorite jobs</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Bookmark className="h-6 w-6 text-orange-500" />
          </div>
        </CardContent>
      </Card>

      {/* Job Alerts */}
      <Card className="bg-green-50 border-green-100 shadow-sm">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{alerts}</p>
            <p className="text-sm font-medium text-gray-500">Job Alerts</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Bell className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
