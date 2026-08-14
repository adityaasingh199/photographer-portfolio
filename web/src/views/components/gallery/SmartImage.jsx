import { useState, useRef, useEffect } from 'react'
import { cn } from '../../../utils/cn'
import { srcSet as generateSrcSet, defaultSizes } from '../../../utils/imageUrl'

/**
 * SmartImage — blur-up progressive loading with LQIP placeholder.
 * Explicit width/height for zero CLS.
 * loading="lazy" + decoding="async" by default.
 *
 * @param {Object} props
 * @param {string} props.src        - Full-size image URL
 * @param {string} [props.lqip]     - LQIP data URI for blur placeholder
 * @param {string} props.alt        - Alt text (required for a11y)
 * @param {number} [props.width]    - Intrinsic width
 * @param {number} [props.height]   - Intrinsic height
 * @param {Object} [props.image]    - Sanity image ref for srcSet generation
 * @param {string} [props.sizes]    - Sizes attribute
 * @param {boolean} [props.eager]   - Set true for hero images (skip lazy)
 * @param {string} [props.className]
 * @param {boolean} [props.protect] - Disable right-click/drag
 */
export default function SmartImage({
  src,
  lqip,
  alt,
  width,
  height,
  image,
  sizes = defaultSizes,
  eager = false,
  className = '',
  protect = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  // If the image is already cached, mark as loaded immediately
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [src])

  const computedSrcSet = image ? generateSrcSet(image) : undefined

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
      {...(protect ? { onContextMenu: (e) => e.preventDefault() } : {})}
    >
      {/* LQIP blur placeholder */}
      {lqip && (
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-0' : 'opacity-100',
          )}
          style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
        />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={src}
        srcSet={computedSrcSet}
        sizes={computedSrcSet ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          protect && 'no-drag',
        )}
        {...rest}
      />
    </div>
  )
}
