'use strict';

// this library lets us access our .env file
require('dotenv').config();

// express is a server library
const express = require('express');

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require('cors');
const { default: axios } = require('axios');


// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT || 3002;

// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('hello from the home route');
});

app.get('/weatherData', async (request, response, next) => {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    console.log(request.query);
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    console.log(url);
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
    console.log(weatherArr);
    response.status(200).send(weatherArr);
  } catch (error) {
    error.customMessage = 'Something went wrong in your weather API call.';
    next(error);
  }
});

// app.get('/movieData', async (request, response, next) => {
//   try {
//   const searchQuery = request.query.searchQuery;
//   const url = `https://api.themoviedb.org/3/search/movie/${searchQuery}?api-key=${process.env.MOVIE_API_KEY}&`;
//   const movieResponse = await axios.get(url);
//   console.log(movieResponse.data);
//   const movieArr = movieResponse.data.results.map(movie => new Movies(movie));
//   response.status(200).send('testing on the movie endpoint');
// } catch (error) {
//   error.customMessage= 'Something went wrong in your weather API call.'
//   next(error);
// }
// });

class Forecast {
  constructor(forecast) {
    this.date = forecast.datetime;
    this.description = forecast.weather.description;
    // this.city = Forecast.weatherForecast.find(weatherObj => weatherObj.city_name.toLowerCase() === city.toLowerCase());
    // this.forecastArr = this.city.data.map(weatherObj => ({'date': weatherObj.datetime, 'description': weatherObj.weather.description}));
    console.log(this.forecast);
  }
}

// class Movies {
//   constructor(movieObj) {

//   }
// }

// Error handling function. MUST be last app.use function
app.use((error, request, response, next) => {
  response.status(500).send(`Uh oh. Server error during API call: ${error.customMessage}`);
});
// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
