/**
 * @typedef {Object} ClientGallery
 * @property {string} _id
 * @property {string} clientName
 * @property {string} slug
 * @property {string} shootDate
 * @property {string} passcode
 * @property {Object|null} coverImage
 * @property {Array} photos
 */

/** @returns {ClientGallery} */
export function createClientGallery(data = {}) {
  return {
    _id: data._id || '',
    clientName: data.clientName || '',
    slug: data.slug || '',
    shootDate: data.shootDate || '',
    passcode: data.passcode || '',
    coverImage: data.coverImage || null,
    photos: data.photos || [],
  }
}
