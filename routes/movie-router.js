const express = require('express');
const { searchMovie, getPopularMovies } = require('../controller/movie-controller');
const router = express.Router();

router.get('/api/movies', searchMovie);
router.get('/api/movies/popular', getPopularMovies);

module.exports = router;