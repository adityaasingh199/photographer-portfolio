import { useQuery } from '@tanstack/react-query'
import { SettingsRepository } from '../../models/repositories/SettingsRepository'

export function useSiteSettings() {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => SettingsRepository.get(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })
}
