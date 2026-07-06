import api from "@/lib/api";

export const getTechStack = async () => {
	const { data } = await api.get("/tech-stack");

	return data.data;
};

export const createTechStackCategory = async (payload) => {
	const { data } = await api.post("/tech-stack", payload);

	return data.data;
};

export const updateTechStackCategory = async ({ id, payload }) => {
	const { data } = await api.put(`/tech-stack/${id}`, payload);

	return data.data;
};

export const deleteTechStackCategory = async (id) => {
	const { data } = await api.delete(`/tech-stack/${id}`);

	return data.data;
};
