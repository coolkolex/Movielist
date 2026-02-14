import "../css/Favourites.css";
import { useMovieContext } from "../context/MovieContext";
import { MovieCard } from "../components/MovieCard";

const Favourites = () => {
  const { favourites } = useMovieContext();

  if (favourites) {
    return (
      <div className="favourites">
        <h2>Your Favourites</h2>
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="favourites-empty">
        <h2>No Favourite Movies Yet</h2>
        <p>Start adding your favourite movies and they will appear here.</p>
      </div>
    </>
  );
};

export default Favourites;
