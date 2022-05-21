'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const getMovies = require('./modules/movies');
const getWeather = require('./modules/weather');
const notFound = require('./modules/notFound');

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from the home route');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.use('*', notFound);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
