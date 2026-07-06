import { useMutation, useQueryClient } from "@tanstack/react-query";

import { markMessageAsRead } from "../api/messages.api";

export function useUpdateMessage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: markMessageAsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["messages"] });
		},
	});
}
