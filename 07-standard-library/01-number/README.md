# 01 - Number (Static Properties, Methods, dan Number Parsing)

## 1. 🎯 Tujuan Belajar

- Memahami wrapper object `Number` dan perbedaannya dengan tipe primitif number.\n- Menguasai static properties penting: `Number.MAX_VALUE`, `Number.MIN_VALUE`, `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER`, dan `Number.NaN`.\n- Memahami static methods validasi modern: `Number.isNaN()` vs `isNaN()` global, serta `Number.isInteger()`.\n- Menguasai formatting angka tingkat lanjut: `toLocaleString()` untuk lokalisasi mata uang dan `toString(radix)` untuk konversi basis bilangan (biner, oktal, heksadesimal).

---

## 2. 📖 Penjelasan Konsep

Objek **`Number`** adalah wrapper object bawaan JavaScript yang merepresentasikan angka numerik, baik bilangan bulat (_integer_) maupun bilangan pecahan (_floating point 64-bit IEEE 754_).

### 1. Static Properties Esensial

- **`Number.EPSILON`**: Selisih terkecil antara 1 dan angka floating point berikutnya yang lebih besar (berguna untuk mengatasi masalah presisi desimal $0.1 + 0.2 \neq 0.3$).
- **`Number.MAX_VALUE`**: Nilai positif terbesar yang dapat direpresentasikan di JavaScript ($\approx 1.7976931348623157 \times 10^{308}$). Jika melebihi ini menjadi `Infinity`.
- **`Number.MIN_VALUE`**: **Angka positif terkecil yang paling mendekati 0** ($\approx 5 \times 10^{-324}$), **bukan angka negatif terkecil**!
- **`Number.MAX_SAFE_INTEGER`**: Integer terbesar yang aman dikalkulasi tanpa kehilangan presisi ($2^{53} - 1 = 9007199254740991$).
- **`Number.MIN_SAFE_INTEGER`**: Integer negatif terkecil yang aman ($-(2^{53} - 1) = -9007199254740991$).
- **`Number.NaN`**: _Not-a-Number_, nilai khusus saat operasi aritmetika tidak valid.

### 2. Static Methods Validasi Modern

- **`Number.isNaN(value)`**: Memeriksa apakah suatu nilai adalah `NaN` secara ketat tanpa konversi tipe otomatis (_no coercion_). Sangat berbeda dari fungsi global `isNaN()` yang mencoba mengonversi string ke angka terlebih dahulu.
- **`Number.isInteger(value)`**: Menentukan apakah nilai yang dimasukkan adalah bilangan bulat sejati.
- **`Number.isFinite(value)`**: Memastikan angka bukan `Infinity`, `-Infinity`, atau `NaN`.
- **`Number.parseInt(str, radix)` & `Number.parseFloat(str)`**: Parsing string menjadi bilangan bulat atau pecahan. Selalu sertakan parameter `radix` (basis) pada parseInt!

### 3. Instance Methods Format Angka

- **`num.toLocaleString([locales], [options])`**: Memformat angka sesuai aturan bahasa dan negara tertentu (misal pemisah ribuan titik/koma atau format mata uang rupiah).
- **`num.toString(radix)`**: Mengonversi angka menjadi string dalam basis bilangan tertentu ($2$ untuk biner, $8$ untuk oktal, $16$ untuk heksadesimal).
- **`num.toFixed(digits)`**: Membulatkan angka ke jumlah desimal tertentu menghasilkan string.

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Static Properties & Batas Presisi Number ---');
console.log('Nilai Terbesar (MAX_VALUE)         :', Number.MAX_VALUE);
console.log('Positif Terkecil Dekat 0 (MIN_VALUE):', Number.MIN_VALUE);
console.log('Max Safe Integer                   :', Number.MAX_SAFE_INTEGER);

console.log('\n--- 2. Validasi Angka: Number.isNaN & isInteger ---');
console.log("Number.isNaN('halo')               :", Number.isNaN('halo')); // false (bukan NaN)
console.log('Number.isNaN(0 / 0)                :', Number.isNaN(0 / 0)); // true (NaN)
console.log('Number.isInteger(42)               :', Number.isInteger(42)); // true
console.log('Number.isInteger(42.5)             :', Number.isInteger(42.5)); // false

console.log('\n--- 3. Studi Kasus Nyata: Fungsi formatHargaProduk() ---');
function formatHargaProduk(harga) {
  // Validasi: tipe harus number, bukan NaN, bilangan bulat, dan tidak negatif
  if (typeof harga !== 'number' || Number.isNaN(harga) || !Number.isInteger(harga) || harga < 0) {
    return 'Input harga tidak valid';
  }

  // Format ke mata uang Rupiah Indonesia tanpa desimal
  return harga.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

// Pengujian Kasus Uji:
console.log('Format 500000                      :', formatHargaProduk(500000)); // "Rp 500.000"
console.log('Format 0                           :', formatHargaProduk(0)); // "Rp 0"
console.log('Format pecahan (12500.5)           :', formatHargaProduk(12500.5)); // "Input harga tidak valid"
console.log("Format string ('50000')            :", formatHargaProduk('50000')); // "Input harga tidak valid"
console.log('Format negatif (-1000)             :', formatHargaProduk(-1000)); // "Input harga tidak valid"
console.log('Format NaN                         :', formatHargaProduk(NaN)); // "Input harga tidak valid"
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Static Properties & Batas Presisi Number ---
Nilai Terbesar (MAX_VALUE)         : 1.7976931348623157e+308
Positif Terkecil Dekat 0 (MIN_VALUE): 5e-324
Max Safe Integer                   : 9007199254740991

--- 2. Validasi Angka: Number.isNaN & isInteger ---
Number.isNaN('halo')               : false
Number.isNaN(0 / 0)                : true
Number.isInteger(42)               : true
Number.isInteger(42.5)             : false

--- 3. Studi Kasus Nyata: Fungsi formatHargaProduk() ---
Format 500000                      : Rp 500.000
Format 0                           : Rp 0
Format pecahan (12500.5)           : Input harga tidak valid
Format string ('50000')            : Input harga tidak valid
Format negatif (-1000)             : Input harga tidak valid
Format NaN                         : Input harga tidak valid
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> Objek `Number` seperti penggaris presisi tukang arsitek: ia memiliki batas rentang terkecil dan terbesar yang bisa diukur dengan presisi (`MIN_SAFE_INTEGER` hingga `MAX_SAFE_INTEGER`). Jika Anda mencoba mengukur benda di luar kemampuan penggaris tersebut, angka yang dicatat akan mengalami penyimpangan.

### 🏢 Real-World Use Case

1. **Aplikasi Perbankan / Fintech**: Memformat saldo rekening pengguna ke format mata uang lokal (`toLocaleString('id-ID')`) tanpa perlu menulis fungsi regex pemisah ribuan manual.\n2. **Validasi Input Form Angka**: Memastikan input umur atau jumlah kuantitas belanja benar-benar integer menggunakan `Number.isInteger()`.\n3. **Sistem Jaringan & Hardware**: Mengonversi alamat IP atau byte data warna (0-255) ke representasi heksadesimal menggunakan `num.toString(16)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Salah mengira `Number.MIN_VALUE` sebagai angka negatif terkecil**: `Number.MIN_VALUE` adalah angka positif terkecil mendekati 0 (`5e-324`). Untuk batas negatif, gunakan `-Number.MAX_VALUE` atau `Number.MIN_SAFE_INTEGER`.\n* **Menggunakan `isNaN()` global lama**: `isNaN('bukan angka')` menghasilkan `true` karena 'bukan angka' dikonversi dulu ke angka. Selalu gunakan `Number.isNaN()` untuk pemeriksaan nilai `NaN` murni.\n* **Lupa bahwa angka di atas `MAX_SAFE_INTEGER` kehilangan presisi**: `9007199254740991 + 1 === 9007199254740991 + 2` bernilai `true`! Untuk angka yang lebih besar dari itu, gunakan tipe data `BigInt`.

### 🌟 Best Practice

- Selalu gunakan `Number.isNaN()` dan `Number.isFinite()` alih-alih fungsi bawaan global untuk menghindari bug implicit type coercion.\n* Gunakan `Number.parseInt(str, 10)` dengan selalu menyertakan basis 10 secara eksplisit untuk mencegah ambiguitas basis pada string tertentu.\n* Gunakan `toLocaleString()` untuk menampilkan angka kepada user agar konsisten dengan standar lokal bahasa mereka.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah fungsi `formatRupiah(angka)` yang menerima angka dan mengembalikan format string mata uang Rupiah Indonesia (contoh: `Rp 500.000`).\n2. Buatlah fungsi `konversiWarnaRGBkeHex(r, g, b)` yang menerima tiga angka (0-255) dan mengembalikan kode warna heksadesimal dengan format `#RRGGBB` menggunakan method `toString(16)` dan `padStart(2, '0')`.

---

## 7. 🧭 Navigasi

- ➡️ **Selanjutnya:** [02 - String](../02-string/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
