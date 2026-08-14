import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useTestimonials } from '../../../controllers/hooks/useTestimonials'
import Reveal from '../ui/Reveal'

export default function TestimonialSlider() {
  const { data: testimonials } = useTestimonials()
  const [current, setCurrent] = useState(0)

  const items = testimonials || []

  const next = useCallback(() => {
    if (!items.length) return
    setCurrent((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    if (!items.length) return
    setCurrent((p) => (p - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (items.length <= 1) return
    const interval = setInterval(next, 7000)
    return () => clearInterval(interval)
  }, [next, items.length])

  if (!items.length) return null

  const item = items[current]

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <Reveal>
          <span className="section-numeral">03</span>
          <h2 className="mt-2 mb-16">Kind Words</h2>
        </Reveal>

        <Reveal delay={0.1} className="max-w-3xl mx-auto text-center">
          <Quote size={32} className="text-warm-2 mx-auto mb-6" />

          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="font-display text-xl md:text-2xl text-off-white leading-relaxed mb-8 italic">
              "{item.quote}"
            </blockquote>
            <div>
              <p className="text-off-white font-medium">{item.clientName}</p>
              <p className="text-sm text-warm-3 mt-1">
                {item.eventLabel}
                {item.location ? ` · ${item.location}` : ''}
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prev}
                className="p-2 text-warm-3 hover:text-off-white transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs text-warm-3 font-mono">
                {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button
                onClick={next}
                className="p-2 text-warm-3 hover:text-off-white transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
