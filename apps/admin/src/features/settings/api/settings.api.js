import api from "@/lib/api";

export const getSettings = async () => {
  const { data } = await api.get("/settings");

  return data.data;
};

export const updateSettings = async (payload) => {
  const { data } = await api.put("/settings", payload);

  return data.data;
};

export const changePassword = async (payload) => {
  const { data } = await api.put("/auth/change-password", payload);

  return data.data;
};