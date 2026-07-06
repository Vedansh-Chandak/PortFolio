import api from '@/lib/api'

const unwrap = (response) => response.data?.data ?? response.data

export const getProfile = async () => {
  const response = await api.get('/profile')

  return unwrap(response)
}