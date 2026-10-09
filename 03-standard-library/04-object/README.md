# 04 - Object (Static Methods: Freeze, Seal, Assign, Values, Keys, Entries, dan Meta-Programming)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Kumpulan _static methods_ bawaan pada objek `Object` untuk proteksi immutability, ekstraksi data pasangan properti, penggabungan, dan meta-programming descriptor.
> - **Kapan Digunakan**: Mengunci konfigurasi dan enum (`Object.freeze`), transformasi data objek ke array untuk analitik, serta manipulasi properti tingkat lanjut.
> - **Aturan Praktis**: Gunakan `Object.hasOwn()` (ES2022) alih-alih `hasOwnProperty()`, pahami bahwa `freeze()` bersifat _shallow_, dan gunakan `Object.fromEntries()` untuk merekonstruksi objek dari hasil filter `Object.entries()`.

---

## 1. 🎯 Tujuan Belajar

- Menguasai tiga tingkatan proteksi objek: `preventExtensions()`, `seal()`, dan `freeze()`.
- Memahami fenomena _shallow freeze_ dan cara mengimplementasikan _deep freeze_ secara rekursif.
- Menguasai seluruh static methods `Object` beserta skenario kasusnya masing-masing.
- Menguasai teknik ekstraksi data: `keys()`, `values()`, `entries()`, `getOwnPropertyNames()`, dan rekonstruksi kembali via `fromEntries()`.
- Memahami penggabungan dan kloning objek menggunakan `Object.assign()`.
- Memahami standar pengecekan modern `Object.hasOwn()` serta algoritma kesamaan nilai `Object.is()`.
- Memahami atribut descriptor properti: `writable`, `enumerable`, dan `configurable` via `Object.defineProperty()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **`Object.preventExtensions()`** seperti **koper yang resletingnya dikunci**: Anda tidak bisa memasukkan baju baru ke dalamnya, tetapi Anda masih bisa menukar atau membuang baju yang sudah ada di dalam.
> - **`Object.seal()`** seperti **formulir biodata resmi**: kolom-kolom isiannya sudah dicetak paten (tidak bisa menambah atau menghapus kolom), tetapi Anda masih boleh mengubah tulisan di dalam kotak isian tersebut.
> - **`Object.freeze()`** seperti **batu prasasti yang dipahat semen**: tidak bisa ditambah, tidak bisa dihapus, dan tulisan yang ada tidak bisa diubah sama sekali.

---

### 1. Tabel Ringkasan Static Methods Object (Cheat-Sheet)

| Kategori       | Method                                       | Nilai Kembalian     | Deskripsi Singkat                                                     |
| :------------- | :------------------------------------------- | :------------------ | :-------------------------------------------------------------------- |
| **Proteksi**   | `Object.freeze(obj)`                         | Objek target        | Membekukan total: tidak bisa tambah, hapus, maupun edit nilai.        |
|                | `Object.seal(obj)`                           | Objek target        | Menyegel struktur: tidak bisa tambah/hapus, tapi **bisa edit** nilai. |
|                | `Object.preventExtensions(obj)`              | Objek target        | Mencegah penambahan properti baru saja.                               |
|                | `Object.isFrozen(obj)`                       | `boolean`           | Memeriksa apakah objek dalam keadaan _frozen_.                        |
|                | `Object.isSealed(obj)`                       | `boolean`           | Memeriksa apakah objek dalam keadaan _sealed_.                        |
|                | `Object.isExtensible(obj)`                   | `boolean`           | Memeriksa apakah objek masih bisa ditambah properti baru.             |
| **Ekstraksi**  | `Object.keys(obj)`                           | `Array<string>`     | Mengambil seluruh nama properti _enumerable_.                         |
|                | `Object.values(obj)`                         | `Array<any>`        | Mengambil seluruh nilai properti.                                     |
|                | `Object.entries(obj)`                        | `Array<[key, val]>` | Mengambil array pasangan `[kunci, nilai]`.                            |
|                | `Object.fromEntries(iterable)`               | Objek baru          | Mengubah pasangan `[key, value]` kembali menjadi Plain Object.        |
|                | `Object.getOwnPropertyNames(obj)`            | `Array<string>`     | Mengambil seluruh nama properti termasuk _non-enumerable_.            |
| **Kloning**    | `Object.assign(target, ...src)`              | Objek target        | Menyalin properti dari satu/lebih sumber ke target (_shallow copy_).  |
| **Pengecekan** | `Object.hasOwn(obj, prop)`                   | `boolean`           | Standar modern (ES2022) mengecek kepemilikan properti sendiri.        |
|                | `Object.is(a, b)`                            | `boolean`           | Membandingkan dua nilai secara presisi (_SameValue_).                 |
| **Descriptor** | `Object.defineProperty(obj, prop, desc)`     | Objek target        | Menentukan atribut meta-properti secara spesifik.                     |
|                | `Object.getOwnPropertyDescriptor(obj, prop)` | Objek descriptor    | Membaca konfigurasi descriptor suatu properti.                        |

---

### 2. Tiga Tingkat Proteksi Objek

Integritas struktur dan data objek JavaScript dapat dikendalikan dengan tiga tingkatan:

| Operasi                             | Objek Normal | `preventExtensions()` |   `seal()`   | `freeze()`  |
| :---------------------------------- | :----------: | :-------------------: | :----------: | :---------: |
| **Menambah Properti Baru**          |   ✅ Boleh   |      ❌ Dilarang      | ❌ Dilarang  | ❌ Dilarang |
| **Menghapus Properti**              |   ✅ Boleh   |       ✅ Boleh        | ❌ Dilarang  | ❌ Dilarang |
| **Mengubah Nilai Properti**         |   ✅ Boleh   |       ✅ Boleh        | ✅ **Boleh** | ❌ Dilarang |
| **Mengubah Konfigurasi Descriptor** |   ✅ Boleh   |       ✅ Boleh        | ❌ Dilarang  | ❌ Dilarang |

---

### 3. Eksplorasi Mendalam Setiap Static Method Object

Berikut adalah rincian lengkap setiap static method `Object` beserta skenario kasusnya masing-masing:

---

#### 1. Mencegah Penambahan Properti: `Object.preventExtensions(obj)`

Mencegah properti baru ditambahkan ke dalam objek, namun properti yang sudah ada masih bisa diubah nilainya atau dihapus.

```javascript
const user = { nama: 'Joko', umur: 25 };
Object.preventExtensions(user);

user.umur = 26; // ✅ Boleh (modifikasi nilai)
delete user.nama; // ✅ Boleh (menghapus properti)
user.kota = 'Jakarta'; // ❌ Gagal diam-diam (atau TypeError di strict mode)

console.log(user); // { umur: 26 }
```

---

#### 2. Menyegel Struktur: `Object.seal(obj)`

Menyegel objek sehingga tidak bisa menambah maupun menghapus properti, tetapi **nilai properti yang sudah ada tetap bisa diubah**.

```javascript
const setting = { tema: 'dark', versi: 1 };
Object.seal(setting);

setting.versi = 2; // ✅ Boleh (mengubah nilai)
delete setting.tema; // ❌ Dilarang (gagal dihapus)
setting.bahasa = 'id'; // ❌ Dilarang (gagal ditambah)

console.log(setting); // { tema: 'dark', versi: 2 }
```

---

#### 3. Membekukan Total: `Object.freeze(obj)` & Solusi `deepFreeze()`

Membekukan objek secara absolut: tidak bisa menambah, menghapus, maupun mengubah nilai properti apa pun.

```javascript
const konstan = { API_URL: 'https://api.com' };
Object.freeze(konstan);

konstan.API_URL = 'https://hacked.com'; // ❌ Diabaikan
console.log(konstan.API_URL); // "https://api.com"
```

- **Jebakan Shallow Freeze & Solusi Deep Freeze Rekursif**:
  `Object.freeze()` hanya membekukan tingkat teratas (_shallow_). Properti bersarang (_nested object_) masih bisa dimutasi:

  ```javascript
  function deepFreeze(obj) {
    Object.keys(obj).forEach((prop) => {
      const val = obj[prop];
      if (typeof val === 'object' && val !== null && !Object.isFrozen(val)) {
        deepFreeze(val);
      }
    });
    return Object.freeze(obj);
  }

  const aman = deepFreeze({ server: { port: 8080 } });
  aman.server.port = 9000; // ❌ Gagal
  ```

---

#### 4. Cek Status Ekstensi: `Object.isExtensible(obj)`

Memeriksa apakah objek masih boleh ditambahkan properti baru.

```javascript
const data = {};
console.log(Object.isExtensible(data)); // true

Object.preventExtensions(data);
console.log(Object.isExtensible(data)); // false
```

---

#### 5. Cek Status Penyegelan: `Object.isSealed(obj)`

Mengembalikan `true` jika objek berstatus tersegel (_sealed_).

```javascript
const kartu = { id: 10 };
console.log(Object.isSealed(kartu)); // false

Object.seal(kartu);
console.log(Object.isSealed(kartu)); // true
```

---

#### 6. Cek Status Pembekuan: `Object.isFrozen(obj)`

Mengembalikan `true` jika objek berstatus beku (_frozen_).

```javascript
const enumStatus = { SUCCESS: 'SUCCESS' };
console.log(Object.isFrozen(enumStatus)); // false

Object.freeze(enumStatus);
console.log(Object.isFrozen(enumStatus)); // true
```

---

#### 7. Ekstraksi Daftar Kunci: `Object.keys(obj)`

Mengembalikan array string berisi seluruh nama properti yang bersifat _enumerable_.

```javascript
const profil = { nama: 'Budi', umur: 30, aktif: true };
console.log(Object.keys(profil)); // ['nama', 'umur', 'aktif']
```

---

#### 8. Ekstraksi Daftar Nilai: `Object.values(obj)`

Mengembalikan array berisi seluruh nilai properti objek. Sangat cocok untuk kalkulasi agregasi (_reduce_):

```javascript
const keranjang = { apel: 15000, mangga: 25000, jeruk: 20000 };
const total = Object.values(keranjang).reduce((acc, curr) => acc + curr, 0);
console.log(total); // 60000
```

---

#### 9. Ekstraksi Pasangan Entri: `Object.entries(obj)`

Mengembalikan array 2D pasangan `[kunci, nilai]`. Memungkinkan iterasi objek secara langsung dengan `for...of`:

```javascript
const skor = { player1: 100, player2: 85 };

for (const [pemain, nilai] of Object.entries(skor)) {
  console.log(`${pemain} meraih skor ${nilai}`);
}
```

---

#### 10. Rekonstruksi Menjadi Objek: `Object.fromEntries(iterable)`

Mengubah pasangan `[key, value]` (dari Array 2D, Map, atau URLSearchParams) kembali menjadi plain object:

```javascript
const gajiKaryawan = { budi: 5000000, andi: 8000000, siti: 12000000 };

// Filter karyawan dengan gaji di atas 7 juta:
const gajiTinggi = Object.fromEntries(
  Object.entries(gajiKaryawan).filter(([_, nominal]) => nominal > 7000000)
);
console.log(gajiTinggi); // { andi: 8000000, siti: 12000000 }
```

---

#### 11. Mengambil Semua Nama Properti: `Object.getOwnPropertyNames(obj)`

Mengambil seluruh nama properti string, **termasuk yang disembunyikan (_non-enumerable_)**:

```javascript
const rahasiaObj = {};
Object.defineProperty(rahasiaObj, 'token', {
  value: 'xyz123',
  enumerable: false,
});
rahasiaObj.nama = 'Public Data';

console.log(Object.keys(rahasiaObj)); // ['nama'] (token terlewat)
console.log(Object.getOwnPropertyNames(rahasiaObj)); // ['token', 'nama'] ✅ Lengkap!
```

---

#### 12. Penggabungan & Kloning: `Object.assign(target, ...sources)`

Menyalin seluruh properti _enumerable_ dari satu atau lebih objek sumber ke objek target (_shallow merge_):

```javascript
const defaultSetting = { tema: 'light', bahasa: 'id' };
const userSetting = { tema: 'dark' };

const finalSetting = Object.assign({}, defaultSetting, userSetting);
console.log(finalSetting); // { tema: 'dark', bahasa: 'id' }
```

---

#### 13. Pengecekan Properti Sendiri: `Object.hasOwn(obj, prop)` (ES2022)

Standar modern pengganti `hasOwnProperty()`. Kebal dari error ketika objek dibuat tanpa prototype (`Object.create(null)`):

```javascript
const mapel = Object.create(null);
mapel.nama = 'Matematika';

// mapel.hasOwnProperty('nama'); // ❌ TypeError: mapel.hasOwnProperty is not a function
console.log(Object.hasOwn(mapel, 'nama')); // true ✅
```

---

#### 14. Algoritma Kesamaan Presisi: `Object.is(a, b)`

Membandingkan dua nilai menggunakan algoritma _SameValue_, mengatasi keterbatasan operator `===`:

```javascript
// A. Kasus NaN:
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true ✅

// B. Kasus +0 dan -0:
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false ✅
```

---

#### 15. Definisi Descriptor Properti: `Object.defineProperty(obj, prop, descriptor)`

Mengatur atribut meta properti secara detail:

- `value`: Nilai yang disimpan.
- `writable`: Apakah nilainya bisa diubah via penugasan (`=`).
- `enumerable`: Apakah properti muncul di `for...in` dan `Object.keys()`.
- `configurable`: Apakah properti bisa dihapus dengan `delete` atau diubah konfigurasinya.

```javascript
const barang = {};
Object.defineProperty(barang, 'sku', {
  value: 'SKU-001',
  writable: false, // Read-only
  enumerable: true, // Terlihat di keys
  configurable: false, // Tidak bisa di-delete
});

barang.sku = 'BARU'; // Diabaikan
delete barang.sku; // Diabaikan
console.log(barang.sku); // "SKU-001"
```

---

#### 16. Membaca Descriptor: `Object.getOwnPropertyDescriptor(obj, prop)`

Membaca konfigurasi descriptor dari suatu properti:

```javascript
const desc = Object.getOwnPropertyDescriptor(barang, 'sku');
console.log(desc.writable); // false
console.log(desc.configurable); // false
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep proteksi objek, deep freeze rekursif, ekstraksi data, kloning, `Object.hasOwn()`, dan meta-programming descriptor di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/04-object/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konstanta & Enum Global**: Membekukan kamus status transaksi (`Object.freeze({ PENDING: 'PENDING', SUCCESS: 'SUCCESS' })`) agar nilainya tidak bisa sengaja diubah oleh modul lain.
2. **Sanitasi Data Objek API**: Mengonversi `Object.entries()` ke filter untuk membuang field yang bernilai `null` atau `undefined` sebelum dikirim ke database.
3. **Pemberian ID Unik Read-Only**: Menggunakan `Object.defineProperty` dengan `writable: false` untuk membuat properti ID yang kebal dari perubahan data secara tidak sengaja.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Shallow Freeze**: Mengira `Object.freeze()` membekukan hingga ke properti anak di dalamnya. Selalu gunakan fungsi rekursif `deepFreeze` jika memerlukan proteksi menyeluruh.
- **Menggunakan `hasOwnProperty`**: Rawan memicu runtime crash pada objek tanpa prototype. Selalu gunakan `Object.hasOwn()`.
- **Lupa sifat non-mutating `Object.fromEntries`**: Mengira `fromEntries` mengubah objek lama, padahal ia selalu menghasilkan instance objek baru.

### 🌟 Best Practice

- Gunakan `Object.freeze()` untuk semua objek konstanta konfigurasi.
- Gunakan perulangan `for (const [kunci, nilai] of Object.entries(obj))` untuk iterasi objek yang bersih dan mudah dibaca.
- Gunakan `Object.is()` ketika Anda membutuhkan perbandingan nilai numerik ekstrem seperti `NaN` atau `-0`.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `deepFreeze(obj)` yang mampu membekukan objek bersarang secara menyeluruh dan ujilah dengan memodifikasi properti pada kedalaman 3 tingkat.
2. Buat fungsi `bersihkanObjekNull(obj)` yang menerima objek dengan berbagai nilai (termasuk `null` dan `undefined`) dan mengembalikan objek baru yang hanya memuat properti dengan nilai valid menggunakan `Object.entries()` dan `Object.fromEntries()`.
3. Buat sebuah objek `UserSession` yang memiliki properti `token` bersifat _read-only_ dan _non-enumerable_ menggunakan `Object.defineProperty()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Array](../03-array/README.md)
- ➡️ **Selanjutnya:** [05 - JSON](../05-json/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
