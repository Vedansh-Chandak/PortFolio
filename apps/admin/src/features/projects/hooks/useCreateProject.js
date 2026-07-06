import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "../api/projects.api";

export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}
