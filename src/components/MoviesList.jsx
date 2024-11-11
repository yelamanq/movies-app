import React from "react";
import MoviesItem from "./MoviesItem";
import fire from '../assets/images/trending-fire.svg'
import saveIcon from '../assets/images/save.svg'
import savedIcon from '../assets/images/saved.svg'

const MoviesList = ({listTitle, movies, openMovieModal, savedSelected, setSavedSelected}) => {

    const handleSaved = () => {
        if (savedSelected) {
            setSavedSelected(false)
        }
        else {
            setSavedSelected(true)
        }
    }

    return (
        <div className="moviesListContainer">
            {savedSelected
                ? (
                    <div className="listQuery">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1 className="listTitle">Saved Movies</h1>
                        </div>
                        <img src={savedSelected ? savedIcon : saveIcon} alt="" className="saveImg" onClick={() => handleSaved()} />
                    </div>
                )
                : listTitle
                    ? (
                        <div className="listQuery">
                            <h1 className="listTitle">Results for "{listTitle}"</h1>
                            <img src={savedSelected ? savedIcon : saveIcon} alt="" className="saveImg" onClick={() => handleSaved()} />
                        </div>
                    )
                    : (
                        <div className="listQuery">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h1 className="listTitle">Trending</h1>
                                <img className="trendingFire" src={fire} alt="" />
                            </div>
                            <img src={savedSelected ? savedIcon : saveIcon} alt="" className="saveImg" onClick={() => handleSaved()} />
                        </div>
                    )
            }
            
            <div className="moviesList">
                {movies.length
                    ? (
                        movies.map((movie) => (
                            movie.poster_path && (
                                <MoviesItem 
                                    onClick={() => openMovieModal(movie)}
                                    movie={movie}
                                    key={movie.id}
                                />
                            )
                        ))
                    )
                    : <p className="noResults">No Results :(</p>
                }
            </div>
        </div>
    )
}

export default MoviesList;