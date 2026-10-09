# 01 - Pengenalan Asynchronous & Arsitektur Event Loop

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami bagaimana JavaScript yang berkarakteristik _single-threaded_ (satu utas eksekusi) dapat menangani operasi asinkron non-blocking tanpa membekukan halaman web atau server.
> - **Kapan Digunakan**: Fondasi arsitektur mutlak sebelum menggunakan timer, callback, Promise, AJAX, Fetch API, dan Async/Await.
> - **Aturan Praktis**: Kode sinkron selalu dieksekusi terlebih dahulu di Call Stack hingga bersih. Setelah Call Stack kosong, Event Loop selalu menghabiskan seluruh antrean **Microtask Queue** (Promise) sebelum mengeksekusi antrean **Macrotask Queue** (`setTimeout`).

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep eksekusi _Single-Threaded_ dan struktur kerja _Call Stack_.
- Mengidentifikasi bahaya operasi _blocking_ (I/O, komputasi berat) terhadap kelancaran antarmuka pengguna.
- Memahami peran _Web APIs_ (di browser) dan _C++ Libuv APIs_ (di Node.js) dalam menangani pekerjaan latar belakang (_background execution_).
- Membedakan prioritas antrean **Microtask Queue** vs **Macrotask Queue (Task Queue)**.
- Mampu memprediksi secara akurat urutan eksekusi (_execution order_) antara kode sinkron, `Promise.then()`, `queueMicrotask()`, dan `setTimeout()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan sebuah **Kantor Pelayanan Bank**:
>
> - **Call Stack** adalah **1 orang Teller Bank** yang hanya bisa melayani 1 nasabah dalam satu waktu.
> - **Web APIs / Libuv** adalah **satpam di luar ruangan** yang membantu nasabah mengisi formulir panjang di tempat parkir (di luar loket).
> - Ketika formulir selesai diisi, nasabah masuk ke barisan antrean:
>   - **Microtask Queue** adalah nasabah **Pemegang Tiket Prioritas VIP**: Teller wajib melayani dan menghabiskan seluruh antrean VIP terlebih dahulu sampai tuntas.
>   - **Macrotask Queue** adalah nasabah **Antrean Reguler** (`setTimeout`).
> - **Event Loop** adalah **manajer lantai**: Setiap kali Teller selesai melayani satu orang dan mejanya kosong (_Call Stack empty_), ia memanggil seluruh nasabah VIP (Microtask) terlebih dahulu. Jika antrean VIP benar-benar kosong, barulah ia memanggil 1 nasabah reguler (Macrotask).

---

### Diagram Arsitektur Event Loop

```text
+-----------------------------------------------------------+
|                        V8 RUNTIME                         |
|   +-----------------------+     +---------------------+   |
|   |      CALL STACK       |     |     MEMORY HEAP     |   |
|   | (Mengeksekusi fungsi) |     |  (Alokasi memori &  |   |
|   |  - satu per satu      |     |      variabel)      |   |
|   +-----------+-----------+     +---------------------+   |
+---------------|-------------------------------------------+
                | (Delegasi operasi async)
                v
+-----------------------------------------------------------+
|                   WEB APIS / NODE APIS                    |
|  (Timer, HTTP Fetch, DOM Events, Disk I/O di latar)       |
+-----------------------+-----------------------------------+
                        | (Saat selesai, masukkan ke antrean)
                        v
+-----------------------------------------------------------+
|                     ANTREAN / QUEUES                      |
|                                                           |
| 🥇 MICROTASK QUEUE (Prioritas Tinggi):                    |
|    -> Promise (.then, .catch, .finally), queueMicrotask   |
|                                                           |
| 🥈 MACROTASK / TASK QUEUE (Prioritas Normal):             |
|    -> setTimeout, setInterval, setImmediate              |
+-----------------------+-----------------------------------+
                        |
                        | <--- [EVENT LOOP]
                        |      (Mengecek terus menerus:
                        |       Jika Call Stack KOSONG,
                        |       ambil Microtask sampai habis,
                        |       lalu ambil 1 Macrotask)
                        v
                  CALL STACK
```

---

### Tabel Komponen Arsitektur Runtime JavaScript

| Komponen             | Lingkungan            | Tugas & Tanggung Jawab                                                             |
| :------------------- | :-------------------- | :--------------------------------------------------------------------------------- |
| **Call Stack**       | V8 Engine             | Wadah eksekusi kode sinkron dengan prinsip LIFO (_Last In, First Out_).            |
| **Memory Heap**      | V8 Engine             | Lokasi alokasi memori dinamis untuk objek dan variabel.                            |
| **Web APIs / Libuv** | Host (Browser / Node) | Menjalankan timer, request jaringan, dan I/O secara terpisah di luar thread utama. |
| **Microtask Queue**  | Runtime               | Antrean dengan prioritas tertinggi (`Promise`, `queueMicrotask`).                  |
| **Macrotask Queue**  | Runtime               | Antrean penanganan kejadian umum (`setTimeout`, `setInterval`).                    |
| **Event Loop**       | Runtime               | Penjaga gerbang yang memindahkan antrean ke Call Stack saat stack kosong.          |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sifat Single-Threaded JavaScript & Call Stack

JavaScript hanya memiliki satu alur eksekusi (_single thread_). Setiap pemanggilan fungsi akan ditumpuk (_pushed_) ke dalam Call Stack dan dikeluarkan (_popped_) setelah fungsi selesai mengembalikan nilai.

```javascript
function kali(a, b) {
  return a * b;
}
function kuadrat(n) {
  return kali(n, n);
}
console.log(kuadrat(4)); // Stack: main -> kuadrat -> kali
```

#### 2. Bahaya Operasi Blocking

Jika terdapat operasi sinkron yang berjalan sangat lama di Call Stack, browser akan mengalami _freeze_ (tombol tidak bisa diklik, animasi berhenti, tab macet).

```javascript
// ❌ CONTOH BLOCKING: Membekukan seluruh browser selama 3 detik!
const selesai = Date.now() + 3000;
while (Date.now() < selesai) {
  // Loop sinkron sibuk menahan Call Stack
}
```

#### 3. Web APIs dan Node.js C++ APIs (Background Workers)

Operasi berat seperti timer atau HTTP request tidak dieksekusi di Call Stack, melainkan didelegasikan ke thread internal peramban (Web APIs) atau pustaka Libuv di Node.js.

```javascript
// JavaScript hanya mendaftarkan timer ke Web APIs lalu langsung lanjut ke baris berikutnya
setTimeout(() => {
  console.log("Timer selesai di latar belakang");
}, 1000);
```

#### 4. Macrotask Queue (Task Queue)

Tempat bertenggernya callback dari fungsi penjadwalan seperti `setTimeout()`, `setInterval()`, dan event pengguna.

```javascript
setTimeout(() => {
  console.log("Macrotask dieksekusi");
}, 0);
```

#### 5. Microtask Queue (Antrean Prioritas VIP)

Menampung callback reaksi dari `Promise.then()`, `Promise.catch()`, `Promise.finally()`, dan fungsi `queueMicrotask()`. Antrean ini memiliki hak eksekusi mutlak sebelum Macrotask.

```javascript
Promise.resolve().then(() => {
  console.log("Microtask dieksekusi sebelum setTimeout 0ms");
});
```

#### 6. Siklus Perputaran Event Loop

Event Loop berputar terus-menerus mengikuti urutan pasti:

1. Jalankan kode sinkron di **Call Stack** hingga kosong.
2. Jika ada tugas di **Microtask Queue**, eksekusi semuanya sampai antrean microtask benar-benar kosong.
3. Ambil **satu tugas** dari **Macrotask Queue** dan masukkan ke Call Stack.
4. Kembali ke langkah 1.

#### 7. Perilaku `setTimeout(fn, 0)` yang Sebenarnya

Delay `0` milidetik pada `setTimeout(fn, 0)` **bukan berarti dijalankan saat itu juga**, melainkan: _"Jalankan callback ini pada putaran event loop berikutnya setelah seluruh tugas sinkron dan seluruh microtask selesai"_.

```javascript
console.log("Mulai");
setTimeout(() => console.log("Timeout 0ms"), 0);
console.log("Selesai");
// Urutan output: Mulai -> Selesai -> Timeout 0ms
```

#### 8. API Standar `queueMicrotask()`

Menyediakan cara resmi dan langsung untuk menambahkan fungsi ke Microtask Queue tanpa perlu membuat objek `Promise.resolve()`.

```javascript
console.log("Awal");
queueMicrotask(() => {
  console.log("Microtask eksplisit berjalan");
});
console.log("Akhir");
// Urutan output: Awal -> Akhir -> Microtask eksplisit berjalan
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi urutan eksekusi sinkron, penjadwalan Microtask via `queueMicrotask` dan `Promise.then()`, serta Macrotask via `setTimeout(0)` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/01-event-loop-intro/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Deferring Heavy Operations**: Memecah pemrosesan array raksasa (100.000 data) menjadi batch kecil menggunakan `setTimeout` agar browser tetap dapat merender animasi 60 FPS dan merespon klik tombol tanpa macet.
2. **State Batching pada Frontend Framework**: Framework seperti React atau Vue menggunakan Microtask untuk mengumpulkan (_batch_) beberapa pembaruan state sekaligus sebelum merender ulang virtual DOM ke layar.

### ⚠️ Common Pitfalls

- **Microtask Starvation (Kelaparan Task)**: Jika sebuah microtask terus-menerus mendaftarkan microtask baru tanpa henti, Event Loop tidak akan pernah sempat beralih ke Macrotask Queue atau memperbarui tampilan rendering layar browser, mengakibatkan aplikasi hang permanen.
- **Mengira Timer Berjalan Tepat Waktu**: Durasi pada `setTimeout(fn, 1000)` adalah waktu tunggu **minimal**, bukan waktu pasti. Jika Call Stack sedang sibuk memproses loop sinkron selama 5 detik, timer 1 detik tersebut baru akan dieksekusi setelah detik ke-5.

### 🌟 Best Practice

- Hindari menjalankan komputasi CPU intensif sinkron secara langsung di thread utama peramban. Gunakan Web Workers untuk tugas komputasi berat.
- Pahami urutan prioritas eksekusi kode agar tidak salah mengasumsikan alur data asinkron dalam aplikasi Anda.

---

## 5. ✍️ Latihan Mandiri

1. Prediksikan urutan angka output dari cuplikan kode berikut sebelum Anda menjalankannya:
   ```javascript
   console.log("1");
   setTimeout(() => console.log("2"), 0);
   Promise.resolve().then(() => console.log("3"));
   queueMicrotask(() => console.log("4"));
   console.log("5");
   ```
2. Jalankan kode tersebut di Node.js atau Console browser dan cocokkan hasil prediksi Anda dengan alur siklus Event Loop yang sesungguhnya!

---

## 6. 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [05 - JavaScript DOM](../../05-dom/README.md)
- ➡️ **Materi Selanjutnya:** [02 - Timing Events](../02-timing-events/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
