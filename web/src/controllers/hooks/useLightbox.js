import { useState, useCallback } from 'react'

/**
 * Lightbox state controller — manages open/close, index navigation, keyboard.
 * Contains no JSX.
 */
export function useLightbox(photos = []) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const open = useCallback((index = 0) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  const goTo = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  return {
    isOpen,
    currentIndex,
    currentPhoto: photos[currentIndex] || null,
    total: photos.length,
    open,
    close,
    next,
    prev,
    goTo,
  }
}
