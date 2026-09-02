import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Lock, AlertCircle, Download } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import JSZip from 'jszip'

import PageTransition from '../components/layout/PageTransition'
import Skeleton from '../components/ui/Skeleton'
import { useClientGallery } from '../../controllers/hooks/useClientGallery'
import { useLightbox } from '../../controllers/hooks/useLightbox'
import { thumbUrl, fullUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/formatDate'

const getPhotoDownloadName = (photo, index, galleryName) => {
  const source = String(photo || '')
  const normalizedName =
    String(galleryName || 'gallery')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'gallery'

  const originalExt = source.split('?')[0].split('.').pop()
  const ext = originalExt && /^[a-z0-9]+$/i.test(originalExt) ? originalExt : 'jpg'

  return `${normalizedName}-${index + 1}.${ext}`
}

const downloadBlobAsFile = (blob, fileName) => {
  const objectUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = objectUrl
  link.download = fileName
  link.rel = 'noopener noreferrer'
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}

const downloadSingleImage = async (src, fileName) => {
  try {
    const response = await fetch(src, {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'cors',
    })

    if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`)

    const blob = await response.blob()
    downloadBlobAsFile(blob, fileName)
  } catch (error) {
    const link = document.createElement('a')
    link.href = src
    link.download = fileName
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export default function ClientGalleryPage() {
  const { slug } = useParams()
  const { data: gallery, isLoading, error } = useClientGallery(slug)
  const [passcodeInput, setPasscodeInput] = useState('')
  const [authError, setAuthError] = useState(false)
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem(`cg-auth-${slug}`) === 'true'
  })

  const photos = gallery?.photos || []
  const lightbox = useLightbox(photos)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (gallery && passcodeInput === gallery.passcode) {
      setAuthenticated(true)
      sessionStorage.setItem(`cg-auth-${slug}`, 'true')
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  const handleBulkDownload = async () => {
    if (!photos.length || !gallery) return

    const zip = new JSZip()

    for (const [index, photo] of photos.entries()) {
      const fileName = getPhotoDownloadName(photo, index, gallery.clientName)
      const imageUrl = fullUrl(photo)

      try {
        const response = await fetch(imageUrl, {
          method: 'GET',
          credentials: 'same-origin',
          mode: 'cors',
        })

        if (!response.ok) continue

        const blob = await response.blob()
        zip.file(fileName, blob)
      } catch (error) {
        // ignore failed ones
      }
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    downloadBlobAsFile(zipBlob, `${(gallery.clientName || 'gallery').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.zip`)
  }

  if (isLoading) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 px-6 text-center">
          <Skeleton className="w-48 h-8 mx-auto mb-4" />
          <Skeleton className="w-64 h-48 mx-auto" />
        </div>
      </PageTransition>
    )
  }

  if (error || !gallery) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 px-6 text-center">
          <h1 className="font-display text-3xl text-off-white mb-4">Gallery not found</h1>
          <p className="text-off-white-muted">This gallery doesn't exist or has been removed.</p>
        </div>
      </PageTransition>
    )
  }

  if (!authenticated) {
    return (
      <PageTransition>
        <Helmet>
          <title>{gallery.clientName} — Private Gallery</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm text-center"
          >
            <Lock size={40} className="text-brass mx-auto mb-6" />
            <h1 className="font-display text-2xl text-off-white mb-2">
              {gallery.clientName}
            </h1>
            <p className="text-sm text-off-white-muted mb-8">
              Enter the password to view your photos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value)
                  setAuthError(false)
                }}
                placeholder="Password"
                className="w-full px-4 py-3 bg-surface border border-warm-2 text-off-white rounded-sm focus:outline-none focus:border-brass transition-colors"
                autoFocus
              />
              {authError && (
                <p className="flex items-center gap-2 text-sm text-terracotta-light">
                  <AlertCircle size={14} />
                  Incorrect password. Please try again.
                </p>
              )}
              <button type="submit" className="btn-primary w-full">
                View Gallery
              </button>
            </form>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  const lightboxSlides = photos.map((p) => ({
    src: fullUrl(p),
    alt: gallery.clientName,
  }))

  return (
    <PageTransition>
      <Helmet>
        <title>{gallery.clientName} — Keshav Sharma Photography</title>
      </Helmet>

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="mb-12">
          <span className="label-sm">Client Gallery</span>
          <h1 className="mt-2">{gallery.clientName}</h1>
          {gallery.shootDate && (
            <p className="text-off-white-muted mt-2">{formatDate(gallery.shootDate)}</p>
          )}
        </div>

        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={handleBulkDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-brass/60 bg-surface text-off-white hover:border-brass hover:bg-surface/80 transition-colors"
          >
            <Download size={16} />
            Download all
          </button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="relative break-inside-avoid cursor-pointer group"
              onClick={() => lightbox.open(i)}
            >
              <div className="overflow-hidden rounded-sm">
                <img
                  src={thumbUrl(photo)}
                  alt={`${gallery.clientName} photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              </div>

              <button
                type="button"
                aria-label={`Download ${gallery.clientName} image ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  downloadSingleImage(
                    fullUrl(photo),
                    getPhotoDownloadName(photo, i, gallery.clientName)
                  )
                }}
                className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-sm opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-black/75"
              >
                <Download size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightbox.isOpen}
        close={lightbox.close}
        index={lightbox.currentIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Counter]}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{
          container: { backgroundColor: 'rgba(18, 16, 14, 0.96)' },
        }}
        on={{
          view: ({ index }) => lightbox.goTo(index),
        }}
      />
    </PageTransition>
  )
}
