"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Globe,
  MapPin,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const organizationTypeOptions = ["development", "business", "design"] as const;
type OrganizationType = (typeof organizationTypeOptions)[number];

const teamSizeOptions = ["1-5", "6-20", "21-50"] as const;
type TeamSize = (typeof teamSizeOptions)[number];

interface IFormInput {
  username: string;
  email: string;
  name: string;
  description: string;
  yearOfEstablishment: number;
  location: string;
  websiteUrl: string;
  organizationType: OrganizationType;
  teamSize: TeamSize;
}

const EmployerSettingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleFormSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <Card className="w-3/4">
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="companyName"
                type="text"
                placeholder="Enter company name"
                className="pl-10"
                {...register("name")}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Company Description *</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="description"
                placeholder="Tell us about your company, what you do, and your mission ... "
                className="pl-10 min-h-30 resize-none "
                {...register("description")}
              />
            </div>
          </div>

          {/* Organization Type and Team size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="organizationType">Organization Type *</Label>
              <Controller
                name="organizationType"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-10 w-full ">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {/* {capitalizeWords(type)} */}
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            {/* Team size */}
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size *</Label>
              <Controller
                name="teamSize"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground Z-10" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-10 w-full ">
                        <SelectValue placeholder="Select Team Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {/* {capitalizeWords(type)} */}
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </div>
          {/* Year of Establishment  - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="yearOfEstablishment">
                Year of Establishment *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="yearOfEstablishment"
                  type="text"
                  placeholder="e.g., 2020"
                  maxLength={4}
                  className="pl-10"
                  {...register("yearOfEstablishment")}
                />
              </div>
            </div>

            {/*  Location - Two columns */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., 2020"
                  maxLength={4}
                  className="pl-10"
                  {...register("location")}
                />
              </div>
            </div>
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="websiteUrl"
                type="text"
                placeholder="https://ww.yourcompany.com"
                className="pl-10"
                {...register("websiteUrl")}
              />
            </div>
          </div>

          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployerSettingForm;
