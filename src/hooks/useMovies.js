import { useMemo } from "react"

export const useMovies = (movies, sort) => {
    const sortedMovies = useMemo(() => {
        return [...movies].sort((a, b) => {
          if (sort === 'popularity') {
            return b.popularity - a.popularity
          }
          else if (sort === 'date') {
            return new Date(b.release_date) - new Date(a.release_date)
          }
          else if (sort === 'rating') {
            return b.vote_average - a.vote_average
          }
          return 0;
        })
    }, [movies, sort])
    
    return sortedMovies;
}