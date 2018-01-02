const rp = require('request-promise');
const padStart = require('lodash.padstart');

const endpoint = (weekNumber) => {
  const zeroPaddedWeekNumber = padStart(weekNumber, 2, '0');
  return `http://www.helsinginjaahalli.fi/jaavuorot/vko${zeroPaddedWeekNumber}.htm`;
};

const hasReservation = (searchString, weekNumber) => {
  return rp(endpoint(weekNumber))
    .then((htmlString) => {
      return htmlString.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
    });
};

module.exports = {
  hasReservation: hasReservation,
};
