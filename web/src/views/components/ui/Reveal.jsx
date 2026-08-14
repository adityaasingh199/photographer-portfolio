import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * Scroll-reveal wrapper.
 *
 * Every section on this site starts at opacity 0 and is only made
 * visible by its reveal animation, so a reveal that never fires means
 * content the visitor can never see. This component keeps a safety net:
 * if the element is sitting inside the viewport but the
 * IntersectionObserver hasn't reported it (throttled rAF, a restored
 * background tab, a stalled smooth-scroll library), it reveals anyway.
 *
 * @param {'up'|'down'|'left'|'right'|'fade'|'scale'} [variant='up']
 * @param {number} [delay]     seconds — stagger siblings with i * 0.08
 * @param {number} [amount]    fraction visible before revealing
 * @param {string} [as]        motion element tag, e.g. 'article'
 */

const OFFSETS = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -32 },
  right: { x: 32 },
  fade: {},
  scale: { scale: 0.97 },
}

const EASE = [0.16, 1, 0.3, 1]

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.75,
  amount = 0.15,
  as = 'div',
  className,
  ...rest
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount })
  const [forced, setForced] = useState(false)

  const shown = inView || forced || reduceMotion

  useEffect(() => {
    if (shown) return

    // Rect check rather than a blind timer: only elements actually on
    // screen get force-revealed, so off-screen sections keep animating
    // in properly when the visitor scrolls to them.
    const check = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) setForced(true)
    }

    const timer = setTimeout(check, 1200)
    document.addEventListener('visibilitychange', check)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', check)
    }
  }, [shown])

  const offset = reduceMotion ? {} : (OFFSETS[variant] ?? OFFSETS.up)
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={shown ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
