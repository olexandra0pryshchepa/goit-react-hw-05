import axios from "axios";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTc4MjlkNGIyYTFkYzFjYzI3ODgzNzliNjFlZGIxNyIsIm5iZiI6MTcyMzEyNTM3NS45ODQ2MTYsInN1YiI6IjY1YjY2ODk4ZjY1OTZmMDE0OWZlOWViMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ObUiNfTPxxwpSdGbUzSydU9wjlL0BXOD4Mk3sMXHd50';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  try {
    const { data } = await options.get('/trending/movie/day');
    if (!data.results) {
      throw new Error('Invalid data structure for trending movies');
    }
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await options.get('/search/movie', {
      params: { query, include_adult: false },
    });
    if (!data.results) {
      throw new Error('Invalid data structure for search results');
    }
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};
export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await options.get(`/movie/${movieId}`);
    if (!data) {
      throw new Error('Invalid data structure for movie details');
    }
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const { data } = await options.get(`/movie/${movieId}/credits`);
    if (!data.cast) {
      throw new Error('Invalid data structure for movie credits');
    }
    return data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const getMovieReviews  = async (movieId) => {
  try {
    const { data } = await options.get(`/movie/${movieId}/reviews`);
    if (!data.results) {
      throw new Error('Invalid data structure for movie reviews');
    }
    return data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const IMAGE_SIZE = 'w500';

export const getImageUrl = (filePath) => {
  if (!filePath) return ''; 
  return `${IMAGE_BASE_URL}/${IMAGE_SIZE}${filePath}`;
};
