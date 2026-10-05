# 05 - Optimasi Performa Event: Debounce dan Throttle

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami masalah performa (event flooding) pada event browser seperti input, scroll, dan resize.
> * **Kapan Digunakan**: Memahami konsep, cara kerja, dan implementasi teknik Debounce.
> * **Aturan Praktis**: Untuk delay input pencarian, rentang waktu debounce ideal adalah antara `250ms` hingga `400ms` (cukup responsif bagi manusia, namun sangat menghemat request server).

## 1. 🎯 Tujuan Belajar
- Memahami masalah performa (event flooding) pada event browser seperti input, scroll, dan resize.
- Memahami konsep, cara kerja, dan implementasi teknik Debounce.
- Memahami konsep, cara kerja, dan implementasi teknik Throttle.
- Mampu menentukan kapan harus menggunakan Debounce dan kapan harus menggunakan Throttle di aplikasi nyata.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> **Debounce** seperti *pintu lift otomatis*: pintu lift tidak akan pernah menutup selama masih ada orang yang melangkah masuk. Pintu baru menutup setelah 3 detik tidak ada satupun orang yang masuk. **Throttle** seperti *keran dispenser air otomatis*: saat Anda menekan tombolnya berulang kali secara histeris, air hanya akan keluar 1 cangkir setiap 5 detik.

Event tertentu di browser seperti `keyup` / `input` pada form pencarian, `scroll`, dan `resize` dapat terpicu hingga puluhan bahkan ratusan kali dalam satu detik.

Jika pada setiap event tersebut kita menjalankan operasi berat (seperti melakukan kalkulasi DOM atau menembak request HTTP ke server), aplikasi web akan mengalami:
* Layar tersendat (*frame rate drop / jank*).
* Server backend kebanjiran beban request sia-sia.
* Baterai perangkat user cepat habis.

Dua teknik utama industri untuk mengatasi masalah ini adalah **Debounce** dan **Throttle**.

### 1. Debouncing
**Debounce** menunda pemanggilan suatu fungsi hingga pengguna **berhenti melakukan aksi** selama jangka waktu tertentu.
* Jika aksi baru terjadi sebelum batas waktu tercapai, timer waktu akan di-reset dari awal.
* *Contoh Terbaik*: Fitur **Live Search / Autocomplete**. Kita hanya ingin memanggil API pencarian setelah user berhenti mengetik selama 300ms, bukan setiap kali 1 huruf diketik.

### 2. Throttling
**Throttle** memastikan bahwa suatu fungsi dieksekusi **paling banyak satu kali** dalam rentang interval waktu tertentu, tidak peduli seberapa sering event tersebut terpicu.
* *Contoh Terbaik*: Memantau posisi scroll halaman pada event `window.onscroll` untuk menampilkan tombol "Back to Top".

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Implementasi Fungsi Helper Debounce ---');
/**
 * Debounce: Menunda eksekusi fungsi sampai tidak ada aktivitas lagi selama delayMs.
 */
function debounce(fungsiAsli, delayMs = 300) {
  let timerId;

  return function (...args) {
    // Bersihkan timer sebelumnya jika user masih aktif melakukan trigger
    clearTimeout(timerId);

    // Buat timer baru
    timerId = setTimeout(() => {
      fungsiAsli.apply(this, args);
    }, delayMs);
  };
}

// Simulasi fungsi pencarian API
function lakukanPencarianAPI(query) {
  console.log(`[PANGGIL API] Mencari data produk untuk keyword: "${query}"`);
}

// Bungkus fungsi pencarian dengan debounce (delay 200ms)
const pencarianTerDebounce = debounce(lakukanPencarianAPI, 200);

console.log('Simulasi user mengetik cepat di keyboard:');
console.log("- User mengetik 'j'");
pencarianTerDebounce('j');

setTimeout(() => {
  console.log("- User mengetik 'ja' (setelah 50ms)");
  pencarianTerDebounce('ja');
}, 50);

setTimeout(() => {
  console.log("- User mengetik 'jav' (setelah 100ms)");
  pencarianTerDebounce('jav');
}, 100);

setTimeout(() => {
  console.log("- User berhenti mengetik di kata 'javascript' (setelah 150ms)");
  pencarianTerDebounce('javascript');
}, 150);

// Hasil: Dari 4 kali pengetikan, fungsi lakukanPencarianAPI hanya dipanggil 1 KALI saja!

// Tunggu sampai simulasi debounce selesai (400ms) sebelum memulai throttle
setTimeout(() => {
  console.log('\n--- 2. Implementasi Fungsi Helper Throttle ---');
  /**
   * Throttle: Membatasi eksekusi fungsi maksimal 1 kali setiap intervalMs.
   */
  function throttle(fungsiAsli, intervalMs = 200) {
    let terakhirDipanggil = 0;

    return function (...args) {
      const sekarang = Date.now();
      if (sekarang - terakhirDipanggil >= intervalMs) {
        terakhirDipanggil = sekarang;
        fungsiAsli.apply(this, args);
      }
    };
  }

  function rekamPosisiScroll(posisiY) {
    console.log(`[EVENT THROTTLE] Menghitung posisi scroll: ${posisiY}px`);
  }

  const scrollTerThrottle = throttle(rekamPosisiScroll, 100);

  // Simulasi scroll cepat browser
  console.log('Simulasi scroll intensif dalam 300ms:');
  scrollTerThrottle(10);  // Dipanggil (eksekusi pertama)
  scrollTerThrottle(50);  // Diabaikan (terlalu cepat)
  scrollTerThrottle(120); // Diabaikan

  setTimeout(() => scrollTerThrottle(250), 110); // Dipanggil (>100ms berlalu)
  setTimeout(() => scrollTerThrottle(400), 120); // Diabaikan
  setTimeout(() => scrollTerThrottle(600), 220); // Dipanggil (>100ms berlalu)
}, 450);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Implementasi Fungsi Helper Debounce ---
Simulasi user mengetik cepat di keyboard:
- User mengetik 'j'
- User mengetik 'ja' (setelah 50ms)
- User mengetik 'jav' (setelah 100ms)
- User berhenti mengetik di kata 'javascript' (setelah 150ms)
[PANGGIL API] Mencari data produk untuk keyword: "javascript"

--- 2. Implementasi Fungsi Helper Throttle ---

Simulasi scroll intensif dalam 300ms:
[EVENT THROTTLE] Menghitung posisi scroll: 10px
[EVENT THROTTLE] Menghitung posisi scroll: 250px
[EVENT THROTTLE] Menghitung posisi scroll: 600px
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Auto-save Formulir / Artikel Blog**: Menyimpan draft tulisan otomatis ke server 1 detik setelah user berhenti mengetik.
2. **Search Autocomplete**: Mencegah ribuan request API sia-sia saat user mengetik kata pencarian.
3. **Infinite Scroll Berbasis Scroll Listener**: Menggunakan throttle agar perhitungan posisi tinggi layar tidak membuat browser lemot.
4. **Window Resize Visualizer**: Menghitung ulang tata letak grid grafik dashboard saat ukuran jendela browser diubah.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Salah Memilih Antara Debounce vs Throttle**: Menggunakan debounce untuk event scroll bisa membuat tampilan kaku karena fungsi baru jalan saat user benar-benar berhenti menggerakkan mouse. Untuk scroll yang butuh update berkala terus-menerus, gunakan throttle.
* **Membuat Fungsi Debounce Baru di Dalam Render Loop**: Di framework seperti React, jika Anda membungkus fungsi dengan `debounce` langsung di dalam komponen tanpa `useMemo` atau `useCallback`, timer akan selalu dibuat ulang di setiap render sehingga debounce tidak berfungsi.

### 🌟 Best Practice
* Untuk delay input pencarian, rentang waktu debounce ideal adalah antara `250ms` hingga `400ms` (cukup responsif bagi manusia, namun sangat menghemat request server).
* Jangan menulis fungsi debounce/throttle sendiri di proyek produksi skala besar jika sudah menggunakan library utilitas standar industri seperti **Lodash** (`lodash.debounce` / `lodash.throttle`). Namun, memahami cara kerjanya di balik layar adalah syarat wajib wawancara kerja.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `debounceImmediate(fn, delay)` di mana fungsi dieksekusi pertama kali secara langsung saat klik pertama, kemudian panggilan berikutnya di-debounce.
2. Tuliskan kode HTML sederhana dengan input teks yang menampilkan panjang karakter tulisan hanya setelah user berhenti mengetik selama 500ms.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04 - Async Paralel dan AbortController](../04-async-parallel-abort/README.md)
- ➡️ **Selanjutnya:** [06 - Intersection Observer API](../06-intersection-observer/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
