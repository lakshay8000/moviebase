// fontawesome imports-
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import { useContext, useRef, useState } from "react";
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import useMovieList from '../../hooks/useMovieList';
import useDebounce from '../../hooks/useDebounce';
import ThemeContext from '../../providers/ThemeContext';



function Navbar({themeReturner}) {
    const [searchText, setSearchText] = useState("");
    const navigate= useNavigate();
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    
    // here we will create movieList according to searchText
    const movieList= useMovieList(searchText);    


    /*
    The callback which we originally used in the onChange of search bar-
    (e) => setSearchText(e.target.value);

    Now we will make it a debounced callback, means this will be executed after some 
    delay-
    */
   
    // we are using useDebounce custom hook, it will return a function which will delay the original callback, we will use it on change of search input
    const debouncedCallback= useDebounce((e) => setSearchText(e.target.value), 1000);
    
    const searchInputRef= useRef(null);

    async function handleSearchResultClick(imdbID) {
        navigate(`/movie/${imdbID}`);
        searchInputRef.current.value= "";
        setSearchText("");
    }

    
    const {theme, setTheme} = useContext(ThemeContext);

    function themeUpdater() {
        if (theme == "dark") {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
        else if (theme == "light") {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    }

    return (
        <div className="navbar-wrapper d-flex align-items-center justify-content-around p-4">
            <a className="moviebase-title fw-bold fs-3" onClick={() => navigate("/")} >
                Movie Base
            </a>
            <div className="search-bar-wrapper">
                <input 
                    type= "text" 
                    placeholder="Search" 
                    className="search-bar form-control"
                    
                    onChange= { (e) => debouncedCallback(e) }
                    onFocus= {() => {
                        setSearchResultsVisible(true);
                    }}
                    onBlur= {() => { setSearchResultsVisible(false) }}
                    ref= {searchInputRef}
                />

                {
                    searchResultsVisible && 
                    <div className='search-results'  >
                        {(movieList.length > 0) && 
                        movieList.map((movie) => <div 
                                                     key= {movie.imdbID} 
                                                     onMouseDown= {() => handleSearchResultClick(movie.imdbID)}
                                                 > 
                                                     {movie.Title} 
                                                 </div>)}
                    </div>
                }
                
            </div>

            <div 
                className='theme-toggle' 
                onClick= {themeUpdater} 
            >
                {
                    (theme == "light")? 
                    <FontAwesomeIcon icon={faMoon} />
                    :
                    <FontAwesomeIcon icon={faSun} />
                }
            </div>
        </div>
    );
}

export default Navbar;

