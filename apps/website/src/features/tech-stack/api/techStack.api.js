import api from '@/lib/api'

const unwrap = (response) => response.data?.data ?? response.data

export const getTechStack = async () => {
  const response = await api.get('/tech-stack')

  return unwrap(response)
}