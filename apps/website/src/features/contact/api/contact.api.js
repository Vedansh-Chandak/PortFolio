import api from '@/lib/api'

const unwrap = (response) => response.data?.data ?? response.data

export const sendContactMessage = async (payload) => {
  const response = await api.post('/messages', payload)

  return unwrap(response)
}