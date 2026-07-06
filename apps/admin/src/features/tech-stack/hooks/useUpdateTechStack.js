import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTechStackCategory } from "../api/techStack.api";

export function useUpdateTechStack() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateTechStackCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
		},
	});
}
