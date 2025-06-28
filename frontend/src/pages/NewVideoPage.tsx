import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { createVideo } from '../hooks/useVideos';

/**
 * NewVideoPage provides a form for creating a new video entry.
 * Handles client-side validation, POST submission, loading state, and toast feedback.
 */
const NewVideoPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setToast({ message: 'Title is required', type: 'error' });
      return;
    }
    setLoading(true);
    // Parse tags: split by comma, trim, filter out empty
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    const { error } = await createVideo({ title, tags: tagsArray });
    if (error) {
      setToast({ message: error, type: 'error' });
      setLoading(false);
      return;
    }
    // Pass toast message to list page and navigate
    navigate('/', { state: { toast: { message: 'Video created successfully!', type: 'success' } } });
    setLoading(false);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Title <span className="text-error">*</span></span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              disabled={loading}
              ref={titleInputRef}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Tags <span className="text-xs text-gray-400">(comma separated)</span></span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="e.g. tutorial,react,typescript"
              disabled={loading}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default NewVideoPage; 