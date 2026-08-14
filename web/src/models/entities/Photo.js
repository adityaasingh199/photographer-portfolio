import { CATEGORY_MAP } from '../../config/theme'

/**
 * @typedef {Object} Photo
 * @property {string} _id
 * @property {string} title
 * @property {string} category
 * @property {string} categoryLabel
 * @property {boolean} featured
 * @property {number} order
 * @property {Object} image
 * @property {string} alt
 */

/** @returns {Photo} */
export function createPhoto(data = {}) {
  const category = data.category || 'street'
  const title = data.title || ''
  return {
    _id: data._id || '',
    title,
    category,
    categoryLabel: CATEGORY_MAP[category] || category,
    featured: data.featured || false,
    order: data.order ?? 0,
    image: data.image || null,
    // Accessible alt text — never empty
    alt: title || `${CATEGORY_MAP[category] || 'Photography'} by Keshav Sharma`,
  }
}
