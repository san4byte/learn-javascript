# 02 - Timing Events (setTimeout dan setInterval)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengatur penjadwalan eksekusi kode di masa depan: menunda 1 kali eksekusi (`setTimeout`) atau menjalankan berulang secara periodik (`setInterval`).
> - **Kapan Digunakan**: Fitur jam digital, animasi hitung mundur (_countdown timer_), _debouncing_ pencarian pengguna, _polling_ server, dan rotasi slider gambar otomatis.
> - **Aturan Praktis**: Selalu simpan ID timer yang dikembalikan (`timerId` / `intervalId`) dan panggil `clearTimeout()` atau `clearInterval()` saat aksi selesai atau komponen dibersihkan guna mencegah kebocoran memori (_memory leak_).

---

## 1. 🎯 Tujuan Belajar

- Memahami cara kerja penundaan waktu menggunakan `setTimeout()`.
- Menguasai eksekusi periodik berulang menggunakan `setInterval()`.
- Mampu membatalkan timer yang sedang dijadwalkan menggunakan `clearTimeout()` dan `clearInterval()`.
- Mengetahui cara meneruskan argumen langsung ke dalam fungsi callback timer.
- Menguasai pola **Recursive setTimeout** sebagai alternatif modern yang lebih aman daripada `setInterval`.
- Memahami fenomena pergeseran waktu (_Timer Drift_) dan kebijakan penghematan daya (_throttling_) pada tab browser non-aktif.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **`setTimeout`** seperti **alarm jam weker di pagi hari**: Anda menyetelnya untuk berdering 1 kali setelah 7 jam ke depan. Jika Anda terbangun lebih awal sebelum alarm berdering, Anda dapat menekan tombol batal (**`clearTimeout`**).
> - **`setInterval`** seperti **detak bandul jam dinding**: berbunyi _"tik... tok..."_ secara konsisten setiap 1 detik tanpa henti sampai baterainya dicabut (**`clearInterval`**).
> - **`Recursive setTimeout`** seperti **pelari estafet mandiri**: pelari baru mulai bersiap lari untuk putaran berikutnya HANYA SETELAH ia selesai menuntaskan putaran saat ini, sehingga tidak akan pernah terjadi tabrakan antar-pelari jika salah satu putaran memakan waktu lebih lambat dari perkiraan.

---

### Tabel Ringkasan Fungsi Timing Events

| Fungsi Pewaktuan                  | Return Value            | Tujuan Utama                                            | Cara Membatalkan    |
| :-------------------------------- | :---------------------- | :------------------------------------------------------ | :------------------ |
| `setTimeout(fn, delay, ...args)`  | `number` / `Timeout` ID | Menjalankan fungsi 1 kali setelah delay waktu (ms).     | `clearTimeout(id)`  |
| `clearTimeout(id)`                | `undefined`             | Membatalkan timer pending yang belum sempat dieksekusi. | -                   |
| `setInterval(fn, delay, ...args)` | `number` / `Timeout` ID | Menjalankan fungsi berulang kali setiap interval (ms).  | `clearInterval(id)` |
| `clearInterval(id)`               | `undefined`             | Menghentikan perulangan interval selamanya.             | -                   |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks & Penggunaan `setTimeout(callback, delay, ...args)`

Menunda pengeksekusian fungsi sebesar `delay` milidetik (1 detik = 1000 milidetik).

```javascript
const timerId = setTimeout(() => {
  console.log("Dieksekusi 1 detik kemudian");
}, 1000);
```

#### 2. Membatalkan Timer Tertunda dengan `clearTimeout(timerId)`

Jika kondisi tertentu terpenuhi sebelum durasi timeout habis, eksekusi dapat digugurkan secara bersih.

```javascript
const timerPesan = setTimeout(() => {
  console.log("Pesan rahasia terkirim");
}, 3000);

// Batalkan sebelum 3 detik:
clearTimeout(timerPesan);
```

#### 3. Penjadwalan Periodik dengan `setInterval(callback, interval, ...args)`

Fungsi akan terus-menerus dipanggil setiap kelipatan waktu `interval` yang ditentukan.

```javascript
let detik = 0;
const intervalId = setInterval(() => {
  detik++;
  console.log(`Detik ke-${detik}`);
}, 1000);
```

#### 4. Menghentikan Interval dengan `clearInterval(intervalId)`

Wajib dipanggil untuk menghentikan timer berulang agar tidak memakan sumber daya CPU secara terus-menerus.

```javascript
// Hentikan interval jika detik sudah mencapai 5:
if (detik >= 5) {
  clearInterval(intervalId);
}
```

#### 5. Meneruskan Argumen Langsung ke Callback Timer

Anda dapat memberikan argumen tambahan setelah parameter delay tanpa perlu membungkusnya dalam _arrow function_.

```javascript
function sapa(nama, jabatan) {
  console.log(`Halo ${nama}, status: ${jabatan}`);
}

// Meneruskan argumen 'Joko' dan 'Admin' ke fungsi sapa
setTimeout(sapa, 2000, "Joko", "Admin");
```

#### 6. Pola Recursive setTimeout vs setInterval (Mencegah Overlapping)

Pada `setInterval`, jika isi callback memakan waktu komputasi 1.5 detik sedangkan interval disetel 1 detik, eksekusi callback akan saling bertumpuk (_overlapping_). Solusi terbaik adalah **Recursive setTimeout**:

```javascript
function loopAman() {
  // Lakukan komputasi atau request API...
  console.log("Selesai diproses.");

  // Jadwalkan putaran berikutnya HANYA setelah pekerjaan di atas selesai:
  setTimeout(loopAman, 1000);
}
setTimeout(loopAman, 1000);
```

#### 7. Isu Presisi Waktu (Timer Drift) dan Background Throttling

Timer JavaScript **tidak dirancang untuk presisi waktu tingkat mikroskopis/militer**:

- Jika Call Stack sedang sibuk memproses loop komputasi berat, timer akan tertunda (_timer drift_).
- Pada browser modern, ketika tab browser diminimalkan atau tidak aktif (_background tab_), browser secara otomatis membatasi interval menjadi minimal 1.000ms untuk menghemat baterai laptop/ponsel.

#### 8. Nilai Minimum Delay pada Browser (Aturan 4ms W3C)

Berdasarkan spesifikasi HTML5, setelah 5 tingkat penumpukan timer (_nested timers_), browser akan memberlakukan penundaan minimum paksa sebesar **4 milidetik**, meskipun Anda menyetelnya sebagai `0ms`.

```javascript
setTimeout(() => {
  // Nested 5 level akan dipaksa minimum 4ms oleh browser
}, 0);
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi penundaan waktu, pembatalan dengan `clearTimeout()`, pembuatan timer hitung mundur (_countdown_) via `setInterval()` dan `clearInterval()`, serta implementasi aman pola **Recursive setTimeout** telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/02-timing-events/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Implementasi Fitur Pencarian Debounce**: Menunggu pengguna selesai mengetik selama 500ms sebelum mengirim request ke server pencarian:
   ```javascript
   let timeoutDebounce;
   function onSearchInput(event) {
     clearTimeout(timeoutDebounce);
     timeoutDebounce = setTimeout(() => {
       fetchSearchResults(event.target.value);
     }, 500);
   }
   ```
2. **Auto-Logout Sesi Pengguna**: Mereset timer 15 menit setiap kali pengguna melakukan aktivitas mouse/keyboard di layar.

### ⚠️ Common Pitfalls

- **Lupa Menyimpan ID Interval dan Menghilangkannya**: Jika Anda memanggil `setInterval()` di dalam fungsi yang dipanggil berulang kali tanpa menyimpan ID-nya, interval baru akan terus bertambah dan berjalan di latar belakang tanpa cara untuk menghentikannya (_memory leak_ parah).
- **Menulis Callback Sebagai Eksekusi Langsung**: Menulis `setTimeout(sapa(), 1000)` alih-alih `setTimeout(sapa, 1000)`. Tanda kurung `()` menyebabkan fungsi `sapa` langsung dieksekusi seketika saat deklarasi, bukan ditunda.

### 🌟 Best Practice

- Selalu bersihkan interval atau timeout saat sebuah halaman web ditinggalkan atau saat komponen UI di-unmount.
- Lebih prioritaskan pola _Recursive setTimeout_ untuk operasi asinkron yang membutuhkan jeda konsisten antar-request (seperti _polling_ data server).

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi jam digital sederhana di terminal atau browser Console yang mencetak waktu saat ini (`new Date().toLocaleTimeString()`) setiap 1 detik.
2. Buat mekanisme pembatalan otomatis yang menghentikan jam digital tersebut setelah berjalan selama tepat 10 detik menggunakan perpaduan `setInterval` dan `setTimeout`!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [01 - Asynchronous Intro & Event Loop](../01-event-loop-intro/README.md)
- ➡️ **Materi Selanjutnya:** [03 - Callbacks](../03-callbacks/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
