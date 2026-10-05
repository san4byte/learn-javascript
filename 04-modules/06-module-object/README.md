# 06 - Module Object

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mengimpor seluruh named export dari suatu modul sekaligus ke dalam satu objek namespace menggunakan `import * as`.
> * **Kapan Digunakan**: Saat sebuah modul mengekspor banyak fungsi utilitas terkait dan Anda ingin mengelompokkannya di bawah satu namespace bersih.
> * **Aturan Praktis**: Gunakan sintaks `import * as Namespace from './modul.js'` dan akses via dot notation: `Namespace.fungsi()`.

## 1. 🎯 Tujuan Belajar
- Mengimpor seluruh konten module sekaligus sebagai satu objek namespace menggunakan `import * as ModuleName`.
- Mengakses fungsi dan variabel hasil import menggunakan notasi titik (*dot notation*).
- Menghindari baris import yang terlalu panjang ketika membutuhkan banyak fungsi dari satu file.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **kotak peralatan pensil warna lengkap**: Alih-alih mengeluarkan pensil merah, biru, hijau, dan kuning satu per satu ke atas meja belajar, Anda mengambil seluruh kotak pensil (`* as KotakPensil`) lalu mengambil warna yang dibutuhkan langsung dari kotaknya saat melukis.

Ketika modul target memiliki puluhan named export, mengimpor satu per satu dengan `{ f1, f2, f3, ... }` membuat baris kode tidak praktis:
1. **Module Namespace Object**: Sintaks `import * as Objek from './path.js'` membuat satu objek JavaScript yang membungkus semua named export.
2. **Akses Properti**: Komponen diakses layaknya properti objek biasa: `Objek.add()`, `Objek.sub()`.
3. **Immutable**: Objek modul ini bersifat beku (*frozen/sealed*), Anda tidak dapat menambah atau mengubah properti di dalamnya.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// calculator.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
export const mul = (a, b) => a * b;
export const div = (a, b) => a / b;

// example.js
import * as Calculator from './calculator.js';

console.log('Penjumlahan:', Calculator.add(10, 5));
console.log('Pengurangan:', Calculator.sub(10, 5));
console.log('Perkalian  :', Calculator.mul(10, 5));
console.log('Pembagian  :', Calculator.div(10, 5));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Penjumlahan: 15
Pengurangan: 5
Perkalian  : 50
Pembagian  : 2
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Mengimpor library utilitas matematika (`import * as MathUtils`), kumpulan ikon UI, atau helper string ke dalam aplikasi.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Dampak Tree-Shaking**: Mengimpor dengan `* as` terkadang dapat menyulitkan bundler jadul menghapus kode yang tidak terpakai (*dead code elimination*), meski bundler modern sudah mampu mengoptimalkannya.
* **Mencoba Memodifikasi Objek**: Menulis `Calculator.add = null` akan melempar runtime error `TypeError: Cannot assign to read only property`.

### 🌟 Best Practice
* Gunakan `import * as` saat Anda memang membutuhkan mayoritas fungsi yang diekspor oleh modul tersebut.
* Gunakan huruf kapital di awal untuk nama objek namespace (misal `Calculator`, `StringUtils`) agar mudah dikenali sebagai modul.

---

## 6. ✍️ Latihan Mandiri
1. Buat file `konversi-suhu.js` dengan fungsi `celsiusToFahrenheit()`, `celsiusToKelvin()`, dan `fahrenheitToCelsius()`.
2. Impor semua fungsi sebagai satu objek `import * as Suhu from './konversi-suhu.js'` dan cetak konversi suhu 100 derajat Celsius.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - Export Default](../05-export-default/README.md)
- ➡️ **Selanjutnya:** [07 - Aggregating Modules](../07-aggregating-modules/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
