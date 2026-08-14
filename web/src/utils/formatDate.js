/**
 * Format a date string or Date object into a human-readable format.
 * @param {string|Date} date
 * @param {Intl.DateTimeFormatOptions} [opts]
 * @returns {string}
 */
export function formatDate(date, opts) {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...opts,
  })
}

/**
 * Estimate reading time from plain text or portable text blocks.
 * @param {string|Array} content
 * @returns {number} minutes
 */
export function readingTime(content) {
  if (!content) return 1
  let text = ''
  if (typeof content === 'string') {
    text = content
  } else if (Array.isArray(content)) {
    text = content
      .filter((b) => b._type === 'block')
      .map((b) => b.children?.map((c) => c.text).join('') || '')
      .join(' ')
  }
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}
