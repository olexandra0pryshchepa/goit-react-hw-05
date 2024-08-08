import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api";
import MovieList from "../components/MovieList/MovieList";


export default function MoviesPage ()  {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchQuery = searchParams.get("query") || "";
    if (!searchQuery) return;

    setLoading(true);
    searchMovies(searchQuery)
      .then(setMovies)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    setSearchParams({ query });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};


