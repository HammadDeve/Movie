import React, { useEffect } from 'react';

const MovieDetails = ({ movie, onClose, onSimilarMovieClick }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const trailer = movie.videos?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  useEffect(() => {
    console.log('Movie details in component:', {
      title: movie.title,
      hasVideos: Boolean(movie.videos),
      videoCount: movie.videos?.length || 0,
      trailerFound: Boolean(trailer),
      trailerKey: trailer?.key,
      allVideos: movie.videos
    });
  }, [movie, trailer]);

  const handleSimilarMovieClick = async (similarMovie) => {
    try {
      onClose();
      if (onSimilarMovieClick) {
        onSimilarMovieClick(similarMovie);
      }
    } catch (error) {
      console.error('Error handling similar movie click:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 rounded-full p-2 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        {/* Movie content */}
        <div className="mt-8">
          {/* Video/Backdrop container */}
          <div className="w-full h-[60vh] min-h-[400px] relative rounded-xl overflow-hidden mb-8 bg-black">
            {trailer ? (
              <>
                {/* Debug element to show trailer info */}
                <div className="absolute top-0 left-0 bg-black/80 text-white p-2 z-10">
                  Trailer Key: {trailer.key}
                </div>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1`}
                  title={`${movie.title} Trailer`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </>
            ) : backdropUrl ? (
              <img
                src={backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No trailer or backdrop available
              </div>
            )}
          </div>

          {/* Title and meta */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-lg text-gray-300">
              {movie.vote_average && (
                <span className="flex items-center gap-1">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              )}
              {movie.release_date && (
                <span>{new Date(movie.release_date).getFullYear()}</span>
              )}
              {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
            </div>
          </div>

          {/* Genres */}
          {movie.genres && (
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          {/* Cast */}
          {movie.credits?.cast && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.credits.cast.slice(0, 6).map((person) => (
                  <div key={person.id} className="text-center">
                    <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                            : '/No-Poster.png'
                        }
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-gray-400">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies */}
          {movie.similar && movie.similar.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.similar.slice(0, 6).map((similar) => (
                  <div
                    key={similar.id}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSimilarMovieClick(similar)}
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                      <img
                        src={
                          similar.poster_path
                            ? `https://image.tmdb.org/t/p/w300${similar.poster_path}`
                            : '/No-Poster.png'
                        }
                        alt={similar.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium line-clamp-1">{similar.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 