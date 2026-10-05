# 11 - Tipe Data Lanjutan, Operator in, typeof, dan Falsy Truthy

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami tipe khusus `undefined` vs `null`, operator pengecekan `typeof` dan `in`, serta aturan evaluasi Boolean *Truthy* & *Falsy*.
> * **Kapan Digunakan**: Validasi data form, pengecekan properti objek aman, dan penyusunan logika percabangan kondisional.
> * **Aturan Praktis**: Hanya ada 7 nilai yang bernilai falsy di JavaScript: `false`, `0`, `-0`, `""`, `null`, `undefined`, dan `NaN`; objek kosong `{}` dan array kosong `[]` tetap bernilai *truthy*.

## 1. 🎯 Tujuan Belajar
- Membedakan konsep `null` dan `undefined` secara tepat.
- Menggunakan operator `typeof` untuk memeriksa tipe data primitif.
- Menggunakan operator `in` untuk mengecek keberadaan properti objek atau indeks array.
- Menguasai daftar nilai *Truthy* dan *Falsy* dalam evaluasi kondisi `if`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **kotak surat di depan rumah**:
> - `undefined` adalah kotak surat yang baru dipasang tukang pos tetapi belum pernah diisi apa pun oleh pemilik rumah.
> - `null` adalah pemilik rumah sengaja menempelkan stiker "Kotak Surat Ini Sedang Dikosongkan".
> - Operator `in` seperti petugas pos yang mengintip ke dalam kotak apakah ada surat bernama tertentu.

### 1. `undefined` vs `null`
- **`undefined`**: Menunjukkan suatu variabel telah dideklarasikan namun belum diberikan nilai apa pun. Ini juga nilai default fungsi yang tidak memiliki statement `return`.
- **`null`**: Menunjukkan nilai ketiadaan yang disengaja (*intentional absence of value*). Diberikan oleh programmer saat ingin mengosongkan objek.

### 2. Operator `typeof` & Quirk Historis
Operator `typeof` mengembalikan string yang mendeskripsikan tipe data suatu operan. Namun ada satu catatan penting: `typeof null` menghasilkan `"object"`. Ini adalah bug/quirk historis JavaScript sejak versi pertama tahun 1995 yang dipertahankan demi kompatibilitas kode web lama.

### 3. Operator `in`
Operator `in` memeriksa apakah suatu nama properti (string) ada di dalam objek atau apakah suatu nomor indeks ada di dalam array:
- `"nama" in user` $\rightarrow$ `true` jika properti `nama` ada.
- `0 in fruits` $\rightarrow$ `true` jika array `fruits` memiliki indeks ke-0.

### 4. Nilai Truthy dan Falsy
Di JavaScript, dalam evaluasi kondisi boolean (`if (...)`), setiap nilai akan dikonversi otomatis (*type coercion*).
Hanya ada 7 nilai yang dievaluasi sebagai **Falsy**:
1. `false`
2. `0` dan `-0`
3. `""` (string kosong)
4. `null`
5. `undefined`
6. `NaN` (Not-a-Number)
7. `0n` (BigInt nol)

Semua nilai selain 7 nilai di atas adalah **Truthy**, termasuk string spasi `" "`, array kosong `[]`, dan objek kosong `{}`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Tipe Data Khusus, Operator Typeof, In, dan Truthy/Falsy

// 1. Undefined vs Null
let belumDiisi;
console.log("Nilai belum diisi:", belumDiisi); // undefined

let sengajaKosong = null;
console.log("Nilai sengaja dikosongkan:", sengajaKosong); // null

// 2. Operator typeof
console.log("typeof 100:", typeof 100);             // number
console.log("typeof 'Halo':", typeof "Halo");       // string
console.log("typeof true:", typeof true);           // boolean
console.log("typeof null:", typeof null);           // object (quirk historis JS)
console.log("typeof undefined:", typeof undefined); // undefined

// 3. Operator 'in' (Mengecek keberadaan properti/index)
const orang = { nama: "Joko", umur: 25 };
console.log("'nama' in orang:", "nama" in orang);   // true
console.log("'alamat' in orang:", "alamat" in orang); // false

const buah = ["Apel", "Jeruk"];
console.log("0 in buah (cek index 0):", 0 in buah); // true
console.log("5 in buah (cek index 5):", 5 in buah); // false

// 4. Truthy dan Falsy
const nilaiUji = ["", 0, null, undefined, NaN, "Ada teks", 123, [], {}];
console.log("\n--- Evaluasi Truthy & Falsy ---");
nilaiUji.forEach((item) => {
  if (item) {
    console.log(`[TRUTHY]:`, item);
  } else {
    console.log(`[FALSY] :`, item);
  }
});
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Nilai belum diisi: undefined
Nilai sengaja dikosongkan: null
typeof 100: number
typeof 'Halo': string
typeof true: boolean
typeof null: object
typeof undefined: undefined
'nama' in orang: true
'alamat' in orang: false
0 in buah (cek index 0): true
5 in buah (cek index 5): false

--- Evaluasi Truthy & Falsy ---
[FALSY] : 
[FALSY] : 0
[FALSY] : null
[FALSY] : undefined
[FALSY] : NaN
[TRUTHY]: Ada teks
[TRUTHY]: 123
[TRUTHY]: []
[TRUTHY]: {}
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
1. **Pembersihan Cache & Reset State**: Memberikan nilai `null` pada objek keranjang belanja (`cart = null`) setelah transaksi pembayaran sukses.
2. **Validasi Formulir Cepat**: Menggunakan `if (!nama)` untuk mendeteksi apakah pengguna lupa mengisi nama (karena string kosong `""` adalah falsy).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memeriksa Array Kosong dengan `if (arr)`**: Array kosong `[]` bernilai *truthy*! `if ([])` akan tetap dijalankan. Untuk mengecek apakah array kosong, periksa panjangnya: `if (arr.length === 0)`.
* **Mengandalkan `typeof null === 'object'`**: Jangan gunakan `typeof` untuk mengecek objek jika ada kemungkinan nilainya `null`. Gunakan `obj !== null && typeof obj === 'object'`.

### 🌟 Best Practice
* Gunakan operator `in` atau `Object.hasOwn(obj, prop)` untuk mengecek properti tanpa memicu eksekusi getter.
* Gunakan `null` saat Anda sebagai programmer ingin mengosongkan nilai secara eksplisit, dan biarkan `undefined` menjadi urusan engine JavaScript.

---

## 6. ✍️ Latihan Mandiri
1. Buat sebuah objek `produk` dengan properti `nama` dan `harga`. Gunakan operator `in` untuk memeriksa apakah produk tersebut memiliki properti `diskon`.
2. Tulis fungsi `cekIsi(data)` yang mencetak apakah argumen bernilai Truthy atau Falsy.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [10 - Mini Games (Tebak Angka)](../10-mini-games/02-guess-number/README.md)
- ➡️ **Selanjutnya:** [12 - Sintaks Modern ES Lanjutan](../12-advanced-syntax/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
