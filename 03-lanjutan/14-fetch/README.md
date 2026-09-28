# 14 - Fetch API

## Tujuan Belajar
- Mengambil data dari REST API publik menggunakan Fetch API standar tanpa dependensi eksternal.
- Memahami mekanisme rantai Promise (*Promise Chaining*) dengan `.then()`.
- Mem-parsing respons stream HTTP menjadi format objek JSON (`response.json()`).
- Menampilkan data hasil API ke dalam kartu elemen DOM secara dinamis.

## Penjelasan Konsep
`fetch(url, [options])` adalah fungsi bawaan browser modern untuk melakukan HTTP Request berbasis Promise:
1. `fetch(url)` mengembalikan sebuah Promise yang me-resolve objek `Response`.
2. `response.json()` mem-parsing body respons menjadi objek JavaScript asli (juga me-resolve Promise).
3. Data hasil parsing diolah dan dirender ke dalam struktur HTML.

## Contoh Kode
```javascript
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
```

---
[⬅️ Materi Sebelumnya: 13 - Promise](../13-promise/README.md) | [Materi Selanjutnya: 15 - Async Await ➡️](../15-async-await/README.md)
