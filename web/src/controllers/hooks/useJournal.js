import { useQuery } from '@tanstack/react-query'
import { JournalRepository } from '../../models/repositories/JournalRepository'

export function useJournal() {
  return useQuery({
    queryKey: ['journal'],
    queryFn: () => JournalRepository.getAll(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export function useJournalPost(slug) {
  return useQuery({
    queryKey: ['journal', slug],
    queryFn: () => JournalRepository.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export function useRelatedPosts(slug) {
  return useQuery({
    queryKey: ['journal', 'related', slug],
    queryFn: () => JournalRepository.getRelated(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
