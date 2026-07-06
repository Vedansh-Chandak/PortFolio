import api from "@/lib/api";

export const getExperiences = async () => {
	const { data } = await api.get("/experience");

	return data.data;
};

export const createExperience = async (payload) => {
	const { data } = await api.post("/experience", payload);

	return data.data;
};

export const updateExperience = async ({ id, payload }) => {
	const { data } = await api.put(`/experience/${id}`, payload);

	return data.data;
};

export const deleteExperience = async (id) => {
	const { data } = await api.delete(`/experience/${id}`);

	return data.data;
};
