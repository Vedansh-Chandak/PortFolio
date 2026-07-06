import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMessage } from "../api/messages.api";

export function useDeleteMessage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteMessage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["messages"] });
		},
	});
}
