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

function App() {
  return (
    <>
      <nav className='nav-bar'>
        <div className='logo'>
          <span role='img'>🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input className='search' type='text' placeholder='Search Movies...' />
        <p className='num-results'>
          Found <strong>5</strong> results
        </p>
      </nav>
      <main className='main'>
        <div className='box'>
          <ul className='movie-list'>
            <li>
              <img src={tempMovieData[0].Poster} alt={tempMovieData[0].Title} />
              <div>
                <h3>{tempMovieData[0].Title}</h3>
                <p>
                  <span>🗓</span>
                  <span>{tempMovieData[0].Year}</span>
                </p>
              </div>
            </li>
            <li>
              <img src={tempMovieData[1].Poster} alt={tempMovieData[0].Title} />
              <div>
                <h3>{tempMovieData[1].Title}</h3>
                <p>
                  <span>🗓</span>
                  <span>{tempMovieData[1].Year}</span>
                </p>
              </div>
            </li>
            <li>
              <img src={tempMovieData[2].Poster} alt={tempMovieData[0].Title} />
              <div>
                <h3>{tempMovieData[2].Title}</h3>
                <p>
                  <span>🗓</span>
                  <span>{tempMovieData[2].Year}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className='box'>
          <div>
            <h3>Movies you Watched</h3>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{tempWatchedData.length} Movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{tempWatchedData[0].imdbRating}</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{tempWatchedData[0].userRating}</span>
              </p>

              <p>
                <span>⏳</span>
                <span>{''}</span>
              </p>
            </div>
          </div>

          <li>
            <img src={tempWatchedData[0].Poster} alt={tempWatchedData[0].Title} />
            <div>
              <h3>{tempWatchedData[0].Title}</h3>
              <p>
                <span>8.8</span>
                <span>10</span>
                <span>142min</span>
              </p>
            </div>
          </li>
        </div>
      </main>
    </>
  );
}

export default App;
