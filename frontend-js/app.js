const localhost = 'http://localhost:3000/api';
const weatherID = '46d4b7c5d34fa20f4e66d522546c5d5f';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const button = document.querySelector('button');
const city = document.querySelector('#search');
const card = document.querySelector('.card');
const cardHeader = document.querySelector('.card-header');
const cardText = document.querySelector('.card-text');
const textP = document.querySelectorAll('.info');

button.addEventListener('click', (e) => {
  e.preventDefault();

  fetch(`${localhost}/weather/${city.value}`)
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json);
      if (json.length === 0) {
        addToDatabase(city.value);
      } else {
        appendInfoFromDB(json);
      }
    })
    .catch((err) => console.log(err));
});

function addToDatabase(city) {
  fetch(`${weatherUrl}${city}&appid=${weatherID}&units=metric`)
    .then((resp) => resp.json())
    .then((json) => {
      appendInfoFromWeb(json);
      return fetch(`${localhost}/weather`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ weatherData: json }),
      });
    })
    .catch((err) => console.log(err));
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
  card.style.display = 'flex';
  cardHeader.innerHTML = json.name;
  textP[0].innerHTML = `Dátum: ${new Date(json.dt * 1000).toLocaleString()}`;
  textP[1].innerHTML = `Koord.: ${json.coord.lon}, ${json.coord.lat}`;
  textP[2].innerHTML = `Hőmérséklet: ${json.main.temp} °C`;
  textP[3].innerHTML = `Nyomás: ${json.main.pressure} hPa`;
  textP[4].innerHTML = `Pára: ${json.main.humidity}%`;
  textP[5].innerHTML = `Szél: ${json.wind.speed} erősség, ${json.wind.deg} irány`;
  textP[6].innerHTML = `Felhők: ${json.clouds.all}%`;
}
