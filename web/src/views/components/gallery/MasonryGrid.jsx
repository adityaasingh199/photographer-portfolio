import { motion } from 'framer-motion'
import { thumbUrl } from '../../../utils/imageUrl'

export default function MasonryGrid({ photos, onPhotoClick }) {
  if (!photos?.length) {
    return (
      <div className="text-center py-24">
        <p className="text-off-white-muted">No photos in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo._id}
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.5 },
            layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="break-inside-avoid group cursor-pointer card-lift"
          onClick={() => onPhotoClick?.(index)}
        >
          <div className="media-frame relative rounded-sm bg-surface">
            {/* LQIP blur */}
            {photo.image?.asset?.metadata?.lqip && (
              <img
                src={photo.image.asset.metadata.lqip}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
              />
            )}
            <img
              src={thumbUrl(photo.image)}
              alt={photo.alt}
              width={photo.image?.asset?.metadata?.dimensions?.width}
              height={photo.image?.asset?.metadata?.dimensions?.height}
              loading="lazy"
              decoding="async"
              className="relative w-full h-auto object-cover"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-base/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 z-[1]">
              {photo.title && (
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-smooth">
                  <p className="text-off-white text-sm font-medium">{photo.title}</p>
                  <p className="text-off-white-muted text-xs mt-1">{photo.categoryLabel}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
