import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTechStackCategory } from "../api/techStack.api";

export function useDeleteTechStack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTechStackCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
    },
  });
}