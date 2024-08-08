import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const castData = await getMovieCast(movieId);
      setCast(castData);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.castImage}
            />
            <div>
              <p>
                <strong>{actor.name}</strong> as {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
