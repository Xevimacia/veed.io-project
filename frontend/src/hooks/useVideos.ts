import { useEffect, useState } from 'react';

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: string[];
}

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