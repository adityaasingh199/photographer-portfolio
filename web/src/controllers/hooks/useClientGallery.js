import { useQuery } from '@tanstack/react-query'
import { ClientGalleryRepository } from '../../models/repositories/ClientGalleryRepository'

export function useClientGallery(slug) {
  return useQuery({
    queryKey: ['clientGallery', slug],
    queryFn: () => ClientGalleryRepository.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
