import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>404 — Lost in the Lanes | Keshav Sharma Photography</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg"
        >
          <span className="section-numeral block mb-4">404</span>
          <h1 className="font-display text-3xl md:text-4xl text-off-white mb-4">
            Lost in the Lanes
          </h1>
          <p className="text-off-white-muted mb-8">
            This page doesn't exist — maybe it wandered into a Delhi side-street and never came back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="btn-primary"
            >
              Browse the Gallery
            </Link>
            <Link
              to="/"
              className="btn-secondary"
            >
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
