"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { applyJobSchema, ApplyJobSchema } from "../../apply-job.schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applyForJobAction } from "../actions/apply-job.action";

interface ApplyJobModalProps {
  jobId: number;
  jobTitle: string;
  hasApplied: boolean;
  resumes: { id: number; fileName: string }[];
}

export const ApplyJobModal = ({
  jobId,
  jobTitle,
  hasApplied,
  resumes,
}: ApplyJobModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyJobSchema>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      jobId: jobId,
      resumeId: resumes.length === 1 ? resumes[0].id : undefined,
      coverLetter: "",
    },
  });

  const onSubmit = async (data: ApplyJobSchema) => {
    try {
      const res = await applyForJobAction(data);
      if (res.status === "SUCCESS") {
        toast.success(res.message);
        setIsOpen(false);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  if (hasApplied) {
    return (
      <Button
        disabled
        className="w-full sm:w-auto bg-gray-100 text-gray-500 cursor-not-allowed"
      >
        Already Applied
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto gap-2">
          Apply Now <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Apply Job: {jobTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Resume Select */}
          <div className="space-y-2">
            <Label>
              Choose Resume <span className="text-destructive">*</span>
            </Label>

            {resumes.length === 0 ? (
              <p className="text-sm text-destructive">
                Please upload a resume in your profile settings first.
              </p>
            ) : (
              <Controller
                name="resumeId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? field.value.toString() : undefined}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      className={errors.resumeId ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Choose Resume" />
                    </SelectTrigger>

                    <SelectContent>
                      {resumes.map((resume) => (
                        <SelectItem
                          key={resume.id}
                          value={resume.id.toString()}
                        >
                          {resume.fileName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {errors.resumeId && (
              <p className="text-sm text-destructive">
                {errors.resumeId.message}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <Label>Cover Letter</Label>
            <Textarea
              {...register("coverLetter")}
              placeholder="Write a short cover letter for the employer..."
              className="min-h-37.5"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || resumes.length === 0}
              className="gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}

              {isSubmitting ? "Applying..." : "Apply Now"}

              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
