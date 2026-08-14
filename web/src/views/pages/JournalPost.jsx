import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import Skeleton from '../components/ui/Skeleton'
import { useJournalPost, useRelatedPosts } from '../../controllers/hooks/useJournal'
import { heroUrl, thumbUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/formatDate'

/** Portable text components — minimal, matching the schema's restrictions */
const ptComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <img
          src={thumbUrl(value)}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-sm"
        />
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl text-off-white mt-12 mb-4">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="text-off-white-muted leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-off-white font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

export default function JournalPostPage() {
  const { slug } = useParams()
  const { data: post, isLoading, error } = useJournalPost(slug)
  const { data: related } = useRelatedPosts(slug)

  if (isLoading) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
          <Skeleton className="w-full h-64 mb-8" />
          <Skeleton className="w-3/4 h-8 mb-4" />
          <Skeleton className="w-full h-48" />
        </div>
      </PageTransition>
    )
  }

  if (error || !post) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 px-6 text-center">
          <h1 className="font-display text-3xl text-off-white mb-4">Post not found</h1>
          <Link to="/journal" className="text-brass">← Back to Journal</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} — Keshav Sharma Photography</title>
        <meta name="description" content={post.excerpt || `${post.title} by Keshav Sharma`} />
      </Helmet>

      <article className="pt-32 pb-24">
        {/* Back link */}
        <div className="px-6 md:px-12 max-w-3xl mx-auto mb-8">
          <Link
            to="/journal"
            className="link-wipe text-sm"
          >
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto mb-12 px-6"
          >
            <img
              src={heroUrl(post.coverImage)}
              alt={post.title}
              loading="eager"
              className="w-full h-auto rounded-sm"
            />
          </motion.div>
        )}

        {/* Content */}
        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 text-xs text-warm-3 mb-4">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl text-off-white mb-12 leading-tight">
              {post.title}
            </h1>

            {/* Portable text body */}
            <div className="prose-custom">
              {post.body?.length > 0 && (
                <PortableText value={post.body} components={ptComponents} />
              )}
            </div>
          </motion.div>

          {/* Related posts */}
          {related?.length > 0 && (
            <div className="mt-24 pt-12 border-t border-warm-1">
              <h3 className="label-sm mb-8">More from the Journal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((rp) => (
                  <Link
                    key={rp._id}
                    to={`/journal/${rp.slug}`}
                    className="group"
                  >
                    {rp.coverImage && (
                      <div className="overflow-hidden rounded-sm mb-3 aspect-video">
                        <img
                          src={thumbUrl(rp.coverImage)}
                          alt={rp.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h4 className="font-display text-lg text-off-white group-hover:text-brass transition-colors">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-warm-3 mt-1">
                      {formatDate(rp.publishedAt)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PageTransition>
  )
}
