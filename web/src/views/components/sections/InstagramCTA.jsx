import { SiInstagram } from 'react-icons/si'
import { useSiteSettings } from '../../../controllers/hooks/useSiteSettings'
import Reveal from '../ui/Reveal'

export default function InstagramCTA() {
  const { data: settings } = useSiteSettings()

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto text-center">
      <Reveal>
        <SiInstagram size={40} className="text-warm-3 mx-auto mb-6" />
        <h2 className="mb-4">Follow the Journey</h2>
        <p className="text-off-white-muted mb-8 max-w-lg mx-auto">
          Daily photos, behind-the-scenes stories, and previews of new work on Instagram.
        </p>
        <a
          href={settings?.instagram || 'https://www.instagram.com/shotbykeshav'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <SiInstagram size={18} />
          <span>@shotbykeshav</span>
        </a>
      </Reveal>
    </section>
  )
}
