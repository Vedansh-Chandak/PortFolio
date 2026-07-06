import api from "@/lib/api";

export const normalizeProject = (project) => ({
	id: project.id,
	title: project.title,
	slug: project.slug,
	shortDescription: project.short_description ?? "",
	description: project.description ?? "",
	status: project.status ?? "",
	coverImageUrl: project.cover_image_url ?? "",
	coverImagePublicId: project.cover_image_public_id ?? "",
	features: Array.isArray(project.features) ? project.features : [],
	tech: Array.isArray(project.tech) ? project.tech : [],
	liveUrl: project.live_url ?? "",
	githubUrl: project.github_url ?? "",
	featured: Boolean(project.is_featured),
	sortOrder: project.sort_order ?? 0,
});

export const serializeProject = (values, image = {}) => ({
	title: values.title,
	short_description: values.shortDescription,
	description: values.description,
	status: values.status,
	cover_image_url: image.coverImageUrl ?? values.coverImageUrl ?? "",
	cover_image_public_id:
		image.coverImagePublicId ?? values.coverImagePublicId ?? "",
	features: values.features,
	tech: values.tech,
	live_url: values.liveUrl,
	github_url: values.githubUrl,
	is_featured: values.featured,
	sort_order: Number(values.sortOrder || 0),
});

export const getProjects = async () => {
	const { data } = await api.get("/projects");

	return data.data.map(normalizeProject);
};

export const createProject = async (payload) => {
	const { data } = await api.post("/projects", payload);

	return normalizeProject(data.data);
};

export const updateProject = async ({ id, payload }) => {
	const { data } = await api.put(`/projects/${id}`, payload);

	return normalizeProject(data.data);
};

export const deleteProject = async (id) => {
	const { data } = await api.delete(`/projects/${id}`);

	return data.data;
};

export const uploadProjectImage = async (file) => {
	const formData = new FormData();

	formData.append("file", file);
	formData.append("folder", "projects");

	const { data } = await api.post("/uploads", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return {
		coverImageUrl: data.data.url,
		coverImagePublicId: data.data.public_id,
	};
};
