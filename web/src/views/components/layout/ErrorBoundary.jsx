import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a Sanity quota error
      const isQuotaError =
        this.state.error?.message?.includes('402') ||
        this.state.error?.statusCode === 402

      return (
        <div className="min-h-screen bg-base flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <h1 className="font-display text-4xl text-off-white mb-4">
              {isQuotaError ? 'Taking a breather' : 'Something went wrong'}
            </h1>
            <p className="text-off-white-muted mb-8">
              {isQuotaError
                ? "The site is temporarily unavailable due to high traffic. Please check back in a day or two — everything will be back to normal."
                : "An unexpected error occurred. Please try refreshing the page."}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                className="btn-primary"
              >
                Refresh
              </button>
              <Link
                to="/"
                className="btn-secondary"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
