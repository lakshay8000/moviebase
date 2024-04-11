// it will return the api link -
export function searchMovies(term) {
    return `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${term}&page=1`;
}

export function searchMovieById(id) {
    return `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${id}`;
}
