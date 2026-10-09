# 05 - Optimasi Performa Event: Debounce dan Throttle

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengontrol laju frekuensi pemanggilan fungsi (_rate limiting_) untuk mencegah banjir eksekusi (_event flooding_) pada kejadian yang terpicu sangat cepat seperti `input`, `scroll`, dan `resize`.
> - **Kapan Digunakan**: Menghemat request HTTP pada kolom pencarian otomatis (_Autocomplete_), memantau posisi scroll halaman web (_Scroll Progress Tracker_), serta menghitung ulang tata letak saat ukuran jendela diubah (_Resize Handler_).
> - **Aturan Praktis**: Gunakan **Debounce** jika Anda ingin fungsi baru berjalan HANYA SETELAH pengguna benar-benar berhenti melakukan aksi. Gunakan **Throttle** jika Anda ingin fungsi tetap dieksekusi secara teratur berkala maksimal 1 kali setiap $N$ milidetik selama aksi berlangsung.

---

## 1. 🎯 Tujuan Belajar

- Memahami ancaman performa _event flooding_ (penurunan frame rate dan kelebihan beban server).
- Menguasai konsep dan cara kerja teknik **Debouncing**.
- Menguasai konsep dan cara kerja teknik **Throttling**.
- Mampu mengimplementasikan fungsi pembungkus (_higher-order helper_) `debounce()` dan `throttle()` sendiri dari nol.
- Mengetahui kapan harus memilih Debounce dan kapan harus memilih Throttle pada kasus nyata di industri web.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Debounce** seperti **pintu lift gedung kantor**: Pintu lift tidak akan pernah menutup selama masih ada orang baru yang melangkah masuk ke dalam lift. Sensor lift akan mereset hitungan timer dari awal setiap kali ada orang baru masuk. Pintu lift baru benar-benar menutup setelah hening selama 3 detik tanpa ada orang baru lagi.
> - **Throttle** seperti **keran dispenser air otomatis di kantor**: Meskipun Anda menekan tombol keran air berkali-kali secara histeris 100 kali dalam 1 detik, mesin dispenser hanya akan mengalirkan 1 cangkir air setiap interval 5 detik.

---

### Tabel Perbandingan Debounce vs Throttle

| Kriteria Evaluasi       | Debounce                                                | Throttle                                                  |
| :---------------------- | :------------------------------------------------------ | :-------------------------------------------------------- |
| **Prinsip Utama**       | Menunggu sampai aktivitas benar-benar **berhenti**.     | Menjamin eksekusi teratur **maksimal 1x per interval**.   |
| **Pemicu Ulang**        | Timer selalu di-_reset_ dari nol setiap ada event baru. | Event baru diabaikan jika interval waktu belum berlalu.   |
| **Karakteristik Waktu** | Eksekusi tertunda di akhir (_trailing edge_).           | Eksekusi berkala selama aktivitas berlangsung.            |
| **Kasus Ideal**         | Search input, resize selesai, auto-save formulir.       | Infinite scroll, mousemove, slider games, audio playback. |

---

### Pembahasan Mendalam Fitur & API

#### 1. Masalah Event Flooding pada Scroll, Resize, dan Input

Event seperti `window.addEventListener('scroll')` dapat terpicu 60 hingga 120 kali per detik. Menjalankan manipulasi DOM atau request jaringan di dalamnya akan membuat peramban mengalami _jank_ (stuttering).

#### 2. Definisi & Mekanisme Kerja Debounce

Debounce memanfaatkan `clearTimeout` dan `setTimeout` untuk menunda eksekusi sampai rentang waktu hening (_quiet period_) tercapai.

```javascript
let timer;
function onType(val) {
  clearTimeout(timer);
  timer = setTimeout(() => kirimKeServer(val), 300);
}
```

#### 3. Implementasi Fungsi Helper `debounce(fn, delay)`

Higher-Order Function reusable yang mempertahankan konteks `this` dan argumen:

```javascript
function debounce(fn, delayMs = 300) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}
```

#### 4. Kapan Menggunakan Debounce

Sangat tepat untuk aksi yang hanya membutuhkan hasil final pengguna:

- **Pencarian Autocomplete**: Menunggu user selesai mengetik kata kunci.
- **Form Validation**: Menilai validitas password setelah user selesai mengetik.
- **Auto-Save Draft**: Menyimpan artikel ke database 1 detik setelah pengetikan berhenti.

#### 5. Definisi & Mekanisme Kerja Throttle

Throttle mencatat stempel waktu (_timestamp_) eksekusi terakhir dan hanya mengizinkan pemanggilan jika selisih waktu sudah melebihi interval yang ditentukan.

#### 6. Implementasi Fungsi Helper `throttle(fn, interval)`

Implementasi berbasis stempel waktu `Date.now()`:

```javascript
function throttle(fn, intervalMs = 200) {
  let waktuTerakhir = 0;
  return function (...args) {
    const sekarang = Date.now();
    if (sekarang - waktuTerakhir >= intervalMs) {
      waktuTerakhir = sekarang;
      fn.apply(this, args);
    }
  };
}
```

#### 7. Kapan Menggunakan Throttle

Sangat tepat untuk aksi berkelanjutan di mana pengguna perlu melihat progres secara bertahap:

- **Scroll Progress Bar**: Memperbarui persentase baca artikel di atas layar.
- **Infinite Scrolling**: Memeriksa apakah posisi scroll mendekati bagian bawah halaman.
- **Drag and Drop**: Memperbarui koordinat elemen saat mouse digeser.

#### 8. Panduan Keputusan: Debounce vs Throttle

- Apakah Anda hanya peduli dengan **keadaan akhir**? $\rightarrow$ Gunakan **Debounce**.
- Apakah Anda ingin aplikasi tetap **merespon secara bertahap** selama proses berjalan? $\rightarrow$ Gunakan **Throttle**.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi fungsi mandiri `debounce()` dan `throttle()`, simulasi pengetikan keyboard cepat beruntun, serta simulasi laju event scroll halaman telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 07-modern-web-api/05-debounce-and-throttle/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk menguji perbedaan pengetikan debounce di kotak input secara interaktif.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Live Search Box dengan Debounce**:
   ```javascript
   const inputCari = document.getElementById("search-input");
   const cariProdukDebounced = debounce((keyword) => {
     fetch(`/api/search?q=${keyword}`)
       .then((r) => r.json())
       .then(renderHasil);
   }, 300);
   inputCari.addEventListener("input", (e) =>
     cariProdukDebounced(e.target.value),
   );
   ```
2. **Indikator Scroll Bar dengan Throttle**:
   ```javascript
   window.addEventListener(
     "scroll",
     throttle(() => {
       const persentase =
         (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
         100;
       document.getElementById("progress-bar").style.width = `${persentase}%`;
     }, 100),
   );
   ```

### ⚠️ Common Pitfalls

- **Membuat Fungsi Debounce Baru di Dalam Event Listener**: Menulis `input.addEventListener('input', () => debounce(fn, 300)())` adalah kesalahan fatal. Instance debounce baru dibuat di tiap ketikan sehingga timer tidak pernah dibatalkan. Bungkus fungsinya sekali di luar listener.
- **Delay Debounce Terlalu Lambat**: Menyetel delay debounce hingga 1.000ms membuat antarmuka terasa lambat dan tidak responsif. Rentang ideal untuk input adalah `250ms - 400ms`.

### 🌟 Best Practice

- Gunakan pustaka utilitas teruji seperti Lodash (`lodash.debounce`, `lodash.throttle`) jika proyek berskala perusahaan besar.
- Untuk event scrolling murni yang hanya memantau visibilitas elemen, prioritaskan penggunaan **Intersection Observer API** alih-alih throttle scroll manual.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di browser. Pasang fungsi throttle pada event `window.addEventListener('resize')` untuk mencetak ukuran lebar jendela browser ke console maksimal 1 kali setiap 500ms.
2. Buat simulasi debounce untuk tombol auto-save formulir yang baru menyimpan data jika form tidak diedit selama 1 detik!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [04 - Async Parallel & AbortController](../04-async-parallel-abort/README.md)
- ➡️ **Materi Selanjutnya:** [06 - Intersection Observer](../06-intersection-observer/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
