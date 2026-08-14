import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteSettings } from '../../../controllers/hooks/useSiteSettings'
import { thumbUrl } from '../../../utils/imageUrl'
import Reveal from '../ui/Reveal'

export default function AboutTeaser() {
  const { data: settings } = useSiteSettings()

  if (!settings) return null

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Image */}
        <Reveal variant="left" duration={0.85} className="order-2 md:order-1 group">
          {settings.profilePhoto && (
            <div className="relative">
              <div className="media-frame rounded-sm bg-surface">
                <img
                  src={thumbUrl(settings.profilePhoto)}
                  alt={settings.photographerName || 'Photographer'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Sanctioned accent hairline — the offset brass rule. */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-brass-deep rounded-sm -z-10" />
            </div>
          )}
        </Reveal>

        {/* Text */}
        <Reveal variant="right" delay={0.15} duration={0.85} className="order-1 md:order-2">
          <span className="section-numeral">02</span>
          <h2 className="mt-2 mb-6">
            {settings.aboutHeading || 'About'}
          </h2>
          <p className="text-off-white-muted leading-relaxed mb-8 line-clamp-6">
            {settings.aboutText?.split('\n')[0] || ''}
          </p>
          <Link to="/about" className="link-wipe">
            Read more
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
