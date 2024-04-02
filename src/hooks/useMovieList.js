import { useEffect, useState } from "react";
import { searchMovies } from "../apis/omdb";
import axios from "axios";

// We have created this reusable custom hook in such a way that it will work for creating movieList for homepage as well as search results-

function useMovieList(...args) {
    const [movieList, setMovieList] = useState([]);

    // we will use this fn inside useEffect() - 
    async function fetchMovies(...args) {                                 
        const urls = args.map((movieName) => searchMovies(movieName));    // "args" array has all the movie names inside it, we have to make an array of api links to search all those movies. Learn more about args in readme.md
        const response = await axios.all(urls.map((url) => axios.get(url)));  // Now, we want an array in which the repsonse of all these links is stored
        // console.log(response);
        if (response[0].data.Error) {
            setMovieList([]);
        }
        else {
            const movies = response.map((movieResponse) => movieResponse.data.Search);  // Now we will create an array in which we will convert the response into data
            const mergedMovies = [].concat(...movies);    // Now, we will create a single array in which we will merge (concatenate) all the movies
            setMovieList(mergedMovies);
        }
    }

    useEffect(() => {
        fetchMovies(...args);     
    }, [...args]);

    return movieList;
}

export default useMovieList;