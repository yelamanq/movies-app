import React from "react";

const MoviesItem = ({movie, onClick}) => {
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const date = new Date(movie.release_date);
    const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
    });

    return (
        <div className="moviesItem" onClick={onClick}>
            <img src={poster} className="movieImg" alt="" />
            <h1 className="movieTitle">{movie.title.length > 50 ? movie.title.slice(0, 30) + '...' : movie.title}</h1>
            <p className="movieDate">{formattedDate}</p>
        </div>
    )
}

export default MoviesItem;