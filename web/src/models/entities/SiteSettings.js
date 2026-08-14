/**
 * @typedef {Object} SiteSettings
 * @property {string} photographerName
 * @property {string} tagline
 * @property {Array} heroImages
 * @property {Object|null} profilePhoto
 * @property {string} aboutHeading
 * @property {string} aboutText
 * @property {string} email
 * @property {string} whatsapp
 * @property {string} instagram
 * @property {string} city
 */

/** @returns {SiteSettings} */
export function createSettings(data = {}) {
  return {
    photographerName: data.photographerName || 'Keshav Sharma',
    tagline: data.tagline || 'Chasing light through the streets of Delhi',
    heroImages: data.heroImages || [],
    profilePhoto: data.profilePhoto || null,
    aboutHeading: data.aboutHeading || 'About',
    aboutText: data.aboutText || '',
    email: data.email || '',
    whatsapp: data.whatsapp || '',
    instagram: data.instagram || '',
    city: data.city || 'Delhi NCR',
  }
}
