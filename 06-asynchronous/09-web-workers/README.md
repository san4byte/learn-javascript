# 09 - Web Workers (Multi-Threading di Browser)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menjalankan skrip komputasi CPU intensif di background thread terpisah agar UI antarmuka browser tidak macet (_freeze_).
> - **Kapan Digunakan**: Pengolahan gambar filter kanvas, enkripsi data besar, parsing file CSV raksasa, atau kalkulasi fisika game web.
> - **Aturan Praktis**: Komunikasi antar Main Thread dan Worker Thread dilakukan melalui pertukaran pesan `postMessage()` dan event listener `onmessage`.

## 1. 🎯 Tujuan Belajar

- Memahami bahwa JavaScript secara default berjalan pada _Single Thread_ (Main Thread bersama dengan rendering UI).
- Menggunakan **Web Workers** untuk memproses komputasi CPU intensif di background thread.
- Berkomunikasi antar-thread menggunakan method `postMessage()` dan event handler `onmessage`.
- Mencegah UI browser mengalami _freeze_ / _unresponsive_ saat kalkulasi komputasi berat.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **restoran dengan kasir di depan dan koki di dapur belakang**:
>
> - **Main Thread** adalah kasir di meja depan yang bertugas melayani pelanggan, menerima pesanan, dan tersenyum ramah (responsivitas tombol UI dan scroll layar).
> - Jika kasir sendiri yang harus memasak rendang 4 jam di dapur, seluruh antrean nasabah di depan kasir akan macet total (layar browser freeze/not responding).
> - **Web Worker** adalah koki di dapur belakang: kasir mengirimkan nota pesanan ke dapur (`postMessage`), koki memasak di dapur tanpa mengganggu kasir, lalu koki mengirimkan masakan matang kembali ke depan (`postMessage`).

### 1. Masalah Single Thread di JavaScript

Secara default, proses eksekusi kode JavaScript dan render tampilan visual browser berbagi thread yang sama (_Main Thread_). Jika ada perulangan loop 1 miliar operasi matematika di Main Thread:

- Pengguna tidak bisa mengklik tombol apa pun.
- Halaman web tidak bisa di-scroll.
- Browser menampilkan peringatan _"Page Unresponsive / Webpage has crashed"_.

### 2. Cara Kerja Web Worker

Web Worker menginstansiasi thread sistem operasi baru di latar belakang:

1. File worker dipisahkan ke berkas JavaScript tersendiri (misal `worker.js`).
2. Di main thread: buat worker dengan `const worker = new Worker("worker.js")`.
3. Kirim data ke worker: `worker.postMessage(data)`.
4. Di dalam `worker.js`: tangkap dengan `self.onmessage = function(event) { ... }` dan kirim hasil kembali via `self.postMessage(hasil)`.
5. **Batasan**: Web Worker tidak memiliki akses langsung ke DOM (`window`, `document`) demi mencegah konflik memori multi-threading (_race conditions_).

---

## 3. 💻 Contoh Kode (`example.js` & `worker.js`)

```javascript
// Main UI Thread (example.js)
const btnCalculate = document.getElementById('btn-hitung');
const resultEl = document.getElementById('hasil');

// 1. Menginisialisasi Web Worker dari berkas terpisah
const worker = new Worker('worker.js');

btnCalculate.addEventListener('click', () => {
  resultEl.textContent = 'Sedang menghitung di background...';

  // 2. Mengirim tugas komputasi berat ke worker
  worker.postMessage(100000000);
});

// 3. Menerima hasil komputasi dari background worker
worker.onmessage = function (event) {
  resultEl.textContent = `Hasil Perhitungan: ${event.data}`;
  console.log('[MAIN THREAD]: Hasil diterima:', event.data);
};
```

```javascript
// Worker Thread (worker.js)
self.onmessage = function (event) {
  const number = event.data;
  console.log('[WORKER]: Menerima tugas komputasi berat untuk angka:', number);

  // Komputasi intensif CPU berjalan di thread terpisah tanpa membekukan layar
  let total = 0;
  for (let i = 0; i <= number; i++) {
    total += i;
  }

  // Mengirim hasil kembali ke Main Thread
  self.postMessage(total);
};
```

---

## 4. 🖥️ Output yang Diharapkan

```text
[WORKER]: Menerima tugas komputasi berat untuk angka: 100000000
[MAIN THREAD]: Hasil diterima: 5000000050000000
(Tampilan antarmuka browser tetap dapat di-scroll lancar selama proses berlangsung)
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pengolahan & Filter Gambar di Browser**: Menerapkan efek blur atau grayscale pada kanvas foto resolusi 4K tanpa membuat kursor mouse macet.
2. **Kalkulasi Data Spreadsheet Besar**: Melakukan operasi formula pada 500.000 baris sheet data keuangan di latar belakang.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Mengakses DOM di Worker**: Menulis `document.getElementById()` di dalam `worker.js` akan melempar error `ReferenceError: document is not defined`. Kirim data hasil kalkulasi kembali ke main thread untuk memanipulasi DOM.
- **Biaya Duplikasi Data (_Data Copying Overhead_)**: Data yang dikirim lewat `postMessage` disalin melalui algoritma _Structured Clone_. Jika mengirim data objek raksasa berulang-ulang, gunakan _Transferable Objects_ (seperti `ArrayBuffer`) agar transfer memori instan tanpa overhead penyalinan.

### 🌟 Best Practice

- Selalu matikan worker jika sudah tidak digunakan dengan `worker.terminate()` untuk membebaskan alokasi memori sistem operasi.
- Jalankan file HTML melalui local web server (bukan `file:///`) karena browser memblokir pembuatan Worker dari protokol file lokal karena kebijakan keamanan.

---

## 6. ✍️ Latihan Mandiri

1. Buat worker yang bertugas mencari deret bilangan prima dari angka 1 sampai 100.000.
2. Tambahkan input animasi loading CSS yang berputar di layar HTML untuk membuktikan bahwa animasi tetap berputar mulus tanpa jeda patah-patah saat worker sedang menghitung.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08 - Async / Await](../08-async-await/README.md)
- ➡️ **Selanjutnya:** [01 - Modul 07 (Modern Web API)](../../07-modern-web-api/01-web-storage/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
