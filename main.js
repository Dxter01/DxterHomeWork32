let debounceTimer;

document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    console.log(query);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchMovies(query);
    }, 300);
});

async function fetchMovies(query) {
    if (!query || query.length < 2) {
        document.getElementById('results').innerHTML = '';
        return;
    }
    const response = await fetch (`http://www.omdbapi.com/?s=${query}&apikey=e533ec40`);
    if (response.ok) {
        const data = await response.json();
        if (data.Response === "False") {
            document.getElementById('results').innerHTML = '<p class="error">Нічого не знайдено</p>';
        } else {
            displayMovies(data.Search);
        }
    } else {
        document.getElementById('results').innerHTML = '<p class="error">Помилка при завантаженні даних</p>';
    }
}


function displayMovies(movies) {
    const moviesContainer = document.getElementById('results');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <p>${movie.Type}</p>
        `;
       
        moviesContainer.appendChild(movieElement);
    });
}