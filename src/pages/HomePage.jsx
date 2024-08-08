import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api";
import MovieList from "../components/MovieList/MovieList";


export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

