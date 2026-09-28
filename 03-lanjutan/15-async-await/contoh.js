// Penjelasan lengkap dapat dibaca pada README.md
// Asynchronous dengan async/await dan penanganan error try..catch

const searchBtn = document.querySelector(".search-button");

if (searchBtn) {
  searchBtn.addEventListener("click", async function () {
    try {
      const inputKeyword = document.querySelector(".input-keyword");
      const movies = await getMovies(inputKeyword.value);
      updteUI(movies);
    } catch (err) {
      alert(err);
    }
  });
}

async function getMovies(keyword) {
  const response = await fetch("http://www.omdbapi.com/?apikey=c7a6010f&s=" + keyword);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  if (result.Response === "False") {
    throw new Error(result.Error);
  }
  return result.Search;
}

function updteUI(movies) {
  let cards = "";
  movies.forEach((m) => {
    cards += showCard(m);
  });
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCard(m) {
  return `<div class="col-md-3 my-3">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
      </div>
    </div>
  </div>`;
}
