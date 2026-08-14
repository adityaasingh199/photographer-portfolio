import { env } from '../../config/env'
import { sanityClient } from '../datasources/sanityClient'
import {
  CLIENT_GALLERY_BY_SLUG_QUERY,
  CLIENT_GALLERIES_LIST_QUERY,
} from '../datasources/queries'
import { mockClientGalleries } from '../datasources/mockDataSource'
import { mapClientGallery } from '../mappers'

export const ClientGalleryRepository = {
  async getBySlug(slug) {
    if (env.dataSource === 'mock') {
      const g = mockClientGalleries.find((g) => g.slug === slug) || null
      return g ? mapClientGallery(g) : null
    }
    const doc = await sanityClient.fetch(CLIENT_GALLERY_BY_SLUG_QUERY, { slug })
    return doc ? mapClientGallery(doc) : null
  },

  async getAll() {
    if (env.dataSource === 'mock') {
      return mockClientGalleries.map(mapClientGallery)
    }
    const docs = await sanityClient.fetch(CLIENT_GALLERIES_LIST_QUERY)
    return (docs || []).map(mapClientGallery)
  },
}
