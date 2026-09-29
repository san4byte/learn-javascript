# 01 - Asynchronous Intro & Event Loop Architecture

## 1. 🎯 Tujuan Belajar
- Memahami mengapa JavaScript adalah bahasa single-threaded non-blocking.
- Memahami arsitektur Event Loop: Call Stack, Web APIs, Callback/Task Queue, dan Microtask Queue.
- Mampu memprediksi urutan output pengeksekusian kode sinkron dan asinkron.
- Mengetahui prioritas eksekusi antara Microtask (Promise) dan Macrotask (setTimeout).

---

## 2. 📖 Penjelasan Konsep
JavaScript adalah bahasa **Single-Threaded**, yang berarti ia hanya memiliki **satu Call Stack** dan hanya dapat mengeksekusi satu instruksi dalam satu waktu.

Namun, JavaScript dapat menjalankan operasi yang memakan waktu lama (seperti request HTTP jaringan, membaca timer, atau query database) secara **Asynchronous** (tanpa membekukan antarmuka pengguna). Hal ini dimungkinkan berkat arsitektur **Event Loop**.

### 🏛️ Diagram Arsitektur Event Loop

```text
  +-----------------------------------------------------------+
  |                        V8 RUNTIME                         |
  |                                                           |
  |   +-----------------------+     +---------------------+   |
  |   |      CALL STACK       |     |     MEMORY HEAP     |   |
  |   | (Mengeksekusi fungsi) |     |  (Alokasi memori &  |   |
  |   |  - baris per baris    |     |      variabel)      |   |
  |   +-----------+-----------+     +---------------------+   |
  +---------------|-------------------------------------------+
                  | (Jika ada async API, delegasikan)
                  v
  +-----------------------------------------------------------+
  |                   WEB APIS / NODE APIS                    |
  |  (setTimeout, fetch, DOM events, fs/network di background)|
  +-----------------------+-----------------------------------+
                          | (Setelah selesai/timer habis,
                          v  masukkan callback ke antrean)
  +-----------------------------------------------------------+
  |                      QUEUES (ANTREAN)                     |
  |                                                           |
  | 🥇 MICROTASK QUEUE (Prioritas Tinggi):                    |
  |    -> Promise (.then, .catch), queueMicrotask             |
  |                                                           |
  | 🥈 MACROTASK / TASK QUEUE (Prioritas Normal):             |
  |    -> setTimeout, setInterval, setImmediate              |
  +-----------------------+-----------------------------------+
                          |
                          | <--- [EVENT LOOP]
                          |      (Mengecek terus menerus:
                          |       Jika Call Stack KOSONG,
                          |       ambil antrean Microtask dulu,
                          |       baru kemudian Macrotask!)
                          v
                    CALL STACK
```

### Urutan Prioritas Pengeksekusian:
1. **Synchronous Code (Call Stack Utama)**: Langsung dieksekusi sampai selesai.
2. **Microtask Queue**: Dieksekusi segera setelah Call Stack kosong (semua antrean microtask dihabiskan dulu).
3. **Macrotask Queue**: Dieksekusi satu per satu setelah microtask selesai.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- Demonstrasi Urutan Eksekusi Event Loop ---");

console.log("1. [Synchronous] Awal script dieksekusi di Call Stack");

// Macrotask (Task Queue)
setTimeout(() => {
  console.log("4. [Macrotask - setTimeout] Dijalankan setelah antrean microtask kosong");
}, 0);

// Microtask (Microtask Queue)
Promise.resolve().then(() => {
  console.log("3. [Microtask - Promise.then] Dijalankan SEBELUM setTimeout meski delay 0ms!");
});

console.log("2. [Synchronous] Akhir script sinkron selesai");

/*
Penjelasan Alur Eksekusi:
1. '1. [Synchronous]' masuk Call Stack -> dicetak -> keluar.
2. setTimeout(..., 0) masuk Call Stack -> didaftarkan ke Web APIs -> masuk ke Macrotask Queue.
3. Promise.resolve().then(...) masuk Call Stack -> callback didaftarkan ke Microtask Queue.
4. '2. [Synchronous]' masuk Call Stack -> dicetak -> keluar.
5. Call Stack sekarang KOSONG.
6. Event Loop memprioritaskan Microtask Queue: callback Promise dicetak (3).
7. Microtask Queue kosong, Event Loop beralih ke Macrotask Queue: callback setTimeout dicetak (4).
*/
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Demonstrasi Urutan Eksekusi Event Loop ---
1. [Synchronous] Awal script dieksekusi di Call Stack
2. [Synchronous] Akhir script sinkron selesai
3. [Microtask - Promise.then] Dijalankan SEBELUM setTimeout meski delay 0ms!
4. [Macrotask - setTimeout] Dijalankan setelah antrean microtask kosong
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Bayangkan sebuah **Bank**: Call Stack adalah **Teller Bank** yang sedang melayani nasabah. Web API adalah **satpam yang memeriksa berkas di luar**. Saat berkas selesai, nasabah masuk antrean. **Microtask Queue** adalah nasabah dengan *Nomor Antrean Prioritas (VIP)*, sedangkan **Macrotask Queue** adalah nasabah dengan *Antrean Reguler*. Teller (Call Stack) akan selalu menghabiskan semua nasabah VIP sebelum memanggil satu pun nasabah reguler!

### 🏢 Real-World Use Case
1. **Menghindari UI Freeze**: Memecah kalkulasi data besar (misal pengolahan 500.000 data CSV) ke dalam microtask/setTimeout agar layar browser tidak macet (*not responding*).
2. **Pertanyaan Wajib Interview Kerja**: Urutan eksekusi `console.log`, `setTimeout`, dan `Promise.then` adalah soal nomor satu yang hampir selalu ditanyakan pada technical interview JavaScript/Node.js di semua level.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Infinite Microtask Loop**: Jika Anda membuat rekursif microtask (misal Promise `.then()` yang terus memanggil Promise `.then()` tanpa henti), Macrotask dan render tampilan browser tidak akan pernah dieksekusi sehingga browser mengalami freeze total.
* **Mengira setTimeout(fn, 0) Langsung Jalan**: Waktu `0ms` bukan berarti dijalankan saat itu juga di baris itu, melainkan 'masukkan ke antrean sesegera mungkin setelah Call Stack kosong'.

### 🌟 Best Practice
* Selalu letakkan kode sinkron yang cepat di Call Stack dan delegasikan tugas I/O (jaringan, file) ke API Asinkron.
* Pahami bahwa `queueMicrotask()` dapat digunakan jika Anda butuh fungsi dijalankan asinkron sebelum browser melakukan repaint tampilan.

---

## 6. ✍️ Latihan Mandiri
1. Tanpa menjalankan kodenya terlebih dahulu, tebak urutan angka dari kode berikut:
   ```javascript
   console.log("A");
   setTimeout(() => console.log("B"), 10);
   setTimeout(() => console.log("C"), 0);
   Promise.resolve().then(() => console.log("D"));
   console.log("E");
   ```
2. Jalankan kode tersebut di Node.js atau DevTools browser dan bandingkan dengan tebakan Anda.

---

## 7. 🧭 Navigasi
- ➡️ **Selanjutnya:** [02 - Timing Events (setTimeout & setInterval)](../02-timing-events/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
