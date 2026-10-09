# 07.6 - Higher-Order Functions: Filter, Map, dan Reduce

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengolah koleksi data array menggunakan fungsi tingkat tinggi yang menerima callback untuk menyaring (_filter_), mengubah bentuk (_map_), atau mengakumulasi nilai (_reduce_).
> - **Kapan Digunakan**: Menggantikan perulangan `for` konvensional dengan gaya pemrograman deklaratif dan fungsional yang bebas efek samping (_pure and immutable_).
> - **Aturan Praktis**: Selalu berikan nilai awal (_initial value_) pada `reduce()`. Jangan gunakan `map()` jika Anda tidak memerlukan array baru yang dihasilkan (gunakan `forEach()` untuk efek samping murni).

---

## 1. 🎯 Tujuan Belajar

- Memahami definisi teoritis _Higher-Order Function_ (HOF) di JavaScript.
- Menguasai fungsi `filter()` untuk mengekstraksi subset elemen data berdasarkan kriteria predikat boolean.
- Menguasai fungsi `map()` untuk mentransformasikan setiap elemen array menjadi bentuk data baru 1-ke-1.
- Menguasai fungsi `reduce()` untuk agregasi nilai numerik serta pengelompokan (_grouping_) data ke dalam bentuk objek.
- Menerapkan teknik perangkaian metode fungsional (_Method Chaining_) untuk membentuk pipeline pemrosesan data yang elegan.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Proses Higher-Order Function seperti **pabrik pengolahan buah modern**:
>
> - `filter()` adalah **mesin penyortir sensor kualitas**: Memeriksa buah satu per satu; buah busuk disingkirkan, hanya buah segar yang lolos ke tahap berikutnya.
> - `map()` adalah **mesin pengupas dan pemotong otomatis**: Setiap buah segar yang lewat dipotong menjadi bentuk dadu siap saji (_mengubah bentuk, jumlah buah tetap sama_).
> - `reduce()` adalah **mesin blender raksasa**: Mengumpulkan seluruh potongan buah dadu menjadi satu wadah dan melumatkannya menjadi **segelas jus buah kental terpadu** (_banyak item menjadi satu nilai tunggal_).

---

### Tabel Perbandingan Tiga HOF Utama Array

| Metode               | Nilai Balik Callback                       | Nilai Balik Metode Utama                  | Sifat Mutasi Array Asli          |
| :------------------- | :----------------------------------------- | :---------------------------------------- | :------------------------------- |
| **`array.filter()`** | Boolean (`true` = simpan, `false` = buang) | Array baru (panjang $\le$ awal)           | **Tidak Memutasi** (_Immutable_) |
| **`array.map()`**    | Elemen baru hasil transformasi             | Array baru (panjang sama persis)          | **Tidak Memutasi** (_Immutable_) |
| **`array.reduce()`** | Akumulator terakumulasi berikutnya         | Satu nilai tunggal (angka, string, objek) | **Tidak Memutasi** (_Immutable_) |

---

### Pembahasan Mendalam Fitur & API

#### 1. Pengertian Higher-Order Function (HOF)

Fungsi disebut Higher-Order Function jika memenuhi salah satu dari dua syarat: menerima satu atau lebih fungsi lain sebagai argumen (_callback_), atau menghasilkan fungsi lain sebagai nilai baliknya:

```javascript
function terapkan(nilai, fn) {
  return fn(nilai);
}
console.log(terapkan(5, (x) => x * 3)); // 15
```

#### 2. Penyaringan Data Bersih dengan `Array.prototype.filter()`

Callback predikat menerima `(item, index, array)` dan harus mengembalikan nilai truthy agar item disertakan ke dalam array baru:

```javascript
const angka = [1, 2, 3, 4, 5, 6];
const genap = angka.filter((n) => n % 2 === 0); // [2, 4, 6]
```

#### 3. Transformasi Struktur Elemen dengan `Array.prototype.map()`

Setiap elemen pada array asal dipetakan menjadi elemen baru tanpa mengubah urutan indeks:

```javascript
const hargaUSD = [10, 20, 30];
const hargaIDR = hargaUSD.map((h) => h * 16000); // [160000, 320000, 480000]
```

#### 4. Akumulasi & Agregasi Nilai dengan `Array.prototype.reduce()`

Menggabungkan elemen dari kiri ke kanan. Parameter callback menerima `(akumulator, nilaiSaatIni, indeks, array)`:

```javascript
const nilai = [80, 90, 70];
const total = nilai.reduce((acc, curr) => acc + curr, 0); // 240
```

#### 5. Teknik Pengelompokan Data (_Grouping_) via `reduce()`

Selain total numerik, `reduce` sangat andal untuk mengelompokkan koleksi objek berdasarkan kategori tertentu:

```javascript
const items = [
  { cat: "A", nama: "Item 1" },
  { cat: "B", nama: "Item 2" },
];
const grouped = items.reduce((acc, item) => {
  (acc[item.cat] = acc[item.cat] || []).push(item.nama);
  return acc;
}, {});
```

#### 6. Pipeline Pemrosesan Terpadu: Functional Method Chaining

Anda dapat merangkai metode array fungsional secara berurutan untuk membentuk alur pemrosesan data linier yang mudah dipahami:

```javascript
const totalPajak = daftarBarang
  .filter((b) => b.kenaPajak)
  .map((b) => b.harga * 0.11)
  .reduce((sum, tax) => sum + tax, 0);
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi pembuatan _custom HOF_, penyaringan produk via `filter()`, transformasi label harga via `map()`, akumulasi total inventaris & teknik _grouping_ objek via `reduce()`, serta penerapan _method chaining pipeline_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/06-higher-order-functions/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Kalkulasi Keranjang Belanja E-Commerce**:
   ```javascript
   const totalBayar = cartItems
     .filter((item) => item.terpilih)
     .map((item) => item.harga * item.qty)
     .reduce((subtotal, totalItem) => subtotal + totalItem, 0);
   ```
2. **Normalisasi Data Respons API**: Mengubah array data mentah dari backend menjadi pasangan format `{ label, value }` untuk komponen dropdown UI.

### ⚠️ Common Pitfalls

- **Lupa Argumen `initialValue` pada `reduce()`**: Jika tidak menyertakan `0`, dan array berisikan objek, elemen pertama bertindak sebagai nilai awal sehingga akumulator pertama berupa objek literal, menghasilkan bug `"[object Object]15000"`.
- **Menyalahgunakan `map()` untuk Efek Samping (Side Effects)**: Menulis `data.map(d => saveToDB(d))` tanpa memanfaatkan nilai balik array. Gunakan `forEach()` atau loop `for...of` untuk aksi mutasi/efek samping.

### 🌟 Best Practice

- Utamakan gaya fungsional immutabel daripada loop `for` biasa dengan array penampung manual (`push()`).
- Beri nama parameter callback secara deskriptif: bentuk jamak untuk array (`users`), bentuk tunggal untuk callback (`users.map(user => ...)`).

---

## 5. ✍️ Latihan Mandiri

1. Diberikan array angka `const data = [5, 12, 8, 130, 44, 9, 21]`. Gunakan `filter()` untuk mengambil angka ganjil yang bernilai lebih dari 10, lalu kalikan hasilnya dengan 3 menggunakan `map()`.
2. Hitung jumlah total akumulasi dari seluruh angka hasil pemetaan pada soal nomor 1 menggunakan `reduce()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.5 - Arrow Function](../05-arrow-functions/README.md)
- ➡️ **Selanjutnya:** [07.7 - Rest Parameter](../07-rest-parameters/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
