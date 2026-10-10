# 01 - Number (Static Properties, Methods, dan Number Parsing)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Representasi tipe numerik 64-bit float IEEE 754 di JavaScript, lengkap dengan konstanta batas presisi, metode parsing, dan validasi ketat.
> - **Kapan Digunakan**: Operasi matematika, pembulatan desimal, lokalisasi mata uang, dan validasi ketat input angka tanpa risiko _type coercion_.
> - **Aturan Praktis**: Selalu gunakan `Number.isNaN()` dan `Number.isFinite()` alih-alih fungsi global lama, dan selalu sertakan basis `radix` pada `Number.parseInt(str, 10)`.

---

## 1. 🎯 Tujuan Belajar

- Memahami representasi tipe numerik di JavaScript (IEEE 754 double precision) dan batas-batas presisinya.
- Menguasai static properties penting: `MAX_VALUE`, `MIN_VALUE`, `MAX_SAFE_INTEGER`, `MIN_SAFE_INTEGER`, dan `EPSILON`.
- Memahami perbedaan mendasar validasi modern (`Number.isNaN`, `Number.isFinite`) vs fungsi global lama (`isNaN`, `isFinite`).
- Menguasai teknik parsing string ke angka (`parseInt`, `parseFloat`) serta perbedaannya dengan `Number()`.
- Menguasai formatting angka: pembulatan desimal (`toFixed`), angka signifikan (`toPrecision`), konversi basis (`toString(radix)`), dan lokalisasi mata uang (`toLocaleString`).
- Menghindari jebakan objek pembungkus (_wrapper object_) `new Number()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Objek `Number` seperti penggaris presisi tukang arsitek: ia memiliki batas rentang terkecil dan terbesar yang bisa diukur dengan akurat (`MIN_SAFE_INTEGER` hingga `MAX_SAFE_INTEGER`). Jika Anda mencoba mengukur benda di luar kemampuan penggaris tersebut, angka yang dicatat akan mengalami penyimpangan atau distorsi.

---

### 1. Tabel Ringkasan Fitur Number (Cheat-Sheet)

| Kategori     | Nama Fitur                  | Nilai Kembalian / Tipe                    | Deskripsi Singkat                                                  |
| :----------- | :-------------------------- | :---------------------------------------- | :----------------------------------------------------------------- |
| **Property** | `Number.EPSILON`            | `number` ($\approx 2.22 \times 10^{-16}$) | Selisih terkecil untuk toleransi komparasi desimal.                |
| **Property** | `Number.MAX_VALUE`          | `number` ($\approx 1.79 \times 10^{308}$) | Angka positif terbesar sebelum menjadi `Infinity`.                 |
| **Property** | `Number.MIN_VALUE`          | `number` ($\approx 5 \times 10^{-324}$)   | Angka positif terkecil yang paling mendekati 0.                    |
| **Property** | `Number.MAX_SAFE_INTEGER`   | `number` ($9007199254740991$)             | Bilangan bulat terbesar yang aman dihitung presisi ($2^{53} - 1$). |
| **Property** | `Number.MIN_SAFE_INTEGER`   | `number` ($-9007199254740991$)            | Bilangan bulat terkecil yang aman dihitung presisi.                |
| **Method**   | `Number.isNaN(val)`         | `boolean`                                 | Cek apakah nilai adalah `NaN` secara ketat tanpa _coercion_.       |
| **Method**   | `Number.isFinite(val)`      | `boolean`                                 | Cek apakah nilai adalah angka terhingga (_finite_).                |
| **Method**   | `Number.isInteger(val)`     | `boolean`                                 | Cek apakah nilai adalah bilangan bulat sejati.                     |
| **Method**   | `Number.isSafeInteger(val)` | `boolean`                                 | Cek apakah nilai bilangan bulat berada dalam batas aman.           |
| **Method**   | `Number.parseInt(str, rad)` | `number` \| `NaN`                         | Parsing string menjadi bilangan bulat berdasarkan basis _radix_.   |
| **Method**   | `Number.parseFloat(str)`    | `number` \| `NaN`                         | Parsing string menjadi bilangan pecahan (_floating point_).        |
| **Instance** | `num.toFixed(digits)`       | `string`                                  | Membulatkan angka ke jumlah digit desimal tertentu.                |
| **Instance** | `num.toPrecision(digits)`   | `string`                                  | Memformat angka sesuai total angka signifikan.                     |
| **Instance** | `num.toString(radix)`       | `string`                                  | Konversi angka ke teks dalam basis tertentu (2, 8, 16, dll).       |
| **Instance** | `num.toLocaleString(...)`   | `string`                                  | Format angka sesuai konvensi lokal (mata uang, pemisah ribuan).    |

---

### 2. Eksplorasi Mendalam Static Properties & Batas Presisi

#### 1. Masalah Desimal Floating-Point & `Number.EPSILON`

Di JavaScript (dan mayoritas bahasa pemrograman modern), angka disimpan dalam format biner IEEE 754 64-bit. Angka pecahan seperti `0.1` dan `0.2` tidak memiliki representasi biner yang presisi sempurna:

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false! ❌
```

- **Solusi dengan `Number.EPSILON`**:
  `Number.EPSILON` merepresentasikan selisih terkecil antara 1 dan angka floating-point berikutnya. Gunakan nilai ini sebagai batas ambang toleransi (_tolerance threshold_):
  ```javascript
  const toleransiSama = (a, b) => Math.abs(a - b) < Number.EPSILON;
  console.log(toleransiSama(0.1 + 0.2, 0.3)); // true ✅
  ```

---

#### 2. Batas Angka Ekstrem: `Number.MAX_VALUE` & `Number.MIN_VALUE`

- **`Number.MAX_VALUE`**:
  Angka positif terbesar yang dapat direpresentasikan ($\approx 1.79 \times 10^{308}$). Operasi yang melampaui angka ini akan berubah menjadi `Infinity`:

  ```javascript
  console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
  console.log(Number.MAX_VALUE * 2); // Infinity
  ```

- **Jebakan `Number.MIN_VALUE` (Sering Salah Paham!)**:

  > ⚠️ `Number.MIN_VALUE` **BUKAN** angka paling negatif! `MIN_VALUE` adalah **angka positif terkecil yang paling mendekati nol** ($\approx 5 \times 10^{-324}$).

  ```javascript
  console.log(Number.MIN_VALUE > 0); // true! (masih bilangan positif)

  // Jika Anda mencari angka negatif terbesar, gunakan:
  console.log(-Number.MAX_VALUE); // -1.7976931348623157e+308
  ```

---

#### 3. Batas Presisi Integer: `MAX_SAFE_INTEGER` & `MIN_SAFE_INTEGER`

JavaScript menggunakan 53 bit untuk menyimpan bagian integer ($2^{53} - 1 = 9007199254740991$).

- **Bahaya Menghitung di Luar Batas Aman**:
  Jika Anda melakukan kalkulasi di atas `MAX_SAFE_INTEGER`, JavaScript mulai kehilangan presisi bit terakhir:
  ```javascript
  const batas = Number.MAX_SAFE_INTEGER; // 9007199254740991
  console.log(batas + 1 === batas + 2); // true! ❌ (Bug fatal pada transaksi finansial / ID besar)
  ```
- **Solusi**: Jika Anda bekerja dengan ID database 64-bit (misal Twitter Snowflake ID) atau kalkulasi finansial besar, beralihlah ke tipe data **`BigInt`** (`9007199254740991n`).

---

### 3. Eksplorasi Mendalam Static Methods & Validasi Ketat

#### 1. Validasi NaN: `Number.isNaN()` vs Global `isNaN()`

- **Masalah pada Global `isNaN(value)`**:
  Fungsi bawaan `isNaN()` global secara diam-diam memaksakan konversi tipe (_implicit type coercion_) ke angka terlebih dahulu.

  ```javascript
  console.log(isNaN("halo")); // true! ❌ (Karena 'halo' diubah jadi NaN terlebih dahulu)
  console.log(isNaN(undefined)); // true! ❌
  ```

- **Solusi Modern: `Number.isNaN(value)`**:
  Hanya mengembalikan `true` jika nilai tersebut **bertipe number dan memang bernilai NaN murni**:
  ```javascript
  console.log(Number.isNaN("halo")); // false ✅ (tipe string, bukan NaN)
  console.log(Number.isNaN(undefined)); // false ✅
  console.log(Number.isNaN(0 / 0)); // true ✅ (hasil pembagian ilegal bernilai NaN)
  console.log(Number.isNaN(NaN)); // true ✅
  ```

---

#### 2. Validasi Terhingga: `Number.isFinite()` vs Global `isFinite()`

- **Global `isFinite()`**: Melakukan konversi string menjadi angka terlebih dahulu.
- **`Number.isFinite()`**: Memeriksa secara ketat tanpa konversi:

  ```javascript
  console.log(isFinite("100")); // true (string '100' dikonversi jadi angka 100)
  console.log(Number.isFinite("100")); // false ✅ (karena bertipe string)

  console.log(Number.isFinite(100)); // true ✅
  console.log(Number.isFinite(Infinity)); // false
  console.log(Number.isFinite(1 / 0)); // false
  ```

---

#### 3. Pengecekan Bilangan Bulat: `Number.isInteger()` & `Number.isSafeInteger()`

- **`Number.isInteger(value)`**:
  Menentukan apakah suatu nilai adalah bilangan bulat:

  ```javascript
  console.log(Number.isInteger(10)); // true
  console.log(Number.isInteger(10.5)); // false
  console.log(Number.isInteger("10")); // false (tidak ada coercion)

  // Kasus Unik di JavaScript:
  console.log(Number.isInteger(10.0)); // true! (karena 10.0 identik secara bit dengan 10)
  ```

- **`Number.isSafeInteger(value)`**:
  Memastikan angka adalah bilangan bulat AND berada di dalam rentang `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`:
  ```javascript
  console.log(Number.isSafeInteger(2 ** 53 - 1)); // true
  console.log(Number.isSafeInteger(2 ** 53)); // false (di luar rentang aman)
  ```

---

#### 4. Parsing String ke Bilangan Bulat: `Number.parseInt(str, radix)`

Mengambil bilangan bulat dari teks.

- **Kasus A: Selalu Tulis Parameter `radix` (Basis 10)**

  ```javascript
  // Praktik Terbaik: Selalu beri radix 10 secara eksplisit!
  console.log(Number.parseInt("42", 10)); // 42
  ```

- **Kasus B: Karakter Non-Digit di Belakang (_Trailing Text_)**
  `parseInt` membaca karakter dari kiri hingga menemukan karakter bukan angka pertama:

  ```javascript
  console.log(Number.parseInt("100px", 10)); // 100 (berguna untuk CSS parsing)
  console.log(Number.parseInt("  50 kg", 10)); // 50 (spasi di depan diabaikan)
  console.log(Number.parseInt("Harga: 100", 10)); // NaN (karena karakter awal adalah huruf)
  ```

- **Kasus C: Basis Lain (Heksadesimal, Oktal, Biner)**
  ```javascript
  console.log(Number.parseInt("FF", 16)); // 255 (basis 16 heksadesimal)
  console.log(Number.parseInt("1010", 2)); // 10 (basis 2 biner)
  ```

---

#### 5. Parsing String ke Pecahan: `Number.parseFloat(str)`

Membaca nilai desimal dari teks.

- **Karakteristik**:
  - Otomatis mengenali tanda titik `.` sebagai pemisah desimal.
  - Mendukung notasi eksponensial (saintifik) seperti `'2.5e3'`:
  ```javascript
  console.log(Number.parseFloat("3.14159rad")); // 3.14159
  console.log(Number.parseFloat("2.5e3")); // 2500 (2.5 * 10^3)
  ```

---

#### 6. Perbedaan Kritis: `parseInt()` vs `Number()`

Jangan tertukar antara fungsi parsing dan fungsi konversi tipe:

```javascript
// parseInt mengabaikan akhiran string:
console.log(Number.parseInt("42px", 10)); // 42

// Number() ketat: seluruh karakter harus merupakan angka yang valid:
console.log(Number("42px")); // NaN ❌
console.log(Number("   42   ")); // 42 (spasi bersih masih diterima)
console.log(Number("")); // 0 (string kosong menjadi 0!)
```

---

### 4. Eksplorasi Mendalam Instance Methods

#### 1. Pembulatan Desimal Tetap: `num.toFixed(digits)`

Membulatkan angka ke jumlah tempat desimal tertentu.

- **Perhatian Utama**: Nilai kembaliannya adalah bertipe **`string`**, bukan `number`!

  ```javascript
  const nilai = 12.3456;
  console.log(nilai.toFixed(2)); // "12.35" (string)
  console.log(typeof nilai.toFixed(2)); // "string"

  // Jika ingin kembali menjadi angka:
  const angkaDibulatkan = Number(nilai.toFixed(2)); // 12.35
  ```

---

#### 2. Total Angka Signifikan: `num.toPrecision(precision)`

Mengatur total jumlah angka presisi (baik sebelum maupun sesudah koma):

```javascript
const angka = 123.456;
console.log(angka.toPrecision(4)); // "123.5" (total 4 digit)
console.log(angka.toPrecision(2)); // "1.2e+2" (berubah ke eksponensial jika digit kurang)
```

---

#### 3. Konversi Basis Bilangan: `num.toString(radix)`

Mengubah angka menjadi string dalam basis bilangan tertentu (rentang radix 2 hingga 36):

```javascript
const desimal = 255;
console.log(desimal.toString(2)); // "11111111" (biner)
console.log(desimal.toString(8)); // "377"      (oktal)
console.log(desimal.toString(16)); // "ff"       (heksadesimal)
```

- **Jebakan Sintaks pada Literal Angka**:
  Jika Anda memanggil method langsung pada angka literal, JavaScript akan mengira titik pertama adalah tanda desimal:

  ```javascript
  // 42.toString(2); // ❌ SyntaxError: Invalid or unexpected token

  // Solusi A: Bungkus dengan tanda kurung
  (42).toString(2); // "101010" ✅

  // Solusi B: Gunakan dua titik
  (42).toString(2); // "101010" ✅
  ```

---

#### 4. Format Internasional & Mata Uang: `num.toLocaleString(locales, options)`

Menampilkan angka sesuai bahasa dan konvensi regional tanpa perlu membuat rumus pemisah ribuan regex manual:

```javascript
const gaji = 12500000;

// Format Rupiah Indonesia tanpa desimal sen
const rupiah = gaji.toLocaleString("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
console.log(rupiah); // "Rp 12.500.000"

// Format Dolar AS
const dollar = gaji.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
});
console.log(dollar); // "$12,500,000.00"
```

---

### 5. Jebakan Objek Pembungkus: `Number()` vs `new Number()`

Hindari membuat angka menggunakan kata kunci `new`:

```javascript
const primitif = 42;
const objek = new Number(42); // ❌ JANGAN LAKUKAN INI!

console.log(typeof primitif); // "number"
console.log(typeof objek); // "object"

// Jebakan Kondisional (Objek selalu bernilai truthy!):
const angkaNolObj = new Number(0);
if (angkaNolObj) {
  console.log("Ini akan dieksekusi! ⚠️"); // Karena semua objek bernilai truthy, meskipun nilainya 0!
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep, properti batas batas presisi, validasi ketat, dan parsing di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan dan dieksplorasi secara langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/01-number/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Aplikasi Fintech & E-Commerce**: Memformat harga barang dan saldo pengguna dengan `toLocaleString('id-ID')`, serta menghindari bug perbandingan desimal menggunakan `Number.EPSILON`.
2. **Validasi Form Input Pengguna**: Menggunakan `Number.isInteger()` dan `Number.isSafeInteger()` untuk memastikan ID atau kuantitas barang adalah bilangan bulat murni.
3. **Pengolahan Warna Web (CSS / Canvas)**: Mengonversi nilai RGB (0–255) ke format string hex menggunakan `angka.toString(16).padStart(2, '0')`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Salah mengira `Number.MIN_VALUE`**: Menganggap `MIN_VALUE` sebagai angka paling negatif, padahal itu adalah angka positif terkecil mendekati 0.
- **Menggunakan `isNaN()` global**: Memicu konversi implisit yang menyebabkan string sembarang dianggap `NaN`. Selalu gunakan `Number.isNaN()`.
- **Lupa bahwa `toFixed()` mengembalikan string**: Menjumlahkan hasil `toFixed()` dengan angka lain (`angka.toFixed(2) + 5`) akan memicu penggabungan teks (_string concatenation_).
- **Aritmetika di luar `MAX_SAFE_INTEGER`**: Menghitung ID angka 64-bit menggunakan tipe number biasa yang menyebabkan data tertukar karena kehilangan presisi.

### 🌟 Best Practice

- Selalu sertakan basis `radix` pada `Number.parseInt(str, 10)` secara eksplisit.
- Gunakan `Number.isNaN()` dan `Number.isFinite()` untuk validasi input angka.
- Gunakan tipe `BigInt` jika angka yang dikalkulasi berpotensi melampaui `Number.MAX_SAFE_INTEGER`.
- Jangan pernah menggunakan `new Number()`, cukup gunakan literal `42` atau fungsi konversi `Number('42')`.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi `bandingkanDesimal(a, b)` yang mengembalikan `true` jika dua bilangan pecahan dianggap sama dengan memanfaatkan toleransi `Number.EPSILON`.
2. Buatlah fungsi `konversiRGBkeHex(r, g, b)` yang memvalidasi bahwa input adalah integer aman antara 0 hingga 255, lalu mengembalikan string format kode heksadesimal `#RRGGBB`.
3. Buatlah fungsi `parseHargaInput(teks)` yang mampu menerima string seperti `"Rp 150.000"` atau `"150000px"` dan mengembalikan angka integer bersih `150000`.

---

## 6. 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [16 - Iterable dan Iterator (Modul 02)](../../02-oop/16-iterable-and-iterator/README.md)
- ➡️ **Selanjutnya:** [02 - String](../02-string/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
