import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'

// Lazy-loaded pages — route-level code splitting
const Home = lazy(() => import('../views/pages/Home'))
const Gallery = lazy(() => import('../views/pages/Gallery'))
const About = lazy(() => import('../views/pages/About'))
const Journal = lazy(() => import('../views/pages/Journal'))
const JournalPost = lazy(() => import('../views/pages/JournalPost'))
const ClientGalleryPage = lazy(() => import('../views/pages/ClientGalleryPage'))
const Contact = lazy(() => import('../views/pages/Contact'))
const NotFound = lazy(() => import('../views/pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brass border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function SuspenseWrap({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <SuspenseWrap><Home /></SuspenseWrap> },
        { path: '/gallery', element: <SuspenseWrap><Gallery /></SuspenseWrap> },
        { path: '/about', element: <SuspenseWrap><About /></SuspenseWrap> },
        { path: '/journal', element: <SuspenseWrap><Journal /></SuspenseWrap> },
        { path: '/journal/:slug', element: <SuspenseWrap><JournalPost /></SuspenseWrap> },
        { path: '/client-gallery/:slug', element: <SuspenseWrap><ClientGalleryPage /></SuspenseWrap> },
        { path: '/contact', element: <SuspenseWrap><Contact /></SuspenseWrap> },
        { path: '*', element: <SuspenseWrap><NotFound /></SuspenseWrap> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
)
