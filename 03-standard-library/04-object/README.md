# 04 - Object (Static Methods: Freeze, Seal, Assign, Values, Keys, Entries)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami kumpulan Static Methods esensial pada fungsi global `Object`.
> * **Kapan Digunakan**: Menguasai proteksi integritas objek: perbedaan mendalam `Object.freeze()` vs `Object.seal()`.
> * **Aturan Praktis**: Gunakan `Object.freeze()` untuk seluruh objek konfigurasi global dan enum agar tidak mengalami mutasi tak terduga (_accidental mutation_).

## 1. 🎯 Tujuan Belajar

- Memahami kumpulan Static Methods esensial pada fungsi global `Object`.
- Menguasai proteksi integritas objek: perbedaan mendalam `Object.freeze()` vs `Object.seal()`.
- Menggabungkan dan menyalin properti objek dengan `Object.assign()`.
- Mengekstraksi struktur objek menggunakan `Object.keys()`, `Object.values()`, `Object.entries()`, dan `Object.getOwnPropertyNames()`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> `Object.seal()` seperti **dokumen formulir dengan kotak isian yang sudah dikunci**: Anda tidak bisa menambah kolom baru atau merobek kolom yang ada, tetapi Anda masih bisa mengubah isi tulisan di dalam kotak. Sedangkan `Object.freeze()` seperti **batu prasasti yang sudah dipahat semen**: tidak bisa ditambah, tidak bisa dihapus, dan tulisan yang ada tidak bisa diubah sama sekali.

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

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Proteksi Objek: Object.freeze() vs Object.seal() ---');
const configServer = {
  host: 'localhost',
  port: 8080
};

// Bekukan objek secara total (immutable)
Object.freeze(configServer);

// Uji coba mutasi (tidak akan mengubah nilai pada objek yang di-freeze):
configServer.port = 9000;
configServer.timeout = 5000;

console.log('Hasil pembuktian freeze :', configServer);
console.log('Apakah objek di-freeze? :', Object.isFrozen(configServer)); // true

console.log('\n--- 2. Iterasi Pasangan Data dengan Object.entries() ---');
const kursValas = {
  USD: 16000,
  EUR: 17500,
  SGD: 12000,
  JPY: 105
};

// Iterasi praktis menggunakan destructuring [kunci, nilai]
for (const [mataUang, nilaiRupiah] of Object.entries(kursValas)) {
  console.log(`1 ${mataUang.padEnd(4)} = Rp ${nilaiRupiah.toLocaleString('id-ID')}`);
}

console.log('\n--- 3. Analitik Data: Object.values() & Array.reduce() ---');
function hitungRataRataKurs(dataKurs) {
  const daftarNilai = Object.values(dataKurs);
  
  if (daftarNilai.length === 0) {
    return 'Data kurs kosong';
  }

  const totalNilai = daftarNilai.reduce((total, val) => total + val, 0);
  const rataRata = totalNilai / daftarNilai.length;

  return `Rata-rata Nilai Kurs: Rp ${rataRata.toLocaleString('id-ID', {
    maximumFractionDigits: 2
  })}`;
}

console.log(hitungRataRataKurs(kursValas));
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Proteksi Objek: Object.freeze() vs Object.seal() ---
Hasil pembuktian freeze : { host: 'localhost', port: 8080 }
Apakah objek di-freeze? : true

--- 2. Iterasi Pasangan Data dengan Object.entries() ---
1 USD  = Rp 16.000
1 EUR  = Rp 17.500
1 SGD  = Rp 12.000
1 JPY  = Rp 105

--- 3. Analitik Data: Object.values() & Array.reduce() ---
Rata-rata Nilai Kurs: Rp 11.401,25
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case

1. **Konstanta Aplikasi & Enum**: Membekukan kamus status pesanan (`const STATUS = Object.freeze({ PENDING: 'PENDING', SUCCESS: 'SUCCESS' })`) agar nilainya tidak bisa sengaja ditimpa oleh developer lain.
2. **Integrasi Object ke Map**: Menggunakan `Object.entries(obj)` untuk mengonversi konfigurasi objek lama menjadi struktur `Map` modern.
3. **Inspeksi Properti Dinamis**: Mengambil seluruh kunci objek API untuk digenerasikan secara otomatis menjadi header tabel di dashboard web.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Freeze bersifat Shallow**: Jika objek memiliki properti objek anak (`user.alamat.kota`), memanggil `Object.freeze(user)` tidak otomatis membekukan `user.alamat`. Properti `kota` masih bisa diubah!
* **Nama method lama**: Jangan gunakan istilah non-standar seperti `Object.getPropertyNames()`, nama standar ECMAScript adalah `Object.getOwnPropertyNames()`.
* **Kegagalan tersembunyi tanpa Strict Mode**: Di lingkungan non-strict, memodifikasi properti yang dibekukan tidak memunculkan error melainkan gagal secara diam-diam (_fail silently_).

### 🌟 Best Practice

- Gunakan `Object.freeze()` untuk seluruh objek konfigurasi global dan enum agar tidak mengalami mutasi tak terduga (_accidental mutation_).
* Gunakan `Object.entries()` dikombinasikan dengan perulangan `for (const [kunci, nilai] of Object.entries(obj))` untuk iterasi objek yang sangat bersih.
* Periksa status proteksi objek menggunakan `Object.isFrozen(obj)` atau `Object.isSealed(obj)` jika diperlukan.

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `deepFreeze(obj)` rekursif yang dapat membekukan objek beserta seluruh objek bersarang (_nested object_) di dalamnya.
2. Buat fungsi `hitungRataRataNilai(objNilai)` yang menerima objek `{ matematika: 80, bahasa: 90, ipa: 85 }` dan menghitung rata-rata nilai menggunakan `Object.values()` dan `reduce()`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Array](../03-array/README.md)
- ➡️ **Selanjutnya:** [05 - JSON](../05-json/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
