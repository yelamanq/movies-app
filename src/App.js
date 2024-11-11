import { useEffect, useMemo, useState } from 'react';
import './App.css';
import MoviesFilter from './components/MoviesFilter';
import { useDebounce } from './hooks/useDebounce';
import MoviesList from './components/MoviesList';
import { useFetching } from './hooks/useFetching';
import MoviesService from './API/MoviesService'
import Loader from './components/Loader';
import { useMovies } from './hooks/useMovies';
import MovieModal from './components/MovieModal';

function App() {

  const [filter, setFilter] = useState({sort: '', query: ''});
  const debouncedQuery = useDebounce(filter.query, 800);
  const [movies, setMovies] = useState([]);
  const [fetchMovies, isMoviesLoading, moviesError] = useFetching( async () => {
    if (savedSelected) {
      const savedMovies = await Promise.all(
        saved.map(async (id) => {
          const response = await MoviesService.getByID(id);
          return response.data;
        })
      );
      setMovies(savedMovies);
    }
    else if (filter.query === '') {
      const response = await MoviesService.getTrending();
      setMovies(response.data.results)
    }
    else {
      const response = await MoviesService.getBySearch(filter.query);
      setMovies(response.data.results)
    }
  })
  const sortedMovies = useMovies(movies, filter.sort)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('saved')) || [])
  const [savedSelected, setSavedSelected] = useState(false)
  

  const openMovieModal = async (movie) => {
    const response = await MoviesService.getByID(movie.id)
    setSelectedMovie(response.data)
    setModalVisible(true)
  }

  const handleLogoClick = () => {
    setFilter({...filter, query: ''})
    setSavedSelected(false)
  }

  useEffect(() => {
    fetchMovies()
  }, [debouncedQuery, savedSelected, saved])

  useEffect(() => {
    setSavedSelected(false)
  }, [debouncedQuery])

  return (
    <div className="App">
      <p className='textLogo' style={{cursor: 'pointer'}} onClick={handleLogoClick} >CineVerse</p>
      <h1 className="mainText">Find Movies And TV Shows</h1>
      <MoviesFilter filter={filter} setFilter={setFilter}/>
      {isMoviesLoading
        ? <Loader/>
        : <MoviesList
            listTitle={debouncedQuery}
            movies={sortedMovies} 
            openMovieModal={openMovieModal} 
            savedSelected={savedSelected} 
            setSavedSelected={setSavedSelected} 
          />
      }
      <MovieModal movie={selectedMovie} visible={modalVisible} setVisible={setModalVisible} saved={saved} setSaved={setSaved} />
    </div>
  );
}

export default App;
