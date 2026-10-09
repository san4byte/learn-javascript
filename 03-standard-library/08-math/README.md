# 08 - Math (Konstanta Matematika, Pembulatan, dan Operasi Angka)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Objek bawaan statis yang menyediakan konstanta matematika dan fungsi kalkulasi numerik tingkat lanjut tanpa perlu diinstansiasi (`new Math()` dilarang).
> - **Kapan Digunakan**: Paginasi data (`Math.ceil`), pencarian harga ekstrem (`Math.min` / `Math.max`), kalkulasi geometri (`Math.hypot`), dan angka acak (`Math.random`).
> - **Aturan Praktis**: Pahami perbedaan pembulatan negatif antara `Math.floor()` dan `Math.trunc()`, dan ingat bahwa objek `Math` tidak mendukung tipe `BigInt`.

---

## 1. 🎯 Tujuan Belajar

- Memahami objek bawaan `Math` sebagai namespace utilitas matematika statis.
- Menguasai seluruh konstanta dan method kalkulasi `Math` beserta berbagai kondisi kasus (*edge cases*).
- Memahami perbedaan mendalam 4 teknik pembulatan angka (`round`, `floor`, `ceil`, `trunc`) pada bilangan positif maupun negatif.
- Menguasai operasi kalkulasi: `abs()`, `sign()`, `min()`, `max()`, `pow()`, `sqrt()`, `cbrt()`, dan `hypot()`.
- Menguasai rumus generator angka acak bilangan bulat dalam rentang tertentu via `Math.random()`.
- Mengetahui batasan tipe data pada objek `Math` yang hanya menerima tipe `Number`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Math` seperti **kalkulator ilmiah saku**: Anda tidak perlu merakit atau membeli kalkulator baru setiap kali ingin berhitung (`new Math()` tidak diperbolehkan dan akan menghasilkan error). Anda cukup menekan tombol fungsi yang tersedia langsung pada badannya (`Math.sqrt`, `Math.PI`). Namun kalkulator ini hanya mengerti sistem bilangan standar dan akan mogok jika Anda memasukkan format chip raksasa (`BigInt`).

---

### 1. Tabel Ringkasan Method & Konstanta Math (Cheat-Sheet)

| Kategori | Method / Properti | Nilai Kembalian | Deskripsi Singkat |
| :--- | :--- | :--- | :--- |
| **Konstanta** | `Math.PI` | `number` ($\approx 3.14159$) | Rasio keliling lingkaran terhadap diameternya. |
| | `Math.E` | `number` ($\approx 2.71828$) | Konstanta basis logaritma natural (bilangan Euler). |
| **Pembulatan** | `Math.round(x)` | `number` (bulat) | Membulatkan ke integer terdekat ($\ge 0.5$ ke atas). |
| | `Math.floor(x)` | `number` (bulat) | Membulatkan selalu ke bawah (ke arah $-\infty$). |
| | `Math.ceil(x)` | `number` (bulat) | Membulatkan selalu ke atas (ke arah $+\infty$). |
| | `Math.trunc(x)` | `number` (bulat) | Memotong seluruh angka di belakang koma desimal. |
| **Aritmetika** | `Math.abs(x)` | `number` ($\ge 0$) | Menghitung nilai mutlak (selalu positif). |
| | `Math.sign(x)` | `1`, `-1`, `0`, `-0`, `NaN` | Menentukan tanda positif/negatif dari suatu angka. |
| | `Math.max(...val)`| `number` | Mengambil angka terbesar (argumen kosong = `-Infinity`). |
| | `Math.min(...val)`| `number` | Mengambil angka terkecil (argumen kosong = `Infinity`). |
| **Pangkat & Akar**| `Math.pow(x, y)` | `number` | Menghitung nilai perpangkatan $x^y$ (setara `x ** y`). |
| | `Math.sqrt(x)` | `number` | Menghitung akar kuadrat $\sqrt{x}$. |
| | `Math.cbrt(x)` | `number` | Menghitung akar kubik $\sqrt[3]{x}$. |
| | `Math.hypot(...v)`| `number` | Sisi miring teorema Pythagoras $\sqrt{a^2 + b^2}$. |
| **Acak** | `Math.random()` | `number` | Menghasilkan desimal acak dalam rentang $[0, 1)$. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Method Math

Berikut adalah rincian lengkap setiap fitur dan method `Math` beserta skenario kasusnya masing-masing:

---

#### 1. Konstanta Pi & Euler: `Math.PI` & `Math.E`
Menyediakan rasio lingkaran dan basis logaritma natural dengan presisi float 64-bit:

```javascript
console.log(Math.PI); // 3.141592653589793
console.log(Math.E);  // 2.718281828459045

// Contoh Menghitung Luas Lingkaran (r = 7):
const radius = 7;
const luas = Math.PI * radius ** 2;
console.log(luas); // 153.93804002589985
```

---

#### 2. Pembulatan Terdekat: `Math.round(x)`
Membulatkan angka ke integer terdekat. Nilai pecahan $\ge 0.5$ dibulatkan ke atas:

```javascript
console.log(Math.round(4.2));  // 4
console.log(Math.round(4.7));  // 5
console.log(Math.round(-4.2)); // -4
console.log(Math.round(-4.7)); // -5
```

---

#### 3. Pembulatan ke Bawah: `Math.floor(x)`
Membulatkan angka ke bawah menuju bilangan yang lebih kecil (ke arah $-\infty$):

```javascript
console.log(Math.floor(4.7));  // 4
console.log(Math.floor(-4.2)); // -5 (menjauhi nol ke arah negatif)
console.log(Math.floor(-4.7)); // -5
```

---

#### 4. Pembulatan ke Atas: `Math.ceil(x)`
Membulatkan angka ke atas menuju bilangan yang lebih besar (ke arah $+\infty$). Sangat cocok untuk sistem paginasi web:

```javascript
console.log(Math.ceil(4.2));  // 5
console.log(Math.ceil(-4.7)); // -4 (mendekati nol)

// Kalkulasi Total Halaman:
const totalItem = 53;
const limitPerHal = 10;
console.log(Math.ceil(totalItem / limitPerHal)); // 6 halaman
```

---

#### 5. Pemotongan Desimal: `Math.trunc(x)`
Membuang seluruh angka di belakang tanda koma tanpa memedulikan arah positif atau negatif:

```javascript
console.log(Math.trunc(4.9));  // 4
console.log(Math.trunc(-4.9)); // -4 (berbeda dengan Math.floor yang menghasilkan -5!)
```

---

#### 6. Nilai Mutlak: `Math.abs(x)`
Mengembalikan nilai absolut/mutlak (selalu bernilai non-negatif):

```javascript
console.log(Math.abs(-150)); // 150
console.log(Math.abs(150));  // 150
```

---

#### 7. Penanda Bilangan: `Math.sign(x)`
Mengembalikan nilai penanda apakah angka bertanda positif, negatif, atau nol:

```javascript
console.log(Math.sign(50));  // 1
console.log(Math.sign(-50)); // -1
console.log(Math.sign(0));   // 0
```

---

#### 8. Nilai Terbesar: `Math.max(...values)`
Mengembalikan angka terbesar dari daftar argumen yang diberikan:

```javascript
const skor = [10, 45, 99, 32];
console.log(Math.max(...skor)); // 99

// Peringatan jika dipanggil tanpa argumen:
console.log(Math.max()); // -Infinity
```

---

#### 9. Nilai Terkecil: `Math.min(...values)`
Mengembalikan angka terkecil dari daftar argumen:

```javascript
console.log(Math.min(...skor)); // 10

// Peringatan jika dipanggil tanpa argumen:
console.log(Math.min()); // Infinity
```

---

#### 10. Perpangkatan: `Math.pow(base, exponent)`
Menghitung $x^y$, setara dengan operator eksponensial `x ** y`:

```javascript
console.log(Math.pow(2, 8)); // 256
console.log(2 ** 8);         // 256
```

---

#### 11. Akar Kuadrat: `Math.sqrt(x)`
Menghitung akar pangkat dua ($\sqrt{x}$):

```javascript
console.log(Math.sqrt(64)); // 8
console.log(Math.sqrt(-1)); // NaN (akar dari bilangan negatif)
```

---

#### 12. Akar Kubik: `Math.cbrt(x)`
Menghitung akar pangkat tiga ($\sqrt[3]{x}$):

```javascript
console.log(Math.cbrt(27));  // 3
console.log(Math.cbrt(-27)); // -3 (mendukung bilangan negatif)
```

---

#### 13. Hipotenusa Pythagoras: `Math.hypot(...values)`
Menghitung panjang sisi miring segitiga siku-siku ($\sqrt{a^2 + b^2}$) atau jarak Euclidean multidimensi tanpa risiko overflow numerik:

```javascript
// Segitiga dengan alas 3 dan tinggi 4:
console.log(Math.hypot(3, 4)); // 5

// Jarak Euclidean 3 Dimensi (x, y, z):
console.log(Math.hypot(2, 3, 6)); // 7
```

---

#### 14. Generator Bilangan Acak: `Math.random()`
Mengembalikan bilangan desimal pseudo-acak di rentang $[0, 1)$:

```javascript
console.log(Math.random()); // Contoh: 0.728491...

// Rumus Standar Integer Acak Inklusif [min, max]:
function acakInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(acakInteger(1, 6)); // Dadu (1 s.d. 6)
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep konstanta matematika, 4 teknik pembulatan, pencarian nilai ekstrem, kalkulasi geometri Pythagoras, dan generator bilangan bulat acak di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/08-math/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Paginasi Web**: Menghitung jumlah lembar halaman tabel produk dengan `Math.ceil(totalData / limitPerHalaman)`.
2. **Game & Simulasi Fisika**: Menghitung jarak antar dua titik pemain di peta menggunakan `Math.hypot(x2 - x1, y2 - y1)`.
3. **Penentuan Pemenang Undian / Door Prize**: Mengambil indeks acak pemenang dari daftar peserta menggunakan `Math.floor(Math.random() * peserta.length)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Tertukar `floor()` dan `trunc()` pada Angka Negatif**: `Math.floor(-1.5)` menghasilkan `-2`, sedangkan `Math.trunc(-1.5)` menghasilkan `-1`.
- **Argumen Kosong pada `Math.max()`**: Mengirim array kosong via spread `Math.max(...[])` menghasilkan `-Infinity`, bukan `0` atau `undefined`.
- **Menggunakan `Math.random()` untuk Keamanan Akun**: Angka acak dari `Math.random()` dapat ditebak polanya oleh peretas. Selalu gunakan `crypto.getRandomValues()`.

### 🌟 Best Practice

- Selalu gunakan `Math.ceil()` untuk paginasi data agar sisa pecahan data tidak terpotong.
- Gunakan `Math.hypot()` alih-alih merumuskan `Math.sqrt(a * a + b * b)` secara manual demi kestabilan presisi numerik.
- Selalu sertakan validasi array kosong sebelum memanggil `Math.min(...arr)` atau `Math.max(...arr)`.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `hitungJarak2D(titikA, titikB)` yang menerima dua objek `{ x, y }` dan mengembalikan jarak garis lurus antara kedua titik menggunakan `Math.hypot()`.
2. Buat fungsi `acakElemenArray(arr)` yang memilih satu elemen acak dari array yang diberikan menggunakan `Math.random()`.
3. Buat fungsi `pembulatanDesimalKustom(angka, jumlahDesimal)` yang mampu membulatkan angka ke $n$ digit desimal menggunakan perkalian faktor 10 dan `Math.round()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07 - Date](../07-date/README.md)
- ➡️ **Selanjutnya:** [09 - Boolean](../09-boolean/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
