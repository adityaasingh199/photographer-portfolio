import { createImageUrlBuilder } from '@sanity/image-url'
import { env } from '../config/env.js'

const builder = createImageUrlBuilder({
  projectId: env.sanityProjectId || 'y51uodc2',
  dataset: env.sanityDataset || 'production',
})

/**
 * Base image-url builder — every image on the site must go through this.
 * Never render a raw `cdn.sanity.io` URL without transform params.
 *
 * @param {*} source
 */
export function urlFor(source) {
  if (!source) return null
  // If it's already a direct mock URL (e.g. Unsplash), provide builder mock or string fallback
  if (typeof source === 'string') return source
  if (source.asset?.url && !source.asset.url.includes('cdn.sanity.io')) {
    return source.asset.url
  }
  return builder.image(source)
}

/** Gallery thumbnail — 800w, 70 quality */
export function thumbUrl(img) {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (img.asset?.url && !img.asset.url.includes('cdn.sanity.io')) {
    return img.asset.url
  }
  try {
    return builder.image(img).width(800).quality(70).auto('format').fit('max').url()
  } catch {
    return img.asset?.url || ''
  }
}

/** Lightbox / full view — 1800w, 80 quality */
export function fullUrl(img) {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (img.asset?.url && !img.asset.url.includes('cdn.sanity.io')) {
    return img.asset.url
  }
  try {
    return builder.image(img).width(1800).quality(80).auto('format').fit('max').url()
  } catch {
    return img.asset?.url || ''
  }
}

/** Hero — 2000w, 80 quality */
export function heroUrl(img) {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (img.asset?.url && !img.asset.url.includes('cdn.sanity.io')) {
    return img.asset.url
  }
  try {
    return builder.image(img).width(2000).quality(80).auto('format').url()
  } catch {
    return img.asset?.url || ''
  }
}

/** LQIP blur placeholder — tiny 24w with heavy blur */
export function lqipUrl(img) {
  if (!img) return ''
  if (img.asset?.metadata?.lqip) return img.asset.metadata.lqip
  if (typeof img === 'string') return img
  if (img.asset?.url && !img.asset.url.includes('cdn.sanity.io')) {
    return img.asset.url
  }
  try {
    return builder.image(img).width(24).quality(20).blur(50).url()
  } catch {
    return img.asset?.url || ''
  }
}

/**
 * Generate srcSet string at standard breakpoints.
 * @param {*} img  Sanity image reference
 * @param {number[]} widths
 */
export function srcSet(img, widths = [640, 1024, 1600, 2400]) {
  if (!img) return undefined
  if (img.asset?.url && !img.asset.url.includes('cdn.sanity.io')) {
    return undefined
  }
  try {
    return widths
      .map((w) => `${builder.image(img).width(w).quality(75).auto('format').fit('max').url()} ${w}w`)
      .join(', ')
  } catch {
    return undefined
  }
}

/** Default sizes attribute for responsive images */
export const defaultSizes =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
