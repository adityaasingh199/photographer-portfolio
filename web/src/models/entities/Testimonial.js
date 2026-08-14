import { CATEGORY_MAP } from '../../config/theme'

/**
 * @typedef {Object} Testimonial
 * @property {string} _id
 * @property {string} clientName
 * @property {string} eventType
 * @property {string} eventLabel
 * @property {string} quote
 * @property {string} location
 */

/** @returns {Testimonial} */
export function createTestimonial(data = {}) {
  const eventType = data.eventType || 'other'
  return {
    _id: data._id || '',
    clientName: data.clientName || 'Anonymous',
    eventType,
    eventLabel: CATEGORY_MAP[eventType] || 'Other',
    quote: data.quote || '',
    location: data.location || '',
  }
}
