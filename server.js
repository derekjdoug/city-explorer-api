'use strict';

// this library lets us access our .env file
require('dotenv').config();

// express is a server library
const express = require('express');

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require('cors');


// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT;

// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('hello from the home route');
});

app.get('/weatherData', (request, response) => {
  const city = request.query.city;
  console.log('type of query requested: ', city);
  const weatherResults = new Forecast(city);
  console.log('Forecast Result: ', weatherResults);
  response.send(weatherResults);
});

class Forecast {
  static weatherForecast = require('./data/weather.json');

  forecastArr = [];
  cityForecast = [];

  constructor(city) {
    this.forecast = Forecast.weatherForecast.find(weatherObj => weatherObj.city_name === city).data;
    this.forecastArr = [this.forecast];
    console.log(this.forecastArr);
    this.date = this.forecast.find(weatherObj => weatherObj.datetime);
    this.weather = this.date.weather.description;
    this.forecastArr[0].map(day => this.cityForecast.push(`date: ${day.datetime}, description: ${day.weather.description}`));
    console.log(this.cityForecast);
    console.log(city);
  }

};

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
