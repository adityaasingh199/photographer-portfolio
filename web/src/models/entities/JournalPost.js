import { readingTime } from '../../utils/formatDate'

/**
 * @typedef {Object} JournalPost
 * @property {string} _id
 * @property {string} title
 * @property {string} slug
 * @property {Object|null} coverImage
 * @property {string} excerpt
 * @property {Array} body
 * @property {string} publishedAt
 * @property {number} readingTime
 */

/** @returns {JournalPost} */
export function createJournalPost(data = {}) {
  return {
    _id: data._id || '',
    title: data.title || 'Untitled',
    slug: data.slug || '',
    coverImage: data.coverImage || null,
    excerpt: data.excerpt || '',
    body: data.body || [],
    publishedAt: data.publishedAt || new Date().toISOString(),
    readingTime: readingTime(data.body),
  }
}
