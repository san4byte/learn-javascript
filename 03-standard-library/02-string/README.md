# 02 - String (Instance Methods, Search, Transform, dan Padding)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Representasi teks primitif yang bersifat _immutable_ (tidak dapat diubah di memori), didukung kumpulan method untuk pencarian, pemotongan, manipulasi, dan pemformatan.
> - **Kapan Digunakan**: Pengolahan input formulir, validasi URL/email, pembuatan kode faktur berformat (_padding_), dan sanitasi teks.
> - **Aturan Praktis**: Gunakan `str.slice()` daripada `substring()`, `str.at()` untuk indeks negatif, dan `str.replaceAll()` untuk mengganti seluruh teks tanpa regex kompleks.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep _immutability_ dan mekanisme _auto-boxing_ pada tipe data string di JavaScript.
- Menguasai seluruh instance method & properti `String` beserta berbagai kondisi kasus (_edge cases_).
- Menguasai teknik akses karakter: `.length`, `.charAt()`, `.at()`, dan notasi kurung siku `str[i]`.
- Menguasai pencarian substring modern: `.includes()`, `.startsWith()`, `.endsWith()`, `.indexOf()`, dan `.lastIndexOf()`.
- Memahami perbedaan mendasar pemotongan string antara `.slice()` dan `.substring()`.
- Menguasai modifikasi teks: `.replace()`, `.replaceAll()`, `.toUpperCase()`, `.toLowerCase()`, serta keluarga `.trim()`.
- Menguasai teknik padding (`.padStart()`, `.padEnd()`) dan pengulangan (`.repeat()`).
- Memahami pemecahan string menjadi array via `.split()` dan penanganan karakter khusus (emoji).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> String di JavaScript seperti balok kayu berukir: Anda tidak bisa mengubah satu huruf langsung di balok tersebut (`str[0] = 'X'` tidak akan mengubah apa pun). Jika ingin balok dengan tulisan berbeda, Anda harus memotong atau memahat balok kayu baru.

Tipe data primitif string di JavaScript dibungkus secara otomatis oleh objek bawaan **`String`** (_auto-boxing_) saat method atau propertinya dipanggil. Seluruh string di JavaScript bersifat **immutable** (setiap manipulasi akan menghasilkan string baru, tanpa mengubah string aslinya).

---

### 1. Tabel Ringkasan Method & Properti String (Cheat-Sheet)

| Kategori         | Method / Properti                          | Nilai Kembalian         | Deskripsi Singkat                                                       |
| :--------------- | :----------------------------------------- | :---------------------- | :---------------------------------------------------------------------- |
| **Akses**        | `str.length`                               | `number`                | Menghitung jumlah unit karakter (_UTF-16 code units_).                  |
| **Akses**        | `str.charAt(index)`                        | `string`                | Mengambil karakter pada indeks (mengembalikan `""` jika di luar batas). |
| **Akses**        | `str.at(index)`                            | `string` \| `undefined` | Mengambil karakter modern (mendukung indeks negatif `-1`).              |
| **Pencarian**    | `str.includes(search, pos)`                | `boolean`               | Memeriksa apakah teks memuat substring tertentu.                        |
| **Pencarian**    | `str.startsWith(search, pos)`              | `boolean`               | Memeriksa apakah teks diawali substring tertentu.                       |
| **Pencarian**    | `str.endsWith(search, len)`                | `boolean`               | Memeriksa apakah teks diakhiri substring tertentu.                      |
| **Pencarian**    | `str.indexOf(search, from)`                | `number`                | Menemukan indeks kemunculan pertama (atau `-1` jika tidak ada).         |
| **Pencarian**    | `str.lastIndexOf(search, from)`            | `number`                | Menemukan indeks kemunculan terakhir dari belakang.                     |
| **Ekstraksi**    | `str.slice(start, end)`                    | `string`                | Memotong bagian string (mendukung indeks negatif).                      |
| **Ekstraksi**    | `str.substring(start, end)`                | `string`                | Memotong bagian string klasik (tidak mendukung negatif).                |
| **Transformasi** | `str.toUpperCase()` / `toLowerCase()`      | `string`                | Mengubah seluruh teks menjadi huruf besar atau kecil.                   |
| **Transformasi** | `str.replace(target, new)`                 | `string`                | Mengganti kemunculan **pertama** dari target.                           |
| **Transformasi** | `str.replaceAll(target, new)`              | `string`                | Mengganti **seluruh** kemunculan kata target.                           |
| **Sanitasi**     | `str.trim()` / `trimStart()` / `trimEnd()` | `string`                | Menghapus spasi di kedua sisi, hanya kiri, atau hanya kanan.            |
| **Padding**      | `str.padStart(len, padChar)`               | `string`                | Menambahkan karakter di depan hingga mencapai panjang target.           |
| **Padding**      | `str.padEnd(len, padChar)`                 | `string`                | Menambahkan karakter di belakang hingga mencapai panjang target.        |
| **Pengulangan**  | `str.repeat(count)`                        | `string`                | Menduplikasi string sebanyak $n$ kali.                                  |
| **Pemecahan**    | `str.split(separator, limit)`              | `string[]`              | Memecah teks menjadi array berdasarkan pemisah tertentu.                |

---

### 2. Eksplorasi Mendalam Setiap Method & Properti String

Berikut adalah rincian lengkap setiap method dan properti `String` beserta skenario kasusnya masing-masing:

---

#### 1. Properti Panjang Teks: `str.length`

Mengembalikan jumlah unit kode UTF-16 di dalam string.

```javascript
const teks = 'Belajar JS';
console.log(teks.length); // 10
```

---

#### 2. Akses Karakter Klasik: `str.charAt(index)`

Mengambil karakter pada posisi indeks tertentu. Jika indeks berada di luar batas panjang string, method ini mengembalikan **string kosong `""`**:

```javascript
const teks = 'Halo';
console.log(teks.charAt(0)); // "H"
console.log(teks.charAt(99)); // "" (string kosong, tidak error)
```

---

#### 3. Akses Karakter Modern: `str.at(index)` (ES2022)

Mendukung **indeks negatif** untuk membaca dari ujung belakang string. Jika berada di luar batas, mengembalikan **`undefined`**:

```javascript
const bahasa = 'JavaScript';
console.log(bahasa.at(-1)); // "t" (karakter terakhir)
console.log(bahasa.at(-2)); // "p" (kedua dari belakang)
console.log(bahasa.at(99)); // undefined
```

---

#### 4. Pengecekan Keberadaan Substring: `str.includes(searchString[, position])`

Mengembalikan `true` jika substring ditemukan di dalam teks (peka huruf besar-kecil / _case-sensitive_):

```javascript
const kalimat = 'Belajar JavaScript di rumah';
console.log(kalimat.includes('JavaScript')); // true
console.log(kalimat.includes('javascript')); // false (case-sensitive)
console.log(kalimat.includes('Belajar', 5)); // false (dicari mulai indeks 5)
```

---

#### 5. Pengecekan Awalan: `str.startsWith(searchString[, position])`

Mengembalikan `true` jika teks diawali dengan substring target:

```javascript
const url = 'https://perusahaan.co.id';
console.log(url.startsWith('https://')); // true
console.log(url.startsWith('http://')); // false
```

---

#### 6. Pengecekan Akhiran: `str.endsWith(searchString[, length])`

Mengembalikan `true` jika teks diakhiri dengan substring target:

```javascript
const file = 'dokumen.pdf';
console.log(file.endsWith('.pdf')); // true
console.log(file.endsWith('.docx')); // false
```

---

#### 7. Mencari Indeks Pertama: `str.indexOf(searchValue[, fromIndex])`

Mengembalikan posisi indeks kemunculan pertama target, atau `-1` jika tidak ditemukan:

```javascript
const teks = 'kucing makan ikan bersama kucing lain';
console.log(teks.indexOf('kucing')); // 0 (pertama)
console.log(teks.indexOf('anjing')); // -1
```

---

#### 8. Mencari Indeks Terakhir: `str.lastIndexOf(searchValue[, fromIndex])`

Mencari kemunculan terakhir target dengan memindai dari arah belakang:

```javascript
console.log(teks.lastIndexOf('kucing')); // 26 (terakhir)
```

---

#### 9. Ekstraksi Salinan Teks: `str.slice(start[, end])`

Memotong bagian string dan mendukung **indeks negatif**. Jika `start > end`, mengembalikan string kosong:

```javascript
const kode = 'INV-2026-XYZ';
console.log(kode.slice(0, 3)); // "INV"
console.log(kode.slice(4, 8)); // "2026"
console.log(kode.slice(-3)); // "XYZ" (3 huruf terakhir)
console.log(kode.slice(8, 4)); // "" (tidak menukar parameter)
```

---

#### 10. Ekstraksi Klasik: `str.substring(start[, end])`

Memotong string gaya klasik. Angka negatif dianggap `0`, dan jika `start > end`, parameter akan **otomatis ditukar**:

```javascript
// substring otomatis menukar (8, 4) menjadi (4, 8):
console.log(kode.substring(8, 4)); // "2026"
console.log(kode.substring(-3)); // "INV-2026-XYZ" (dianggap substring(0))
```

---

#### 11. Pengubahan Kapitalisasi: `toUpperCase()` & `toLowerCase()`

Mengubah format huruf teks menjadi seluruhnya kapital atau seluruhnya kecil:

```javascript
const salam = 'Halo Dunia';
console.log(salam.toUpperCase()); // "HALO DUNIA"
console.log(salam.toLowerCase()); // "halo dunia"
```

---

#### 12. Penggantian Kemunculan Pertama: `str.replace(target, replacement)`

Hanya mengganti **satu kemunculan pertama** jika targetnya berupa string biasa:

```javascript
const menu = 'kopi susu dan kopi tubruk';
console.log(menu.replace('kopi', 'teh')); // "teh susu dan kopi tubruk"
```

---

#### 13. Penggantian Seluruh Kemunculan: `str.replaceAll(target, replacement)`

Mengganti **seluruh kemunculan** kata tanpa perlu regex:

```javascript
console.log(menu.replaceAll('kopi', 'teh')); // "teh susu dan teh tubruk"
```

> ⚠️ **Catatan**: Jika menggunakan RegExp pada `replaceAll`, flag global `/g` **wajib disertakan**, contoh: `str.replaceAll(/kopi/g, 'teh')`.

---

#### 14. Pembersihan Spasi: `trim()`, `trimStart()`, `trimEnd()`

Menghapus seluruh karakter spasi, tab, dan newline (`\n`):

```javascript
const kotor = '   admin@mail.com \n  ';
console.log(kotor.trim()); // "admin@mail.com"
console.log(kotor.trimStart()); // "admin@mail.com \n  "
console.log(kotor.trimEnd()); // "   admin@mail.com"
```

---

#### 15. Padding Awal: `str.padStart(targetLength[, padString])`

Menambahkan karakter di depan hingga mencapai panjang target tertentu:

```javascript
console.log('5'.padStart(3, '0')); // "005"
console.log('123'.padStart(2, '0')); // "123" (tidak dipotong jika sudah cukup panjang)
```

---

#### 16. Padding Akhir: `str.padEnd(targetLength[, padString])`

Menambahkan karakter di belakang hingga mencapai panjang target tertentu:

```javascript
console.log('5'.padEnd(3, '0')); // "500"
console.log('ID'.padEnd(6, '.')); // "ID...."
```

---

#### 17. Pengulangan Teks: `str.repeat(count)`

Menduplikasi string sebanyak jumlah integer tertentu:

```javascript
console.log('Ha! '.repeat(3)); // "Ha! Ha! Ha! "
console.log('Tes'.repeat(0)); // ""
```

---

#### 18. Pemecahan String: `str.split(separator[, limit])`

Memecah string menjadi array berdasarkan pemisah:

```javascript
const hobi = 'membaca,menulis,koding';
console.log(hobi.split(',')); // ['membaca', 'menulis', 'koding']
console.log(hobi.split(',', 2)); // ['membaca', 'menulis'] (dengan limit)

// Penanganan Karakter Emoji:
const emot = 'Hai👋';
console.log(emot.split('')); // ['H', 'a', 'i', '\uD83D', '\uDC4B'] ❌ (Surrogate pair pecah)
console.log([...emot]); // ['H', 'a', 'i', '👋'] ✅ (Gunakan spread operator)
```

---

#### 19. Jebakan Objek Pembungkus: `String()` vs `new String()`

Gunakan fungsi konversi `String(value)` untuk mengubah tipe data lain menjadi string. Jangan pernah membuat objek dengan `new String()`:

```javascript
const teksPrimitif = 'Halo';
const teksObjek = new String('Halo'); // ❌ HINDARI

console.log(typeof teksPrimitif); // "string"
console.log(typeof teksObjek); // "object"

// Jebakan Truthy:
const kosongObj = new String('');
if (kosongObj) {
  console.log('Ini dieksekusi meskipun string aslinya kosong! ⚠️');
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep akses karakter, immutability, pemotongan, modifikasi teks, dan penanganan emoji di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/02-string/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pemformatan Kode Transaksi / Invoice**: Menggabungkan prefix nama toko dengan urutan nomor yang diisi nol di depannya (`nomor.padStart(6, '0')`).
2. **Sanitasi Data Form Input**: Menggunakan `.trim()` pada email/nama sebelum dikirim ke database untuk menghindari spasi liar yang tidak sengaja tertekan pengguna.
3. **Penyensoran Kata Sensitif**: Menggunakan `.replaceAll(kataKasar, '***')` untuk menyensor kata-kata terlarang pada fitur komentar.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira `replace()` mengubah semua kata**: Hanya mengubah kemunculan pertama. Gunakan `replaceAll()` jika ingin mengubah semua kemunculan.
- **Mencoba mengubah karakter via indeks `str[0] = 'X'`**: String adalah _immutable_. Nilai tidak akan pernah berubah.
- **Memecah string emoji dengan `split('')`**: Karakter emoji 4-byte akan pecah menjadi simbol tanda tanya atau unicode rusak. Gunakan `[...str]` sebagai gantinya.

### 🌟 Best Practice

- Utamakan `slice()` daripada `substring()` untuk konsistensi pemotongan teks.
- Gunakan `str.at(-1)` untuk membaca karakter terakhir secara elegan tanpa perlu menulis `str[str.length - 1]`.
- Selalu gunakan `String(val)` jika membutuhkan konversi tipe primitif, bukan `new String(val)`.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `maskingNomorKartu(nomor)` yang menerima nomor kartu kredit 16 digit (contoh: `"1234567812345678"`) dan mengembalikan string di mana hanya 4 digit terakhir yang terlihat, sedangkan 12 digit pertama disensor dengan tanda bintang: `************5678`.
2. Buat fungsi `slugify(judul)` yang menerima judul artikel (contoh: `" Belajar JavaScript Modern 2026! "`), membersihkan spasi ujungnya, mengubah ke huruf kecil, dan mengganti seluruh spasi menjadi tanda hubung `-` menggunakan `trim()`, `toLowerCase()`, dan `replaceAll()`.
3. Buat fungsi `hitungPanjangKarakterAsli(teks)` yang mampu menghitung jumlah karakter sebenarnya secara akurat meskipun teks tersebut memuat emoji majemuk.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Number](../01-number/README.md)
- ➡️ **Selanjutnya:** [03 - Array](../03-array/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
