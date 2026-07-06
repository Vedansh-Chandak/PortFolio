import { useEffect, useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { projectSchema } from "../schema/project.schema";

const defaultValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  status: "Live",
  coverImageUrl: "",
  coverImagePublicId: "",
  features: "",
  tech: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  sortOrder: 0,
};

function slugifyTitle(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSaving = false,
}) {
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const title = watch("title");
  const slugPreview = useMemo(
    () => (title ? slugifyTitle(title) : initialData?.slug || ""),
    [initialData?.slug, title]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    if (initialData) {
      reset({
        title: initialData.title ?? "",
        slug: initialData.slug ?? "",
        shortDescription: initialData.shortDescription ?? "",
        description: initialData.description ?? "",
        status: initialData.status ?? "Live",
        coverImageUrl: initialData.coverImageUrl ?? "",
        coverImagePublicId: initialData.coverImagePublicId ?? "",
        features: Array.isArray(initialData.features)
          ? initialData.features.join(", ")
          : "",
        tech: Array.isArray(initialData.tech) ? initialData.tech.join(", ") : "",
        githubUrl: initialData.githubUrl ?? "",
        liveUrl: initialData.liveUrl ?? "",
        featured: Boolean(initialData.featured),
        sortOrder: initialData.sortOrder ?? 0,
      });
      setPreviewUrl(initialData.coverImageUrl ?? "");
      setCoverImageFile(null);
      return;
    }

    reset(defaultValues);
    setPreviewUrl("");
    setCoverImageFile(null);
  }, [initialData, open, reset]);

  useEffect(() => {
    if (!coverImageFile) {
      return undefined;
    }

    const objectUrl = URL.createObjectURL(coverImageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [coverImageFile]);

  const submit = (values) => {
    onSubmit({
      ...values,
      slug: slugPreview,
      features: values.features,
      tech: values.tech,
      coverImageFile,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            Manage project metadata, upload a cover image, and mark featured work.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="title" className="mb-2 block text-zinc-200">
                Title
              </Label>
              <Input id="title" placeholder="Portfolio CMS" {...register("title")} />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-zinc-200">Slug</Label>
              <Input value={slugPreview} readOnly />
            </div>
          </div>

          <div>
            <Label htmlFor="shortDescription" className="mb-2 block text-zinc-200">
              Short Description
            </Label>
            <Input
              id="shortDescription"
              placeholder="A concise summary of the project"
              {...register("shortDescription")}
            />
            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-500">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block text-zinc-200">
              Description
            </Label>
            <Textarea
              id="description"
              rows={6}
              placeholder="Describe the project in detail"
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label className="mb-2 block text-zinc-200">Status</Label>
              <select
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                {...register("status")}
              >
                <option value="Live">Live</option>
                <option value="In Progress">In Progress</option>
                <option value="Archived">Archived</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-zinc-200">Sort Order</Label>
              <Input type="number" min="0" {...register("sortOrder")} />
              {errors.sortOrder && (
                <p className="mt-1 text-sm text-red-500">{errors.sortOrder.message}</p>
              )}
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-700 bg-transparent text-emerald-500"
                  {...register("featured")}
                />
                Featured Project
              </label>
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-zinc-200">Cover Image</Label>
            <div className="grid gap-4 lg:grid-cols-[1fr_160px] lg:items-start">
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setCoverImageFile(event.target.files?.[0] || null)}
                />
                <p className="text-xs text-zinc-500">
                  Uploads through the existing backend Cloudinary endpoint.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Project preview"
                    className="h-28 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-28 items-center justify-center rounded-md bg-zinc-950 text-xs text-zinc-500">
                    No cover image
                  </div>
                )}
              </div>
            </div>
            <input type="hidden" {...register("coverImageUrl")} />
            <input type="hidden" {...register("coverImagePublicId")} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <Label className="mb-2 block text-zinc-200">
                Features
              </Label>
              <Textarea
                rows={5}
                placeholder="Authentication, analytics, CMS integrations"
                {...register("features")}
              />
              <p className="mt-1 text-xs text-zinc-500">
                Separate items with commas or new lines.
              </p>
            </div>

            <div>
              <Label className="mb-2 block text-zinc-200">
                Tech Stack
              </Label>
              <Textarea
                rows={5}
                placeholder="React, Node.js, PostgreSQL"
                {...register("tech")}
              />
              <p className="mt-1 text-xs text-zinc-500">
                Separate items with commas or new lines.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block text-zinc-200">GitHub URL</Label>
              <Input placeholder="https://github.com/..." {...register("githubUrl")} />
              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-500">{errors.githubUrl.message}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-zinc-200">Live URL</Label>
              <Input placeholder="https://example.com" {...register("liveUrl")} />
              {errors.liveUrl && (
                <p className="mt-1 text-sm text-red-500">{errors.liveUrl.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : initialData ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}