import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTechStackCategory } from "../api/techStack.api";

export function useCreateTechStack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTechStackCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
    },
  });
}