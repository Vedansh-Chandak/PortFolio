import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../api/settings.api";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
}