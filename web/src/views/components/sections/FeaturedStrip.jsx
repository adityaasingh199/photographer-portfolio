import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useFeaturedPhotos, useGallery } from '../../../controllers/hooks/useGallery'
import { thumbUrl } from '../../../utils/imageUrl'
import Skeleton from '../ui/Skeleton'
import Reveal from '../ui/Reveal'

export default function FeaturedStrip() {
  const { data: featuredPhotos, isLoading: featuredLoading } = useFeaturedPhotos()
  const { data: allPhotos, isLoading: allLoading } = useGallery()

  // Both queries feed the same list, so the strip is still loading while
  // EITHER is in flight. With `&&` a fast-resolving featured query made
  // this fall through to `!photos.length` and render nothing.
  const isLoading = featuredLoading || allLoading
  // Use featured photos if available; otherwise fall back to first 4 gallery photos
  const photos = (featuredPhotos?.length ? featuredPhotos : allPhotos?.slice(0, 4)) || []

  if (isLoading) {
    return (
      <section className="py-24 px-6 md:px-12">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-72 h-96 shrink-0" />
          ))}
        </div>
      </section>
    )
  }

  if (!photos.length) return null

  return (
    <section className="py-24 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1800px] mx-auto mb-12">
        <Reveal className="flex items-end justify-between">
          <div>
            <span className="section-numeral">01</span>
            <h2 className="mt-2">Featured Work</h2>
          </div>
          <Link to="/gallery" className="link-wipe hidden md:inline-flex text-sm">
            View all
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-4 px-6 md:px-12 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing no-context">
        {photos.map((photo, i) => (
          <Reveal
            key={photo._id}
            variant="right"
            delay={i * 0.08}
            amount={0.1}
            className="shrink-0 group relative"
          >
            <Link to="/gallery" className="block card-lift">
              <div className="media-frame w-64 md:w-80 h-80 md:h-[28rem] rounded-sm bg-surface">
                <img
                  src={thumbUrl(photo.image)}
                  alt={photo.alt || photo.title || 'Featured photograph'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              {photo.title && (
                <p className="mt-3 text-sm text-off-white-muted group-hover:text-off-white transition-colors duration-500">
                  {photo.title}
                </p>
              )}
              <p className="text-xs text-warm-3 mt-1">{photo.categoryLabel || photo.category}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden px-6 mt-8">
        <Link to="/gallery" className="link-wipe text-sm">
          View all work <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
