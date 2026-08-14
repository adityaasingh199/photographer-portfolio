import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * SmoothScroll component using Lenis.
 * - Respects prefers-reduced-motion (disables smooth scrolling if requested).
 * - Watches body and root element style/class mutations so it stops when
 *   modals, mobile navigation, or lightbox lock scrolling (overflow: hidden).
 * - Exposes lenis on window.__lenis for programmatic route jumps.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Observe body & html for modal / lightbox / nav scroll-locking (overflow: hidden or no_scroll class)
    //
    // Only inspect signals written by *other* code. `lenis-stopped` is
    // Lenis's own output class, applied to <html> whenever stop() has
    // been called — treating it as a lock signal deadlocks scrolling
    // permanently: the mobile menu stops Lenis, Lenis writes the class,
    // Lenis's stylesheet then sets `html { overflow: clip }`, and on
    // unlock this check still sees the class and stops it again forever.
    const checkScrollLock = () => {
      const isLocked =
        document.body.style.overflow === 'hidden' ||
        document.documentElement.style.overflow === 'hidden' ||
        document.body.classList.contains('yarl__no_scroll')

      if (isLocked) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    const observer = new MutationObserver(checkScrollLock)
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] })

    const handleReducedMotionChange = (e) => {
      if (e.matches) {
        lenis.destroy()
        lenisRef.current = null
        delete window.__lenis
        cancelAnimationFrame(rafId)
      }
    }

    mediaQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  }, [])

  return children
}
