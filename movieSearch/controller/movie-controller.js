const { tmdbAPI, fetchPopularMovies } = require('../config/tmdb');
const cache = require('../config/node-cache');
const parseMovie = require('../models/movie-model');

const searchMovie = async (req, res) => {
    const query = req.query.query;
    if(!query){
        return res.status(400).json({message: 'parameter is required'});
    }
    if(cache.has(query)){
        console.log(' fetch data from cache');
        return res.status.json(cache.get(query));
    }
    try {
        const response = await tmdbAPI.get(`/search/movie`,{
            params: {query}
        })

        const movie = response.data.results.map(parseMovie);
        cache.set(query, movie);
        res.status(200).json(movie);

        } catch (error) {
            console.log(error);
    }
}

const getPopularMovies = async (req, res) => {
    try {
        const movies = await fetchPopularMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular movies', error: error.message });
    }
}

module.exports = { searchMovie, getPopularMovies };