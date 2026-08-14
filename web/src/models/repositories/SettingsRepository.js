import { env } from '../../config/env'
import { sanityClient } from '../datasources/sanityClient'
import { SETTINGS_QUERY } from '../datasources/queries'
import { mockSettings } from '../datasources/mockDataSource'
import { mapSettings } from '../mappers'

export const SettingsRepository = {
  async get() {
    if (env.dataSource === 'mock') {
      return mapSettings(mockSettings)
    }
    const doc = await sanityClient.fetch(SETTINGS_QUERY)
    return mapSettings(doc)
  },
}
