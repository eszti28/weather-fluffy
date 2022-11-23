const english = document.querySelector('.eng');
const hungarian = document.querySelector('.hun');
const submit = document.querySelector('#search-button');
const label = document.querySelector('.form-label');

english.addEventListener('click', () => {
  english.classList.add('active');
  hungarian.classList.remove('active');
  submit.innerHTML = 'Search';
  label.innerHTML = 'Search';
});

hungarian.addEventListener('click', () => {
  hungarian.classList.add('active');
  english.classList.remove('active');
  submit.innerHTML = 'Keresés';
  label.innerHTML = 'Keresés';
});
