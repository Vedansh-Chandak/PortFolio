import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "../api/projects.api";

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}
