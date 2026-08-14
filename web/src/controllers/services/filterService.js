/**
 * Filter service — pure functions, no React.
 */

/**
 * Filter photos by category.
 * @param {import('../../models/entities/Photo').Photo[]} photos
 * @param {string|null} category  - null or 'all' for no filter
 * @returns {import('../../models/entities/Photo').Photo[]}
 */
export function filterByCategory(photos, category) {
  if (!category || category === 'all') return photos
  return photos.filter((p) => p.category === category)
}

/**
 * Get featured photos.
 * @param {import('../../models/entities/Photo').Photo[]} photos
 * @returns {import('../../models/entities/Photo').Photo[]}
 */
export function getFeatured(photos) {
  return photos.filter((p) => p.featured)
}
