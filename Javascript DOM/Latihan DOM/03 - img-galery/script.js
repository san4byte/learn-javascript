const container = document.querySelector(".container"),
	imgParent = document.querySelector(".img-parents"),
	imgChild = document.querySelectorAll(".thumb");

container.addEventListener("click", (e) => {
	if (e.target.className == "thumb") {
		// menyamakan atribut src
		imgParent.src = e.target.src;
		// animation
		imgParent.classList.add("fade");
		// setTimeout untuk meghilangkan animasi
		setTimeout(() => {
			imgParent.classList.remove("fade");
		}, 500);
	}
	// perulangan untuk opacity
	imgChild.forEach((child) => {
		if (child.classList.contains("active")) {
			child.classList.remove("active");
		}
	});

	e.target.classList.add("active");
});
