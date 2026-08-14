import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import Skeleton from '../components/ui/Skeleton'
import Reveal from '../components/ui/Reveal'
import { useJournal } from '../../controllers/hooks/useJournal'
import { thumbUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/formatDate'

export default function Journal() {
  const { data: posts, isLoading, error } = useJournal()

  return (
    <PageTransition>
      <Helmet>
        <title>Journal — Keshav Sharma Photography</title>
        <meta name="description" content="Stories from the streets, tips for photographers, and behind-the-scenes from shoots by Keshav Sharma." />
      </Helmet>

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <span className="label-sm">Journal</span>
        <h1 className="mt-2 mb-16">Stories & Notes</h1>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-off-white-muted text-center py-24">
            Could not load journal posts. Please try again later.
          </p>
        )}

        {!isLoading && !error && posts?.length === 0 && (
          <p className="text-off-white-muted text-center py-24">
            No posts yet. Check back soon!
          </p>
        )}

        {!isLoading && !error && posts?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post, i) => (
              <Reveal
                as="article"
                key={post._id}
                delay={i * 0.1}
                className="group"
              >
                <Link to={`/journal/${post.slug}`} className="block card-lift">
                  {post.coverImage && (
                    <div className="media-frame rounded-sm mb-6 aspect-video">
                      <img
                        src={thumbUrl(post.coverImage)}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-warm-3 mb-3">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h2 className="font-display text-xl text-off-white group-hover:text-brass transition-colors duration-300 mb-3">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm text-off-white-muted line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  <span className="link-wipe text-sm">
                    Read <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
