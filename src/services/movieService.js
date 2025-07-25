const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'bbbd540a139e8577c3bedcd4834ceb5b';

// Debug log for API key
console.log('API Key status:', API_KEY ? 'Present' : 'Missing');

if (!API_KEY) {
  console.error('TMDB API key is missing. Please add VITE_TMDB_API_KEY to your .env file');
}

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};

const buildUrl = (endpoint, queryParams = {}) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    ...queryParams
  });
  const url = `${API_BASE_URL}${endpoint}?${params}`;
  // Debug log for URL (but hide the API key)
  console.log('Making API request to:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
  return url;
};

const handleResponse = async (response) => {
  // Debug log for response
  console.log('API Response status:', response.status);
  
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error details:', {
      status: response.status,
      statusText: response.statusText,
      error: error
    });
    throw new Error(error.message || `Failed to fetch data from TMDB: ${response.status}`);
  }
  const data = await response.json();
  // Debug log for successful response
  console.log('API Response summary:', {
    endpoint: response.url.replace(API_KEY, 'API_KEY_HIDDEN'),
    resultCount: data.results ? data.results.length : 'N/A',
    status: 'success'
  });
  return data;
};

// Test function to verify API connection
export const testApiConnection = async () => {
  try {
    const response = await fetch(buildUrl('/trending/movie/week'), API_OPTIONS);
    const data = await handleResponse(response);
    console.log('API Test successful:', {
      status: response.status,
      movieCount: data.results.length,
      firstMovie: data.results[0]?.title
    });
    return true;
  } catch (error) {
    console.error('API Test failed:', error);
    return false;
  }
};

export const getMovies = {
  trending: async () => {
    try {
      console.log('Fetching trending movies...');
      const response = await fetch(buildUrl('/trending/movie/week'), API_OPTIONS);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  popular: async () => {
    try {
      console.log('Fetching popular movies...');
      const response = await fetch(buildUrl('/movie/popular'), API_OPTIONS);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  topRated: async () => {
    try {
      console.log('Fetching top rated movies...');
      const response = await fetch(buildUrl('/movie/top_rated'), API_OPTIONS);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  upcoming: async () => {
    try {
      console.log('Fetching upcoming movies...');
      const response = await fetch(buildUrl('/movie/upcoming'), API_OPTIONS);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  search: async (query) => {
    if (!query?.trim()) return { results: [] };
    try {
      console.log('Searching movies for query:', query);
      const response = await fetch(
        buildUrl('/search/movie', {
          query: query.trim(),
          include_adult: false,
          language: 'en-US',
          page: 1
        }),
        API_OPTIONS
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getDetails: async (movieId) => {
    try {
      console.log('Fetching details for movie ID:', movieId);
      const [details, credits, similar] = await Promise.all([
        fetch(buildUrl(`/movie/${movieId}`, { append_to_response: 'videos' }), API_OPTIONS).then(handleResponse),
        fetch(buildUrl(`/movie/${movieId}/credits`), API_OPTIONS).then(handleResponse),
        fetch(buildUrl(`/movie/${movieId}/similar`), API_OPTIONS).then(handleResponse)
      ]);

      // Extract videos from the details response
      const videos = details.videos?.results || [];
      
      const result = {
        ...details,
        credits,
        videos: videos,
        similar: similar.results
      };

      // Debug log for video data
      console.log('Movie details fetched successfully:', {
        title: result.title,
        hasCredits: Boolean(result.credits),
        videoCount: videos.length,
        trailerCount: videos.filter(v => v.type === 'Trailer' && v.site === 'YouTube').length,
        similarCount: result.similar.length
      });

      return result;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  recommendations: (movieId, page = 1) => 
    fetchFromTMDB(ENDPOINTS.movieRecommendations(movieId), { page }),

  genres: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/genre/movie/list`, API_OPTIONS);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw new Error('Failed to fetch genres. Please check your API key and try again.');
    }
  }
}; 
