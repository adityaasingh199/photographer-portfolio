/**
 * All GROQ queries live here — nowhere else.
 * If a component contains a GROQ string, that is a bug.
 */

/** Image projection reused across queries — fetches metadata for LQIP + dimensions */
const imageProjection = `{
  ...,
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  }
}`

// ── Site Settings ──
export const SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    photographerName,
    tagline,
    heroImages[]${imageProjection},
    profilePhoto${imageProjection},
    aboutHeading,
    aboutText,
    email,
    whatsapp,
    instagram,
    city
  }
`

// ── Photos ──
export const ALL_PHOTOS_QUERY = `
  *[_type == "photo"] | order(order asc, _createdAt desc){
    _id,
    title,
    category,
    featured,
    order,
    image${imageProjection}
  }
`

export const FEATURED_PHOTOS_QUERY = `
  *[_type == "photo" && featured == true] | order(order asc, _createdAt desc){
    _id,
    title,
    category,
    image${imageProjection}
  }
`

export const PHOTOS_BY_CATEGORY_QUERY = `
  *[_type == "photo" && category == $category] | order(order asc, _createdAt desc){
    _id,
    title,
    category,
    featured,
    order,
    image${imageProjection}
  }
`

// ── Testimonials ──
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc){
    _id,
    clientName,
    eventType,
    quote,
    location
  }
`

// ── Journal ──
export const JOURNAL_LIST_QUERY = `
  *[_type == "journalPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    coverImage${imageProjection},
    excerpt,
    body,
    publishedAt
  }
`

export const JOURNAL_POST_QUERY = `
  *[_type == "journalPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    coverImage${imageProjection},
    excerpt,
    body[]{
      ...,
      _type == "image" => ${imageProjection}
    },
    publishedAt
  }
`

export const RELATED_POSTS_QUERY = `
  *[_type == "journalPost" && slug.current != $slug] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    coverImage${imageProjection},
    excerpt,
    publishedAt
  }
`

// ── Client Gallery ──
export const CLIENT_GALLERY_BY_SLUG_QUERY = `
  *[_type == "clientGallery" && slug.current == $slug][0]{
    _id,
    clientName,
    "slug": slug.current,
    shootDate,
    passcode,
    coverImage${imageProjection},
    photos[]${imageProjection}
  }
`

export const CLIENT_GALLERIES_LIST_QUERY = `
  *[_type == "clientGallery"] | order(shootDate desc){
    _id,
    clientName,
    "slug": slug.current,
    shootDate,
    coverImage${imageProjection}
  }
`
