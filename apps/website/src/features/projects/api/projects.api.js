import api from '@/lib/api'

const unwrap = (response) => response.data?.data ?? response.data

export const getProjects = async () => {
  const response = await api.get('/projects')

  return unwrap(response)
}

export const getProject = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`)

  return unwrap(response)
}