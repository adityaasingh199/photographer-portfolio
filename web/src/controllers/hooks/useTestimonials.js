import { useQuery } from '@tanstack/react-query'
import { TestimonialRepository } from '../../models/repositories/TestimonialRepository'

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => TestimonialRepository.getAll(),
    staleTime: 1000 * 60 * 10,
    retry: 2,
  })
}
