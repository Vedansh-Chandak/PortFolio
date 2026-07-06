import { useQuery } from "@tanstack/react-query";

import { getTechStack } from "../api/techStack.api";

export function useTechStack() {
	return useQuery({
		queryKey: ["tech-stack"],
		queryFn: getTechStack,
	});
}
