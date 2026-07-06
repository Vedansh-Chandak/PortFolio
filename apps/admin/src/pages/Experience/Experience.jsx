import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

import ExperienceForm from "@/features/experience/components/ExperienceForm";
import ExperienceTable from "@/features/experience/components/ExperienceTable";
import DeleteExperienceDialog from "@/features/experience/components/DeleteExperienceDialog";
import { useExperiences } from "@/features/experience/hooks/useExperiences";
import { useCreateExperience } from "@/features/experience/hooks/useCreateExperience";
import { useUpdateExperience } from "@/features/experience/hooks/useUpdateExperience";
import { useDeleteExperience } from "@/features/experience/hooks/useDeleteExperience";

export default function Experience() {
  const { data, isLoading, error } = useExperiences();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const [formOpen, setFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const experiences = data ?? [];
  const isSaving = createExperience.isPending || updateExperience.isPending;

  const openCreateForm = () => {
    setEditingExperience(null);
    setFormOpen(true);
  };

  const openEditForm = (experience) => {
    setEditingExperience(experience);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingExperience(null);
  };

  const submitForm = async (payload) => {
    try {
      if (editingExperience) {
        await updateExperience.mutateAsync({
          id: editingExperience.id,
          payload,
        });
        toast.success("Experience updated successfully.");
      } else {
        await createExperience.mutateAsync(payload);
        toast.success("Experience created successfully.");
      }

      closeForm();
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteExperience.mutateAsync(deleteTarget.id);
      toast.success("Experience deleted successfully.");
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
          <h1 className="text-4xl font-bold text-white">Experience</h1>
          <p className="mt-2 text-zinc-400">
            Manage work history entries for the portfolio.
          </p>
        </div>

        <Button onClick={openCreateForm} className="sm:self-start">
          <Plus size={16} />
          Add Experience
        </Button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load experiences.
        </div>
      )}

      <ExperienceTable
        experiences={experiences}
        isLoading={isLoading}
        onEdit={openEditForm}
        onDelete={setDeleteTarget}
      />

      <ExperienceForm
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeForm();
          } else {
            setFormOpen(true);
          }
        }}
        initialData={editingExperience}
        onSubmit={submitForm}
        isSaving={isSaving}
      />

      <DeleteExperienceDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        experience={deleteTarget}
        onConfirm={confirmDelete}
        isDeleting={deleteExperience.isPending}
      />
    </Layout>
  );
}