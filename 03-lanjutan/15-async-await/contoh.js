// cara ringkas
const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", async function () {
	try {
		const inputKeyword = document.querySelector(".input-keyword");
		const movies = await getMovies(inputKeyword.value);
		updteUI(movies);
	} catch (err) {
		alert(err);
	}
});

async function getMovies(keyword) {
	const response = await fetch("http://www.omdbapi.com/?apikey=c7a6010f&s=" + keyword);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const response_1 = await response.json();
	if (response_1.Response === "False") {
		throw new Error(response_1.Error);
	}
	return response_1.Search;
}

function updteUI(movies) {
	let cards = "";
	movies.forEach((m) => {
		cards += showCard(m);
	});

	const movieContainer = document.querySelector(".movie-container");
	movieContainer.innerHTML = cards;
}

// Details ketika diklick
document.addEventListener("click", async function (e) {
	if (e.target.classList.contains("modal-detail-button")) {
		const imdbid = e.target.dataset.imdbid;
		const movieDetails = await getMovieDetail(imdbid);
		updateMovieDetail(movieDetails);
	}
});

async function getMovieDetail(imdbid) {
	const response = await fetch("http://www.omdbapi.com/?apikey=c7a6010f&i=" + imdbid);
	const m = await response.json();
	return m;
}

function updateMovieDetail(m) {
	const movieDetail = showMovieDetail(m);
	const modalBody = document.querySelector(".modal-body");
	modalBody.innerHTML = movieDetail;
}

function showCard(m) {
	return /*html*/ `<div class="col-md-3 my-3">
					<div class="card">
						<img src="${m.Poster}" class="card-img-top" />
						<div class="card-body">
							<h5 class="card-title">${m.Title}</h5>
					    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
							<a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
			        data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">show Details</a>
						</div>
					</div>
				</div>`;
}

function showMovieDetail(m) {
	return /*html*/ `<div class="container-fluid">
                    <div class="row">
                      <div class="col-md-2">
                        <img src="${m.Poster}" class="img-fluid" />
                      </div>
                      <div class="col-md">
                        <ul class="list-group">
                          <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                          <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                          <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                          <li class="list-group-item"><strong>Writers : </strong> ${m.Writer}</li>
                          <li class="list-group-item">
                            <strong>Plot : </strong> <br />
                            ${m.Plot}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>`;
}
