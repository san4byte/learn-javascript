# 09 - Tipe Data Lanjutan, Operator in, typeof, dan Falsy Truthy

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menguasai sistem tipe data JavaScript (7 tipe primitif + 1 tipe objek referensi), operator pengecekan `typeof` dan `in`, serta aturan evaluasi Boolean _Truthy_ & _Falsy_.
> - **Kapan Digunakan**: Validasi data formulir, pengecekan properti objek secara aman, dan pencegahan bug akibat konversi tipe data otomatis (_type coercion_).
> - **Aturan Praktis**: Hanya ada 8 nilai yang bernilai _Falsy_ di JavaScript (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`). Objek kosong `{}` dan array kosong `[]` selalu bernilai _Truthy_.

---

## 1. 🎯 Tujuan Belajar

- Menguasai 8 tipe data resmi spesifikasi ECMAScript (7 primitif dan 1 objek referensi).
- Membedakan secara semantik antara ketiadaan nilai alami (`undefined`) dan ketiadaan nilai disengaja (`null`).
- Memahami hasil nilai operator `typeof` serta kejanggalan historis _quirk_ `typeof null === 'object'`.
- Menggunakan operator `in` untuk memeriksa keberadaan properti objek atau indeks numerik array.
- Menguasai evaluasi kondisi Boolean _Truthy_ vs _Falsy_ pada seluruh jenis data.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Sistem tipe data dan nilai ketiadaan seperti **kotak surat di depan gerbang rumah**:
>
> - **`undefined`** adalah **kotak surat yang baru dipasang pengembang perumahan**: kotak tersebut ada, tetapi belum pernah diisi atau disentuh oleh pemilik rumah.
> - **`null`** adalah **pemilik rumah sengaja menempelkan stiker "KOTAK KOSONG / TIDAK DIGUNAKAN"**: ketiadaan isi di dalamnya merupakan keputusan yang disengaja.
> - **Operator `in`** seperti petugas pengantar pos yang mengintip ke dalam slot apakah ada label nama tertentu yang tertera di kotak tersebut.

---

### Tabel 8 Tipe Data Resmi ECMAScript

| Tipe Data     | Kategori  | Hasil `typeof`            | Contoh Nilai                    |
| :------------ | :-------- | :------------------------ | :------------------------------ |
| **String**    | Primitif  | `"string"`                | `'Halo'`, `"Dunia"`             |
| **Number**    | Primitif  | `"number"`                | `42`, `3.14`, `NaN`, `Infinity` |
| **BigInt**    | Primitif  | `"bigint"`                | `9007199254740991n`             |
| **Boolean**   | Primitif  | `"boolean"`               | `true`, `false`                 |
| **Undefined** | Primitif  | `"undefined"`             | `undefined`                     |
| **Symbol**    | Primitif  | `"symbol"`                | `Symbol('id')`                  |
| **Null**      | Primitif  | `"object"` _(Quirk Bug)_  | `null`                          |
| **Object**    | Referensi | `"object"` / `"function"` | `{}`, `[]`, `new Date()`, `fn`  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Delapan Tipe Data Resmi JavaScript

JavaScript membagi tipe data menjadi dua kelompok besar:

- **Tipe Primitif** (disimpan langsung berdasarkan nilai di stack memori): String, Number, BigInt, Boolean, Undefined, Symbol, dan Null.
- **Tipe Referensi** (disimpan berdasarkan pointer alamat memori di heap): Object (termasuk Array, Date, Map, Set, dan Function).

#### 2. Perbedaan Semantik `undefined` vs `null`

- `undefined`: Nilai variabel yang sudah dideklarasikan tetapi belum diberi nilai, atau parameter fungsi yang tidak dipasok argumen, atau fungsi tanpa pernyataan `return`.
- `null`: Representasi eksplisit dari ketiadaan nilai (_intentional absence of any object value_).

```javascript
let belumAda; // undefined
let disengajaKosong = null; // null
```

#### 3. Operator `typeof` dan Quirk Historis `typeof null`

Operator `typeof` mengembalikan string nama tipe operan. Namun sejak JavaScript 1.0 (1995), `typeof null` menghasilkan `"object"` karena bug representasi bit tipe data awal. Bug ini sengaja tidak diperbaiki agar jutaan situs web warisan tidak rusak (_legacy compatibility_).

```javascript
// Cara valid memeriksa apakah data adalah Objek murni (bukan null):
function isRealObject(val) {
  return val !== null && typeof val === "object";
}
```

#### 4. Operator `in` untuk Pengecekan Kunci Objek & Indeks Array

Operator `in` memeriksa eksistensi nama kunci string atau nomor indeks:

```javascript
const user = { nama: "Joko" };
console.log("nama" in user); // true
console.log("umur" in user); // false

const item = ["A", "B"];
console.log(0 in item); // true (karena indeks 0 ada)
console.log(2 in item); // false (indeks 2 belum ada)
```

#### 5. Delapan Nilai Falsy Resmi vs Keunikan `[]` dan `{}`

Dalam percabangan `if`, hanya ada 8 nilai yang bernilai salah (_Falsy_):
`false`, `0`, `-0`, `0n`, `""` (string kosong), `null`, `undefined`, dan `NaN`.

> ⚠️ **Peringatan Kritis**: Objek kosong `{}` dan array kosong `[]` bernilai **TRUTHY**! Menulis `if ([])` akan selalu dieksekusi. Untuk mengecek array kosong, periksa panjangnya: `if (arr.length === 0)`.

#### 6. Type Coercion: Kesetaraan Ketat (`===`) vs Longgar (`==`)

Operator `==` melakukan konversi tipe data otomatis (_coercion_) yang menghasilkan anomali:

- `null == undefined` $\rightarrow$ `true`
- `0 == false` $\rightarrow$ `true`
- `"" == false` $\rightarrow$ `true`

Selalu gunakan _Strict Equality_ (`===`) yang memeriksa kesamaan nilai dan tipe secara mutlak tanpa konversi tersembunyi.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi 8 tipe data resmi ECMAScript, perbandingan semantik `null` vs `undefined`, pembuktian quirk `typeof null`, pemeriksaan kunci dan indeks via operator `in`, serta evaluasi menyeluruh terhadap seluruh nilai Falsy dan Truthy telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/09-data-types-and-operators/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pembersihan Cache State**: Menyetel `currentUser = null` saat pengguna melakukan logout dari aplikasi.
2. **Validasi Formulir Cepat**: Menggunakan `if (!username.trim())` untuk mendeteksi apakah isian pengguna berupa string kosong (karena string kosong terdeteksi Falsy).

### ⚠️ Common Pitfalls

- **Pemeriksaan Array Kosong Menggunakan `if (array)`**: Seringkali pemula mengira `if (items)` bernilai false saat array kosong. Nyatanya `[]` adalah objek truthy! Selalu gunakan `if (items.length > 0)`.
- **Mengecek Nilai Numerik 0 dengan `if (val)`**: Jika variabel bernilai `0` (misalnya saldo rekening `0`), kondisi `if (saldo)` akan bernilai falsy dan memicu blok error atau fallback secara keliru.

### 🌟 Best Practice

- Gunakan `===` dan `!==` 100% di seluruh basis kode Anda.
- Gunakan `null` saat Anda ingin mengosongkan nilai secara sengaja, dan biarkan `undefined` menjadi domain otomatis runtime JavaScript.
- Gunakan `Object.hasOwn(obj, key)` atau operator `'key' in obj` untuk memeriksa properti tanpa perlu mengevaluasi getter.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `validasiInput(input)` yang mengembalikan string `'KOSONG'` jika input bernilai Falsy, dan mengembalikan `'TERISI'` jika bernilai Truthy. Uji fungsi tersebut dengan angka `0`, string kosong `""`, array kosong `[]`, dan objek kosong `{}`.
2. Jelaskan mengapa ekspresi `typeof NaN` menghasilkan tipe `"number"` meskipun kepanjangannya adalah _Not-a-Number_.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08 - Objects](../08-objects/README.md)
- ➡️ **Selanjutnya:** [10 - Advanced Syntax](../10-advanced-syntax/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
