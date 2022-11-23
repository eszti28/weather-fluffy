const cityInput = document.querySelector('#search');

const cities = [
  'Budapest',
  'Győr',
  'Debrecen',
  'Miskolc',
  'Pécs',
  'Sopron',
  'Szeged',
  'Gyékényes',
];

cityInput.addEventListener('keyup', () => {
  removeElements();
  for (let i of cities) {
    if (
      i.toLowerCase().startsWith(cityInput.value.toLowerCase()) &&
      cityInput.value != ''
    ) {
      let listItem = document.createElement('li');

      listItem.classList.add('list-items');
      listItem.style.cursor = 'pointer';
      listItem.setAttribute('onclick', "displayNames('" + i + "')");

      let word = '<b>' + i.substr(0, cityInput.value.length) + '</b>';
      word += i.substr(cityInput.value.length);
      listItem.innerHTML = word;
      document.querySelector('.list').appendChild(listItem);
    }
  }
});

function displayNames(value) {
  cityInput.value = value;
  removeElements();
}

function removeElements() {
  let items = document.querySelectorAll('.list-items');
  items.forEach((item) => {
    item.remove();
  });
}
