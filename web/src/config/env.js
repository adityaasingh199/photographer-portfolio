/** @type {Record<string, string>} */
export const env = {
  sanityProjectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'i4ok6tdy',
  sanityDataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  sanityApiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'mock',
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
}
