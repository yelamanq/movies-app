import React from "react";

const MoviesSearch = ({filter, setFilter}) => {
    return (
        <div className="moviesFilter">
            <input
                type="text"
                value={filter.query}
                placeholder="Search..."
                className="searchInput"
                onChange={e => setFilter({...filter, query: e.target.value})}
            />

            <select
                className="select"
                value={filter.sort}
                onChange={e => setFilter({...filter, sort: e.target.value})}
            >
                <option disabled value="">Sort by</option>
                <option value='popularity'>Popularity</option>
                <option value='date'>Release date</option>
                <option value='rating'>Rating</option>

            </select>
        </div>
    )
}

export default MoviesSearch;