import {PHOTO_CATEGORIES} from './schemaTypes/photo'

// Icons as unicode for the sidebar labels
const SECTION_ICONS = {
  settings: '⚙',
  gallery: '📷',
  reviews: '⭐',
  journal: '📝',
  clientGallery: '🔒',
}

/**
 * Custom Studio structure:
 *
 * ⚙  Website ki Settings      (singleton, opens directly)
 * 📷  Gallery ki Photos        (grouped by category)
 * ⭐  Client ke Reviews
 * 📝  Blog / Journal
 * 🔒  Client Gallery (private)
 *
 * Nothing else — the default "all documents" list is hidden.
 */
export const structure = (S) =>
  S.list()
    .title('Keshav Photography')
    .items([
      // ── Singleton: Website ki Settings ──
      S.listItem()
        .title(`${SECTION_ICONS.settings}  Website ki Settings`)
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),

      S.divider(),

      // ── Gallery ki Photos — grouped by category ──
      S.listItem()
        .title(`${SECTION_ICONS.gallery}  Gallery ki Photos`)
        .id('photosByCategory')
        .child(
          S.list()
            .title('Category se choose karein')
            .items([
              // "All Photos" first
              S.listItem()
                .title('All Photos')
                .id('allPhotos')
                .child(
                  S.documentTypeList('photo')
                    .title('Saari Photos')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.divider(),
              // Then one sub-item per category
              ...PHOTO_CATEGORIES.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .id(`photo-category-${cat.value}`)
                  .child(
                    S.documentTypeList('photo')
                      .title(cat.title)
                      .filter('_type == "photo" && category == $category')
                      .params({category: cat.value})
                      .defaultOrdering([{field: 'order', direction: 'asc'}]),
                  ),
              ),
            ]),
        ),

      S.divider(),

      // ── Client ke Reviews ──
      S.listItem()
        .title(`${SECTION_ICONS.reviews}  Client ke Reviews`)
        .id('testimonials')
        .child(S.documentTypeList('testimonial').title('Client ke Reviews')),

      // ── Blog / Journal ──
      S.listItem()
        .title(`${SECTION_ICONS.journal}  Blog / Journal`)
        .id('journal')
        .child(
          S.documentTypeList('journalPost')
            .title('Blog / Journal')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      // ── Client Gallery (private) ──
      S.listItem()
        .title(`${SECTION_ICONS.clientGallery}  Client Gallery (private)`)
        .id('clientGalleries')
        .child(S.documentTypeList('clientGallery').title('Client Galleries')),
    ])
