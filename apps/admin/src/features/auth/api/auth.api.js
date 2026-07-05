import api from "@/lib/api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data.data;
};