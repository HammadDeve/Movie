# MovieHub - Modern Movie Discovery Platform

A beautiful and responsive movie discovery platform built with React, Tailwind CSS, and the TMDB API. Browse trending movies, search for your favorites, and explore detailed information about each film.

## 🚀 Features

- 🎬 Browse trending, popular, top-rated, and upcoming movies
- 🔍 Search movies with real-time results
- 🎯 Detailed movie information including ratings, release dates, and overviews
- 📱 Fully responsive design for all devices
- ✨ Beautiful UI with hover effects and smooth transitions
- 🎨 Modern dark theme with gradient accents

## 🛠️ Technologies Used

- React 18
- Vite
- Tailwind CSS
- TMDB API
- React Use (for debouncing)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (get it from [TMDB website](https://www.themoviedb.org/documentation/api))

## 🔧 Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Movie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Configuration

The application uses the TMDB API for fetching movie data. Make sure to:

1. Sign up for a TMDB account
2. Get your API key from the settings
3. Add the API key to your `.env` file
4. The API is configured to fetch:
   - Trending movies
   - Popular movies
   - Top-rated movies
   - Upcoming movies
   - Movie search results
   - Movie details and videos

## 📁 Project Structure

```
Movie/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   ├── Spinner.jsx
│   │   └── VideoPlayer.jsx
│   ├── services/
│   │   └── movieService.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── logo.png
│   └── [other images]
└── [config files]
```

## 🎨 UI Components

- **Navigation Bar**: Sticky navigation with category filters
- **Hero Section**: Dynamic hero section with search functionality
- **Featured Movies**: Carousel of featured movies with hover effects
- **Movie Cards**: Interactive cards with hover animations and movie details
- **Search**: Real-time search with debouncing
- **Loading States**: Smooth loading transitions
- **Error Handling**: User-friendly error messages

## 🔄 Available API Endpoints

The application uses the following TMDB API endpoints:

- `/trending/movie/week` - Get trending movies
- `/movie/popular` - Get popular movies
- `/movie/top_rated` - Get top-rated movies
- `/movie/upcoming` - Get upcoming movies
- `/search/movie` - Search movies
- `/movie/{id}` - Get movie details
- `/movie/{id}/videos` - Get movie videos

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- TMDB for providing the movie data API
- All the amazing open-source packages used in this project
- The React and Tailwind CSS communities
