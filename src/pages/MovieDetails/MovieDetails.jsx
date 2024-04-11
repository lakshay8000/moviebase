import "./movieDetails.css";
import { useParams } from "react-router-dom";
import { searchMovieById } from "../../apis/omdb";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Rating } from '@smastrom/react-rating';



function MovieDetails() {
    const [movieInfo, setMovieinfo] = useState(null);

    const urlParams = useParams();
    // console.log(urlParams);

    async function getMovieDetails() {
        const response = await axios.get(searchMovieById(urlParams.id));
        setMovieinfo({ ...response.data });
    }

    useEffect(() => {
        /*
        // for testing ErrorBoundary component from react-error-boundary package
        let random= Math.random();
        if (random > 0.5) {
            getMovieDetails();
        }
        else {
            throw "error";
        }
        */

        getMovieDetails();
    }, [urlParams]);

    // also load on page refresh-
    useEffect(() => {
        getMovieDetails();
    }, []);

    // console.log(movieInfo);


    return (
        <div className="movie-details-page d-flex">
            <div className="movie-details-wrapper d-flex flex-wrap justify-content-center align-items-center gap-5 pb-5 pt-3">
                {
                    movieInfo &&
                    <div className="movie-card-wrapper">
                        <MovieCard poster={movieInfo.Poster} title={movieInfo.Title} />
                    </div>
                }
                {
                    movieInfo &&
                    <div className="movie-details d-flex flex-column flex-wrap gap-5 fs-5">
                        <div className="text-wrap">
                            Plot: {movieInfo.Plot}
                        </div>
                        <div className="text-wrap">
                            Actors: {movieInfo.Actors}
                        </div>
                        <div className="d-flex justify-content-start align-items-center flex-wrap gap-2">
                            <span className="">Genre:</span>
                            {movieInfo.Genre.split(",").map((genre) => {
                                return (
                                    <span key={genre} className="genre"> {genre} </span>
                                )
                            })}
                        </div>
                        <div className="d-flex flex-wrap align-items-center gap-3 w-100">
                            <span>
                                Rating:
                            </span>
                            <Rating style={{ maxWidth: 500 }} items={10} value={Math.floor(movieInfo.imdbRating)} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default MovieDetails;