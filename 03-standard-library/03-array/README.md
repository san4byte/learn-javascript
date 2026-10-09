# 03 - Array (Queue, Stack, Search, dan Advanced Transformations)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Struktur data list berurutan dinamis untuk menampung elemen apa pun, mendukung operasi Stack (LIFO), Queue (FIFO), pencarian predikat, dan pemrograman fungsional.
> - **Kapan Digunakan**: Mengelola kumpulan data, memfilter data tabel, mengurutkan daftar, menghitung agregasi total/rata-rata, dan mengalirkan antrean pemrosesan tugas.
> - **Aturan Praktis**: Gunakan `find()` alih-alih `filter()[0]` untuk mencari 1 item, selalu berikan `initialValue` pada `reduce()`, dan gunakan `toSorted()` / `toReversed()` (ES2023) untuk manipulasi tanpa mutasi data asli.

---

## 1. 🎯 Tujuan Belajar

- Menguasai implementasi struktur data Queue (FIFO) dan Stack (LIFO) menggunakan method native array.
- Mengetahui perbedaan method yang memutasi data asli (_mutating_) vs menghasilkan salinan baru (_non-mutating / immutable_).
- Menguasai seluruh method pencarian, validasi, dan transformasi fungsional Array beserta skenario kasusnya masing-masing.
- Menghindari jebakan leksikografis pada `sort()` dan bahaya `reduce()` tanpa nilai awal.
- Menguasai utilitas statis: `Array.isArray()`, `Array.from()`, dan `Array.of()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Queue (FIFO - First-In First-Out)** seperti **antrean loket tiket bioskop**: pengunjung yang datang paling awal akan dilayani dan keluar dari loket paling awal.
> - **Stack (LIFO - Last-In First-Out)** seperti **tumpukan piring di meja prasmanan**: piring yang ditaruh paling terakhir di atas tumpukan justru yang pertama kali diambil oleh tamu.

---

### 1. Tabel Ringkasan Method Array (Cheat-Sheet)

| Kategori          | Method                 | Mutasi Asli? | Nilai Kembalian           | Deskripsi Singkat                                             |
| :---------------- | :--------------------- | :----------: | :------------------------ | :------------------------------------------------------------ |
| **Stack & Queue** | `push(...items)`       |      Ya      | `number` (panjang baru)   | Menambahkan elemen di bagian belakang (kanan).                |
|                   | `pop()`                |      Ya      | Elemen \| `undefined`     | Menghapus dan mengambil elemen paling belakang.               |
|                   | `unshift(...items)`    |      Ya      | `number` (panjang baru)   | Menambahkan elemen di bagian paling depan (kiri).             |
|                   | `shift()`              |      Ya      | Elemen \| `undefined`     | Menghapus dan mengambil elemen paling depan.                  |
| **Pencarian**     | `find(predicate)`      |    Tidak     | Elemen \| `undefined`     | Elemen pertama yang lolos kondisi predikat.                   |
|                   | `findLast(predicate)`  |    Tidak     | Elemen \| `undefined`     | Elemen terakhir yang lolos kondisi predikat.                  |
|                   | `findIndex(predicate)` |    Tidak     | `number` (indeks / `-1`)  | Indeks pertama elemen yang lolos kondisi.                     |
|                   | `some(predicate)`      |    Tidak     | `boolean`                 | `true` jika minimal 1 elemen lolos kondisi.                   |
|                   | `every(predicate)`     |    Tidak     | `boolean`                 | `true` jika **seluruh** elemen lolos kondisi.                 |
|                   | `includes(value)`      |    Tidak     | `boolean`                 | Cek keberadaan nilai (mendukung deteksi `NaN`).               |
|                   | `indexOf(value)`       |    Tidak     | `number`                  | Menemukan indeks kemunculan pertama.                          |
|                   | `at(index)`            |    Tidak     | Elemen \| `undefined`     | Akses elemen (mendukung indeks negatif `-1`).                 |
| **Transformasi**  | `map(callback)`        |    Tidak     | `Array` baru              | Memetakan setiap elemen ke bentuk baru.                       |
|                   | `filter(predicate)`    |    Tidak     | `Array` baru              | Menyaring elemen yang mengembalikan `true`.                   |
|                   | `reduce(cb, initial)`  |    Tidak     | Nilai akumulasi           | Mengakumulasi nilai array dari kiri ke kanan.                 |
|                   | `flat(depth)`          |    Tidak     | `Array` baru              | Meratakan array bersarang (multidimensi).                     |
|                   | `flatMap(callback)`    |    Tidak     | `Array` baru              | Pemetaan `map()` dilanjutkan `flat(1)`.                       |
| **Manipulasi**    | `splice(start, count)` |      Ya      | `Array` (elemen terhapus) | Hapus/sisipkan elemen di tengah array.                        |
|                   | `slice(start, end)`    |    Tidak     | `Array` baru              | Mengekstrak salinan potongan array.                           |
|                   | `sort(compareFn)`      |      Ya      | `Array` (terurut)         | Mengurutkan elemen di tempat (_in-place_).                    |
|                   | `toSorted(compareFn)`  |    Tidak     | `Array` baru              | Mengurutkan elemen tanpa memutasi array asli (ES2023).        |
|                   | `toReversed()`         |    Tidak     | `Array` baru              | Membalik urutan elemen tanpa memutasi array asli (ES2023).    |
|                   | `with(index, value)`   |    Tidak     | `Array` baru              | Mengganti nilai di indeks tertentu secara immutable (ES2023). |
| **Utilitas**      | `Array.isArray(val)`   |      -       | `boolean`                 | Validasi ketat tipe array sejati.                             |
|                   | `Array.from(src, map)` |      -       | `Array` baru              | Membuat array dari iterable / array-like.                     |
|                   | `Array.of(...items)`   |      -       | `Array` baru              | Membuat array baru dari sekumpulan elemen.                    |
|                   | `join(separator)`      |    Tidak     | `string`                  | Menggabungkan seluruh elemen menjadi satu string.             |

---

### 2. Eksplorasi Mendalam Setiap Method Array

Berikut adalah rincian lengkap setiap method `Array` beserta skenario kasusnya masing-masing:

---

#### 1. Menambah di Belakang: `arr.push(...items)`

Menambahkan satu atau lebih elemen ke akhir array dan mengembalikan panjang (_length_) array yang baru.

```javascript
const antrean = ['A', 'B'];
const panjangBaru = antrean.push('C', 'D');
console.log(panjangBaru); // 4
console.log(antrean); // ['A', 'B', 'C', 'D']
```

---

#### 2. Mengambil dari Belakang: `arr.pop()`

Menghapus dan mengembalikan elemen paling terakhir. Mengembalikan `undefined` jika array kosong.

```javascript
const tumpukan = [10, 20, 30];
const item = tumpukan.pop();
console.log(item); // 30
console.log(tumpukan); // [10, 20]
```

---

#### 3. Menambah di Depan: `arr.unshift(...items)`

Menambahkan satu atau lebih elemen ke awal array dan menggeser elemen lainnya ke kanan ($O(n)$).

```javascript
const deret = [2, 3];
deret.unshift(0, 1);
console.log(deret); // [0, 1, 2, 3]
```

---

#### 4. Mengambil dari Depan: `arr.shift()`

Menghapus dan mengembalikan elemen paling pertama dari array ($O(n)$).

```javascript
const loket = ['Pasien 1', 'Pasien 2'];
const dipanggil = loket.shift();
console.log(dipanggil); // "Pasien 1"
console.log(loket); // ['Pasien 2']
```

---

#### 5. Pencarian Elemen: `arr.find(predicate)` & `arr.findLast(predicate)`

Mencari elemen yang pertama kali atau terakhir kali memenuhi fungsi kondisi. Berhenti seketika (_early exit_) begitu ditemukan.

```javascript
const produk = [
  { id: 1, harga: 50000 },
  { id: 2, harga: 120000 },
  { id: 3, harga: 80000 },
];

console.log(produk.find((p) => p.harga > 70000)); // { id: 2, harga: 120000 } (pertama)
console.log(produk.findLast((p) => p.harga > 70000)); // { id: 3, harga: 80000 }  (terakhir)
```

---

#### 6. Pencarian Indeks: `arr.findIndex(predicate)`

Mengembalikan nomor indeks pertama yang lolos kondisi predikat, atau `-1` jika tidak ada.

```javascript
const angka = [10, 25, 40, 15];
console.log(angka.findIndex((n) => n > 30)); // 2
console.log(angka.findIndex((n) => n > 50)); // -1
```

---

#### 7. Validasi Parsial: `arr.some(predicate)`

Mengembalikan `true` jika **minimal satu** elemen memenuhi kondisi predikat.

```javascript
const nilai = [40, 55, 80];
console.log(nilai.some((n) => n >= 75)); // true (ada yang tuntas)
```

---

#### 8. Validasi Total: `arr.every(predicate)`

Mengembalikan `true` jika **seluruh** elemen tanpa kecuali memenuhi kondisi predikat.

```javascript
console.log(nilai.every((n) => n >= 50)); // false (karena 40 < 50)
```

---

#### 9. Pengecekan Nilai: `arr.includes(value, [fromIndex])`

Memeriksa keberadaan nilai. Menggunakan algoritma _SameValueZero_ sehingga mampu mendeteksi `NaN`:

```javascript
const list = [1, NaN, 3];
console.log(list.includes(NaN)); // true ✅
console.log(list.includes(2)); // false
```

---

#### 10. Indeks Nilai: `arr.indexOf(value)` & `lastIndexOf(value)`

Mencari posisi indeks nilai primitif menggunakan kesamaan ketat (`===`):

```javascript
const warna = ['merah', 'biru', 'merah'];
console.log(warna.indexOf('merah')); // 0
console.log(warna.lastIndexOf('merah')); // 2
```

---

#### 11. Akses Elemen Modern: `arr.at(index)` (ES2022)

Mendukung indeks negatif untuk membaca elemen dari posisi belakang:

```javascript
const huruf = ['A', 'B', 'C', 'D'];
console.log(huruf.at(-1)); // "D" (terakhir)
console.log(huruf.at(-2)); // "C"
```

---

#### 12. Pemetaan: `arr.map(callback)`

Mentransformasikan setiap elemen menjadi elemen baru di array baru:

```javascript
const angka = [1, 2, 3];
const kuadrat = angka.map((n) => n * n);
console.log(kuadrat); // [1, 4, 9]
```

---

#### 13. Penyaringan: `arr.filter(predicate)`

Menyaring dan mengembalikan array baru berisi seluruh elemen yang menghasilkan `true`:

```javascript
const umur = [12, 17, 22, 15, 30];
const dewasa = umur.filter((u) => u >= 17);
console.log(dewasa); // [17, 22, 30]
```

---

#### 14. Akumulasi: `arr.reduce(callback[, initialValue])`

Memadatkan array menjadi satu nilai akumulasi:

```javascript
const belanja = [25000, 15000, 10000];
// Selalu berikan nilai awal (misal: 0):
const total = belanja.reduce((acc, curr) => acc + curr, 0);
console.log(total); // 50000
```

---

#### 15. Meratakan Struktur: `arr.flat([depth])` & `flatMap(callback)`

Meratakan kedalaman array bersarang:

```javascript
const nested = [1, [2, [3]]];
console.log(nested.flat(1)); // [1, 2, [3]]
console.log(nested.flat(Infinity)); // [1, 2, 3]

// flatMap: map lalu flat level 1
const kata = ['halo dunia', 'belajar js'];
console.log(kata.flatMap((k) => k.split(' '))); // ['halo', 'dunia', 'belajar', 'js']
```

---

#### 16. Mutasi di Tempat: `arr.splice(start, deleteCount, ...items)`

Memotong dan/atau menyisipkan elemen di tengah array (memutasi array asli):

```javascript
const item = ['A', 'B', 'C', 'D'];
const dihapus = item.splice(1, 2, 'X', 'Y');
console.log(dihapus); // ['B', 'C']
console.log(item); // ['A', 'X', 'Y', 'D']
```

---

#### 17. Salinan Potongan: `arr.slice([start, [end]])`

Mengekstrak sebagian array tanpa mengubah array aslinya:

```javascript
const buah = ['apel', 'jeruk', 'mangga', 'pisang'];
console.log(buah.slice(1, 3)); // ['jeruk', 'mangga']
console.log(buah); // ['apel', 'jeruk', 'mangga', 'pisang'] (utuh)
```

---

#### 18. Pengurutan Mutasi: `arr.sort([compareFn])`

Mengurutkan array di tempat. **Wajib memberikan compare function untuk angka**:

```javascript
const angkaAcak = [25, 100, 5];
angkaAcak.sort((a, b) => a - b);
console.log(angkaAcak); // [5, 25, 100] ✅
```

---

#### 19. Operasi Tanpa Mutasi (ES2023): `toSorted()`, `toReversed()`, `with()`

Menghasilkan array baru tanpa memutasi array asli:

```javascript
const asli = [3, 1, 2];
console.log(asli.toSorted((a, b) => a - b)); // [1, 2, 3]
console.log(asli.toReversed()); // [2, 1, 3]
console.log(asli.with(0, 99)); // [99, 1, 2]
console.log(asli); // [3, 1, 2] (tidak tersentuh!)
```

---

#### 20. Validasi Tipe Array: `Array.isArray(val)`

Pemeriksaan ketat apakah nilai merupakan instance array sejati:

```javascript
console.log(Array.isArray([])); // true
console.log(Array.isArray({ length: 0 })); // false
```

---

#### 21. Konversi Iterable: `Array.from(src[, mapFn])`

Mengonversi objek array-like atau iterable (Set, Map, String) menjadi array:

```javascript
console.log(Array.from('ABC')); // ['A', 'B', 'C']
console.log(Array.from([1, 2, 3], (x) => x * 2)); // [2, 4, 6]
```

---

#### 22. Inisialisasi Elemen: `Array.of(...items)`

Membuat array dengan elemen-elemen yang diberikan (mengatasi keanehan `new Array(3)`):

```javascript
console.log(Array.of(3)); // [3]
```

---

#### 23. Penggabungan String: `arr.join([separator])`

Menggabungkan seluruh elemen array menjadi satu string dengan pemisah tertentu:

```javascript
const tag = ['javascript', 'frontend', 'web'];
console.log(tag.join(' / ')); // "javascript / frontend / web"
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep Stack/Queue, mutasi vs immutability (ES2023), pencarian predikat, dan transformasi fungsional di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/03-array/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Antrean Pemrosesan Tugas (Job Queue)**: Menggunakan pola Queue (`push` dan `shift`) untuk mengeksekusi antrean pengiriman email secara berurutan.
2. **Fitur Riwayat Aksi (Undo/Redo Stack)**: Menyimpan snapshot state dokumen ke dalam struktur Stack (`push` saat ada aksi baru, `pop` saat tombol Undo ditekan).
3. **Agregasi Data Keranjang Belanja**: Menghitung subtotal belanjaan dan diskon dari kumpulan item menggunakan `reduce()`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengurutkan angka dengan `sort()` polos**: `[10, 5, 20].sort()` menghasilkan `[10, 20, 5]` karena diurutkan sebagai string. Selalu sertakan `(a, b) => a - b`.
- **Lupa `initialValue` pada `reduce()`**: Menyebabkan fatal runtime error jika array kosong.
- **Memutasi array yang dibagikan (_shared state_)**: Menggunakan `sort()` atau `reverse()` langsung pada parameter fungsi dapat merusak data di bagian aplikasi lain. Gunakan `toSorted()` atau buat salinan terlebih dahulu `[...arr].sort()`.

### 🌟 Best Practice

- Gunakan `find()` jika hanya butuh 1 elemen pertama, jangan gunakan `filter()[0]`.
- Manfaatkan method immutable ES2023 (`toSorted()`, `toReversed()`, `with()`) untuk mencegah efek samping mutasi state pada aplikasi modern (React/Vue/Node.js).
- Gunakan `Array.isArray()` untuk memvalidasi parameter bertipe array.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `RiwayatBrowser` yang memiliki method `kunjungi(url)`, `kembali()`, dan properti getter `halamanSaatIni` menggunakan struktur data Stack.
2. Diberikan array transaksi `[{ kategori: 'makanan', nominal: 25000 }, { kategori: 'transport', nominal: 15000 }, { kategori: 'makanan', nominal: 50000 }]`. Gunakan `reduce()` untuk menghasilkan objek rekap total per kategori: `{ makanan: 75000, transport: 15000 }`.
3. Buat fungsi `hapusDuplikat(arr)` yang mengembalikan array baru berisi elemen unik tanpa mengubah array asli.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - String](../02-string/README.md)
- ➡️ **Selanjutnya:** [04 - Object](../04-object/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
