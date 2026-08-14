import { Mail } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { useSiteSettings } from '../../../controllers/hooks/useSiteSettings'
import Reveal from '../ui/Reveal'

export default function ContactBand() {
  const { data: settings } = useSiteSettings()

  return (
    <section className="py-24 bg-surface-elevated">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <Reveal className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="section-numeral">04</span>
            <h2 className="mt-2">Let's Create Together</h2>
            <p className="text-off-white-muted mt-4 max-w-lg">
              Have a project in mind? Reach out — I'd love to hear your story.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <SiWhatsapp size={18} />
                <span>WhatsApp</span>
              </a>
            )}
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="btn-secondary"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
