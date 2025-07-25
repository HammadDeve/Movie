export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed';

// You'll need to replace this with your TMDB API key
export const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  }
};

export const ENDPOINTS = {
  trending: '/trending/movie/week',
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  search: '/search/movie',
  movieDetails: (id) => `/movie/${id}`,
  movieVideos: (id) => `/movie/${id}/videos`,
  movieRecommendations: (id) => `/movie/${id}/recommendations`,
  genres: '/genre/movie/list'
}; 