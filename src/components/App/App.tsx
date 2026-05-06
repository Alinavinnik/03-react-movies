import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import type Movie from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast, { Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const hideModal = () => setSelectedMovie(null);

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
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={hideModal} />
      )}
    </>
  );
}

export default App;
