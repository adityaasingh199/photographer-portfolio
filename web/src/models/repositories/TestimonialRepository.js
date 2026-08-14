import { env } from '../../config/env'
import { sanityClient } from '../datasources/sanityClient'
import { TESTIMONIALS_QUERY } from '../datasources/queries'
import { mockTestimonials } from '../datasources/mockDataSource'
import { mapTestimonials } from '../mappers'

export const TestimonialRepository = {
  async getAll() {
    if (env.dataSource === 'mock') {
      return mapTestimonials(mockTestimonials)
    }
    const docs = await sanityClient.fetch(TESTIMONIALS_QUERY)
    return mapTestimonials(docs)
  },
}
