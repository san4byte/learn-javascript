# 08 - Math (Konstanta Matematika, Pembulatan, dan Operasi Angka)

## 1. 🎯 Tujuan Belajar

- Memahami objek bawaan `Math` sebagai namespace utilitas matematika statis.
- Menguasai konstanta matematika fundamental: `Math.PI` dan `Math.E`.
- Memahami 4 teknik pembulatan angka: `round()`, `floor()`, `ceil()`, dan `trunc()`.
- Menguasai operasi kalkulasi: `abs()`, `min()`, `max()`, `pow()`, `sqrt()`, dan randomisasi angka `Math.random()`.
- Mengetahui bahwa seluruh method di objek `Math` **hanya bekerja untuk tipe `Number`**, bukan `BigInt`.

---

## 2. 📖 Penjelasan Konsep

Objek **`Math`** adalah objek built-in statis di JavaScript yang menyediakan properti konstanta matematika dan fungsi-fungsi kalkulasi numerik. Objek ini **bukan sebuah konstruktor** (`new Math()` akan menghasilkan error).

### 1. Empat Ragam Pembulatan Angka

- **`Math.round(x)`**: Membulatkan ke bilangan bulat **terdekat** (jika $\ge 0.5$ dibulatkan ke atas, jika $< 0.5$ dibulatkan ke bawah).
- **`Math.floor(x)`**: Membulatkan selalu **ke bawah** (ke arah angka yang lebih kecil/negatif).
- **`Math.ceil(x)`**: Membulatkan selalu **ke atas** (ke arah angka yang lebih besar).
- **`Math.trunc(x)`**: Membuang angka di belakang koma secara langsung tanpa pembulatan (memotong bagian desimal).

### Tabel Referensi Lengkap Method & Konstanta Objek `Math`

| Kategori              | Method / Properti                             | Penjelasan & Contoh Singkat                                                   |
| :-------------------- | :-------------------------------------------- | :---------------------------------------------------------------------------- |
| **Konstanta**         | `Math.PI`                                     | Nilai Pi ($\approx 3.14159$)                                                  |
|                       | `Math.E`                                      | Nilai Euler konstanta logaritma natural ($\approx 2.718$)                     |
| **Pembulatan**        | `Math.round(x)`                               | Dibulatkan ke bilangan bulat terdekat: `Math.round(4.5) // 5`                 |
|                       | `Math.floor(x)`                               | Dibulatkan ke bawah: `Math.floor(4.9) // 4`                                   |
|                       | `Math.ceil(x)`                                | Dibulatkan ke atas: `Math.ceil(4.1) // 5`                                     |
|                       | `Math.trunc(x)`                               | Memotong angka desimal: `Math.trunc(-4.9) // -4`                              |
| **Aritmetika Dasar**  | `Math.abs(x)`                                 | Nilai mutlak/positif: `Math.abs(-50) // 50`                                   |
|                       | `Math.sign(x)`                                | Mengetahui tanda angka: mengembalikan `1` (positif), `-1` (negatif), atau `0` |
|                       | `Math.max(...val)`                            | Mencari nilai terbesar: `Math.max(10, 5, 80) // 80`                           |
|                       | `Math.min(...val)`                            | Mencari nilai terkecil: `Math.min(10, 5, 80) // 5`                            |
| **Pangkat & Akar**    | `Math.pow(x, y)`                              | Menghitung $x^y$: `Math.pow(2, 3) // 8` (setara `2 ** 3`)                     |
|                       | `Math.sqrt(x)`                                | Akar kuadrat: `Math.sqrt(16) // 4`                                            |
|                       | `Math.cbrt(x)`                                | Akar kubik: `Math.cbrt(27) // 3`                                              |
|                       | `Math.hypot(...val)`                          | Sisi miring Pythagoras: `Math.hypot(3, 4) // 5`                               |
| **Acak (Random)**     | `Math.random()`                               | Angka desimal pseudo-acak di rentang $[0, 1)$                                 |
| **Logaritma & Sudut** | `Math.log10(x)`, `Math.sin(x)`, `Math.cos(x)` | Logaritma dan trigonometri sudut (dalam radian)                               |

### 3. Batasan Penting: Math Tidak Mendukung BigInt

Seluruh method di dalam `Math` dirancang khusus untuk tipe data `Number` 64-bit IEEE 754. Memberikan nilai `BigInt` (misal: `Math.max(10n, 20n)`) akan memicu **`TypeError: Cannot convert a BigInt value to a number`**.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Paginasi Halaman dengan Math.ceil() ---");
const totalProduk = 53;
const produkPerHalaman = 10;

// Pembulatan ke atas menjamin item sisa tetap memperoleh lembar halaman tersendiri
const totalHalaman = Math.ceil(totalProduk / produkPerHalaman);
console.log(`Total Halaman (${totalProduk} produk, ${produkPerHalaman}/hal) :`, totalHalaman);

console.log("\n--- 2. Pencarian Nilai Ekstrem (Math.min & Math.max) ---");
const daftarHarga = [150000, 45000, 750000, 20000, 120000];

// Menggunakan spread operator (...) untuk memecah elemen array menjadi argumen
const hargaTermurah = Math.min(...daftarHarga);
const hargaTermahal = Math.max(...daftarHarga);

console.log("Daftar Harga Katalog :", daftarHarga);
console.log("Harga Termurah       : Rp", hargaTermurah.toLocaleString("id-ID"));
console.log("Harga Termahal       : Rp", hargaTermahal.toLocaleString("id-ID"));

console.log("\n--- 3. Generator Angka Acak dalam Rentang (Math.random) ---");
// Rumus angka acak bulat antara min dan max: Math.floor(Math.random() * (max - min + 1)) + min
const diskon = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
console.log(`Voucher Diskon Acak (10% - 50%) : ${diskon}%`);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Paginasi Halaman dengan Math.ceil() ---
Total Halaman (53 produk, 10/hal) : 6

--- 2. Pencarian Nilai Ekstrem (Math.min & Math.max) ---
Daftar Harga Katalog : [ 150000, 45000, 750000, 20000, 120000 ]
Harga Termurah       : Rp 20.000
Harga Termahal       : Rp 750.000

--- 3. Generator Angka Acak dalam Rentang (Math.random) ---
Voucher Diskon Acak (10% - 50%) : [Angka antara 10% sampai 50%]
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Math` seperti **kalkulator ilmiah saku**: Anda tidak perlu merakit atau membeli kalkulator baru setiap kali ingin berhitung (`new Math()` tidak diperlukan); cukup tekan tombol fungsi yang tersedia langsung di badannya (`Math.sqrt`, `Math.PI`). Namun kalkulator ini hanya mengerti sistem angka biasa dan akan error jika Anda memasukkan format chip khusus raksasa (BigInt).

### 🏢 Real-World Use Case

1. **Paginasi Halaman Web**: Menghitung total lembar halaman menggunakan `Math.ceil(totalBarang / barangPerHalaman)` agar barang sisa tetap mendapat 1 halaman baru.
2. **Game & Simulasi (RNG)**: Menentukan giliran dadu, drop rate item RPG, atau penentuan pemenang undian menggunakan `Math.random()`.
3. **Pencarian Nilai Ekstrem**: Mencari harga produk termurah dan termahal dari array katalog dengan `Math.min(...hargaList)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Memasukkan BigInt ke Math**: Menulis `Math.max(10n, 5n)` melempar `TypeError`. Math hanya menerima Number biasa.
- **Tertukar antara `floor()` dan `trunc()` pada angka negatif**: `Math.floor(-1.2)` menghasilkan `-2`, sedangkan `Math.trunc(-1.2)` menghasilkan `-1`.
- **Ketidakamanan Kriptografi pada `Math.random()`**: `Math.random()` bukan generator acak yang aman secara kriptografi (_not cryptographically secure_). Jangan gunakan untuk token autentikasi atau reset password; gunakan `crypto.getRandomValues()` di Web Crypto API.

### 🌟 Best Practice

- Gunakan `Math.ceil()` untuk paginasi data agar elemen pecahan terakhir tidak hilang dari tampilan pengguna.
- Gunakan spread operator bersama `Math.max(...arr)` dan `Math.min(...arr)` untuk mencari nilai ekstrem array secara elegan.
- Kuasai rumus standar integer random: `Math.floor(Math.random() * (max - min + 1)) + min`.

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `hitungTotalHalaman(totalItem, itemPerHalaman)` yang mengembalikan jumlah halaman yang dibutuhkan menggunakan `Math.ceil()`.
2. Buat fungsi `lemparKoin()` yang mengembalikan string `'Gambar'` atau `'Angka'` dengan probabilitas seimbang 50:50 menggunakan `Math.random()`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07 - Date](../07-date/README.md)
- ➡️ **Selanjutnya:** [09 - Boolean](../09-boolean/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
