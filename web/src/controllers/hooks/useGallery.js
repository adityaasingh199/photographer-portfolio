import { useQuery } from '@tanstack/react-query'
import { PhotoRepository } from '../../models/repositories/PhotoRepository'

export function useGallery(category = null) {
  return useQuery({
    queryKey: ['photos', category || 'all'],
    queryFn: () =>
      category ? PhotoRepository.getByCategory(category) : PhotoRepository.getAll(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export function useFeaturedPhotos() {
  return useQuery({
    queryKey: ['photos', 'featured'],
    queryFn: () => PhotoRepository.getFeatured(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
