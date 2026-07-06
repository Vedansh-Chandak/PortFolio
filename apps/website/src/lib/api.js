import axios from 'axios'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ??
  import.meta.env.VITE_API_URL?.trim()

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default api