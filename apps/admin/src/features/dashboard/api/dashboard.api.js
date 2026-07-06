import api from "@/lib/api";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");

  return data.data;
};
