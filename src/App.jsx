import { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import { getMovies } from './services/movieService';

// Import local images
const LOGO = '/logo.png';
const HERO_IMG = '/hero-img.png';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeCategory, setActiveCategory] = useState('trending');

  const handleSearch = async (term) => {
    if (!term?.trim()) {
      setMovieList([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setActiveCategory('search');

    try {
      const data = await getMovies.search(term.trim());
      setMovieList(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setErrorMessage('Error searching movies. Please try again later.');
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoviesByCategory = async (category) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getMovies[category]();
      if (category === 'trending') {
        setTrendingMovies(data.results);
      } else {
        setMovieList(data.results);
      }
    } catch (error) {
      console.error(`Error loading ${category} movies:`, error);
      setErrorMessage(`Error fetching ${category} movies. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = async (movie) => {
    setIsLoading(true);
    try {
      const details = await getMovies.getDetails(movie.id);
      setSelectedMovie(details);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setErrorMessage('Error fetching movie details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMoviesByCategory('trending');
  }, []);

  const categories = [
    { id: 'trending', label: '🔥 Trending', icon: '🔥' },
    { id: 'popular', label: '👥 Popular', icon: '👥' },
    { id: 'topRated', label: '⭐ Top Rated', icon: '⭐' },
    { id: 'upcoming', label: '🔜 Upcoming', icon: '🔜' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">MovieHub</span>
          </div>
          <div className="flex items-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  loadMoviesByCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="relative h-[500px] rounded-3xl overflow-hidden mb-12">
          <img 
            src={HERO_IMG}
            alt="Hero Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Amazing</span> Movies
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Explore thousands of movies, from latest releases to timeless classics.
                Start your cinematic journey today.
              </p>
              <Search 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                onSearch={() => handleSearch(searchTerm)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </header>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
              <Spinner />
              <p className="mt-4 text-gray-300">Loading...</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 text-center">
            {errorMessage}
          </div>
        )}

        {/* Featured Movies Carousel - Only show when not searching */}
        {!searchTerm && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trendingMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Content Section - Only show trending when not searching */}
        {activeCategory === 'trending' && !searchTerm && trendingMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-2">🔥</span> Trending Now
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trendingMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Search Results Section */}
        {searchTerm && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-2">🔍</span> Search Results
              {!isLoading && <span className="text-gray-400 text-lg ml-2">({movieList.length} results)</span>}
            </h2>
            {!isLoading && movieList.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {movieList.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
              </div>
            ) : !isLoading && (
              <p className="text-center text-gray-400 mt-8">
                No movies found. Try a different search term.
              </p>
            )}
          </section>
        )}

        {/* Category Results Section - Only show when not searching */}
        {!searchTerm && movieList.length > 0 && activeCategory !== 'trending' && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-2">{categories.find(c => c.id === activeCategory)?.icon}</span>
              {categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {movieList.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>
          </section>
        )}

        {selectedMovie && (
          <MovieDetails 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={LOGO} alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">MovieHub</span>
            </div>
            <p className="text-gray-400">
              Powered by TMDB API. All rights reserved © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
