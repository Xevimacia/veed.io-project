import React from 'react';
import type { Video } from '../hooks/useVideos';

interface VideoCardProps {
  video: Video;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-200">
      <figure className="aspect-video overflow-hidden">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
        />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-lg font-semibold mb-2">{video.title}</h3>
        <div className="text-sm text-gray-500 mb-2">{formatDate(video.created_at)}</div>
        <div className="flex flex-wrap gap-1">
          {video.tags.map((tag) => (
            <span key={tag} className="badge badge-outline badge-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 