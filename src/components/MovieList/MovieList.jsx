import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../api";
import PropTypes from "prop-types";
import styles from "./MovieList.module.css";


export default function MovieList({ movies }) {
  const location = useLocation();
 return (
   <ul className={styles.movieList}>
     {Array.isArray(movies) &&
       movies.map((movie) => (
         <li className={styles.listItem} key={movie.id}>
           <Link to={`/movies/${movie.id}`} state={{ from: location }}>
             <img
               className={styles.imageMovie}
               src={getImageUrl(movie.poster_path)}
               alt={movie.title}
             />
             {movie.title}
           </Link>
         </li>
       ))}
   </ul>
 );

}; 

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};
