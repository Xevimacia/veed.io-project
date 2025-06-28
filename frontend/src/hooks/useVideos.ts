import { useEffect, useState } from 'react';

/**
 * Video interface represents a single video entry in the library.
 * Used throughout frontend and backend for type safety.
 */

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: string[];
}

/**
 * useVideos is a custom React hook to fetch and manage the list of videos from the backend API.
 * Handles loading, error, and sorting state.
 * @param sort - 'asc' | 'desc' (default: 'desc')
 * @returns { videos, loading, error }
 */
export function useVideos(sort: 'asc' | 'desc' = 'desc') {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const start = Date.now();
        const res = await fetch(`/api/videos?sort=${sort}`);
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        // Ensure at least 600ms loading
        const elapsed = Date.now() - start;
        if (elapsed < 600) {
          await new Promise(resolve => setTimeout(resolve, 600 - elapsed));
        }
        setVideos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sort]);

  return { videos, loading, error };
}

/**
 * createVideo sends a POST request to create a new video entry.
 * Handles loading, error, and returns the created video or error message.
 * @param title - The video title (required)
 * @param tags - Array of tags (optional)
 * @returns { video, error } or throws on network error
 */
export async function createVideo({ title, tags }: { title: string; tags?: string[] }) {
  const start = Date.now();
  let error: string | null = null;
  let video: Video | null = null;
  try {
    const res = await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), tags }),
    });
    // Ensure at least 1000ms loading
    const elapsed = Date.now() - start;
    if (elapsed < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - elapsed));
    }
    if (!res.ok) {
      try {
        const data = await res.json();
        if (data && typeof data.error === 'string') {
          error = data.error;
        } else {
          error = 'Failed to create video';
        }
      } catch {
        error = 'Failed to create video';
      }
      return { video: null, error };
    }
    video = await res.json();
    return { video, error: null };
  } catch (err: any) {
    if (err && typeof err.message === 'string') {
      if (
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError') ||
        err.message.includes('Network request failed')
      ) {
        error = 'Could not connect to the server. Please try again later.';
      } else {
        error = err.message;
      }
    } else {
      error = 'An unexpected error occurred.';
    }
    return { video: null, error };
  }
} 