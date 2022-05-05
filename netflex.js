const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a4880995fbb07d40249df7d0c03c8383';
const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

const $form = document.querySelector('#form');
const $input = document.querySelector('#search');
const $count = document.querySelector('#count');
const $results = document.querySelector('#results');
const $movie = document.querySelector('#movie');

// Make an API request to get movies for the given query
function getMovies(query) {
  fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then((response) => response.json())
    .then((response) => showMovies(response));
}

// Make an API request to get the details for the given movie
function getMovieDetails(movie) {
  fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((response) => showMovieDetails(response));
}

// Add the movies buttons to the DOM
function showMovies(movies) {
  $results.innerHTML = '';

  if (movies.total_results === 0) {
    $count.innerText = 'Aucun résultat, désolé !';
    return;
  }

  $count.innerText = `${movies.total_results} résultats`;

  $list = document.createElement('div');

  for (i = 0; i < movies.results.length; i++) {
    movies.results[i];
  }

  movies.results.forEach(function (movie) {
    const $movieButton = document.createElement('button');
    $movieButton.innerText = movie.title;

    if (movie.release_date) {
      const year = movie.release_date.split('-')[0];
      $movieButton.innerText += ` (${year})`;
    }

    $movieButton.addEventListener('click', function () {
      getMovieDetails(movie);
    });

    $list.appendChild($movieButton);
  });

  $results.appendChild($list);
}

function showMovieDetails(movie) {
  $movie.innerHTML = `
    <h2>${movie.title}</h2>
    <p>Genres : ${movie.genres.map((genre) => genre.name).join(', ')}</p>
    <img src=${IMAGES_URL}${movie.poster_path} alt="Affiche de ${movie.title}">
  `;
}

// Listen to form submit to trigger search
$form.addEventListener('submit', function (event) {
  event.preventDefault();

  getMovies($input.value);
});