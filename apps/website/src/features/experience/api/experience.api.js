import api from '@/lib/api'

const unwrap = (response) => response.data?.data ?? response.data

export const getExperience = async () => {
  const response = await api.get('/experience')

  return unwrap(response)
}