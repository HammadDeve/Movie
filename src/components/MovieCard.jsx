import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png';

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="aspect-[2/3] bg-gray-800">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <span className="flex items-center">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span>•</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          <p className="text-sm text-gray-400 line-clamp-3">
            {movie.overview || 'No overview available.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
