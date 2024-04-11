import MovieCard from '../../components/MovieCard/MovieCard';
import "./home.css";
import useMovieList from '../../hooks/useMovieList';
import { useNavigate } from 'react-router-dom';


function Home() {
    const movieList= useMovieList("avengers", "harry", "superman");  // custom hook
    const navigate= useNavigate();

    // console.log(movieList);

    return (
        <div className='homepage-wrapper d-flex flex-wrap gap-5 pt-5 pb-5 justify-content-around' >
            {
                (movieList.length > 0) && movieList.map((movie) => {
                    return (
                        <div 
                            key={movie.imdbID}
                            onClick= {() => navigate(`/movie/${movie.imdbID}`)}
                        >
                            <MovieCard poster={movie.Poster} title={movie.Title}  />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Home;

