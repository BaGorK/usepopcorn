import { useEffect, useRef, useState } from 'react';
import Loading from './components/Loading';
import Error from './components/Error';
import StarRating from './StartRating';

// const tempWatchedData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: 'tt0088763',
//     Title: 'Back to the Future',
//     Year: '1985',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const API_KEY = '6d7b592b';

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [query, setQuery] = useState('inception');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  // const tempQuery = 'interstellar';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setError('');
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Response === 'False') return setError('Movie not found');

        setMovies(data.Search);
      } catch (err) {
        setError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovie();
  }, [query]);

  function handleSelectMovie(id) {
    setSelectedMovieID((selectedMovieID) =>
      selectedMovieID === id ? null : id
    );
  }

  function onCloseMovie() {
    setSelectedMovieID(null);
  }

  function handleAddWatche(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((watchedMovie) => watchedMovie.imdbID !== id));
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults numMovies={movies.length} />
      </Nav>
      <Main>
        <Box>
          {isLoading && !error && <Loading />}
          {!isLoading && error && <Error message={error} />}
          {!isLoading && !error && (
            <MovieList
              handleSelectMovie={handleSelectMovie}
              movieData={movies}
            />
          )}
        </Box>
        <Box>
          {selectedMovieID ? (
            <MovieDetails
              onCloseMovie={onCloseMovie}
              selectedMovieID={selectedMovieID}
              handleAddWatche={handleAddWatche}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary WatchedMovieData={watched} />
              <WatchedMovieList
                WatchedMovieData={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Nav({ children }) {
  return <nav className='nav-bar'>{children}</nav>;
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      onChange={(e) => setQuery(e.target.value)}
      className='search'
      type='text'
      placeholder='Search Movies...'
    />
  );
}

function NumResults({ numMovies }) {
  return (
    <p className='num-results'>
      Found <strong>{numMovies}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

function Box({ children }) {
  return <div className='box'>{children}</div>;
}

function MovieList({ movieData, handleSelectMovie }) {
  return (
    <ul className='movie-list'>
      {movieData.map((movie) => (
        <Movie
          onClick={() => handleSelectMovie(movie.imdbID)}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onClick }) {
  return (
    <li className='list-hover' onClick={onClick}>
      <img src={movie.Poster} alt={movie.Title} />
      <div>
        <h3>{movie.Title}</h3>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({
  selectedMovieID,
  onCloseMovie,
  handleAddWatche,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [usrRating, setUsrRating] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovieID}`
      );

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedMovieID]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Gener: gener,
  } = movie; // Distructuring and Renaming

  let curRating;
  if (watched.some((movie) => movie.imdbID === selectedMovieID)) {
    const curMovie = watched.find((movie) => movie.imdbID === selectedMovieID);
    curRating = curMovie.userRating;
  }
  useEffect(() => {
    setIsWatched(watched.some((movie) => movie.imdbID === selectedMovieID));
  }, [watched, selectedMovieID]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovieID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating: usrRating,
    };

    handleAddWatche(newWatchedMovie);
    onCloseMovie();
  }

  // function handleUserRating() {
  //   setUserRating();
  // }

  return (
    <div className='details'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{gener}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <div className='rating'>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUsrRating}
                />
                {usrRating > 0 && (
                  <button className='btn-add' onClick={handleAdd}>
                    + Add to Watch
                  </button>
                )}
              </div>
            ) : (
              <p>You Rated({curRating}) this Movie</p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ WatchedMovieData }) {
  const average = (arr) => {
    const avgVal = arr.reduce((acc, val) => acc + val, 0);
    return avgVal / arr.length;
  };

  const avgImdbRating =
    WatchedMovieData.length > 0
      ? average(WatchedMovieData.map((watchedMovie) => watchedMovie.imdbRating))
      : 0;
  const avgUserRating =
    WatchedMovieData.length > 0
      ? average(WatchedMovieData.map((watchedMovie) => watchedMovie.userRating))
      : 0;
  const avgRuntime =
    WatchedMovieData.length > 0
      ? average(WatchedMovieData.map((watchedMovie) => watchedMovie.runtime))
      : 0;

  return (
    <div className='summary'>
      <h2>Movies you Watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{WatchedMovieData.length} Movies</span>
        </p>
        <p>
          {/* average imdb rating */}
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          {/* average user rating */}
          <span>⭐️</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>

        <p>
          {/* average run time */}
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ WatchedMovieData, handleDeleteWatched }) {
  return (
    <ul className='movie-list'>
      {WatchedMovieData.map((watchedMovie) => (
        <WatchedMovie
          key={watchedMovie.imdbID}
          handleDeleteWatched={handleDeleteWatched}
          watchedMovie={watchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ watchedMovie, handleDeleteWatched }) {
  return (
    <li>
      <img src={watchedMovie.poster} alt={watchedMovie.title} />
      <div>
        <h3>{watchedMovie.title}</h3>
        <div className='movie-list-detail'>
          <p>
            <span>⭐️</span>
            <span>{watchedMovie.imdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{watchedMovie.userRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{watchedMovie.runtime.toFixed(2)} min</span>
          </p>
          <button
            className='btn-delete'
            onClick={() => handleDeleteWatched(watchedMovie.imdbID)}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
}

export default App;
