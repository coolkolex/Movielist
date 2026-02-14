import { useState, useEffect } from "react";
import { MovieCard } from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error(error);
        setError("Failed to load popular movies.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-messsage">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
              <MovieCard key={movie.id} movie={movie} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
