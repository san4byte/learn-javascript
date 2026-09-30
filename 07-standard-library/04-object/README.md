# 04 - Object (Static Methods: Freeze, Seal, Assign, Values, Keys, Entries)

## 1. 🎯 Tujuan Belajar

- Memahami kumpulan Static Methods esensial pada fungsi global `Object`.\n- Menguasai proteksi integritas objek: perbedaan mendalam `Object.freeze()` vs `Object.seal()`.\n- Menggabungkan dan menyalin properti objek dengan `Object.assign()`.\n- Mengekstraksi struktur objek menggunakan `Object.keys()`, `Object.values()`, `Object.entries()`, dan `Object.getOwnPropertyNames()`.

---

## 2. 📖 Penjelasan Konsep

Di samping pembuatan objek menggunakan _object literal_ `{}` atau `new Object()`, JavaScript menyediakan kumpulan **Static Methods** langsung di namespace objek `Object` untuk inspeksi, modifikasi, dan pengamanan struktur data.

### 1. Proteksi Objek: `freeze()` vs `seal()`

Integritas data objek dapat dilindungi dengan dua tingkatan:

| Operasi                              | Objek Normal | `Object.seal()`   | `Object.freeze()`               |
| :----------------------------------- | :----------- | :---------------- | :------------------------------ |
| **Menambah Properti Baru**           | ✅ Boleh     | ❌ Tidak Boleh    | ❌ Tidak Boleh                  |
| **Menghapus Properti**               | ✅ Boleh     | ❌ Tidak Boleh    | ❌ Tidak Boleh                  |
| **Mengubah Nilai Properti yang Ada** | ✅ Boleh     | ✅ **Boleh**      | ❌ **Tidak Boleh**              |
| **Sifat Immutability**               | Fleksibel    | Struktur Terkunci | Nilai & Struktur Beku (Shallow) |

> ⚠️ **Penting**: Baik `seal()` maupun `freeze()` bersifat **shallow** (hanya melindungi tingkat teratas; properti objek bersarang / _nested object_ tetap bisa diubah kecuali dibekukan secara rekursif).

### Tabel Referensi Kumpulan Static Methods Lengkap `Object`

| Kategori                 | Method                            | Nilai Balik         | Kegunaan & Contoh Singkat                                                      |
| :----------------------- | :-------------------------------- | :------------------ | :----------------------------------------------------------------------------- |
| **Proteksi**             | `Object.freeze(obj)`              | Objek target        | Membekukan objek secara total (tidak bisa tambah, hapus, maupun ubah nilai)    |
|                          | `Object.seal(obj)`                | Objek target        | Menyegel objek (tidak bisa tambah/hapus, tapi **bisa ubah** nilai yang ada)    |
|                          | `Object.preventExtensions(obj)`   | Objek target        | Mencegah penambahan properti baru saja                                         |
|                          | `Object.isFrozen(obj)`            | `true` / `false`    | Memeriksa apakah objek dalam keadaan _frozen_                                  |
|                          | `Object.isSealed(obj)`            | `true` / `false`    | Memeriksa apakah objek dalam keadaan _sealed_                                  |
| **Ekstraksi Data**       | `Object.keys(obj)`                | `Array<string>`     | Mengambil seluruh nama properti _enumerable_: `Object.keys({ a: 1 }) // ['a']` |
|                          | `Object.values(obj)`              | `Array<any>`        | Mengambil seluruh nilai properti: `Object.values({ a: 1 }) // [1]`             |
|                          | `Object.entries(obj)`             | `Array<[key, val]>` | Mengambil pasangan key-value: `Object.entries({ a: 1 }) // [['a', 1]]`         |
|                          | `Object.fromEntries(iterable)`    | Objek baru          | Mengubah pasangan entri/Map kembali ke Objek: `Object.fromEntries([['a', 1]])` |
|                          | `Object.getOwnPropertyNames(obj)` | `Array<string>`     | Mengambil **seluruh** properti termasuk yang non-enumerable                    |
| **Kloning & Pengecekan** | `Object.assign(target, ...src)`   | Objek target        | Menggabungkan dan menyalin properti antar objek (_shallow copy_)               |
|                          | `Object.hasOwn(obj, prop)`        | `true` / `false`    | Standar modern (ES2022) mengecek kepemilikan properti sendiri secara aman      |
|                          | `Object.create(proto)`            | Objek baru          | Membuat objek baru dengan prototype acuan tertentu                             |

> ⚠️ **Catatan Penting Shallow vs Deep**: `Object.freeze()` dan `Object.seal()` hanya membekukan properti di tingkat teratas (_shallow_). Properti objek anak yang bersarang (_nested object_) tetap bisa diubah kecuali dibekukan secara rekursif (_deep freeze_).

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Pengamanan Objek: Object.seal() vs Object.freeze() ---');
const configServer = {
  host: 'localhost',
  port: 8080,
};

// Object.seal: tidak bisa tambah/hapus, tapi nilai bisa diubah
Object.seal(configServer);
configServer.port = 9000; // Berhasil diubah
configServer.timeout = 5000; // Gagal (diabaikan atau error di strict mode)
delete configServer.host; // Gagal
console.log('Hasil Object.seal()       :', configServer);

const userAdmin = {
  username: 'admin_joko',
  role: 'superadmin',
};

// Object.freeze: tidak bisa tambah, hapus, maupun ubah nilai
Object.freeze(userAdmin);
userAdmin.role = 'biasa'; // Gagal
delete userAdmin.username; // Gagal
console.log('Hasil Object.freeze()     :', userAdmin);

console.log('\n--- 2. Penggabungan Objek: Object.assign() ---');
const profilDasar = { nama: 'Joko Santoso' };
const profilKontak = { email: 'joko@example.com', kota: 'Jakarta' };
const preferensi = { tema: 'dark' };

const profilLengkap = Object.assign({}, profilDasar, profilKontak, preferensi);
console.log('Profil Hasil Merge        :', profilLengkap);

console.log('\n--- 3. Ekstraksi Data: keys, values, entries, getOwnPropertyNames ---');
const produk = {
  id: 'PRD-101',
  nama: 'Keyboard Mekanikal',
  harga: 850000,
};

console.log('Object.keys()             :', Object.keys(produk));
console.log('Object.values()           :', Object.values(produk));
console.log('Object.entries()          :', Object.entries(produk));
console.log('getOwnPropertyNames()     :', Object.getOwnPropertyNames(produk));
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Pengamanan Objek: Object.seal() vs Object.freeze() ---
Hasil Object.seal()       : { host: 'localhost', port: 9000 }
Hasil Object.freeze()     : { username: 'admin_joko', role: 'superadmin' }

--- 2. Penggabungan Objek: Object.assign() ---
Profil Hasil Merge        : {
  nama: 'Joko Santoso',
  email: 'joko@example.com',
  kota: 'Jakarta',
  tema: 'dark'
}

--- 3. Ekstraksi Data: keys, values, entries, getOwnPropertyNames ---
Object.keys()             : [ 'id', 'nama', 'harga' ]
Object.values()           : [ 'id', 'nama', 'harga' ] -> [ 'PRD-101', 'Keyboard Mekanikal', 850000 ]
Object.entries()          : [
  [ 'id', 'PRD-101' ],
  [ 'nama', 'Keyboard Mekanikal' ],
  [ 'harga', 850000 ]
]
getOwnPropertyNames()     : [ 'id', 'nama', 'harga' ]
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Object.seal()` seperti **dokumen formulir dengan kotak isian yang sudah dikunci**: Anda tidak bisa menambah kolom baru atau merobek kolom yang ada, tetapi Anda masih bisa mengubah isi tulisan di dalam kotak. Sedangkan `Object.freeze()` seperti **batu prasasti yang sudah dipahat semen**: tidak bisa ditambah, tidak bisa dihapus, dan tulisan yang ada tidak bisa diubah sama sekali.

### 🏢 Real-World Use Case

1. **Konstanta Aplikasi & Enum**: Membekukan kamus status pesanan (`const STATUS = Object.freeze({ PENDING: 'PENDING', SUCCESS: 'SUCCESS' })`) agar nilainya tidak bisa sengaja ditimpa oleh developer lain.\n2. **Integrasi Object ke Map**: Menggunakan `Object.entries(obj)` untuk mengonversi konfigurasi objek lama menjadi struktur `Map` modern.\n3. **Inspeksi Properti Dinamis**: Mengambil seluruh kunci objek API untuk digenerasikan secara otomatis menjadi header tabel di dashboard web.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Freeze bersifat Shallow**: Jika objek memiliki properti objek anak (`user.alamat.kota`), memanggil `Object.freeze(user)` tidak otomatis membekukan `user.alamat`. Properti `kota` masih bisa diubah!\n* **Nama method lama**: Jangan gunakan istilah non-standar seperti `Object.getPropertyNames()`, nama standar ECMAScript adalah `Object.getOwnPropertyNames()`.\n* **Kegagalan tersembunyi tanpa Strict Mode**: Di lingkungan non-strict, memodifikasi properti yang dibekukan tidak memunculkan error melainkan gagal secara diam-diam (_fail silently_).

### 🌟 Best Practice

- Gunakan `Object.freeze()` untuk seluruh objek konfigurasi global dan enum agar tidak mengalami mutasi tak terduga (_accidental mutation_).\n* Gunakan `Object.entries()` dikombinasikan dengan perulangan `for (const [kunci, nilai] of Object.entries(obj))` untuk iterasi objek yang sangat bersih.\n* Periksa status proteksi objek menggunakan `Object.isFrozen(obj)` atau `Object.isSealed(obj)` jika diperlukan.

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `deepFreeze(obj)` rekursif yang dapat membekukan objek beserta seluruh objek bersarang (_nested object_) di dalamnya.\n2. Buat fungsi `hitungRataRataNilai(objNilai)` yang menerima objek `{ matematika: 80, bahasa: 90, ipa: 85 }` dan menghitung rata-rata nilai menggunakan `Object.values()` dan `reduce()`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Array](../03-array/README.md)\n- ➡️ **Selanjutnya:** [05 - JSON](../05-json/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
