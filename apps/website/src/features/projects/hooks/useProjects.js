import { useQuery } from '@tanstack/react-query'

import { getProjects } from '../api/projects.api'

export const projectsQueryKey = ['projects']

export function useProjects(options = {}) {
  return useQuery({
    queryKey: projectsQueryKey,
    queryFn: getProjects,
    ...options,
  })
}