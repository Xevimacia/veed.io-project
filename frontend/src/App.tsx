import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import VideoListPage from './pages/VideoListPage'
import NewVideoPage from './pages/NewVideoPage'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar bg-base-200 mb-6">
        <div className="container mx-auto flex gap-4">
          <Link className="btn btn-ghost normal-case text-xl" to="/">Video List</Link>
          <Link className="btn btn-primary" to="/new">Create New Video</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<VideoListPage />} />
        <Route path="/new" element={<NewVideoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
