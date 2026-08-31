/** @type {Record<string, string>} */
export const env = {
  sanityProjectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  sanityDataset: import.meta.env.VITE_SANITY_DATASET,
  sanityApiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  dataSource: import.meta.env.VITE_DATA_SOURCE,
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY 
}
