import { useQuery } from '@tanstack/react-query'

import { getProfile } from '../api/profile.api'

export const profileQueryKey = ['profile']

export function useProfile(options = {}) {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
    ...options,
  })
}