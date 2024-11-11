import axios from "axios";

export default class RecipeService {
    static async getBySearch(movie) {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: '587e5075da10f5922c899424098d912c',
                query: movie,
                page: 1,
                language: 'en-US'
            }
        })
        return response
    }
    static async getByID(id) {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: '587e5075da10f5922c899424098d912c',
                language: 'en-US'
            }
        })
        return response
    }
    static async getTrending(id) {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
            params: {
                api_key: '587e5075da10f5922c899424098d912c',
                language: 'en-US'
            }
        })
        return response
    }

}