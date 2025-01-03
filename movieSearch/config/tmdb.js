require('dotenv').config();
const axios = require('axios');

const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER}`
    }
});

const fetchPopularMovies = async () => {
    const response = await tmdbAPI.get('/movie/popular');
    return response.data.results;
};

module.exports = { tmdbAPI, fetchPopularMovies};