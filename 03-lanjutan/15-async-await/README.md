# 15 - Async / Await & Error Handling

## Tujuan Belajar
- Menulis kode asinkron dengan gaya penulisan imperatif yang mudah dibaca menggunakan `async` dan `await`.
- Memahami bahwa keyword `await` hanya dapat digunakan di dalam fungsi yang diawali `async`.
- Menangani error secara tangguh (*robust*) menggunakan blok `try...catch`.
- Memahami penanganan HTTP Error pada Fetch API (`response.ok` dan `throw new Error()`).

## Penjelasan Konsep
- **`async`**: Menandai bahwa fungsi bersifat asinkron dan selalu mengembalikan Promise.
- **`await`**: Memberhentikan sementara eksekusi baris berikutnya di dalam fungsi `async` hingga Promise yang ditunggunya selesai (*resolve*).
- **Error Handling**:
  Penting diingat bahwa `fetch()` **TIDAK AKAN** melempar error status HTTP (seperti 404 Not Found atau 500 Server Error) ke blok `catch`. Oleh karena itu, kita harus memeriksa properti `if (!response.ok)` dan melempar error secara eksplisit via `throw new Error(...)`.

## Contoh Kode
```javascript
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
```

---
[⬅️ Materi Sebelumnya: 14 - Fetch API](../14-fetch/README.md) | [Materi Selanjutnya: 04 - Modular Webpack ➡️](../../04-modular/README.md)
