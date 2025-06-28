import React, { useState, useEffect } from 'react';
import { useVideos } from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import Toast from '../components/Toast';
import { useLocation, useNavigate } from 'react-router-dom';

const VideoListPage: React.FC = () => {
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [fade, setFade] = useState(true);
  const { videos, loading, error } = useVideos(sort);
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (location.state && location.state.toast) {
      setToast(location.state.toast);
      // Clear the state so toast doesn't persist on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSortChange = (newSort: 'asc' | 'desc') => {
    if (sort === newSort) return;
    setFade(false);
    setSort(newSort);
    setTimeout(() => {
      setFade(true);
    }, 250); // 250ms fade out
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Sort toggle UI */}
      <div className="flex justify-end mb-4">
        <div className="btn-group">
          <button
            className={`btn btn-sm ${sort === 'desc' ? 'btn-primary' : ''}`}
            onClick={() => handleSortChange('desc')}
            aria-pressed={sort === 'desc'}
          >
            Newest
          </button>
          <button
            className={`btn btn-sm ${sort === 'asc' ? 'btn-primary' : ''}`}
            onClick={() => handleSortChange('asc')}
            aria-pressed={sort === 'asc'}
          >
            Oldest
          </button>
        </div>
      </div>
      {/* End Sort toggle UI */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}
      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <span>Error: {error}</span>
        </div>
      )}
      {!loading && !error && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-opacity duration-200 ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
          {videos.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No videos found.</div>
          ) : (
            videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default VideoListPage; 