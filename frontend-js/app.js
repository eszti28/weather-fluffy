import { logger } from './logger';
const localhost = 'http://localhost:3000/api';
const weatherID = '46d4b7c5d34fa20f4e66d522546c5d5f';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const button = document.querySelector('#search-button');
const city = document.querySelector('#search');
const card = document.querySelector('.card');
const cardHeader = document.querySelector('.card-header');
const textP = document.querySelectorAll('.info');
const error = document.querySelector('.error');
const alertBox = document.querySelector('.alert');
const langEng = document.querySelector('.eng');

button.addEventListener('click', (e) => {
  e.preventDefault();

  fetch(`${localhost}/weather/${city.value}`)
    .then((resp) => resp.json())
    .then((json) => {
      if (json.length === 0) {
        addToDatabase(city.value);
      } else {
        langEng.classList.contains('active') === false
          ? appendInfoFromDB(json)
          : appendInfoFromDBEng(json);
      }
    })
    .catch((err) => {
      logger(`${err}`);
      let message = '';
      langEng.classList.contains('active') === false
        ? (message = 'Nem találtunk ilyen várost')
        : (message = 'Could not find city');
      alertBox.style.display = 'flex';
      error.innerHTML = message;
      console.log(err);
    });
});

function addToDatabase(city) {
  fetch(`${weatherUrl}${city}&appid=${weatherID}&units=metric`)
    .then((resp) => resp.json())
    .then((json) => {
      langEng.classList.contains('active') === false
        ? appendInfoFromWeb(json)
        : appendInfoFromWebEng(json);
      return fetch(`${localhost}/weather`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ weatherData: json }),
      });
    })
    .catch((err) => {
      logger(`${err}`);
      let message = '';
      langEng.classList.contains('active') === false
        ? (message = 'Nem találtunk ilyen várost')
        : (message = 'Could not find city');
      alertBox.style.display = 'flex';
      error.innerHTML = message;
      console.log(err);
    });
}

function appendInfoFromDB(json) {
  card.style.display = 'flex';
  cardHeader.innerHTML = json[0].city;
  textP[0].innerHTML = `Dátum: ${new Date(
    json[0].date * 1000
  ).toLocaleString()}`;
  textP[1].innerHTML = `Koord.: ${json[0].coordlon}, ${json[0].coordlat}`;
  textP[2].innerHTML = `Hőmérséklet: ${json[0].temperature} °C`;
  textP[3].innerHTML = `Nyomás: ${json[0].pressure} hPa`;
  textP[4].innerHTML = `Pára: ${json[0].humidity}%`;
  textP[5].innerHTML = `Szél: ${json[0].windSpeed} erősség, ${json[0].windDeg} irány`;
  textP[6].innerHTML = `Felhők: ${json[0].clouds}%`;
}

function appendInfoFromWeb(json) {
  if (json.cod !== '404') {
    card.style.display = 'flex';
  } else {
    card.style.display = 'none';
  }
  cardHeader.innerHTML = json.name;
  textP[0].innerHTML = `Dátum: ${new Date(json.dt * 1000).toLocaleString()}`;
  textP[1].innerHTML = `Koord.: ${json.coord.lon}, ${json.coord.lat}`;
  textP[2].innerHTML = `Hőmérséklet: ${json.main.temp} °C`;
  textP[3].innerHTML = `Nyomás: ${json.main.pressure} hPa`;
  textP[4].innerHTML = `Pára: ${json.main.humidity}%`;
  textP[5].innerHTML = `Szél: ${json.wind.speed} erősség, ${json.wind.deg} irány`;
  textP[6].innerHTML = `Felhők: ${json.clouds.all}%`;
}

function appendInfoFromDBEng(json) {
  card.style.display = 'flex';
  cardHeader.innerHTML = json[0].city;
  textP[0].innerHTML = `Date: ${new Date(json[0].date * 1000).toLocaleString(
    'en-US'
  )}`;
  textP[1].innerHTML = `Coord.: ${json[0].coordlon}, ${json[0].coordlat}`;
  textP[2].innerHTML = `Temperature: ${json[0].temperature * 1.8 + 32} °F`;
  textP[3].innerHTML = `Pressure: ${json[0].pressure} hPa`;
  textP[4].innerHTML = `Humidity: ${json[0].humidity}%`;
  textP[5].innerHTML = `Wind: ${json[0].windSpeed} speed, ${json[0].windDeg} deg`;
  textP[6].innerHTML = `Clouds: ${json[0].clouds}%`;
}

function appendInfoFromWebEng(json) {
  if (json.cod !== '404') {
    card.style.display = 'flex';
  } else {
    card.style.display = 'none';
  }
  cardHeader.innerHTML = json.name;
  textP[0].innerHTML = `Date: ${new Date(json.dt * 1000).toLocaleString(
    'en-US'
  )}`;
  textP[1].innerHTML = `Coord.: ${json.coord.lon}, ${json.coord.lat}`;
  textP[2].innerHTML = `Temperature: ${json.main.temp * 1.8 + 32} °F`;
  textP[3].innerHTML = `Pressure: ${json.main.pressure} hPa`;
  textP[4].innerHTML = `Humidity: ${json.main.humidity}%`;
  textP[5].innerHTML = `Wind: ${json.wind.speed} speed, ${json.wind.deg} deg`;
  textP[6].innerHTML = `Clouds: ${json.clouds.all}%`;
}
