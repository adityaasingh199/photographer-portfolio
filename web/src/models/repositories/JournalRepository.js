import { env } from '../../config/env'
import { sanityClient } from '../datasources/sanityClient'
import {
  JOURNAL_LIST_QUERY,
  JOURNAL_POST_QUERY,
  RELATED_POSTS_QUERY,
} from '../datasources/queries'
import { mockJournalPosts } from '../datasources/mockDataSource'
import { mapJournalPosts, mapJournalPost } from '../mappers'

export const JournalRepository = {
  async getAll() {
    if (env.dataSource === 'mock') {
      return mapJournalPosts(mockJournalPosts)
    }
    const docs = await sanityClient.fetch(JOURNAL_LIST_QUERY)
    return mapJournalPosts(docs)
  },

  async getBySlug(slug) {
    if (env.dataSource === 'mock') {
      const post = mockJournalPosts.find((p) => p.slug === slug) || null
      return post ? mapJournalPost(post) : null
    }
    const doc = await sanityClient.fetch(JOURNAL_POST_QUERY, { slug })
    return doc ? mapJournalPost(doc) : null
  },

  async getRelated(slug) {
    if (env.dataSource === 'mock') {
      return mapJournalPosts(mockJournalPosts.filter((p) => p.slug !== slug).slice(0, 3))
    }
    const docs = await sanityClient.fetch(RELATED_POSTS_QUERY, { slug })
    return mapJournalPosts(docs)
  },
}
