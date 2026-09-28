// Penjelasan lengkap dapat dibaca pada README.md
// Mengambil data API menggunakan fetch() dan promise chaining .then()

const searchBtn = document.querySelector(".search-button");

if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    const inputKeyword = document.querySelector(".input-keyword");
    fetch("http://www.omdbapi.com/?apikey=c7a6010f&s=" + inputKeyword.value)
      .then((respons) => respons.json())
      .then((respons) => {
        const movies = respons.Search;
        let cards = "";
        movies.forEach((m) => {
          cards += showCard(m);
        });

        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = cards;
      })
      .catch((err) => console.error(err));
  });
}

function showCard(m) {
  return `<div class="col-md-3 my-3">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-imdbid="${m.imdbID}">show Details</a>
      </div>
    </div>
  </div>`;
}
