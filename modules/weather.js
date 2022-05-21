'use strict';
const axios = require('axios');
const handleError = require('./error');

async function getWeather(request) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=6&key=${process.env.WEATHER_API_KEY}`;
  try {
    const weatherResponse = await axios.get(url);
    const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
    console.log(weatherArr);
    // response.status(200).send(weatherArr);
    return Promise.resolve(weatherArr);
  } catch (error) {
    error.customMessage = 'Something went wrong in your weather API call.';
    handleError(error, request);
  }
}

class Forecast {
  constructor(forecast) {
    this.date = forecast.datetime;
    this.description = forecast.weather.description;
  }
}

module.exports = getWeather;
