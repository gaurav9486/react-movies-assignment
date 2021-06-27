import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [moviesData, setMoviesData] = useState([])
  const [moviesList, setMoviesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios("https://www.omdbapi.com/?apikey=45f0782a&s=war")
      .then((res) => setMoviesList(res.data.Search));
    setMoviesData(moviesList)
  }, []);
  
  const onSearch = () => {
    const updatedMovies = moviesData.filter((item) =>
      item.Title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setMoviesList(updatedMovies);
  };

  const onReset = () => {
    setMoviesList(moviesData);
  };

  return (
    <>
      <div className="header">
        <div className="logo-id">
          <i className="fas fa-camera"></i>
          <h1>Movies List</h1>
        </div>
        <div className="search-div">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search here"
          />
          <button onClick={onSearch}>Search</button>
          <button onClick={onReset}>Reset</button>
        </div>
      </div>

      <div className="movies-wrapper">
        {moviesList.length &&
          moviesList.map(({ Poster, Title }) => (
            <div className="movie-card">
              <img src={Poster} alt="img" />
              <h1>{Title}</h1>
            </div>
          ))}
      </div>
    </>
  );
};

export default App;
