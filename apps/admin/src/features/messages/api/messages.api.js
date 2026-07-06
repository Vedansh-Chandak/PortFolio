import api from "@/lib/api";

export const normalizeMessage = (message) => ({
	id: message.id,
	name: message.name,
	email: message.email,
	subject: message.subject ?? "",
	message: message.message ?? "",
	isRead: Boolean(message.is_read),
	createdAt: message.created_at,
});

export const getMessages = async () => {
	const { data } = await api.get("/messages");

	return data.data.map(normalizeMessage);
};

export const getMessage = async (id) => {
	const { data } = await api.get(`/messages/${id}`);

	return normalizeMessage(data.data);
};

export const markMessageAsRead = async (id) => {
	const { data } = await api.patch(`/messages/${id}/read`);

	return normalizeMessage(data.data);
};

export const deleteMessage = async (id) => {
	const { data } = await api.delete(`/messages/${id}`);

	return data.data;
};
