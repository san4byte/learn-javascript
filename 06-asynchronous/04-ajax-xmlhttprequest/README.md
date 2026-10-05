# 04 - AJAX (Asynchronous JavaScript and XML) dengan XMLHttpRequest

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mengirim dan menerima data dari server web di latar belakang tanpa me-reload seluruh halaman menggunakan objek klasik `XMLHttpRequest`.
> * **Kapan Digunakan**: Memahami fondasi historis komunikasi asinkron web sebelum era modern Fetch API dan Axios.
> * **Aturan Praktis**: Periksa kondisi `xhr.readyState === 4` dan `xhr.status === 200` sebelum memproses data respons.

## 1. 🎯 Tujuan Belajar
- Memahami konsep dasar AJAX (*Asynchronous JavaScript and XML*).
- Mengetahui sejarah komunikasi asinkron sebelum Fetch API menggunakan objek `XMLHttpRequest`.
- Memahami tahapan siklus hidup `readyState` (0 s/d 4) dan kode status HTTP.
- Memproses data JSON dari REST API server secara asinkron tanpa reload browser.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **pelayan restoran yang mengantarkan pesanan ke dapur**:
> Anda dan teman Anda tetap duduk mengobrol santai di meja makan (UI web tidak freeze). Pelayan membawa nota pesanan ke dapur di belakang panggung (`xhr.send()`), menunggu juru masak selesai memasak (`readyState 4`), lalu membawakan sepiring makanan hangat kembali ke meja Anda saat sudah siap (`status 200`).

### 1. Apa itu AJAX?
AJAX adalah teknik pengembangan web yang memungkinkan halaman web memperbarui sebagian data secara dinamis dengan bertukar data dengan server di balik layar. Halaman web tidak perlu berkedip atau memuat ulang seluruh struktur HTML.

### 2. Siklus Hidup `readyState`
Objek `XMLHttpRequest` memiliki 5 fase status koneksi:
- **0 (`UNSENT`)**: Objek client telah dibuat, method `open()` belum dipanggil.
- **1 (`OPENED`)**: Method `open()` telah berhasil dipanggil.
- **2 (`HEADERS_RECEIVED`)**: Method `send()` telah dipanggil, header respons telah diterima.
- **3 (`LOADING`)**: Data respons sedang diunduh dari server (*streaming*).
- **4 (`DONE`)**: Operasi pengambilan data selesai sepenuhnya.

### 3. HTTP Status Code
Selain `readyState === 4`, kita wajib memeriksa status kode HTTP:
- **`200`**: Request sukses (*OK*).
- **`404`**: Endpoint data tidak ditemukan (*Not Found*).
- **`500`**: Terjadi kesalahan internal di server (*Internal Server Error*).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// AJAX Klasik menggunakan XMLHttpRequest (XHR)
const btn = document.getElementById("btn-request");
const output = document.getElementById("output");

btn?.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  const url = "https://jsonplaceholder.typicode.com/posts/1";

  // 1. Membuka koneksi HTTP GET secara asynchronous (parameter true)
  xhr.open("GET", url, true);

  // 2. Event listener saat status koneksi berubah
  xhr.onreadystatechange = function () {
    // readyState 4: DONE, status 200: OK
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        output.textContent = JSON.stringify(responseData, null, 2);
        console.log("AJAX Sukses:", responseData);
      } else {
        console.error("AJAX Gagal:", xhr.statusText);
      }
    }
  };

  // 3. Mengirimkan request ke server
  xhr.send();
});
```

---

## 4. 🖥️ Output yang Diharapkan
```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum..."
}
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
1. **Fitur Autocomplete Search Box**: Menampilkan saran pencarian produk setiap kali pengguna mengetikkan satu huruf di kolom pencarian tanpa me-reload form.
2. **Infinite Scroll Feed**: Mengambil 10 artikel berikutnya saat posisi scroll pengguna mendekati bagian bawah layar.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa `JSON.parse()`**: Data respons server tiba dalam bentuk string mentah (`xhr.responseText`). Mengakses `xhr.responseText.title` langsung akan menghasilkan `undefined`. Selalu parse string JSON terlebih dahulu.
* **Membuat Request Synchronous**: Memberikan parameter `false` pada `xhr.open("GET", url, false)` akan membekukan UI browser hingga data selesai diambil, memberikan pengalaman buruk (*bad UX*).

### 🌟 Best Practice
* Untuk proyek web modern, utamakan menggunakan **Fetch API** (`fetch()`) atau pustaka **Axios** yang berbasis Promise alih-alih `XMLHttpRequest` manual.
* Namun tetap pahami XHR karena fitur seperti *Upload Progress Event* persentase file masih sering menggunakan fondasi XHR di balik layar.

---

## 6. ✍️ Latihan Mandiri
1. Buat request XHR ke URL API publik `https://jsonplaceholder.typicode.com/users/1` dan tampilkan nama serta email pengguna ke dalam elemen HTML.
2. Tambahkan penanganan kondisi jika URL salah (misal status 404), tampilkan pesan "Data tidak ditemukan" di layar.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [03 - Callbacks](../03-callbacks/README.md)
- ➡️ **Selanjutnya:** [05 - Promise](../05-promise/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
