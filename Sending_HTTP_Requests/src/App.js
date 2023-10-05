import React from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
import useMovie from "./hooks/use-movie";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
   const [movies, setMovies] = useState([]);

   const transformMovies = (movies) => {
      console.log(movies);
      const loadedMovies = [];
      for (const key in movies) {
         loadedMovies.push({
            id: key,
            openingText: movies[key].openingText,
            releaseDate: movies[key].releaseDate,
            title: movies[key].title,
         });
      }
      setMovies(loadedMovies);
   };

   console.log(movies);

   const { sendRequest, error, isLoading } = useMovie();
   useEffect(() => {
      sendRequest({
         url: "https://react-http-3a5f3-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
         transformMovies,
      });
   }, [sendRequest, movies]);

   const addMovieHandler = useCallback(
      (movie) => {
         sendRequest({
            url: "https://react-http-3a5f3-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
            method: "POST",
            body: movie,
            headers: {
               "Content-Type": "application/json",
            },
         });
      },
      [sendRequest]
   );

   let content = <p>Found no movies.</p>;

   if (movies.length > 0) {
      content = <MoviesList movies={movies} />;
   }

   if (error) {
      content = <p>{error}</p>;
   }

   if (isLoading) {
      content = <p>Loading...</p>;
   }

   return (
      <React.Fragment>
         <section>
            <AddMovie onAddMovie={addMovieHandler} />
         </section>
         <section>
            <button onClick={sendRequest}>
               Fetch Movies
            </button>
         </section>
         <section>{content}</section>
      </React.Fragment>
   );
}

export default App;
