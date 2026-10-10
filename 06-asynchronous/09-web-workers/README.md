# 09 - Web Workers (Multi-Threading di Browser)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menjalankan tugas komputasi intensif CPU di latar belakang (_background thread_) terpisah sehingga antarmuka peramban (_UI Main Thread_) tidak mengalami macet atau membeku (_freeze_).
> - **Kapan Digunakan**: Pengolahan gambar filter kanvas, enkripsi/dekripsi data besar, parsing berkas raksasa (CSV/JSON ratusan MB), pencarian teks kompleks, serta kalkulasi fisika grafis/game.
> - **Aturan Praktis**: Main Thread dan Worker Thread saling berkomunikasi secara aman melalui pesan asinkron menggunakan method `postMessage()` dan event listener `onmessage`. Web Worker **tidak memiliki akses langsung ke DOM** (`window`, `document`).

---

## 1. 🎯 Tujuan Belajar

- Memahami batasan _Single Thread_ di mana komputasi CPU berat dapat memblokir rendering antarmuka pengguna.
- Mengenal arsitektur multi-threading browser melalui antarmuka W3C **Web Workers**.
- Mampu membuat berkas worker terpisah dan menginisialisasinya via `new Worker()`.
- Menguasai pola pertukaran pesan dua arah (_bidirectional message passing_) dengan `postMessage()` dan `onmessage`.
- Mampu menangani error komputasi worker melalui event `worker.onerror`.
- Mengetahui cara mematikan alokasi worker dengan `worker.terminate()` dan `self.close()`.
- Memahami batasan keamanan memori: isolasi konteks tanpa objek DOM (`document`, `window`).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan sebuah **restoran cepat saji**:
>
> - **Main Thread** adalah **Kasir di meja depan**: tugas kasir adalah tersenyum menyapa tamu, menerima pesanan, dan mencetak struk (merespon klik tombol, mengetik di input, scrolling layar).
> - Jika kasir tersebut disuruh memasak rendang daging sapi selama 4 jam di meja kasir, maka **seluruh antrean pelanggan di depan pintu akan macet total** (_browser freeze / Not Responding_).
> - **Web Worker** adalah **Koki di dapur belakang**: Kasir hanya perlu mengirimkan nota pesanan ke dapur (**`postMessage`**). Koki memasak di ruang terpisah tanpa mengganggu senyum kasir di depan. Setelah masakan matang, koki mengirimkan hidangan kembali ke meja depan (**`onmessage`**).

---

### Diagram Arsitektur Main Thread vs Worker Thread

```text
+-----------------------------------+             +-----------------------------------+
|            MAIN THREAD            |             |           WORKER THREAD           |
| (UI, DOM, Event Klik, Animasi)    |             | (Komputasi Berat, Background CPU) |
+-----------------+-----------------+             +-----------------+-----------------+
                  |                                                 |
                  | --------- worker.postMessage(data) -----------> | (Menerima tugas)
                  |                                                 |
                  |                                                 | (Menghitung 100 juta
                  |                                                 |  operasi matematika...)
                  |                                                 |
                  | <-------- self.postMessage(hasil) ------------- | (Mengirim hasil)
                  v                                                 v
           UI Tetap Lancar 60 FPS!                           Tidak Ada Akses ke DOM
```

---

### Tabel Ringkasan API Web Workers

| Method / Properti          | Tempat Pemanggilan | Deskripsi Singkat                                              |
| :------------------------- | :----------------- | :------------------------------------------------------------- |
| `new Worker('file.js')`    | Main Thread        | Menginstansiasi thread worker baru dari berkas skrip terpisah. |
| `worker.postMessage(data)` | Main Thread        | Mengirimkan data dari thread utama ke thread worker.           |
| `self.postMessage(data)`   | Worker Thread      | Mengirimkan data hasil dari worker kembali ke thread utama.    |
| `worker.onmessage = fn`    | Main Thread        | Menangkap balasan data yang dikirimkan oleh worker.            |
| `self.onmessage = fn`      | Worker Thread      | Menangkap perintah data yang dikirimkan oleh thread utama.     |
| `worker.onerror = fn`      | Main Thread        | Menangkap kesalahan eksepsi runtime di dalam worker.           |
| `worker.terminate()`       | Main Thread        | Mematikan paksa eksekusi worker seketika dari luar.            |
| `self.close()`             | Worker Thread      | Menghentikan eksekusi worker dari dalam dirinya sendiri.       |

---

### Pembahasan Mendalam Fitur & API

#### 1. Batasan Single-Thread dan Masalah UI Freezing

Loop perhitungan matematika berskala besar di thread utama akan menahan Call Stack dan mencegah browser menggambar frame baru:

```javascript
// ❌ LOOP SINKRON BERAT: Seluruh browser macet total!
let total = 0;
for (let i = 0; i < 1000000000; i++) {
  total += i;
}
```

#### 2. Definisi & Konsep Dedicated Web Worker

Dedicated Web Worker adalah thread terpisah tingkat sistem operasi yang dikhususkan melayani satu halaman web penciptanya.

#### 3. Membuat Worker Baru: `new Worker('worker.js')`

Worker dibuat dengan memberikan URL atau path berkas JavaScript terpisah.

```javascript
// Di main thread (example.js):
const myWorker = new Worker("worker.js");
```

#### 4. Pengiriman Pesan Antar-Thread: `postMessage()`

Data yang dikirim melalui `postMessage()` tidak berbagi referensi memori, melainkan disalin menggunakan algoritma _Structured Clone Algorithm_ (aman dari _race condition_).

```javascript
// Mengirim data array angka ke worker:
myWorker.postMessage([10, 20, 30, 40]);
```

#### 5. Menerima Pesan: Event Listener `onmessage`

- Di dalam `worker.js`: gunakan objek global `self`.
- Di dalam `example.js`: gunakan objek instansiasi `worker`.

```javascript
// Di dalam worker.js:
self.onmessage = function (e) {
  const angka = e.data;
  const hasil = angka.reduce((a, b) => a + b, 0);
  self.postMessage(hasil); // Balas ke main thread
};
```

#### 6. Menangani Kesalahan Eksekusi: `worker.onerror`

Jika terjadi kesalahan sintaks atau eksepsi tak tertangani di dalam worker, event ini akan terpicu di thread utama.

```javascript
myWorker.onerror = function (error) {
  console.error(`Error pada worker di baris ${error.lineno}: ${error.message}`);
};
```

#### 7. Menghentikan Worker: `worker.terminate()` vs `self.close()`

Sangat penting untuk mematikan worker setelah tugas komputasi selesai agar memori RAM sistem operasi dibebaskan.

```javascript
// Mematikan dari Main Thread:
myWorker.terminate();

// Atau mematikan diri sendiri dari dalam worker.js:
// self.close();
```

#### 8. Batasan Akses Web Worker

Demi keamanan multi-threading, Web Worker **TIDAK memiliki akses** ke:

- Objek `document` (tidak bisa memanipulasi elemen DOM).
- Objek `window` (gunakan `self`).
- Elemen antarmuka visual.

Namun Web Worker **tetap memiliki akses** ke:

- `fetch()` dan `XMLHttpRequest`.
- Objek `navigator` dan `location`.
- Timer (`setTimeout`, `setInterval`).
- Web Cryptography API dan IndexedDB.

---

## 3. 💻 Kode Praktik Terpadu (`example.js` & `worker.js`)

Seluruh implementasi komunikasi dua arah antar-thread via `postMessage()`, penanganan balasan hasil via `onmessage`, pengujian isolasi thread di mana input form UI tetap responsif saat 100 juta angka dihitung, serta simulasi arsitektur di terminal telah dirangkum dalam berkas praktik [`example.js`](example.js) dan [`worker.js`](worker.js).

Jalankan demonstrasi simulasi di terminal:

```bash
node 06-asynchronous/09-web-workers/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan coba ketik teks di kotak input saat tombol hitung ditekan untuk merasakan keajaiban antarmuka yang 100% bebas dari lag (_zero UI freeze_)!

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Manipulasi Citra Digital / Canvas Image Processing**: Memproses filter greyscale, blur, atau kompresi gambar resolusi 4K di Web Worker agar pengguna tetap bisa menggeser tombol slider tanpa stutter.
2. **Parsing Berkas Spreadsheet CSV Besar**: Mengurai ribuan baris teks CSV menjadi objek JSON di background thread sebelum dimasukkan ke IndexedDB.

### ⚠️ Common Pitfalls

- **Mencoba Mengakses `document` di Dalam Worker**: Menulis `document.getElementById()` di dalam `worker.js` akan melempar fatal error `ReferenceError: document is not defined`.
- **Membuat Terlalu Banyak Worker Sekaligus**: Setiap Worker memakan alokasi memori thread sistem operasi tersendiri. Membuat 100 worker sekaligus akan membebani CPU komputer pengguna. Batasi penggunaan worker sesuai jumlah inti CPU (`navigator.hardwareConcurrency`).

### 🌟 Best Practice

- Selalu matikan worker yang sudah tidak digunakan menggunakan `worker.terminate()` untuk mencegah kebocoran memori.
- Gunakan Web Worker murni untuk beban komputasi berat, bukan untuk request data biasa yang cukup ditangani oleh `fetch()` asinkron standar.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Modifikasi berkas [`worker.js`](worker.js) agar dapat menerima objek perintah `{ aksi: "faktorial", nilai: 20 }` dan kembalikan hasil perhitungan faktorial tersebut ke antarmuka utama.
2. Tambahkan tombol _"Batalkan Komputasi"_ di halaman HTML yang memanggil method `worker.terminate()` saat ditekan pengguna!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [08 - Async Await](../08-async-await/README.md)
- ➡️ **Modul Selanjutnya:** [01 - Web Storage (Modul 07)](../../07-modern-web-api/01-web-storage/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
