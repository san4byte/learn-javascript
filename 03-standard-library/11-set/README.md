# 11 - Set (Koleksi Nilai Unik dan Eliminasi Duplikasi)

## 1. 🎯 Tujuan Belajar

- Memahami struktur data `Set` sebagai himpunan nilai unik tanpa duplikasi.
- Membedakan cara kerja dan karakteristik `Set` dibandingkan dengan `Array`.
- Menguasai method dan properti utama: `add()`, `has()`, `delete()`, `clear()`, dan `size`.
- Mampu melakukan eliminasi duplikasi data array secara instan menggunakan kombinasi `Set` dan _Spread Operator_.

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

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Dasar Pembuatan Set & Penolakan Duplikasi ---");
const daftarTag = new Set();

// Mendukung Method Chaining (.add().add())
daftarTag.add("js").add("ts").add("go");

// Coba tambahkan duplikat 'js' dan nilai angka 1
daftarTag.add("js").add(1);

console.log("Isi Set saat ini             :", daftarTag);
console.log("Jumlah elemen unik (size)    :", daftarTag.size); // 4 ('js' duplikat diabaikan)

console.log("\n--- 2. Pengecekan Cepat (has) & Penghapusan (delete) ---");
console.log("Apakah ada tag 'ts'?         :", daftarTag.has("ts")); // true
console.log("Apakah ada tag 'py'?         :", daftarTag.has("py")); // false

daftarTag.delete("js");
console.log("Setelah tag 'js' dihapus     :", daftarTag);
console.log("Ukuran Set setelah dihapus   :", daftarTag.size); // 3

console.log("\n--- 3. Trik Industri: Deduplikasi Array Instan ---");
const kategoriMentah = ["frontend", "backend", "frontend", "devops", "backend", "ui-ux"];
console.log("Array Mentah (6 data)        :", kategoriMentah);

// Mengubah Array -> Set (duplikat lenyap) -> Spread (...) kembali menjadi Array
const kategoriUnik = [...new Set(kategoriMentah)];
console.log("Array Bersih (Bebas Duplikat):", kategoriUnik);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Dasar Pembuatan Set & Penolakan Duplikasi ---
Isi Set saat ini             : Set(4) { 'js', 'ts', 'go', 1 }
Jumlah elemen unik (size)    : 4

--- 2. Pengecekan Cepat (has) & Penghapusan (delete) ---
Apakah ada tag 'ts'?         : true
Apakah ada tag 'py'?         : false
Setelah tag 'js' dihapus     : Set(3) { 'ts', 'go', 1 }
Ukuran Set setelah dihapus   : 3

--- 3. Trik Industri: Deduplikasi Array Instan ---
Array Mentah (6 data)        : [ 'frontend', 'backend', 'frontend', 'devops', 'backend', 'ui-ux' ]
Array Bersih (Bebas Duplikat): [ 'frontend', 'backend', 'devops', 'ui-ux' ]
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Set` seperti **daftar tamu undangan VIP pesta eksklusif**: nama setiap tamu hanya boleh tercatat satu kali di buku tamu. Jika seorang tamu mencoba mendaftar untuk kedua kalinya, panitia akan melihat namanya sudah ada dan menolak pencatatan ganda.

### 🏢 Real-World Use Case

1. **Deduplikasi Data (Unique Filtering)**: Membersihkan array ID transaksi, tag artikel, atau nomor telepon pengguna yang duplikat dengan `[...new Set(array)]`.
2. **Pengecekan Izin Akses Pengguna (Permissions Check)**: Menyimpan daftar _role permissions_ (`'READ'`, `'WRITE'`, `'DELETE'`) di dalam Set agar pengecekan hak akses `permissions.has('WRITE')` berjalan secepat kilat ($O(1)$).
3. **Pencatatan Online Users**: Menyimpan daftar ID user yang sedang aktif di chatroom tanpa takut terjadi pencatatan dobel.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira objek berbeda isi dianggap sama**: `new Set([{}, {}])` memiliki ukuran `2`, karena dua objek literal tersebut berada di alamat memori yang berbeda. Set menggunakan algoritma _SameValueZero_.
- **Tidak bisa mengambil data via index**: Menulis `mySet[0]` akan menghasilkan `undefined`. Anda harus menggunakan `for...of` atau mengonversinya menjadi array `[...mySet][0]`.
- **Menghindari `NaN` duplikat**: Berbeda dengan operator `===` di mana `NaN !== NaN`, Set menganggap seluruh nilai `NaN` adalah identik dan tidak akan menduplikasikannya.

### 🌟 Best Practice

- Gunakan kombinasi `[...new Set(arr)]` sebagai cara tercepat dan paling elegan untuk membuang elemen duplikat primitif di JavaScript.
- Gunakan `Set` alih-alih `Array` jika skenario aplikasi Anda sering melakukan operasi pengecekan keberadaan item (`has()`) pada ribuan data.
- Gunakan method bawaan Set ES2024 jika tersedia di runtime Anda (seperti `union()`, `intersection()`, `difference()`).

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `gabungTagUnik(tagLama, tagBaru)` yang menerima dua array string dan mengembalikan satu array baru yang berisi gabungan seluruh tag tanpa ada duplikasi.
2. Buat class `TagManager` dengan method `tambahTag(tag)` dan `cekTag(tag)` yang memanfaatkan struktur data `Set`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [10 - Map](../10-map/README.md)
- ➡️ **Selanjutnya:** [12 - Symbol](../12-symbol/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
