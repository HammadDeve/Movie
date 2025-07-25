import React from 'react';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES, YOUTUBE_BASE_URL } from '../config/api.config';

const VideoPlayer = ({ movie, onClose }) => {
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop.large}${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {movie.trailer ? (
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={`${YOUTUBE_BASE_URL}/${movie.trailer}?autoplay=1`}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : backdropUrl ? (
              <img
                src={backdropUrl}
                alt={movie.title}
                className="w-full rounded-xl"
              />
            ) : null}
          </div>

          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
            
            <div className="flex items-center gap-4 text-lg mb-6">
              <span className="flex items-center gap-1">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              {movie.release_date && (
                <span>{new Date(movie.release_date).getFullYear()}</span>
              )}
              {movie.runtime && (
                <span>{formatRuntime(movie.runtime)}</span>
              )}
            </div>

            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-red-500 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-lg mb-6">{movie.overview}</p>

            {movie.production_companies && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Production</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map(company => (
                    <span
                      key={company.id}
                      className="text-white/70"
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
