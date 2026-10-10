# 05 - Pengkondisian (Conditionals)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengontrol alur percabangan eksekusi program berdasarkan evaluasi kebenaran (_truthiness_) suatu ekspresi boolean.
> - **Kapan Digunakan**: Validasi data input, penentuan hak akses pengguna, pemetaan status transaksi, dan pemilihan algoritma berdasarkan kondisi runtime.
> - **Aturan Praktis**: Gunakan _Strict Equality_ (`===`), gunakan `if...else if` untuk rentang nilai numerik, gunakan `switch` atau _Object Lookup Table_ untuk nilai pasti (_exact match_), dan gunakan operator ternary hanya untuk penugasan nilai ekspresi tunggal.

---

## 1. 🎯 Tujuan Belajar

- Memahami percabangan dasar menggunakan `if`, `else if`, dan `else`.
- Memahami evaluasi nilai _Truthy_ dan 8 nilai _Falsy_ standar dalam JavaScript.
- Menguasai operator Ternary (`? :`) untuk penugasan nilai ringkas.
- Menerapkan evaluasi _Short-Circuit_ menggunakan operator logika `&&`, `||`, dan _Nullish Coalescing_ `??`.
- Menguasai pernyataan `switch...case`, kata kunci `break`, dan pola pengelompokan (_fall-through_).
- Menerapkan pola modern _Object Lookup Table_ sebagai alternatif bersih dari `switch` yang panjang.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **`if...else`**: Seperti **petugas keamanan bioskop**. Petugas memeriksa KTP pengunjung (_kondisi usia >= 17_). Jika memenuhi syarat, pengunjung dipersilakan masuk; jika tidak, diarahkan ke loket film semua umur.
> - **`switch`**: Seperti **mesin penjual minuman otomatis (_vending machine_)**. Anda menekan tombol huruf pasti (misal: tombol `A1`, `B2`). Mesin mencocokkan tombol tersebut secara langsung ke slot minuman yang sesuai tanpa memeriksa rentang angka.
> - **Ternary Operator**: Seperti **saklar lampu dua arah**. Hanya ada dua hasil langsung: menyala (`ON`) atau mati (`OFF`) dalam satu tarikan saklar.

---

### Tabel Perbandingan Struktur Percabangan

| Fitur                         | `if...else if`                                        | `switch...case`                          | Object Lookup Table                 |
| :---------------------------- | :---------------------------------------------------- | :--------------------------------------- | :---------------------------------- |
| **Kriteria Evaluasi**         | Rentang nilai (`>`, `<`, `>=`) atau ekspresi kompleks | Nilai pasti (_exact match_) dengan `===` | Kunci objek (_exact string/number_) |
| **Tipe Data Kondisi**         | Boolean ekspresi apa pun                              | Primitif (String, Number)                | String atau Symbol                  |
| **Keterbacaan Cabang Banyak** | Cenderung bertumpuk (_nested_)                        | Terstruktur dengan `case` dan `break`    | Sangat ringkas dan terisolasi       |
| **Performa Pencarian**        | $O(n)$ sekuensial                                     | $O(n)$ sekuensial                        | $O(1)$ akses properti instan        |

---

### Pembahasan Mendalam Fitur & Sintaks

#### 1. Strict Equality (`===`) vs Loose Equality (`==`)

Selalu gunakan _Strict Equality_ (`===`) yang membandingkan nilai dan tipe data sekaligus. Operator `==` melakukan pemaksaan tipe implisit (_type coercion_) yang sering menimbulkan bug tak terduga:

```javascript
0 == false; // true (Loose: berbahaya)
0 === false; // false (Strict: aman dan presisi)
"" == 0; // true (Loose)
"" === 0; // false (Strict)
```

#### 2. Evaluasi 8 Nilai Falsy Resmi JavaScript

Dalam evaluasi percabangan, nilai-nilai berikut secara otomatis dianggap `false`:

1. `false` (boolean false)
2. `0`, `-0`, `0n` (angka nol dan BigInt nol)
3. `""` (string kosong)
4. `null`
5. `undefined`
6. `NaN` (Not a Number)

> ⚠️ **Catatan Penting**: Array kosong `[]` dan Objek kosong `{}` adalah **TRUTHY** di JavaScript!

#### 3. Operator Ternary

Operator ternary mengevaluasi ekspresi dalam bentuk `kondisi ? nilaiJikaTrue : nilaiJikaFalse`. Cocok untuk menginisialisasi konstanta:

```javascript
const nilai = 80;
const status = nilai >= 75 ? "Lulus" : "Remidial";
```

#### 4. Short-Circuit Evaluation (`&&`, `||`, `??`)

- **`&&` (Guard)**: Mengembalikan operand kanan jika operand kiri _truthy_.
- **`||` (Fallback Falsy)**: Mengembalikan operand kanan jika operand kiri bernilai _falsy_ apa pun.
- **`??` (Nullish Coalescing)**: Mengembalikan operand kanan HANYA jika operand kiri bernilai `null` atau `undefined` (tetap mempertahankan angka `0` dan string kosong `""`).

```javascript
const skor = 0;
const hasilOR = skor || 100; // 100 (karena 0 dianggap falsy)
const hasilNullish = skor ?? 100; // 0   (karena 0 bukan null/undefined)
```

#### 5. Switch Case dan Pengelompokan Fall-Through

Pernyataan `switch` mencocokkan nilai ekspresi menggunakan `===`. Kata kunci `break` wajib ditulis agar eksekusi tidak bocor ke case berikutnya (_fall-through_):

```javascript
const hari = "Sabtu";
switch (hari) {
  case "Senin":
  case "Selasa":
  case "Rabu":
  case "Kamis":
  case "Jumat":
    console.log("Hari Kerja");
    break;
  case "Sabtu":
  case "Minggu":
    console.log("Akhir Pekan");
    break;
  default:
    console.log("Hari tidak valid");
}
```

#### 6. Pola Modern: Object Lookup Table

Di basis kode JavaScript profesional, percabangan pemetaan status sering digantikan oleh objek kamus (_lookup dictionary_):

```javascript
const role = "editor";

const hakAksesMap = {
  admin: "Akses Penuh",
  editor: "Akses Tulis & Edit",
  viewer: "Akses Baca Saja",
};

const akses = hakAksesMap[role] || "Tidak Memiliki Akses";
console.log(akses); // 'Akses Tulis & Edit'
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Implementasi demonstrasi lengkap yang mencakup `if...else if`, pemeriksaan nilai falsy, operator ternary, short-circuit evaluation, `switch...case`, dan pola _Object Lookup Table_ tersedia di berkas [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/05-conditionals/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Guard Clauses / Early Return**: Menolak kondisi tidak valid di baris awal fungsi sebelum menjalankan logika utama untuk menghindari tumpukan indentasi yang dalam (_pyramid of doom_).
2. **Peta Status Respons HTTP**: Menggunakan _Object Lookup Table_ untuk memetakan kode status HTTP (200, 201, 404, 500) ke komponen banner UI yang sesuai.

### ⚠️ Common Pitfalls

- **Lupa Menulis `break` pada Switch**: Menyebabkan seluruh blok kode di bawah case yang cocok ikut dieksekusi secara tidak sengaja.
- **Ternary Bertingkat (_Nested Ternary_)**: Menumpuk lebih dari satu operator ternary (`a ? b : c ? d : e`) sangat merusak keterbacaan kode tim. Gunakan `if...else if` biasa jika kondisi lebih dari dua.
- **Tertukar Antara `||` dan `??`**: Menggunakan `||` saat memproses angka numerik input yang valid bernilai `0`, sehingga angka `0` tertimpa oleh nilai default.

### 🌟 Best Practice

- Utamakan _Strict Equality_ (`===` dan `!==`) di seluruh kode tanpa pengecualian.
- Gunakan pola _Guard Clause_ untuk merapikan alur logika percabangan.

---

## 5. ✍️ Latihan Mandiri

1. **Kalkulator Diskon Pembelian**: Buatlah fungsi yang menerima parameter `totalBelanja`.
   - Jika belanja di atas Rp 500.000, berikan diskon 20%.
   - Jika belanja antara Rp 250.000 hingga Rp 500.000, berikan diskon 10%.
   - Jika di bawah Rp 250.000, tidak ada diskon (0%).
   - Kembalikan total harga akhir yang harus dibayar.
2. **Penentuan Hari dengan Switch**: Buatlah percabangan `switch` yang menerima angka `1` sampai `7` dan mencetak nama hari yang sesuai (`1` = Senin, ..., `7` = Minggu). Berikan pesan default `"Nomor hari tidak valid"` jika angka di luar rentang.
3. **Pemetaan Tarif Pengiriman (Object Lookup)**: Buatlah objek tabel tarif pengiriman untuk kota: `Jakarta: 10000`, `Bandung: 15000`, `Surabaya: 25000`. Buat fungsi yang mengambil nama kota tujuan dan mengembalikan ongkos kirim (atau Rp 50.000 untuk kota di luar daftar sebagai fallback).

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - Loops](../04-loops/README.md)
- ➡️ **Selanjutnya:** [06 - Functions](../06-functions/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
