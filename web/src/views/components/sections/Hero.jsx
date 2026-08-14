import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useSiteSettings } from '../../../controllers/hooks/useSiteSettings'
import { heroUrl, lqipUrl } from '../../../utils/imageUrl'

export default function Hero() {
  const { data: settings } = useSiteSettings()
  const images = settings?.heroImages || []
  const [current, setCurrent] = useState(0)

  const advance = useCallback(() => {
    if (images.length > 1) {
      setCurrent((prev) => (prev + 1) % images.length)
    }
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(advance, 6000)
    return () => clearInterval(interval)
  }, [advance, images.length])

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  const currentImage = images[current]

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero">
      {/* Background images with Ken Burns */}
      <AnimatePresence mode="wait">
        {currentImage && (
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* LQIP placeholder */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentImage.asset?.metadata?.lqip || ''})`,
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
              }}
            />
            {/* Main image */}
            <motion.img
              src={heroUrl(currentImage)}
              alt={settings?.photographerName ? `Photography by ${settings.photographerName}` : 'Hero image'}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="sync"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 8, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/50 via-base/20 to-base/80 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-sm mb-4">
            {settings?.city || 'Delhi NCR'} · Photographer
          </p>
          <h1 className="font-display text-off-white leading-none mb-4">
            {settings?.photographerName || 'Keshav Sharma'}
          </h1>
          <p className="text-lg md:text-xl text-off-white-muted max-w-xl font-light">
            {settings?.tagline || 'Chasing light through the streets of Delhi'}
          </p>
        </motion.div>

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-8">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Show hero image ${i + 1}`}
                className={`h-0.5 transition-all duration-500 ${
                  i === current ? 'w-12 bg-brass' : 'w-6 bg-off-white/25'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-off-white/60 hover:text-off-white transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
