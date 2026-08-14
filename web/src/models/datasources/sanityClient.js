import { createClient } from '@sanity/client'
import { env } from '../../config/env'

export const sanityClient = createClient({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: env.sanityApiVersion,
  useCdn: true,
  // No token — public dataset, read-only
})
