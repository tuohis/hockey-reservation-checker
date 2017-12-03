const rp = require('request-promise');

const endpoint = (weekNumber) => {
  return `http://www.helsinginjaahalli.fi/jaavuorot/vko${weekNumber}.htm`;
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
