import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

import ProjectForm from "@/features/projects/components/ProjectForm";
import ProjectTable from "@/features/projects/components/ProjectTable";
import DeleteProjectDialog from "@/features/projects/components/DeleteProjectDialog";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { useCreateProject } from "@/features/projects/hooks/useCreateProject";
import { useUpdateProject } from "@/features/projects/hooks/useUpdateProject";
import { useDeleteProject } from "@/features/projects/hooks/useDeleteProject";
import {
  serializeProject,
  uploadProjectImage,
} from "@/features/projects/api/projects.api";

function parseList(value) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function Projects() {
  const { data, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [uploading, setUploading] = useState(false);

  const errorToastRef = useRef("");

  const projects = data ?? [];
  const isSaving = createProject.isPending || updateProject.isPending || uploading;

  useEffect(() => {
    if (!error) {
      errorToastRef.current = "";
      return;
    }

    const message = error?.response?.data?.message || "Failed to load projects.";

    if (errorToastRef.current !== message) {
      toast.error(message);
      errorToastRef.current = message;
    }
  }, [error]);

  const openCreateForm = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProject(null);
  };

  const submitForm = async (values) => {
    try {
      setUploading(Boolean(values.coverImageFile));

      let coverImageData = {
        coverImageUrl: values.coverImageUrl,
        coverImagePublicId: values.coverImagePublicId,
      };

      if (values.coverImageFile) {
        coverImageData = await uploadProjectImage(values.coverImageFile);
      }

      const payload = serializeProject(
        {
          title: values.title,
          shortDescription: values.shortDescription,
          description: values.description,
          status: values.status,
          features: parseList(values.features),
          tech: parseList(values.tech),
          githubUrl: values.githubUrl,
          liveUrl: values.liveUrl,
          featured: values.featured,
          sortOrder: values.sortOrder,
          coverImageUrl: coverImageData.coverImageUrl,
          coverImagePublicId: coverImageData.coverImagePublicId,
        },
        coverImageData
      );

      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          payload,
        });
        toast.success("Project updated successfully.");
      } else {
        await createProject.mutateAsync(payload);
        toast.success("Project created successfully.");
      }

      closeForm();
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteProject.mutateAsync(deleteTarget.id);
      toast.success("Project deleted successfully.");
      setDeleteTarget(null);
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Projects</h1>
          <p className="mt-2 text-zinc-400">
            Manage featured work, live links, and project metadata.
          </p>
        </div>

        <Button onClick={openCreateForm} className="sm:self-start">
          <Plus size={16} />
          Add Project
        </Button>
      </div>

      <ProjectTable
        projects={projects}
        isLoading={isLoading}
        onEdit={openEditForm}
        onDelete={setDeleteTarget}
      />

      <ProjectForm
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeForm();
          } else {
            setFormOpen(true);
          }
        }}
        initialData={editingProject}
        onSubmit={submitForm}
        isSaving={isSaving}
      />

      <DeleteProjectDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        project={deleteTarget}
        onConfirm={confirmDelete}
        isDeleting={deleteProject.isPending}
      />
    </Layout>
  );
}