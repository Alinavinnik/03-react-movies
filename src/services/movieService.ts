import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieResponse {
  results: Movie[];
}

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<MovieResponse>(
    'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1',
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return data.results;
};

export default fetchMovies;
