# 11 - Set (Koleksi Nilai Unik dan Eliminasi Duplikasi)

## 1. 🎯 Tujuan Belajar

- Memahami struktur data `Set` sebagai himpunan nilai unik tanpa duplikasi.\n- Membedakan cara kerja dan karakteristik `Set` dibandingkan dengan `Array`.\n- Menguasai method dan properti utama: `add()`, `has()`, `delete()`, `clear()`, dan `size`.\n- Mampu melakukan eliminasi duplikasi data array secara instan menggunakan kombinasi `Set` dan _Spread Operator_.

---

## 2. 📖 Penjelasan Konsep

**`Set`** adalah struktur data bawaan ES6 yang merepresentasikan himpunan kumpulan nilai di mana **setiap nilai di dalamnya harus bersifat unik**. Jika Anda mencoba memasukkan nilai yang sudah ada di dalam Set, nilai duplikat tersebut akan diabaikan secara otomatis.

### 1. Karakteristik Utama `Set`

- **Tidak Ada Duplikasi**: Nilai yang sama tidak akan pernah tersimpan lebih dari satu kali.
- **Mendukung Segala Tipe Data**: Nilai di dalam Set bisa berupa primitif (string, number, boolean) maupun referensi objek.
- **Pencarian Cepat ($O(1)$)**: Method `set.has(value)` mengecek keberadaan data secara instan menggunakan hash table ($O(1)$), jauh lebih cepat daripada pencarian array `arr.includes(value)` yang harus memindai dari depan ($O(n)$).
- **Bukan Berbasis Indeks**: Elemen di dalam Set tidak memiliki nomor urut indeks `set[0]`. Nilai diakses melalui iterasi atau pengecekan `has()`.

### 2. Method & Properti Utama `Set`

- **`new Set([iterable])`**: Membuat instance Set baru. Sangat sering diisi dengan array untuk membuang duplikat.
- **`set.add(value)`**: Menambahkan nilai baru. Mengembalikan objek Set itu sendiri (mendukung chaining).
- **`set.has(value)`**: Mengembalikan boolean `true` jika nilai ada di dalam Set.
- **`set.delete(value)`**: Menghapus nilai tertentu dari himpunan (mengembalikan `true` jika berhasil).
- **`set.clear()`**: Mengosongkan seluruh himpunan Set.
- **`set.size`**: Mengetahui jumlah total elemen unik yang tersimpan.
- **`set.forEach((value, valueAgain, set) => ...)`**: Melakukan iterasi untuk setiap elemen di dalam Set.
- **`set.values()` / `set.keys()`**: Mengembalikan iterator nilai di dalam Set.
- **Set Methods Modern (ES2024)**:
  - `setA.union(setB)`: Menggabungkan seluruh elemen unik dari kedua set.
  - `setA.intersection(setB)`: Mengambil elemen yang ada di kedua set (_irisan_).
  - `setA.difference(setB)`: Mengambil elemen di set A yang tidak ada di set B.
  - `setA.isSubsetOf(setB)`: Mengecek apakah seluruh elemen set A adalah bagian dari set B.

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Dasar Pembuatan dan Manipulasi Set ---');
const setAngka = new Set();

setAngka.add(10);
setAngka.add(20);
setAngka.add(30);
setAngka.add(10); // Duplikat: otomatis diabaikan!
setAngka.add(20); // Duplikat: otomatis diabaikan!

console.log('Isi Set unik                 :', setAngka);
console.log('Jumlah elemen unik (size)    :', setAngka.size); // 3

console.log('\n--- 2. Pengecekan Cepat (has) & Penghapusan (delete) ---');
console.log('Apakah angka 20 ada di Set?  :', setAngka.has(20)); // true
console.log('Apakah angka 99 ada di Set?  :', setAngka.has(99)); // false

setAngka.delete(20); // Hapus angka 20
console.log('Setelah angka 20 dihapus     :', setAngka);

console.log('\n--- 3. Trik Industri: Eliminasi Duplikasi Array Instan ---');
const daftarEmailDuplikat = [
  'joko@example.com',
  'budi@example.com',
  'joko@example.com',
  'siti@example.com',
  'budi@example.com',
];

// Ubah Array -> Set (duplikat hilang) -> Spread kembali ke Array
const emailUnik = [...new Set(daftarEmailDuplikat)];
console.log('Array asli duplikat (5 data) :', daftarEmailDuplikat.length);
console.log('Array bersih unik            :', emailUnik);

console.log('\n--- 4. Iterasi Elemen Set ---');
const setKategori = new Set(['Elektronik', 'Pakaian', 'Buku']);
for (const kategori of setKategori) {
  console.log('- Kategori Produk:', kategori);
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Dasar Pembuatan dan Manipulasi Set ---
Isi Set unik                 : Set(3) { 10, 20, 30 }
Jumlah elemen unik (size)    : 3

--- 2. Pengecekan Cepat (has) & Penghapusan (delete) ---
Apakah ada angka 20 di Set?  : true
Apakah ada angka 99 di Set?  : false
Setelah angka 20 dihapus     : Set(2) { 10, 30 }

--- 3. Trik Industri: Eliminasi Duplikasi Array Instan ---
Array asli duplikat (5 data) : 5
Array bersih unik            : [ 'joko@example.com', 'budi@example.com', 'siti@example.com' ]

--- 4. Iterasi Elemen Set ---
- Kategori Produk: Elektronik
- Kategori Produk: Pakaian
- Kategori Produk: Buku
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Set` seperti **daftar tamu undangan VIP pesta eksklusif**: nama setiap tamu hanya boleh tercatat satu kali di buku tamu. Jika seorang tamu mencoba mendaftar untuk kedua kalinya, panitia akan melihat namanya sudah ada dan menolak pencatatan ganda.

### 🏢 Real-World Use Case

1. **Deduplikasi Data (Unique Filtering)**: Membersihkan array ID transaksi, tag artikel, atau nomor telepon pengguna yang duplikat dengan `[...new Set(array)]`.\n2. **Pengecekan Izin Akses Pengguna (Permissions Check)**: Menyimpan daftar _role permissions_ (`'READ'`, `'WRITE'`, `'DELETE'`) di dalam Set agar pengecekan hak akses `permissions.has('WRITE')` berjalan secepat kilat ($O(1)$).\n3. **Pencatatan Online Users**: Menyimpan daftar ID user yang sedang aktif di chatroom tanpa takut terjadi pencatatan dobel.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira objek berbeda isi dianggap sama**: `new Set([{}, {}])` memiliki ukuran `2`, karena dua objek literal tersebut berada di alamat memori yang berbeda. Set menggunakan algoritma _SameValueZero_.\n* **Tidak bisa mengambil data via index**: Menulis `mySet[0]` akan menghasilkan `undefined`. Anda harus menggunakan `for...of` atau mengonversinya menjadi array `[...mySet][0]`.\n* **Menghindari `NaN` duplikat**: Berbeda dengan operator `===` di mana `NaN !== NaN`, Set menganggap seluruh nilai `NaN` adalah identik dan tidak akan menduplikasikannya.

### 🌟 Best Practice

- Gunakan kombinasi `[...new Set(arr)]` sebagai cara tercepat dan paling elegan untuk membuang elemen duplikat primitif di JavaScript.\n* Gunakan `Set` alih-alih `Array` jika skenario aplikasi Anda sering melakukan operasi pengecekan keberadaan item (`has()`) pada ribuan data.\n* Gunakan method bawaan Set ES2024 jika tersedia di runtime Anda (seperti `union()`, `intersection()`, `difference()`).

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `gabungTagUnik(tagLama, tagBaru)` yang menerima dua array string dan mengembalikan satu array baru yang berisi gabungan seluruh tag tanpa ada duplikasi.\n2. Buat class `TagManager` dengan method `tambahTag(tag)` dan `cekTag(tag)` yang memanfaatkan struktur data `Set`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [10 - Map](../10-map/README.md)\n- ➡️ **Selanjutnya:** [12 - Symbol](../12-symbol/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
