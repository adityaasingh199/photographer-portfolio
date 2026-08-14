/**
 * Mappers: raw Sanity document → domain entity.
 * These are the only functions that touch raw Sanity doc shapes.
 */

import { createSettings } from '../entities/SiteSettings'
import { createPhoto } from '../entities/Photo'
import { createTestimonial } from '../entities/Testimonial'
import { createJournalPost } from '../entities/JournalPost'
import { createClientGallery } from '../entities/ClientGallery'

export const mapSettings = (doc) => createSettings(doc || {})

export const mapPhoto = (doc) => createPhoto(doc || {})
export const mapPhotos = (docs) => (docs || []).map(mapPhoto)

export const mapTestimonial = (doc) => createTestimonial(doc || {})
export const mapTestimonials = (docs) => (docs || []).map(mapTestimonial)

export const mapJournalPost = (doc) => createJournalPost(doc || {})
export const mapJournalPosts = (docs) => (docs || []).map(mapJournalPost)

export const mapClientGallery = (doc) => createClientGallery(doc || {})
