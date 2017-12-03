/* Copyright Mikko Tuohimaa 2017 */

const express = require('express');
const currentWeekNumber = require('current-week-number');
const hih = require('./src/helsinki-ice-hall');

const app = express();
const PORT = process.env.PORT || 3000;
const searchString = "Siili";

app.use((request, response, next) => {
  const nextWeekNumber = currentWeekNumber() + 1;
  request.result = hih.hasReservation(searchString, nextWeekNumber);
  next();
});

app.get('/json', (request, response) => {
  request.result.then((result) => {
    response.send(JSON.stringify({result: result}));
  })
  .catch((err) => {
    console.log(err);
    return {error: err};
  });
});

app.get('/', (request, response) => {
  request.result.then((result) => {
    const header = '<h1>Does ' + searchString + ' have a reservation next week?</h1>';
    const value = result ? '<h2 style="color: green;">YES</h2>' : '<h2 style="color: red;">NO</h2>';
    response.send(header + value);
  })
  .catch((err) => {
    response.send(err);
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${PORT}`);
});

