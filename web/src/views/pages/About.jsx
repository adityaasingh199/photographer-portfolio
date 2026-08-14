import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import { Link } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import { useSiteSettings } from '../../controllers/hooks/useSiteSettings'
import { thumbUrl } from '../../utils/imageUrl'
import Skeleton from '../components/ui/Skeleton'

export default function About() {
  const { data: settings, isLoading } = useSiteSettings()

  if (isLoading) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
          <Skeleton className="w-full h-96 mb-8" />
          <Skeleton className="w-1/2 h-8 mb-4" />
          <Skeleton className="w-full h-48" />
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>About — Keshav Sharma Photography</title>
        <meta name="description" content={`${settings?.photographerName || 'Keshav Sharma'} — street and documentary photographer based in ${settings?.city || 'Delhi NCR'}.`} />
      </Helmet>

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {settings?.profilePhoto && (
              <div className="relative group">
                <div className="media-frame rounded-sm">
                  <img
                    src={thumbUrl(settings.profilePhoto)}
                    alt={settings.photographerName || 'Photographer'}
                    loading="eager"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-brass-deep rounded-sm -z-10" />
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-sm">About</span>
            <h1 className="mt-2 mb-8">
              {settings?.aboutHeading || 'The Photographer'}
            </h1>

            {/* Render aboutText with preserved paragraph breaks */}
            <div className="space-y-4 mb-12">
              {(settings?.aboutText || '').split('\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-off-white-muted leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Location */}
            {settings?.city && (
              <div className="flex items-center gap-2 text-off-white-muted mb-6">
                <MapPin size={16} className="text-warm-3" />
                <span>{settings.city}, India</span>
              </div>
            )}

            {/* Instagram */}
            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe"
              >
                <SiInstagram size={18} />
                <span>@shotbykeshav</span>
              </a>
            )}

            {/* CTA */}
            <div className="mt-12">
              <Link
                to="/contact"
                className="btn-primary"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
