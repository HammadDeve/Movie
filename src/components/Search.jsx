import React from 'react';

const Search = ({ searchTerm, setSearchTerm, onSearch, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearch();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg 
          className="w-5 h-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full py-4 pl-12 pr-32 text-gray-100 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
      />

      <button
        type="submit"
        disabled={isLoading || !searchTerm.trim()}
        className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2
          ${isLoading 
            ? 'bg-gray-700 cursor-not-allowed' 
            : !searchTerm.trim()
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Searching</span>
          </>
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
};

export default Search;
