import { env } from '../../config/env'
import { sanityClient } from '../datasources/sanityClient'
import {
  ALL_PHOTOS_QUERY,
  FEATURED_PHOTOS_QUERY,
  PHOTOS_BY_CATEGORY_QUERY,
} from '../datasources/queries'
import { mockPhotos } from '../datasources/mockDataSource'
import { mapPhotos } from '../mappers'

export const PhotoRepository = {
  async getAll() {
    if (env.dataSource === 'mock') {
      return mapPhotos(mockPhotos)
    }
    const docs = await sanityClient.fetch(ALL_PHOTOS_QUERY)
    return mapPhotos(docs)
  },

  async getFeatured() {
    if (env.dataSource === 'mock') {
      return mapPhotos(mockPhotos.filter((p) => p.featured))
    }
    const docs = await sanityClient.fetch(FEATURED_PHOTOS_QUERY)
    return mapPhotos(docs)
  },

  async getByCategory(category) {
    if (env.dataSource === 'mock') {
      return mapPhotos(mockPhotos.filter((p) => p.category === category))
    }
    const docs = await sanityClient.fetch(PHOTOS_BY_CATEGORY_QUERY, { category })
    return mapPhotos(docs)
  },
}
