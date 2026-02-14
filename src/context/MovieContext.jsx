import { createContext, useState, useEffect, useContext} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (movie) => {
    setFavourites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavourite = (movieId) => {
    setFavourites((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </MovieContext.Provider>
  );
};
