const localhost = 'http://localhost:3000/api';
const weatherID = '46d4b7c5d34fa20f4e66d522546c5d5f';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const button = document.querySelector('button');
const city = document.querySelector('#search');
const card = document.querySelector('.card');
const cardTitle = document.querySelector('.card-title');
const cardText = document.querySelector('.card-text');
const textP = document.querySelector('.temp');

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
        console.log(json);
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
  cardTitle.innerHTML = json[0].city;
  textP.innerHTML = json[0].temperature;
}

function appendInfoFromWeb(json) {
  card.style.display = 'flex';
  cardTitle.innerHTML = json.name;
  textP.innerHTML = json.main.temp;
}
