# 11 - Set (Koleksi Nilai Unik, Eliminasi Duplikasi, dan Operasi Himpunan ES2024)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Struktur data himpunan nilai unik tanpa duplikasi dengan pencarian cepat $O(1)$, dilengkapi operasi aljabar himpunan modern ES2024 (_union_, _intersection_, _difference_).
> - **Kapan Digunakan**: Membuang elemen duplikat pada array (`[...new Set(arr)]`), mencatat izin akses peran pengguna (_permissions check_), dan menghitung irisan data antar kelompok.
> - **Aturan Praktis**: Set tidak berbasis indeks numerik (`set[0]` bernilai `undefined`), gunakan `.has()` untuk pencarian instan $O(1)$, dan ingat bahwa objek literal dievaluasi berdasarkan referensi alamat memori.

---

## 1. 🎯 Tujuan Belajar

- Memahami karakteristik struktur data `Set` dan perbedaannya dengan `Array`.
- Menguasai seluruh method & properti `Set` beserta berbagai kondisi kasus (_edge cases_).
- Menguasai operasi dasar CRUD: `add()`, `has()`, `delete()`, `clear()`, dan properti `size`.
- Menguasai teknik eliminasi duplikasi array secara instan menggunakan `[...new Set(arr)]`.
- Memahami evaluasi nilai unik pada objek referensi vs nilai primitif dan perlakuan khusus `NaN`.
- Menguasai iterasi data himpunan menggunakan `for...of`, `.values()`, `.entries()`, dan `.forEach()`.
- Menguasai metode himpunan matematika modern ES2024: `union()`, `intersection()`, `difference()`, `symmetricDifference()`, `isSubsetOf()`, `isSupersetOf()`, dan `isDisjointFrom()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Set` seperti **daftar buku tamu VIP pesta pernikahan eksklusif**: nama setiap tamu hanya boleh tercatat satu kali di buku tamu. Jika seorang tamu mencoba mendaftar untuk kedua kalinya, penjaga meja akan menolak pencatatan dobel. Selain itu, penjaga dapat dengan sekejap memverifikasi apakah seseorang terdaftar atau tidak ($O(1)$) tanpa harus membaca buku dari lembar pertama hingga terakhir.

---

### 1. Tabel Ringkasan Method & Properti Set (Cheat-Sheet)

| Kategori            | Method / Properti                | Nilai Kembalian | Deskripsi Singkat                                               |
| :------------------ | :------------------------------- | :-------------- | :-------------------------------------------------------------- |
| **Dasar**           | `new Set([iterable])`            | `Set`           | Membuat instance Set baru (duplikat otomatis disaring).         |
|                     | `set.add(value)`                 | `Set` _(this)_  | Menambah elemen baru (mendukung _method chaining_).             |
|                     | `set.has(value)`                 | `boolean`       | Pengecekan keberadaan elemen super cepat ($O(1)$).              |
|                     | `set.delete(value)`              | `boolean`       | Menghapus elemen (`true` jika ditemukan & terhapus).            |
|                     | `set.clear()`                    | `undefined`     | Mengosongkan seluruh isi Set.                                   |
|                     | `set.size`                       | `number`        | Properti _read-only_ jumlah elemen unik tersimpan.              |
| **Iterasi**         | `set.values()` / `keys()`        | `SetIterator`   | Iterator berisi seluruh nilai elemen himpunan.                  |
|                     | `set.entries()`                  | `SetIterator`   | Iterator pasangan `[value, value]` (keselarasan API).           |
|                     | `set.forEach(callback)`          | `undefined`     | Mengeksekusi callback: parameter `(val, key)` bernilai sama.    |
| **ES2024 Himpunan** | `setA.union(setB)`               | `Set` baru      | Menggabungkan seluruh anggota unik dari kedua set ($A \cup B$). |
|                     | `setA.intersection(setB)`        | `Set` baru      | Mengambil elemen yang ada di kedua set ($A \cap B$).            |
|                     | `setA.difference(setB)`          | `Set` baru      | Elemen yang ada di A tetapi tidak ada di B ($A \setminus B$).   |
|                     | `setA.symmetricDifference(setB)` | `Set` baru      | Elemen eksklusif di salah satu set saja ($A \Delta B$).         |
|                     | `setA.isSubsetOf(setB)`          | `boolean`       | Mengecek apakah seluruh elemen A adalah bagian dari B.          |
|                     | `setA.isSupersetOf(setB)`        | `boolean`       | Mengecek apakah A memuat seluruh elemen dari B.                 |
|                     | `setA.isDisjointFrom(setB)`      | `boolean`       | Mengecek apakah A dan B sama sekali tidak memiliki irisan.      |

---

### 2. Eksplorasi Mendalam Setiap Method & Properti Set

Berikut adalah rincian lengkap setiap method dan properti `Set` beserta skenario kasusnya masing-masing:

---

#### 1. Inisialisasi: `new Set([iterable])`

Membuat instance Set baru. Jika iterable (Array/String) diberikan, elemen duplikat otomatis dieliminasi saat inisialisasi:

```javascript
const daftarId = [101, 102, 101, 103, 102];
const setUnik = new Set(daftarId);
console.log(setUnik.size); // 3

// Idiom Deduplikasi Array Instan:
const arrayBersih = [...new Set(daftarId)];
console.log(arrayBersih); // [101, 102, 103] ✅
```

---

#### 2. Menambah Elemen: `set.add(value)`

Menambahkan elemen baru ke dalam Set. Jika nilai sudah ada, penambahan diabaikan tanpa error:

```javascript
const izin = new Set();
// Mendukung method chaining karena me-return this:
izin.add("READ").add("WRITE").add("READ");
console.log(izin.size); // 2 ('READ' kedua diabaikan)
```

---

#### 3. Pengecekan Keberadaan: `set.has(value)`

Memeriksa apakah elemen terdaftar di dalam Set dalam waktu instan $O(1)$:

```javascript
console.log(izin.has("WRITE")); // true
console.log(izin.has("DELETE")); // false
```

---

#### 4. Menghapus Elemen: `set.delete(value)`

Menghapus elemen tertentu. Mengembalikan `true` jika elemen ditemukan dan dihapus, atau `false` jika tidak ada:

```javascript
console.log(izin.delete("WRITE")); // true
console.log(izin.delete("DELETE")); // false
console.log(izin.has("WRITE")); // false
```

---

#### 5. Mengosongkan Set: `set.clear()`

Menghapus seluruh anggota Set sekaligus, mengubah `.size` menjadi 0:

```javascript
const cache = new Set(["a", "b", "c"]);
cache.clear();
console.log(cache.size); // 0
```

---

#### 6. Properti Ukuran: `set.size`

Properti _read-only_ (getter) yang mengembalikan jumlah elemen unik saat ini:

```javascript
const buah = new Set(["apel", "jeruk"]);
console.log(buah.size); // 2
buah.size = 10; // Diabaikan
console.log(buah.size); // Tetap 2
```

---

#### 7. Evaluasi Objek Referensi & Perilaku `NaN`

- **Objek Literal**: Menggunakan perbandingan alamat memori. Dua objek dengan isi identik tetap dianggap berbeda:

  ```javascript
  const s = new Set();
  s.add({ id: 1 });
  s.add({ id: 1 });
  console.log(s.size); // 2 ⚠️ (karena alamat memori berbeda)

  // Solusi: Simpan referensi ke variabel
  const user = { id: 1 };
  s.add(user).add(user);
  console.log(s.has(user)); // true (hanya tersimpan 1 kali)
  ```

- **Nilai `NaN`**: Dianggap sama via algoritma _SameValueZero_:
  ```javascript
  const setNan = new Set();
  setNan.add(NaN).add(NaN);
  console.log(setNan.size); // 1 ✅ (tidak terjadi duplikasi)
  ```

---

#### 8. Iterasi Nilai: `set.values()` & `set.keys()`

Mengembalikan iterator berisi seluruh elemen sesuai urutan penyisipan (_insertion order_). Di Set, `set.keys()` adalah alias dari `set.values()`:

```javascript
const tags = new Set(["react", "vue", "angular"]);
for (const tag of tags.values()) {
  console.log(tag); // "react", "vue", "angular"
}
```

---

#### 9. Iterasi Pasangan: `set.entries()`

Mengembalikan iterator pasangan `[value, value]` demi keseragaman antarmuka dengan `Map.prototype.entries()`:

```javascript
console.log(tags.entries().next().value); // ['react', 'react']
```

---

#### 10. Perulangan Callback: `set.forEach(callback[, thisArg])`

Mengeksekusi callback di mana parameter pertama dan kedua bernilai identik `(val, key)`:

```javascript
tags.forEach((val, key) => {
  console.log(val === key); // true!
});
```

---

#### 11. Penggabungan Himpunan (ES2024): `setA.union(setB)`

Mengembalikan Set baru yang berisi seluruh anggota unik dari kedua himpunan ($A \cup B$):

```javascript
const frontEnd = new Set(["HTML", "CSS", "JS"]);
const backEnd = new Set(["JS", "NodeJS", "SQL"]);

const fullStack = frontEnd.union(backEnd);
console.log([...fullStack]); // ['HTML', 'CSS', 'JS', 'NodeJS', 'SQL']
```

---

#### 12. Irisan Himpunan (ES2024): `setA.intersection(setB)`

Mengembalikan Set baru berisi anggota yang ada di kedua himpunan ($A \cap B$):

```javascript
const bersama = frontEnd.intersection(backEnd);
console.log([...bersama]); // ['JS']
```

---

#### 13. Selisih Himpunan (ES2024): `setA.difference(setB)`

Mengembalikan Set baru berisi anggota himpunan A yang **tidak ada** di himpunan B ($A \setminus B$):

```javascript
const hanyaFrontEnd = frontEnd.difference(backEnd);
console.log([...hanyaFrontEnd]); // ['HTML', 'CSS']
```

---

#### 14. Selisih Simetris (ES2024): `setA.symmetricDifference(setB)`

Mengembalikan Set baru berisi anggota yang eksklusif ada di salah satu himpunan saja, tetapi tidak di keduanya ($A \Delta B$):

```javascript
const eksklusif = frontEnd.symmetricDifference(backEnd);
console.log([...eksklusif]); // ['HTML', 'CSS', 'NodeJS', 'SQL']
```

---

#### 15. Pengecekan Bagian Himpunan (ES2024): `setA.isSubsetOf(setB)`

Mengembalikan `true` jika seluruh anggota himpunan A juga termuat di dalam himpunan B:

```javascript
const jsOnly = new Set(["JS"]);
console.log(jsOnly.isSubsetOf(frontEnd)); // true
```

---

#### 16. Pengecekan Himpunan Induk (ES2024): `setA.isSupersetOf(setB)`

Mengembalikan `true` jika himpunan A memuat seluruh anggota yang ada di dalam himpunan B:

```javascript
console.log(frontEnd.isSupersetOf(jsOnly)); // true
```

---

#### 17. Pengecekan Himpunan Lepas (ES2024): `setA.isDisjointFrom(setB)`

Mengembalikan `true` jika kedua himpunan **sama sekali tidak memiliki irisan** anggota:

```javascript
const desain = new Set(["Figma", "Photoshop"]);
console.log(frontEnd.isDisjointFrom(desain)); // true  (sama sekali lepas)
console.log(frontEnd.isDisjointFrom(backEnd)); // false (karena ada irisan 'JS')
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep inisialisasi, deduplikasi array, pengecekan instan $O(1)$, referensi memori objek, penanganan `NaN`, dan implementasi aljabar himpunan modern ES2024 di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/11-set/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Deduplikasi Array Data API**: Membersihkan array kategori produk, daftar email penerima newsletter, atau tag blog menggunakan `[...new Set(array)]`.
2. **Sistem Otorisasi Peran (RBAC Permissions)**: Menyimpan daftar _permission codes_ pengguna di dalam Set agar fungsi pengecekan `hasPermission(p)` berjalan instan $O(1)$.
3. **Analitik Segmentasi Pelanggan (ES2024)**: Menghitung pengguna yang membeli produk A dan produk B menggunakan method `pembeliA.intersection(pembeliB)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Mengakses via Indeks `set[0]`**: Set tidak mengizinkan akses indeks dan akan selalu menghasilkan `undefined`. Konversi dulu ke array via `[...set][0]`.
- **Deduplikasi Objek Literal Gagal**: Mengira `new Set([{id: 1}, {id: 1}])` akan membuang salah satu objek, padahal keduanya memiliki alamat memori berbeda.
- **Mengubah Properti di Dalam Objek yang Tersimpan**: Memodifikasi properti objek di dalam Set tidak memicu evaluasi ulang keunikan.

### 🌟 Best Practice

- Selalu gunakan `Set` jika operasi utama adalah pengecekan keberadaan elemen (`has()`) pada koleksi data berukuran ratusan hingga ribuan item.
- Gunakan metode Set ES2024 (`union`, `intersection`, `difference`) untuk operasi logika data antar grup secara deklaratif.
- Manfaatkan `[...new Set(arr)]` untuk deduplikasi cepat data primitif.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `cariTagBersama(artikelA, artikelB)` yang menerima dua array tag dan mengembalikan array berisi tag yang ada pada kedua artikel menggunakan `Set.prototype.intersection()`.
2. Diberikan array objek karyawan `[{ id: 1, nama: 'Budi' }, { id: 2, nama: 'Andi' }, { id: 1, nama: 'Budi' }]`. Buat fungsi untuk mendeduplikasi array objek tersebut berdasarkan properti `id` uniknya.
3. Buat class `BlacklistManager` dengan method `blokir(ip)`, `bukaBlokir(ip)`, dan `apakahDiblokir(ip)` menggunakan struktur data `Set`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [10 - Map](../10-map/README.md)
- ➡️ **Selanjutnya:** [12 - Symbol](../12-symbol/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
