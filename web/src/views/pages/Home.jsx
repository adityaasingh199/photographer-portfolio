import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/layout/PageTransition'
import Hero from '../components/sections/Hero'
import FeaturedStrip from '../components/sections/FeaturedStrip'
import AboutTeaser from '../components/sections/AboutTeaser'
import TestimonialSlider from '../components/sections/TestimonialSlider'
import InstagramCTA from '../components/sections/InstagramCTA'
import ContactBand from '../components/sections/ContactBand'

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Keshav Sharma — Street & Portrait Photography | Delhi NCR</title>
        <meta name="description" content="Keshav Sharma — street, portrait, travel and festival photographer based in Delhi NCR. Chasing light through the streets of Delhi." />
      </Helmet>

      <Hero />
      <FeaturedStrip />
      <hr className="hairline max-w-[1800px] mx-auto" />
      <AboutTeaser />
      <TestimonialSlider />
      <InstagramCTA />
      <ContactBand />
    </PageTransition>
  )
}
