# 03 - Asynchronous Paralel (Promise.all/allSettled) dan AbortController

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menjalankan banyak request data jaringan secara serentak (paralel) untuk mempercepat loading aplikasi, serta mengendalikan pembatalan request tertunda menggunakan `AbortController`.
> - **Kapan Digunakan**: Mengambil data profil, notifikasi, dan analitik secara bersamaan di dashboard, serta membatalkan request pencarian lama saat pengguna mengetik kata kunci baru (_debounced live search_).
> - **Aturan Praktis**: Gunakan `Promise.all()` saat semua data wajib ada (_all-or-nothing_). Gunakan `Promise.allSettled()` untuk dashboard banyak widget agar satu service yang down tidak merusak tampilan widget lain. Selalu manfaatkan `AbortSignal.timeout(ms)` untuk proteksi request menggantung.

---

## 1. 🎯 Tujuan Belajar

- Mengidentifikasi masalah _bottleneck_ performa akibat pemanggilan `await` sekuensial yang ceroboh.
- Menguasai eksekusi konkurensi paralel menggunakan `Promise.all()` dan destrukturisasi array hasil.
- Mampu membangun antarmuka multi-widget tahan banting menggunakan `Promise.allSettled()`.
- Memahami bahaya _Race Condition_ pada komponen pencarian interaktif (_Autocomplete_).
- Menguasai cara kerja `AbortController` dan properti `signal` untuk membatalkan `fetch()`.
- Menggunakan `AbortSignal.timeout()` untuk menerapkan batas waktu toleransi request jaringan secara modern.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Eksekusi Sekuensial** seperti Anda memesan makanan di kasir: pesan burger, tunggu burger matang (5 menit), baru pesan es teh, tunggu es teh dibuat (2 menit). Total waktu: **7 menit**.
> - **`Promise.all`** seperti memesan burger dan es teh secara bersamaan ke dua pelayan dapur yang berbeda. Keduanya dimasak bersamaan, sehingga seluruh pesanan siap dalam waktu masakan terlama (**5 menit**).
> - **`AbortController`** seperti **tombol "Batalkan Pesanan" di aplikasi transportasi online**: Jika Anda salah mengetik alamat tujuan atau pengemudi terlalu lama merespon, Anda menekan tombol batal sebelum mobil meluncur ke rumah Anda.

---

### Tabel Perbandingan Penanganan Permintaan Jaringan

| Pola / Komponen          | Perilaku Saat Gagal           | Total Waktu Tunggu                            | Kapan Harus Digunakan                              |
| :----------------------- | :---------------------------- | :-------------------------------------------- | :------------------------------------------------- |
| **Sequential `await`**   | Berhenti di titik error       | Penjumlahan waktu ($T_1 + T_2 + T_3$)         | Jika tugas B membutuhkan data output dari tugas A. |
| **`Promise.all`**        | Langsung reject (_Fail-Fast_) | Secepat tugas terlama ($\max(T_1, T_2, T_3)$) | Semua data saling terikat (User + Autorisasi).     |
| **`Promise.allSettled`** | Tidak pernah melempar reject  | Secepat tugas terlama ($\max(T_1, T_2, T_3)$) | Dashboard multi-service independen.                |
| **`AbortController`**    | Melempar `AbortError`         | Dibatalkan seketika oleh klien                | Autocomplete search, timeout, unmount komponen.    |

---

### Pembahasan Mendalam Fitur & API

#### 1. Masalah Bottleneck Eksekusi Sekuensial (Sequential Await)

Menulis `await` baris demi baris pada operasi yang independen adalah kesalahan desain paling umum yang memperlambat website:

```javascript
// ❌ LAMBAT: Total 1.5 detik (500ms + 500ms + 500ms)
const user = await fetch("/api/user");
const stats = await fetch("/api/stats");
const notif = await fetch("/api/notif");
```

#### 2. Eksekusi Paralel Maksimal dengan `Promise.all()`

Memulai ketiga request pada saat yang sama sehingga total waktu tunggu hanya sepanjang request yang paling lambat:

```javascript
// ✅ CEPAT: Total hanya ~500 milidetik!
const [user, stats, notif] = await Promise.all([
  fetch("/api/user").then((r) => r.json()),
  fetch("/api/stats").then((r) => r.json()),
  fetch("/api/notif").then((r) => r.json()),
]);
```

#### 3. Ketahanan Parsial dengan `Promise.allSettled()`

Mencegah satu error membatalkan tampilan seluruh halaman. Setiap elemen hasil diperiksa statusnya:

```javascript
const results = await Promise.allSettled([fetchWidget1(), fetchWidget2()]);
results.forEach((res) => {
  if (res.status === "fulfilled") renderWidget(res.value);
  else renderFallbackError(res.reason);
});
```

#### 4. Fenomena Race Condition pada Live Search

Ketika pengguna mengetik `"lap"` lalu cepat mengetik `"laptop"`, request pertama untuk `"lap"` bisa saja tiba belakangan dari server dan menimpa hasil pencarian `"laptop"`.

#### 5. Arsitektur Pembatalan Request via `AbortController`

Hubungkan `controller.signal` ke opsi `fetch`:

```javascript
const controller = new AbortController();

fetch("/api/search?q=laptop", { signal: controller.signal })
  .then((res) => res.json())
  .catch((err) => {
    if (err.name === "AbortError") console.log("Request dibatalkan!");
  });

// Batalkan request kapan saja:
controller.abort();
```

#### 6. Membatalkan Request Lama Saat Pengguna Mengetik Ulang

Simpan referensi controller aktif dan batalkan sebelum membuat request pencarian baru:

```javascript
let activeController = null;

function onSearch(keyword) {
  if (activeController) activeController.abort(); // Batalkan request sebelumnya
  activeController = new AbortController();

  fetch(`/api/search?q=${keyword}`, { signal: activeController.signal });
}
```

#### 7. Pola Auto-Timeout Menggunakan `AbortSignal.timeout(ms)`

Standar modern tanpa perlu menyetel timer `setTimeout` manual:

```javascript
try {
  // Otomatis dibatalkan jika server tidak merespon dalam 3 detik:
  const res = await fetch("/api/data", { signal: AbortSignal.timeout(3000) });
  const data = await res.json();
} catch (e) {
  if (e.name === "TimeoutError")
    console.error("Koneksi internet terputus (Timeout)!");
}
```

#### 8. Penanganan Error `AbortError` pada Blok `try...catch`

Pastikan kode Anda mengabaikan log error jika pembatalan memang sengaja dilakukan oleh sistem:

```javascript
try {
  const res = await fetch(url, { signal });
} catch (error) {
  if (error.name === "AbortError") {
    return; // Abaikan, ini aksi normal pengguna
  }
  console.error("Error jaringan sungguhan:", error);
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi benchmark durasi `Promise.all`, penanganan multi-widget menggunakan `Promise.allSettled`, serta simulasi pembatalan permintaan pencarian jaringan dengan `AbortController` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 07-modern-web-api/03-async-parallel-abort/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Dashboard Home E-Commerce**: Memuat data profil user, banner promosi, dan 10 produk terlaris secara paralel saat aplikasi pertama kali dibuka.
2. **Pembersihan Komponen UI (React / Vue Cleanup Effect)**: Membatalkan fetch data di dalam fungsi cleanup saat pengguna berpindah halaman sebelum request selesai dimuat.

### ⚠️ Common Pitfalls

- **Menggunakan `Promise.all` untuk Data yang Tidak Bersifat Kritis**: Jika 1 dari 10 service gagal (misal service avatar mati), `Promise.all` akan membatalkan 9 service penting lainnya (seperti data transaksi). Gunakan `Promise.allSettled` untuk kasus ini.
- **Lupa Menangkap Error `AbortError`**: Membiarkan error pembatalan mencemari log konsol atau menampilkan pop-up error palsu kepada pengguna.

### 🌟 Best Practice

- Selalu pasangkan `AbortSignal.timeout()` pada pemanggilan `fetch` eksternal untuk menghindari request menggantung selamanya (_infinite pending_).
- Gunakan `Promise.all()` jika dan hanya jika seluruh data memiliki ketergantungan mutlak satu sama lain.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi yang menjalankan 3 promise dengan `Promise.all` dan catat durasi total eksekusinya menggunakan `console.time('waktu')` dan `console.timeEnd('waktu')`.
2. Buat sebuah request `fetch` yang dibatalkan otomatis setelah 200 milidetik menggunakan `AbortSignal.timeout(200)`. Amati pesan error yang tertangkap di blok `catch`!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [02 - URL, URLSearchParams & FormData](../02-url-and-formdata/README.md)
- ➡️ **Materi Selanjutnya:** [04 - Debounce & Throttle](../04-debounce-and-throttle/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
