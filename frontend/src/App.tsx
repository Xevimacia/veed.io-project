import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import VideoListPage from './pages/VideoListPage'
import NewVideoPage from './pages/NewVideoPage'
import ErrorBoundary from './components/ErrorBoundary'

/**
 * The root App component for the VEED Video Library Dashboard.
 * Sets up global routing, navigation bar, and error boundary for the entire frontend.
 * All main pages are rendered as routes inside this component.
 */
function App() {
  return (
    <BrowserRouter>
      <nav className="navbar bg-base-200 shadow fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 justify-start">
          <Link className="btn btn-ghost normal-case text-xl" to="/">Video List</Link>
          <Link className="btn btn-primary" to="/new">Create New Video</Link>
        </div>
      </nav>
      <ErrorBoundary>
        <div className="container mx-auto pt-24 pb-8">
          <Routes>
            <Route path="/" element={<VideoListPage />} />
            <Route path="/new" element={<NewVideoPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
