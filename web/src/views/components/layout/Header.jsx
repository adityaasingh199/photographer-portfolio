import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../../config/nav'
import { cn } from '../../../utils/cn'

/**
 * The header deliberately keeps a FIXED height (--header-h) in both the
 * top and scrolled states. Animating padding/border-width sweeps the
 * bottom edge through fractional CSS pixels, which at DPR 2 antialiases
 * into a visible light hairline. Only layer opacity animates here.
 *
 * The scrolled background lives on .header-plate, whose alpha is masked
 * to zero at the bottom — so there is no edge where the blurred,
 * tinted region meets untouched content, and therefore no seam.
 */
export default function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="site-header">
        {/* Always-on legibility scrim so nav stays readable over bright
            photographs. Fades to zero alpha — no boundary. */}
        <div className="header-scrim" aria-hidden="true" />

        {/* Blurred plate, cross-faded in on scroll. */}
        <div className="header-plate" data-scrolled={scrolled} aria-hidden="true" />

        <nav className="relative h-full flex items-center justify-between px-6 md:px-12 max-w-[1800px] mx-auto">
          {/* Handwritten Signature Wordmark — one of the few places the
              accent is allowed to appear. */}
          <Link
            to="/"
            aria-label="Keshav Sharma — home"
            className="text-brass hover:text-brass-bright transition-colors duration-300 inline-flex items-center"
          >
            <span className="font-signature-italianno text-3xl md:text-4xl tracking-wide leading-none select-none">
              Keshav
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className="nav-link text-sm font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-off-white/75 hover:text-off-white p-2 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'font-display text-3xl transition-colors duration-300',
                      location.pathname === link.path
                        ? 'text-brass'
                        : 'text-off-white/75 hover:text-off-white',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
