# 07.6 - Higher-Order Functions: Filter, Map, dan Reduce

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami definisi Higher-Order Function (fungsi yang menerima atau mengembalikan fungsi).
> * **Kapan Digunakan**: Menguasai `filter()` untuk menyaring data array.
> * **Aturan Praktis**: Gunakan gaya *Functional Programming* (`filter`, `map`, `reduce`) alih-alih perulangan for konvensional untuk kode yang lebih mudah dibaca dan bebas mutasi (*immutable*).

## 1. 🎯 Tujuan Belajar
- Memahami definisi Higher-Order Function (fungsi yang menerima atau mengembalikan fungsi).
- Menguasai `filter()` untuk menyaring data array.
- Menguasai `map()` untuk mentransformasikan setiap elemen array.
- Menguasai `reduce()` untuk mengakumulasikan seluruh nilai array menjadi satu nilai tunggal.
- Mampu melakukan Method Chaining fungsional.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Bayangkan sebuah **pabrik pengolahan buah**: `filter()` adalah **mesin penyortir** yang membuang buah busuk dan meloloskan buah segar. `map()` adalah **mesin pengupas** yang mengubah setiap buah utuh menjadi buah potong. Dan `reduce()` adalah **mesin blender** yang menyatukan semua potongan buah menjadi segelas jus sari buah tunggal.

**Higher-Order Function (HOF)** adalah fungsi yang beroperasi pada fungsi lain, baik dengan cara **menerima fungsi sebagai argumen** maupun **mengembalikan fungsi sebagai hasilnya**.

Di JavaScript modern, tiga Higher-Order Function bawaan Array yang paling sering digunakan adalah:

### 1. `array.filter(callback)`:
* Menyaring elemen array.
* Mengembalikan **array baru** yang hanya berisi elemen-elemen di mana callback mengembalikan nilai `true`.

### 2. `array.map(callback)`:
* Mentransformasi setiap elemen.
* Mengembalikan **array baru** dengan panjang yang sama, di mana setiap elemen adalah hasil olahan dari fungsi callback.

### 3. `array.reduce(callback, initialValue)`:
* Menyatukan (*mengakumulasikan*) seluruh elemen array menjadi **satu nilai tunggal** (bisa berupa angka total, string, atau objek rangkuman).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

const daftarProduk = [
  { id: 1, nama: 'Laptop Gaming', harga: 15000000, kategori: 'Elektronik' },
  { id: 2, nama: 'Buku Clean Code', harga: 250000, kategori: 'Buku' },
  { id: 3, nama: 'Mouse Wireless', harga: 300000, kategori: 'Elektronik' },
  { id: 4, nama: 'Kemeja Formal', harga: 450000, kategori: 'Pakaian' }
];

console.log('--- 1. filter() : Ambil Hanya Barang Elektronik ---');
const produkElektronik = daftarProduk.filter(item => item.kategori === 'Elektronik');
console.log(produkElektronik.map(item => item.nama));

console.log('\n--- 2. map() : Ubah Daftar Menjadi Label Format Rupiah ---');
const labelHarga = daftarProduk.map(item => `${item.nama}: Rp ${item.harga.toLocaleString('id-ID')}`);
console.log(labelHarga);

console.log('\n--- 3. reduce() : Hitung Total Nilai Seluruh Inventaris ---');
const totalNilaiInventaris = daftarProduk.reduce((akumulator, item) => {
  return akumulator + item.harga;
}, 0); // 0 adalah nilai awal akumulator
console.log(`Total Inventaris: Rp ${totalNilaiInventaris.toLocaleString('id-ID')}`);

console.log('\n--- 4. Method Chaining (Gabungan Fungsional) ---');
// Skenario: Hitung total biaya HANYA untuk kategori Elektronik
const totalBiayaElektronik = daftarProduk
  .filter(item => item.kategori === 'Elektronik')
  .map(item => item.harga)
  .reduce((acc, harga) => acc + harga, 0);

console.log(`Total Belanja Elektronik: Rp ${totalBiayaElektronik.toLocaleString('id-ID')}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. filter() : Ambil Hanya Barang Elektronik ---
[ 'Laptop Gaming', 'Mouse Wireless' ]

--- 2. map() : Ubah Daftar Menjadi Label Format Rupiah ---
[
  'Laptop Gaming: Rp 15.000.000',
  'Buku Clean Code: Rp 250.000',
  'Mouse Wireless: Rp 300.000',
  'Kemeja Formal: Rp 450.000'
]

--- 3. reduce() : Hitung Total Nilai Seluruh Inventaris ---
Total Inventaris: Rp 16.000.000

--- 4. Method Chaining (Gabungan Fungsional) ---
Total Belanja Elektronik: Rp 15.300.000
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Menghitung Total Belanja di Keranjang (E-Commerce)**: Menjumlahkan `harga * qty` seluruh item di cart menggunakan `reduce()`.
2. **Pencarian & Filtering Real-Time**: Menyaring daftar kontak telepon berdasarkan kata kunci pencarian menggunakan `filter()`.
3. **Konversi Response Data API**: Mengubah format tanggal mentah `ISO 8601` dari server menjadi format lokal Indonesia menggunakan `map()`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Memberikan Nilai Awal (Initial Value) pada `reduce`**: Jika Anda tidak menyertakan nilai awal `0` saat mengakumulasikan array objek, JavaScript akan menggunakan objek pertama sebagai akumulator awal sehingga menghasilkan string `[object Object]300000`.
* **Menggunakan forEach Padahal Butuh Array Baru**: Banyak pemula membuat array kosong manual lalu melakukan `array.forEach(...)` dan `push()`. Gunakan `map()` yang jauh lebih deklaratif dan bersih.

### 🌟 Best Practice
* Gunakan gaya *Functional Programming* (`filter`, `map`, `reduce`) alih-alih perulangan for konvensional untuk kode yang lebih mudah dibaca dan bebas mutasi (*immutable*).
* Beri nama parameter callback yang jelas dan bermakna singular-plural (misal: `users.map(user => ...)`).

---

## 6. ✍️ Latihan Mandiri
1. Diberikan array angka `[12, 5, 8, 130, 44, 9, 2]`. Gunakan `filter()` untuk mengambil angka yang lebih besar dari 10, lalu kalikan masing-masing angka dengan 2 menggunakan `map()`.
2. Hitung jumlah total seluruh angka hasil perkalian tersebut menggunakan `reduce()`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.5 - Arrow Function](../05-arrow-functions/README.md)
- ➡️ **Selanjutnya:** [07.7 - Rest Parameter](../07-rest-parameters/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
