import api from "@/lib/api";

export async function getProfile() {
  const { data } = await api.get("/profile");
  return data.data;
}

export async function updateProfile(payload) {
  const { data } = await api.put("/profile", payload);
  return data.data;
}