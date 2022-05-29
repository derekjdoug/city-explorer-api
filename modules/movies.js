'use strict';
const axios = require('axios');
let cache = require('./cache.js');

async function getMovies(request) {
  const city = request.query;
  const key = 'movie-key:' + city;

  if (cache[key] && (Date.now() - cache[key].timestamp < 60000)) {
    console.log('Cache Hit');
    return cache[key];
  } else {
    console.log('Cache Miss');
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

    try {
      const moviesResponse = await axios.get(url);
      console.log(request.query.city);
      const movieArr = moviesResponse.data.results.map(movie => new Movies(movie));
      cache[key] = request.query;
      cache[key].timestamp = Date.now();
      cache[key].results = movieArr;
      console.log(movieArr);
      return Promise.resolve(movieArr);
    } catch (error) {
      error.customMessage = 'Something went wrong in your movies API call.';
    }
  }
}

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
    console.log(this.movie);
  }
}

module.exports = getMovies;
