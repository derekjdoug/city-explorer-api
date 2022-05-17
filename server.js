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

app.get('/weatherData', (request, response, next) => {
  try {
    const city = request.query.city;
    console.log('type of query requested: ', city);
    const weatherResults = new Forecast(city);
    console.log('Forecast Result: ', weatherResults);
    response.status(200).send(weatherResults);
  } catch (error) {
      error.customMessage = 'Something went wrong in your weather API call.';
      next(error);
  }
});

class Forecast {
  static weatherForecast = require('./data/weather.json');

  constructor(city) {
    this.city = Forecast.weatherForecast.find(weatherObj => weatherObj.city_name.toLowerCase() === city.toLowerCase());
    this.forecastArr = this.city.data.map(weatherObj => ({'date': weatherObj.datetime, 'description': weatherObj.weather.description}));
    console.log(this.forecastArr);
  }

};

// Error handling function. MUST be last app.use function
app.use((error, request, response, next) => {
  response.status(500).send(`Uh oh. Server error during API call: ${error.customMessage}`);
})
// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
