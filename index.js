/* Copyright Mikko Tuohimaa 2017 */

const express = require('express');
const currentWeekNumber = require('current-week-number');
const hih = require('./src/helsinki-ice-hall');
const cacheModule = require('./src/cache');
const cache = new cacheModule.Cache();

const app = express();

const PORT = process.env.PORT || 3000;
const searchString = "Siili";

const cacheKey = (year, weekNumber) => `${year}-${weekNumber}`;

app.use((request, response, next) => {
  const year = (new Date()).getFullYear();
  const nextWeekNumber = currentWeekNumber() + 1;
  request.nextWeekNumber = nextWeekNumber;
  const key = cacheKey(year, nextWeekNumber);
  cache.client.get(key, (err, reply) => {
    if (err) console.log(`An error happened when getting key ${key} from cache`, err);

    if (err || reply === null) {
      request.result = hih.hasReservation(searchString, nextWeekNumber);
      cache.client.set(key, request.result ? "true" : "", 'EX', 60*60*24);
    } else {
      request.result = Promise.resolve(Boolean(reply));
    }

    next();
  });
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
    const header = `<h1>Does ${searchString} have a reservation next week (week ${request.nextWeekNumber})?</h1>`;
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

