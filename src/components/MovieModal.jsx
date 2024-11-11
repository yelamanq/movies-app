import React from "react";
import exitIcon from '../assets/images/exit.svg'
import saveIcon from '../assets/images/save.svg'
import savedIcon from '../assets/images/saved.svg'
import { CSSTransition } from "react-transition-group";

const MovieModal = ({visible, setVisible, movie, saved, setSaved}) => {
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const rootClasses = ['movieModal']
    if (visible) rootClasses.push('modalActive');

    const date = new Date(movie.release_date);
    const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
    });
    const hours = parseInt(movie.runtime / 60);
    const mins = movie.runtime % 60;
    const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';
    const rating = movie?.vote_average ? movie?.vote_average.toFixed(1) : 0.0;

    const isMovieSaved = (movie) => {
        return saved && saved.includes(movie.id)
    }

    const handleMovieSave = () => {
        let updatedSaved;
        if (isMovieSaved(movie)) {
            updatedSaved = saved.filter(id => id !== movie.id);
        } else {
            updatedSaved = [...saved, movie.id];
        }
        setSaved(updatedSaved);
        localStorage.setItem('saved', JSON.stringify(updatedSaved));
    };


    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <CSSTransition
            in={visible}
            timeout={300}
            classNames="slide-up"
            unmountOnExit
            >
                <div className="modalContentContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="exitModal">
                        <img src={exitIcon} alt="" className="exitImg" onClick={() => setVisible(false)} />
                    </div>
                    <div className="modalContent">
                        <img src={poster} className="modalImg" alt="" />
                        <div className="modalContentRight">
                            <div className="modalTitleAndRating">
                                <h1 className="modalTitle">{movie.title}</h1>
                                <div style={{display:'flex', alignItems: 'center', gap: 20}}>
                                    <div className={rating > 5 ? 'modalRating' : 'modalRating redRating'}>{rating === 0 ? '0.0' : rating}</div>
                                    <img src={isMovieSaved(movie) ? savedIcon : saveIcon} className="saveIcon" alt="" onClick={() => handleMovieSave()} />
                                </div>
                            </div>
                            <div className="modalInfo">
                                {formattedDate} • {genres} • {hours}h {mins}m
                            </div>
                            <div className="modalOverview">
                                <h1 className="overview">Overview</h1>
                                <p className="overviewContent">{movie?.overview}</p>
                            </div>
                            <div className="modalStatus">{movie.status}</div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default MovieModal;