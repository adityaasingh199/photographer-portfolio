import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { SiWhatsapp, SiInstagram } from 'react-icons/si'
import { useSiteSettings } from '../../../controllers/hooks/useSiteSettings'

export default function Footer() {
  const { data: settings } = useSiteSettings()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-warm-1 bg-surface">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display text-2xl text-off-white hover:text-brass transition-colors duration-500"
            >
              {settings?.photographerName || 'Keshav Sharma'}
            </Link>
            <p className="mt-3 text-sm text-off-white-muted max-w-xs">
              {settings?.tagline || 'Chasing light through the streets of Delhi'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="label-sm mb-4">Navigate</h4>
            <ul className="space-y-2">
              {['Gallery', 'About', 'Journal', 'Contact'].map((label) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-sm text-off-white/75 hover:text-off-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-sm mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2.5 text-sm text-off-white/75 hover:text-off-white transition-colors"
                  >
                    <Mail size={16} />
                    <span>{settings.email}</span>
                  </a>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-off-white/75 hover:text-off-white transition-colors"
                  >
                    <SiWhatsapp size={16} />
                    <span>WhatsApp</span>
                  </a>
                </li>
              )}
              {settings?.instagram && (
                <li>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-off-white/75 hover:text-off-white transition-colors"
                  >
                    <SiInstagram size={16} />
                    <span>@shotbykeshav</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <hr className="hairline my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warm-3">
            © {year} {settings?.photographerName || 'Keshav Sharma'}. All rights reserved.
          </p>
          <p className="text-xs text-warm-3">
            {settings?.city || 'Delhi NCR'}, India
          </p>
        </div>
      </div>
    </footer>
  )
}
