import { useQuery } from '@tanstack/react-query'

import { getExperience } from '../api/experience.api'

export const experienceQueryKey = ['experience']

export function useExperience(options = {}) {
  return useQuery({
    queryKey: experienceQueryKey,
    queryFn: getExperience,
    ...options,
  })
}