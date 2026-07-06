import { useMutation } from "@tanstack/react-query";

import { changePassword } from "../api/settings.api";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}