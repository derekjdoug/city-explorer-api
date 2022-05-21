'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');
const notFound = require('./modules/notFound.js');

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from the home route');
});

const helpMovies = (request, response) => getMovies(request).then(data => response.status(200).send(data));
const helpWeather = (request, response) => getWeather(request).then(data => response.status(200).send(data));

app.get('/weather', helpWeather);
app.get('/movies', helpMovies);


app.use('*', notFound);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
