import { useEffect, useState } from 'react';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const API_KEY = '6d7b592b';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=interstellar`);
      const data = await res.json();
      setMovies(data.Search);
    };

    fetchMovie();
  }, []);

  return (
    <>
      <Nav>
        <Logo />
        <Search />
        <NumResults numMovies={movies.length} />
      </Nav>
      <Main>
        <Box>
          <MovieList movieData={movies} />
        </Box>
        <Box>
          <WatchedSummary WatchedMovieData={watched} />
          <WatchedMovieList WatchedMovieData={watched} />
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

function Search() {
  return <input className='search' type='text' placeholder='Search Movies...' />;
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

function MovieList({ movieData }) {
  return (
    <ul className='movie-list'>
      {movieData.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
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

function WatchedSummary({ WatchedMovieData }) {
  const average = (arr) => {
    const avgVal = arr.reduce((acc, val) => acc + val, 0);
    return avgVal / arr.length;
  };

  const avgImdbRating = average(WatchedMovieData.map((watchedMovie) => watchedMovie.imdbRating));
  const avgUserRating = average(WatchedMovieData.map((watchedMovie) => watchedMovie.userRating));
  const avgRuntime = average(WatchedMovieData.map((watchedMovie) => watchedMovie.runtime));

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
          <span>{avgImdbRating}</span>
        </p>
        <p>
          {/* average user rating */}
          <span>⭐️</span>
          <span>{avgUserRating}</span>
        </p>

        <p>
          {/* average run time */}
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ WatchedMovieData }) {
  return (
    <ul className='movie-list'>
      {WatchedMovieData.map((watchedMovie) => (
        <WatchedMovie watchedMovie={watchedMovie} key={watchedMovie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ watchedMovie }) {
  return (
    <li>
      <img src={watchedMovie.Poster} alt={watchedMovie.Title} />
      <div>
        <h3>{watchedMovie.Title}</h3>
        <div className='movie-list-detail'>
          <p>
            <span>⭐️</span>
            <span>{watchedMovie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{watchedMovie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{watchedMovie.runtime} min</span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default App;
