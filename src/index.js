import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StartRating';

const TestStar = () => {
  const [movieRating, setmovieRating] = useState(0);

  return (
    <div>
      <StarRating onSetRating={setmovieRating} />
      <p>This movie is rated {movieRating} stars</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <TestStar />
    <StarRating maxRating={5} defaultRating={3} />
    <StarRating maxRating={10} />
    <StarRating messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amaizing']} />
  </React.StrictMode>
);
