const button = document.querySelector('button');
const localhost = 'http://localhost:3000/api';
const weatherID = '46d4b7c5d34fa20f4e66d522546c5d5f';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

button.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`${localhost}/weather/Budapest`)
    .then((resp) => resp.json())
    .then((json) => {
      if (json.length === 0) {
        addToDatabase();
      } else {
        console.log(json);
      }
    })
    .catch((err) => console.log(err));
});

function addToDatabase() {
  fetch(`${weatherUrl}Budapest&appid=${weatherID}&units=metric`)
    .then((resp) => resp.json())
    .then((json) => {
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
