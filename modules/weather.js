'use strict';
const axios = require('axios');
let cache = require('./cache.js');

async function getWeather(request) {
  const { lat, lon } = request.query;
  const key = 'weather-key:' + lat + lon;

  if (cache[key] && (Date.now() - cache[key].timestamp < 60000)) {
    console.log('Cache Hit');
    return cache[key];
  } else {
    console.log('Cache Miss');
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=6&key=${process.env.WEATHER_API_KEY}`;
    try {
      const weatherResponse = await axios.get(url);
      const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
      cache[key] = request.query;
      cache[key].timestamp = Date.now();
      cache[key].data = weatherArr;
      console.log(weatherArr);
      return Promise.resolve(weatherArr);
    } catch (error) {
      error.customMessage= 'Something went wrong in your weather API call.';
    }
  }
}

class Forecast {
  constructor(forecast) {
    this.date = forecast.datetime;
    this.description = forecast.weather.description;
  }
}

module.exports = getWeather;
