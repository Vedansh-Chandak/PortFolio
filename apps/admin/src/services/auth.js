import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data.data;
};

export const me = async () => {
  const response = await api.get("/auth/me");

  return response.data.user;
};