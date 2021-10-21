// import '@babel/polyfill';

const api = {
  key: '471d4cb3d37e4a118c4154637211810',
  baseUrl: 'https://api.weatherapi.com/v1',
};
const section = document.querySelector('.section__three');
const searchBox = document.querySelector('.search__box');
const searchBtn = document.querySelector('.search__btn');

//current
const cityName = document.querySelector('.city__name');
const weatherType = document.querySelector('.weather__type');
const tempNumber = document.querySelector('.temp__number');
const rainMm = document.querySelector('.rain__mm');
const imgIcon = document.querySelector('.img__icon');

//Today's Forecast
const todayDate = document.querySelector('.today__date');
const todayIcon = document.querySelector('.today__icon');
const todayType = document.querySelector('.today__type');
// const todayMin = document.querySelector('.today__min');
const todayMinNumber = document.querySelector('.today__min__number');
// const todayMax = document.querySelector('.today__max');
const todayMaxNumber = document.querySelector('.today__max__number');
const todayRain = document.querySelector('.today__rain');

//Tomorrow's Forecast
const tomorrowDate = document.querySelector('.tomorrow__date');
const tomorrowIcon = document.querySelector('.tomorrow__icon');
const tomorrowType = document.querySelector('.tomorrow__type');
const tomorrowMinNumber = document.querySelector('.tomorrow__min__number');
const tomorrowMaxNumber = document.querySelector('.tomorrow__max__number');
const tomorrowRain = document.querySelector('.tomorrow__rain');

//Past Tomorrow Forecast
const pastTomoDate = document.querySelector('.pastTomo__date');
const pastTomoIcon = document.querySelector('.pastTomo__icon');
const pastTomoType = document.querySelector('.pastTomo__type');
const pastTomoMinNumber = document.querySelector('.pastTomo__min__number');
const pastTomoMaxNumber = document.querySelector('.pastTomo__max__number');
const pastTomoRain = document.querySelector('.pastTomo__rain');

//Event Listeners
searchBox.addEventListener('keypress', setQuery);
searchBtn.addEventListener('click', function (e) {
  getResults(searchBox.value);
  section.classList.remove('hidden');
  section.classList.add('not_hidden');
  searchBox.value = '';
});

function setQuery(e) {
  if (e.key === 'Enter') {
    getResults(searchBox.value);
    section.classList.remove('hidden');
    section.classList.add('not_hidden');
    searchBox.value = '';
  }
}

// const getResults = async function (query) {
//   try {
//     const res = await fetch(
//       `${api.baseUrl}/forecast.json?key=${
//         api.key
//       }&q=${query.toLowerCase()}&days=3`
//     )
//       .then(data => {
//         return data.json();
//       })
//       .then(displayResults);
//   } catch (err) {
//     alert('Please type a correct address');
//   }
// };

var getResults = async function getResults(query) {
  try {
    var res = await fetch(
      api.baseUrl +
        '/forecast.json?key=' +
        api.key +
        '&q=' +
        query.toLowerCase() +
        '&days=3'
    )
      .then(function (data) {
        return data.json();
      })
      .then(displayResults);
  } catch (err) {
    alert('Please type a correct address');
  }
};

function displayResults(data) {
  let currentWeather = {
    cLocation: data.location.name,
    cDate: data.current.last_updated,
    cType: data.current.condition.text,
    cIcon: data.current.condition.icon,
    cTemp: data.current.temp_c,
    cRain: data.current.precip_mm,
  };

  renderName(cityName, currentWeather.cLocation);

  renderType(weatherType, currentWeather.cType);

  renderTemp(tempNumber, currentWeather.cTemp);

  renderRain(rainMm, currentWeather.cRain);

  renderIcon(imgIcon, currentWeather.cIcon);

  const todayForecast = data.forecast.forecastday[0];
  const today = {
    todayDate: todayForecast.date,
    todayIcon: todayForecast.day.condition.icon,
    todayType: todayForecast.day.condition.text,
    todayMin: todayForecast.day.mintemp_c,
    todayMax: todayForecast.day.maxtemp_c,
    todayRain: todayForecast.day.daily_chance_of_rain,
    todayPrep: todayForecast.day.totalprecip_mm,
  };
  renderDate(todayDate, today.todayDate);

  renderIcon(todayIcon, today.todayIcon);

  renderType(todayType, today.todayType);

  renderTemp(todayMinNumber, today.todayMin);

  renderTemp(todayMaxNumber, today.todayMax);

  renderRain(todayRain, today.todayPrep, today.todayRain);

  const tomorrowForecast = data.forecast.forecastday[1];
  const tomorrow = {
    tomorrowDate: tomorrowForecast.date,
    tomorrowIcon: tomorrowForecast.day.condition.icon,
    tomorrowType: tomorrowForecast.day.condition.text,
    tomorrowMin: tomorrowForecast.day.mintemp_c,
    tomorrowMax: tomorrowForecast.day.maxtemp_c,
    tomorrowRain: tomorrowForecast.day.daily_chance_of_rain,
    tomorrowPrep: tomorrowForecast.day.totalprecip_mm,
  };
  renderDate(tomorrowDate, tomorrow.tomorrowDate);

  renderIcon(tomorrowIcon, tomorrow.tomorrowIcon);

  renderType(tomorrowType, tomorrow.tomorrowType);

  renderTemp(tomorrowMinNumber, tomorrow.tomorrowMin);

  renderTemp(tomorrowMaxNumber, tomorrow.tomorrowMax);

  renderRain(tomorrowRain, tomorrow.tomorrowPrep, tomorrow.tomorrowRain);

  const pastTomoForecast = data.forecast.forecastday[2];
  const pastTomo = {
    pastTomoDate: pastTomoForecast.date,
    pastTomoIcon: pastTomoForecast.day.condition.icon,
    pastTomoType: pastTomoForecast.day.condition.text,
    pastTomoMin: pastTomoForecast.day.mintemp_c,
    pastTomoMax: pastTomoForecast.day.maxtemp_c,
    pastTomoRain: pastTomoForecast.day.daily_chance_of_rain,
    pastTomoPrep: pastTomoForecast.day.totalprecip_mm,
  };

  renderDate(pastTomoDate, pastTomo.pastTomoDate);

  renderIcon(pastTomoIcon, pastTomo.pastTomoIcon);

  renderType(pastTomoType, pastTomo.pastTomoType);

  renderTemp(pastTomoMinNumber, pastTomo.pastTomoMin);

  renderTemp(pastTomoMaxNumber, pastTomo.pastTomoMax);

  renderRain(pastTomoRain, pastTomo.pastTomoPrep, pastTomo.pastTomoRain);
}

//Rendering Functions
const renderDate = function (element, data) {
  element.textContent = data;
};

const renderName = function (element, data) {
  element.textContent = data;
};

const renderType = function (element, type) {
  element.textContent = type;
};

const renderTemp = function (element, str) {
  element.textContent = `${Math.round(+str)}℃`;
};

const renderIcon = function (element, str) {
  element.setAttribute('src', `http:${str}`);
};

const renderRain = function (element, str1, str2) {
  element.textContent = `Precipitation (mm): ${str1}`;
  if (str2)
    element.textContent = `Precipitation (mm): ${str1} and Chance of Rain: ${str2}%`;
};
