import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import PageTransition from '../components/layout/PageTransition'
import CategoryFilter from '../components/gallery/CategoryFilter'
import MasonryGrid from '../components/gallery/MasonryGrid'
import Skeleton from '../components/ui/Skeleton'
import { useGallery } from '../../controllers/hooks/useGallery'
import { useLightbox } from '../../controllers/hooks/useLightbox'
import { filterByCategory } from '../../controllers/services/filterService'
import { fullUrl } from '../../utils/imageUrl'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { data: allPhotos, isLoading, error } = useGallery()

  const filteredPhotos = useMemo(
    () => filterByCategory(allPhotos || [], activeCategory),
    [allPhotos, activeCategory],
  )

  const lightbox = useLightbox(filteredPhotos)

  const lightboxSlides = useMemo(
    () =>
      filteredPhotos.map((p) => ({
        src: fullUrl(p.image),
        alt: p.alt,
        title: p.title || undefined,
        description: p.categoryLabel,
      })),
    [filteredPhotos],
  )

  return (
    <PageTransition>
      <Helmet>
        <title>Gallery — Keshav Sharma Photography</title>
        <meta name="description" content="Browse street photography, portraits, travel, and festival photography by Keshav Sharma." />
      </Helmet>

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="label-sm">Gallery</span>
          <h1 className="mt-2 mb-8">The Work</h1>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                className="break-inside-avoid"
                style={{ height: `${250 + Math.random() * 200}px` }}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-24">
            <p className="text-off-white-muted">
              Could not load photos. Please try again later.
            </p>
          </div>
        )}

        {/* Gallery grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="popLayout">
            <MasonryGrid
              photos={filteredPhotos}
              onPhotoClick={lightbox.open}
            />
          </AnimatePresence>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightbox.isOpen}
        close={lightbox.close}
        index={lightbox.currentIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Counter, Captions]}
        captions={{ descriptionTextAlign: 'center' }}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        zoom={{ maxZoomPixelRatio: 3 }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: 'rgba(18, 16, 14, 0.96)' },
        }}
        on={{
          view: ({ index }) => lightbox.goTo(index),
        }}
      />
    </PageTransition>
  )
}
