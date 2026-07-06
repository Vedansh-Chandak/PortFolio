import { useQuery } from '@tanstack/react-query'

import { getTechStack } from '../api/techStack.api'

export const techStackQueryKey = ['tech-stack']

export function useTechStack(options = {}) {
  return useQuery({
    queryKey: techStackQueryKey,
    queryFn: getTechStack,
    ...options,
  })
}