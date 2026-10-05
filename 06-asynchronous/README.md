# ⚡ Modul 06: Asynchronous JavaScript (Event Loop, AJAX, Promise, Fetch, Async/Await & Web Worker)

Selamat datang di **Modul 06**! Pemrograman Asinkron (*Asynchronous Programming*) adalah salah satu pilar paling krusial dalam JavaScript modern. Modul ini menggabungkan konsep Event Loop, AJAX klasik dari kurikulum PZN, Promise Concurrency, hingga Web Worker multi-threading.

---

## 📚 Daftar Materi Pembelajaran:

1. [01 - Asynchronous Intro & Event Loop Architecture](01-event-loop-intro/README.md)
   - Mengapa JavaScript single-threaded, arsitektur Call Stack, Web APIs, Microtask Queue vs Macrotask Queue.
2. [02 - Timing Events (setTimeout & setInterval)](02-timing-events/README.md)
   - Penjadwalan eksekusi satu kali dan berulang, pembatalan dengan clearTimeout & clearInterval.
3. [03 - Callbacks dan Masalah Callback Hell](03-callbacks/README.md)
   - Konsep fungsi callback asinkron dan masalah Pyramid of Doom pada kode bertingkat.
4. [04 - AJAX (XMLHttpRequest) - PZN](04-ajax-xmlhttprequest/README.md)
   - Komunikasi data klasik menggunakan `XMLHttpRequest`, tahapan `readyState`, dan penanganan response HTTP.
5. [05 - Promise (Pending, Fulfilled, Rejected)](05-promise/README.md)
   - Objek representasi masa depan, status settled, Promise chaining dengan `.then()`, `.catch()`, `.finally()`.
6. [06 - Promise Concurrency (Promise.all, race, any, allSettled) - PZN](06-promise-concurrency/README.md)
   - Menjalankan request paralel bersamaan dan menangani kondisi balapan (*race condition*).
7. [07 - Fetch API (HTTP Request Modern)](07-fetch-api/README.md)
   - Melakukan HTTP GET/POST, parsing JSON data, dan penanganan HTTP status code yang tepat.
8. [08 - Async dan Await](08-async-await/README.md)
   - Menulis kode asinkron dengan gaya bersih linier dan penanganan error via `try...catch`.
9. [09 - Web Workers (Multi-Threading di Browser) - PZN](09-web-workers/README.md)
   - Menjalankan tugas komputasi CPU intensif di background thread tanpa membuat UI browser macet/freeze.

---

## 🛠️ Cara Menjalankan
- Materi logika asinkron (Event loop, Promise, Concurrency, Async/Await) dapat langsung dijalankan dengan:
  ```bash
  node 06-asynchronous/06-promise-concurrency/example.js
  ```
- Materi browser (AJAX dan Web Worker) memerlukan file `index.html` dan dapat dijalankan dengan **Live Server**.

---

## 🧭 Navigasi
- ⬅️ **Modul Sebelumnya:** [05 - JavaScript DOM](../05-dom/README.md)
- ➡️ **Modul Selanjutnya:** [07 - Modern Web API & Real-World JS](../07-modern-web-api/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../README.md)
