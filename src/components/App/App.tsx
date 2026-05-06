import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import type Movie from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchBarHeandler = async (query: string) => {
    const response = await fetchMovies(query);
    if (response.length === 0) {
      toast.error('No movies found for your request.');
    }
    setMovies(response);
  };
  return (
    <>
      <SearchBar onSubmit={searchBarHeandler} />
      <Toaster position="top-center" />
      {movies && <MovieGrid movies={movies} />}
    </>
  );
}

export default App;
