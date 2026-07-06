import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile.api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}