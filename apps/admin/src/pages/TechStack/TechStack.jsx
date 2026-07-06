import { useMemo, useState } from "react";

import Layout from "@/components/layout/Layout";

import CategoryCard from "@/features/tech-stack/components/CategoryCard";
import TechStackForm from "@/features/tech-stack/components/TechStackForm";
import { useTechStack } from "@/features/tech-stack/hooks/useTechStack";
import { useCreateTechStack } from "@/features/tech-stack/hooks/useCreateTechStack";
import { useUpdateTechStack } from "@/features/tech-stack/hooks/useUpdateTechStack";
import { useDeleteTechStack } from "@/features/tech-stack/hooks/useDeleteTechStack";

function parseItems(rawItems) {
  return rawItems
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function TechStack() {
  const { data, isLoading, error } = useTechStack();
  const createCategory = useCreateTechStack();
  const updateCategory = useUpdateTechStack();
  const deleteCategory = useDeleteTechStack();
  const [editingCategory, setEditingCategory] = useState(null);

  const categories = useMemo(() => data ?? [], [data]);

  const isSubmitting =
    createCategory.isPending || updateCategory.isPending;

  const handleSubmit = async (values) => {
    const payload = {
      category: values.category,
      items: parseItems(values.items),
      sort_order: Number(values.sort_order || 0),
    };

    if (editingCategory) {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        payload,
      });
      setEditingCategory(null);
      return;
    }

    await createCategory.mutateAsync(payload);
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete ${category.category}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    await deleteCategory.mutateAsync(category.id);

    if (editingCategory?.id === category.id) {
      setEditingCategory(null);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Tech Stack</h1>

        <p className="mt-2 text-zinc-400">
          Organize your portfolio technologies by category.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load tech stack.
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[360px_1fr]">
        <TechStackForm
          initialData={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => setEditingCategory(null)}
          isSubmitting={isSubmitting}
        />

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : categories.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900/60 p-8 text-center text-zinc-400">
              No tech stack categories yet.
            </div>
          ) : (
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={setEditingCategory}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}