import { LazyLoadImage } from 'react-lazy-load-image-component';

import "./movieCard.css";
import Spinner from '../Spinner/Spinner';

function MovieCard({ poster, title }) {

    return (
        <div className='movie-card d-flex flex-column'>

            <div className='movie-image d-flex justify-content-center align-items-center'>
                <LazyLoadImage
                    // beforeLoad={() => { console.log("before") }}
                    // onLoad={ () => {console.log("after")} }
                    src= {poster}
                    placeholder={<Spinner />}
                />
            </div>

            <div className='movie-card-details d-flex justify-content-center align-items-center'>
                <div className='movie-name text-center'> {title} </div>
            </div>
        </div >
    );
}

export default MovieCard;