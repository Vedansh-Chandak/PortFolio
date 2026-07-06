import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { experienceSchema } from "../schema/experience.schema";

const defaultValues = {
  company: "",
  role: "",
  duration: "",
  description: "",
  tech: "",
};

export default function ExperienceForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSaving = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (initialData) {
      reset({
        company: initialData.company ?? "",
        role: initialData.role ?? "",
        duration: initialData.duration ?? "",
        description: initialData.description ?? "",
        tech: Array.isArray(initialData.tech)
          ? initialData.tech.join(", ")
          : "",
      });
      return;
    }

    reset(defaultValues);
  }, [initialData, open, reset]);

  const submit = (values) => {
    onSubmit({
      company: values.company.trim(),
      role: values.role.trim(),
      duration: values.duration.trim(),
      description: values.description.trim(),
      tech: values.tech
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogDescription>
            Capture a company role, duration, description, and the technologies used.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Company
              </label>
              <Input placeholder="Acme Inc." {...register("company")} />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Role
              </label>
              <Input placeholder="Frontend Engineer" {...register("role")} />
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200">
              Duration
            </label>
            <Input placeholder="Jan 2023 - Present" {...register("duration")} />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200">
              Description
            </label>
            <Textarea
              rows={5}
              placeholder="Describe the role, responsibilities, and impact."
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200">
              Tech (comma separated)
            </label>
            <Input placeholder="React, Node.js, PostgreSQL" {...register("tech")} />
            {errors.tech && (
              <p className="mt-1 text-sm text-red-500">{errors.tech.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : initialData ? "Update Experience" : "Create Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}