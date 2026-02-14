import '../css/MovieCard.css';
import { useMovieContext } from '../context/MovieContext';

export const MovieCard = ({ movie }) => {
  const { addFavourite, removeFavourite, isFavourite } = useMovieContext();
  const favourite = isFavourite(movie.id);

  function onLike(e) {
    e.preventDefault();
    if (favourite) {
      removeFavourite(movie.id);
    } else {
      addFavourite(movie);
    }
  }

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <div className="movie-overlay">
            <button className={`favourite-btn ${favourite ? 'active' : ''}`} onClick={onLike}>
              💗
            </button>
          </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date ? movie.release_date.split('-')[0] : "N/A"}</p>
        </div>
      </div>
    </>
  );
};

// export default MovieCard;
