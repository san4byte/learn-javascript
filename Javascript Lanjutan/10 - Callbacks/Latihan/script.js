$(".search-button").on("click", function () {
	$.ajax({
		url: "http://www.omdbapi.com/?apikey=c7a6010f&s=" + $(".input-keyword").val(),
		success: (results) => {
			const movies = results.Search;
			let cards = "";
			movies.forEach((m) => {
				cards += showCard(m);
			});
			$(".movie-container").html(cards);

			// ketika details diklick
			$(".modal-detail-button").on("click", function () {
				$.ajax({
					url: "http://www.omdbapi.com/?apikey=c7a6010f&i=" + $(this).data("imdbid"),
					success: (m) => {
						const movieDetails = showMovieDetail(m);
						$(".modal-body").html(movieDetails);
					},
					error: (e) => {
						console.log(e.responseText);
					},
				});
			});
		},
		error: (e) => {
			console.log(e.responseText);
		},
	});
});

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
