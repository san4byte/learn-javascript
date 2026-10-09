# 05 - JSON (Serialize, Deserialize, Replacer, Reviver, dan toJSON)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Format standar terbuka pertukaran data berbasis teks (_JavaScript Object Notation_), dilengkapi API native `JSON.stringify()` dan `JSON.parse()`.
> - **Kapan Digunakan**: Mengirim/menerima data melalui HTTP REST API, menyimpan data terstruktur di `localStorage`, dan menulis file konfigurasi.
> - **Aturan Praktis**: Selalu bungkus `JSON.parse()` di dalam blok `try...catch`, gunakan `replacer` untuk menyensor rahasia, dan gunakan `reviver` untuk merekonstruksi kembali objek tanggal (`Date`).

---

## 1. 🎯 Tujuan Belajar

- Memahami aturan format teks JSON yang sah (kutip ganda wajib, tidak ada _trailing comma_).
- Menguasai serialisasi objek ke string menggunakan `JSON.stringify()` beserta parameter `replacer` dan `space`.
- Menguasai deserialisasi string JSON ke objek menggunakan `JSON.parse()` dan parameter fungsi `reviver`.
- Memahami implementasi kustomisasi serialisasi otomatis via method `toJSON()`.
- Mengetahui batas kemampuan tipe data JSON: penanganan `undefined`, `Function`, `Symbol`, `BigInt`, dan _Circular Reference_.
- Memahami kelebihan dan keterbatasan _deep copy_ via JSON vs `structuredClone()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> JSON seperti **kontainer kargo kapal laut**: perabot mewah dan peralatan rumit di rumah Anda (objek JS lengkap dengan method, tipe tanggal, dan referensi memori) harus dibongkar dan dikemas ke dalam kotak kardus datar tersegel (teks JSON murni) agar bisa dikirim menyeberangi samudra internet. Saat sampai di tujuan, pihak penerima membuka kardus dan merakitnya kembali menjadi benda fungsional (`JSON.parse`).

---

### 1. Tabel Ringkasan API JSON (Cheat-Sheet)

| Method / Fitur         | Parameter                    | Nilai Kembalian               | Deskripsi Singkat                                                               |
| :--------------------- | :--------------------------- | :---------------------------- | :------------------------------------------------------------------------------ |
| **`JSON.stringify()`** | `(val, [replacer], [space])` | `string`                      | Mengubah objek/nilai JavaScript menjadi format teks JSON.                       |
| **`JSON.parse()`**     | `(text, [reviver])`          | `any` (Object/Array/Primitif) | Mem-parsing string JSON menjadi struktur data JavaScript.                       |
| **`toJSON()`**         | `()`                         | `any`                         | Method khusus pada objek/class yang otomatis dipanggil oleh `JSON.stringify()`. |

---

### 2. Eksplorasi Mendalam Serialisasi: `JSON.stringify()`

`JSON.stringify(value, [replacer], [space])` menerima 3 parameter:

#### 1. Indentasi Rapi (_Pretty-Print_): Parameter `space`

Jika parameter ketiga tidak diisi, hasil stringify berupa satu baris teks rapat (_minified_). Jika diisi angka, angka tersebut menentukan jumlah spasi indentasi:

```javascript
const user = { nama: 'Joko', umur: 25 };

// Output 1 baris rapat (hemat bandwidth):
JSON.stringify(user); // '{"nama":"Joko","umur":25}'

// Output berformat (mudah dibaca manusia / logging):
JSON.stringify(user, null, 2);
/*
{
  "nama": "Joko",
  "umur": 25
}
*/
```

---

#### 2. Filtering Properti: Parameter `replacer`

- **Kasus A: Array Whitelist**
  Hanya nama-nama properti yang ada di dalam array yang akan disertakan:

  ```javascript
  const akun = { id: 1, email: 'user@mail.com', passwordHash: 'secret123' };

  // Hanya ambil id dan email:
  const aman = JSON.stringify(akun, ['id', 'email'], 2);
  console.log(aman); // passwordHash otomatis disingkirkan!
  ```

- **Kasus B: Replacer Function `(key, value) => any`**
  Berjalan secara rekursif untuk setiap pasangan key-value. Jika me-return **`undefined`**, properti tersebut akan **dihapus dari output**:

  ```javascript
  const payload = { token: 'abc', pin: 1234, status: 'aktif' };

  const tersensor = JSON.stringify(payload, (key, value) => {
    if (key === 'pin') return undefined; // Hapus properti 'pin'
    if (key === 'token') return '***SENSITIVE***'; // Samarkan
    return value;
  });
  console.log(tersensor); // {"token":"***SENSITIVE***","status":"aktif"}
  ```

---

### 3. Eksplorasi Mendalam Deserialisasi: `JSON.parse()`

#### 1. Wajib Dilindungi dengan `try...catch`

String JSON yang tidak valid (misal kunci tidak memakai kutip ganda, koma berlebih di akhir, atau terpotong) akan melempar fatal error:

```javascript
function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Gagal mem-parsing JSON:', error.message);
    return defaultValue;
  }
}

const rusak = '{ nama: "Andi" }'; // ❌ Tidak valid (nama tidak berkutip ganda)
console.log(safeJsonParse(rusak, {})); // {} (Aman, tidak membuat aplikasi crash)
```

---

#### 2. Rekonstruksi Tipe Data: Fungsi `reviver`

Ketika objek yang memuat tanggal di-stringify, objek `Date` berubah menjadi string ISO biasa. `JSON.parse` biasa tidak otomatis mengembalikannya ke `Date`:

```javascript
const jsonTeks = '{"transaksiId":"TRX-1","waktu":"2026-10-09T10:00:00.000Z"}';

// Menggunakan Reviver untuk merekonstruksi objek Date:
const data = JSON.parse(jsonTeks, (key, value) => {
  if (key === 'waktu') {
    return new Date(value); // Ubah kembali dari string ke instance Date
  }
  return value;
});

console.log(data.waktu instanceof Date); // true ✅
console.log(data.waktu.getFullYear()); // 2026 ✅
```

---

### 4. Kustomisasi Serialisasi: Method `toJSON()`

Jika suatu objek atau class memiliki method bernama `toJSON()`, `JSON.stringify()` akan mengeksekusi method tersebut dan menserialisasikan nilai kembaliannya:

```javascript
class UserAccount {
  constructor(username, password) {
    this.username = username;
    this.password = password; // Data privat
  }

  // Otomatis dipanggil saat objek ini di-stringify:
  toJSON() {
    return {
      username: this.username,
      proteksi: 'Terverifikasi',
      // password sengaja tidak dimasukkan ke dalam return!
    };
  }
}

const user = new UserAccount('joko', 'rahasia123');
console.log(JSON.stringify(user)); // '{"username":"joko","proteksi":"Terverifikasi"}'
```

---

### 5. Kompatibilitas Tipe Data & Kasus Khusus

| Tipe Data                                 | Perilaku Saat `JSON.stringify()`                             | Solusi / Catatan                                              |
| :---------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------ |
| **`String`, `Number`, `Boolean`, `null`** | ✅ Didukung penuh                                            | Dikonversi persis sesuai representasi tipe.                   |
| **`Object` & `Array`**                    | ✅ Didukung penuh                                            | Ditelusuri secara rekursif.                                   |
| **`Date`**                                | ⚠️ Berubah menjadi String ISO                                | Gunakan fungsi _reviver_ saat `JSON.parse()`.                 |
| **`undefined`, `Function`, `Symbol`**     | ❌ Dihapus jika di Objek, jadi `null` jika di Array          | Hilang secara otomatis dari struktur JSON.                    |
| **`BigInt`**                              | ❌ Lempar `TypeError: Do not know how to serialize a BigInt` | Gunakan Replacer: `typeof v === 'bigint' ? v.toString() : v`. |
| **Circular Reference**                    | ❌ Lempar `TypeError: Converting circular structure to JSON` | Jangan merujuk objek ke dirinya sendiri.                      |

```javascript
// Contoh perilaku di dalam Array vs Objek:
const campuran = {
  a: undefined,
  b: () => {},
  c: [1, undefined, () => {}, 4],
};

console.log(JSON.stringify(campuran));
// Output: {"c":[1,null,null,4]} (a dan b lenyap; di dalam array berubah jadi null)
```

---

### 6. Deep Clone: Keterbatasan `JSON` vs `structuredClone()`

Dahulu, developer sering menggunakan teknik hack:

```javascript
const salinan = JSON.parse(JSON.stringify(dataAsli));
```

- **Kelemahan Trik Ini**:
  - Semua nilai `Date` berubah menjadi string biasa.
  - Properti method/fungsi, `undefined`, dan `Symbol` terhapus total.
  - Tidak mendukung `Map`, `Set`, `RegExp`, atau `Blob`.
  - Memicu error fatal jika ada referensi melingkar (_circular reference_).

- **Standar Modern JavaScript**:
  Gunakan **`structuredClone(dataAsli)`** bawaan browser & Node.js untuk kloning mendalam yang aman dan mendukung `Date`, `Set`, `Map`, serta objek sirkular!

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep serialisasi, pretty print, filtering whitelist, replacer function, date reviver, method `toJSON()`, dan safe parsing dengan `try...catch` di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/05-json/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Komunikasi Data REST API**: Standar pertukaran payload data antara frontend dan backend server (`fetch(url, { body: JSON.stringify(data) })`).
2. **Penyimpanan Web LocalStorage**: Menyimpan data objek state pengguna ke dalam `localStorage` yang hanya mendukung string: `localStorage.setItem('user', JSON.stringify(user))`.
3. **Ekspor & Impor File Konfigurasi**: Membaca dan menulis file konfigurasi seperti `package.json` dan `settings.json`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Kunci JSON Wajib Menggunakan Kutip Ganda**: Format `{'id': 1}` atau `{id: 1}` bukan JSON yang valid dan akan membuat `JSON.parse` melempar `SyntaxError`.
- **Tanggal Menjadi String**: Tidak menggunakan _reviver_ sehingga operasi manipulasi tanggal seperti `.getFullYear()` crash karena menganggapnya string biasa.
- **Serialisasi BigInt Tanpa Replacer**: Mengakibatkan runtime error fatal saat objek memuat angka `BigInt`.

### 🌟 Best Practice

- Selalu bungkus eksekusi `JSON.parse()` di dalam blok `try...catch`.
- Manfaatkan parameter `space` (`2` atau `4`) untuk logging yang mudah dibaca di terminal atau cloud logs.
- Tambahkan method `toJSON()` pada class domain Anda untuk menyaring field-field sensitif secara otomatis sebelum dikirimkan ke klien.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `safeJsonParse(str, fallback)` yang aman dari runtime crash dan mengembalikan nilai `fallback` jika string tidak valid.
2. Buat fungsi `stringifyDenganBigInt(data)` yang mampu melakukan serialisasi objek tanpa error meskipun objek memuat properti bertipe `BigInt`.
3. Buat class `SesiPengguna` yang memiliki properti `username`, `tokenRahasia`, dan `loginPada` (instance `Date`), di mana method `toJSON()` hanya mengekspor `username` dan tanggal dalam format lokal Indonesia.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - Object](../04-object/README.md)
- ➡️ **Selanjutnya:** [06 - BigInt](../06-bigint/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
