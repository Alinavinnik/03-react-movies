import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import type Movie from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast, { Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  //States
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const hideModal = () => setSelectedMovie(null);
  setIsLoading(true);
  setError(false);
  const searchBarHeandler = async (query: string) => {
    try {
      const response = await fetchMovies(query);
      if (response.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(response);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Markup components
  return (
    <>
      <SearchBar onSubmit={searchBarHeandler} />
      <Toaster position="top-center" />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={hideModal} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
}

export default App;
