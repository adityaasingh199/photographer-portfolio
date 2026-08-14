import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../views/components/layout/Header'
import Footer from '../views/components/layout/Footer'
import Grain from '../views/components/layout/Grain'
import ErrorBoundary from '../views/components/layout/ErrorBoundary'
import SmoothScroll from '../views/components/layout/SmoothScroll'

export default function AppLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change (both native and Lenis)
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <ErrorBoundary>
      <SmoothScroll>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
          <Footer />
          <Grain />
        </div>
      </SmoothScroll>
    </ErrorBoundary>
  )
}

