# 10 - Map (Key-Value Collection Modern, Perbedaan Mendalam dengan Object)

## 1. 🎯 Tujuan Belajar

- Memahami struktur data `Map` sebagai koleksi pasangan kunci-nilai modern di ES6.\n- Menganalisis perbedaan fundamental dan keunggulan `Map` dibandingkan `Object` biasa.\n- Menguasai method dan properti utama: `set()`, `get()`, `has()`, `delete()`, `clear()`, dan properti `size`.\n- Mampu melakukan iterasi pasangan data pada Map menggunakan `forEach()` dan `for...of`.

---

## 2. 📖 Penjelasan Konsep

Sebelum ES6, developer JavaScript terpaksa menggunakan objek biasa `{}` sebagai struktur data kamus (_dictionary / hash map_). Namun, objek memiliki banyak kelemahan untuk fungsi ini. ES6 memperkenalkan **`Map`**, struktur data yang dirancang khusus untuk memetakan pasangan kunci (_key_) dan nilai (_value_).

### 1. Perbandingan Utama: `Map` vs `Object`

| Fitur                        | `Map`                                                                         | `Object`                                             |
| :--------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Tipe Kunci (Key)**         | **Bebas**: Boleh tipe data apa pun (Objek, Fungsi, Number, Boolean, Primitif) | Terbatas hanya bertipe **String** atau **Symbol**    |
| **Urutan Elemen**            | Dijamin terurut sesuai **urutan penyisipan** (_insertion order_)              | Tidak terjamin sepenuhnya terurut secara pasti       |
| **Mengetahui Ukuran**        | Sangat mudah via properti bawaan **`map.size`**                               | Manual: `Object.keys(obj).length` ($O(n)$)           |
| **Kunci Bawaan (Prototype)** | Bersih, tidak ada kunci warisan _prototype_ bawaan                            | Memiliki default prototype (`toString`, `valueOf`)   |
| **Performa Tambah/Hapus**    | Sangat teroptimasi untuk penambahan dan penghapusan data masif                | Kurang optimal untuk penambahan/penghapusan intensif |
| **Kemudahan Iterasi**        | Bersifat **Iterable** langsung (`for...of`, `forEach`)                        | Harus diekstrak dulu via `Object.entries()`          |

### 2. Method & Properti Utama `Map`

- **`new Map([iterable])`**: Membuat instance Map baru (bisa diinisialisasi dengan array pasangan `[[key, val]]`).
- **`map.set(key, value)`**: Menyimpan atau memperbarui data. Method ini mengembalikan objek Map itu sendiri sehingga mendukung pemanggilan berantai (_method chaining_).
- **`map.get(key)`**: Mengambil nilai berdasarkan key (mengembalikan `undefined` jika tidak ada).
- **`map.has(key)`**: Mengembalikan boolean `true` jika key ada di dalam Map.
- **`map.delete(key)`**: Menghapus data spesifik berdasarkan key (mengembalikan `true` jika berhasil).
- **`map.clear()`**: Mengosongkan seluruh isi Map.
- **`map.size`**: Properti untuk mengetahui jumlah pasangan data saat ini.
- **`map.keys()`**: Mengembalikan iterator seluruh kunci (_keys_).
- **`map.values()`**: Mengembalikan iterator seluruh nilai (_values_).
- **`map.entries()`**: Mengembalikan iterator pasangan `[key, value]`.
- **`map.forEach((value, key, map) => ...)`**: Melakukan iterasi callback pada setiap elemen (perhatikan: parameter `value` berada di urutan pertama sebelum `key`!).

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Membuat dan Mengisi Map ---');
const mapPengguna = new Map();

// Map mengizinkan tipe data apa pun sebagai Key!
const kunciObjek = { role: 'admin' };
const kunciFungsi = function () {};

mapPengguna.set('joko', 'Joko Santoso');
mapPengguna.set(101, 'ID Numerik 101');
mapPengguna.set(kunciObjek, 'Akses Spesial Administrator');
mapPengguna.set(kunciFungsi, 'Handler Khusus');

console.log('Ukuran Map saat ini (size)  :', mapPengguna.size);
console.log("Akses key string ('joko')   :", mapPengguna.get('joko'));
console.log('Akses key number (101)      :', mapPengguna.get(101));
console.log('Akses key objek referensi   :', mapPengguna.get(kunciObjek));

console.log('\n--- 2. Pengecekan dan Penghapusan Data ---');
console.log("Apakah ada key 'joko'?      :", mapPengguna.has('joko')); // true
console.log("Apakah ada key 'budi'?      :", mapPengguna.has('budi')); // false

mapPengguna.delete(101); // Hapus data key 101
console.log('Ukuran setelah delete(101)  :', mapPengguna.size);

console.log('\n--- 3. Iterasi Map dengan for...of dan forEach ---');
const daftarHarga = new Map([
  ['Laptop', 15000000],
  ['Mouse', 250000],
  ['Keyboard', 800000],
]);

// Iterasi dengan destructuring pasangan [kunci, nilai]
for (const [produk, harga] of daftarHarga) {
  console.log(`- ${produk.padEnd(10)}: Rp ${harga.toLocaleString('id-ID')}`);
}

console.log('\nIterasi dengan forEach:');
daftarHarga.forEach((harga, produk) => {
  console.log(`Produk: ${produk} | Harga: ${harga}`);
});
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Membuat dan Mengisi Map ---
Ukuran Map saat ini (size)  : 4
Akses key string ('joko')   : Joko Santoso
Akses key number (101)      : ID Numerik 101
Akses key objek referensi   : Akses Spesial Administrator

--- 2. Pengecekan dan Penghapusan Data ---
Apakah ada key 'joko'?      : true
Apakah ada key 'budi'?      : false
Ukuran setelah delete(101)  : 3

--- 3. Iterasi Map dengan for...of dan forEach ---
- Laptop    : Rp 15.000.000
- Mouse     : Rp 250.000
- Keyboard  : Rp 800.000

Iterasi dengan forEach:
Produk: Laptop | Harga: 15000000
Produk: Mouse | Harga: 250000
Produk: Keyboard | Harga: 800000
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Object` biasa seperti lemari loker kayu tua di mana setiap kotak loker hanya bisa diberi label stiker kertas bertuliskan huruf (string). Sedangkan `Map` seperti loker pintar berteknologi sensor RFID: kuncinya tidak harus berupa teks, Anda bisa menggunakan kartu magnetik, sidik jari, atau token objek apa pun sebagai kuncinya.

### 🏢 Real-World Use Case

1. **Sistem Cache Memori (In-Memory Caching)**: Menyimpan hasil komputasi berat dengan objek parameter request sebagai kuncinya.\n2. **Metadata Elemen DOM**: Memetakan elemen tombol HTML langsung sebagai kunci tanpa harus mengubah atau mencemari objek DOM itu sendiri.\n3. **Frekuensi Penghitungan Kata**: Menghitung jumlah kemunculan kata atau ID pengguna dengan penambahan data berkecepatan tinggi.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengakses Map dengan bracket notation `map[key]`**: Menulis `map['nama'] = 'Joko'` tidak menyimpan data ke dalam struktur Map internal, melainkan menambahkan properti objek JS biasa. Properti `map.size` tidak akan bertambah! Selalu gunakan `map.set()` dan `map.get()`.\n* **Perbandingan referensi pada kunci objek**: `map.set({}, 'data')` tidak bisa diambil dengan `map.get({})` karena kedua objek literal tersebut memiliki alamat memori referensi yang berbeda.\n* **Serialisasi JSON langsung**: `JSON.stringify(map)` menghasilkan string kosong `{}` karena JSON tidak mendukung Map secara native. Konversi dulu ke objek via `Object.fromEntries(map)`.

### 🌟 Best Practice

- Gunakan `Map` jika kunci tidak diketahui hingga runtime atau bertipe non-string.\n* Gunakan `Map` jika Anda membutuhkan frekuensi penambahan dan penghapusan key secara berkala demi performa memori yang optimal.\n* Gunakan `Object` biasa jika Anda hanya memerlukan struktur data rekaman statis (_record_) yang telah ditentukan field-fieldnya sejak awal.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah class `CacheService` sederhana yang menggunakan `Map` di dalamnya, memiliki method `simpan(kunci, nilai)` dan `ambil(kunci)`.\n2. Diberikan array string `['apel', 'jeruk', 'apel', 'mangga', 'jeruk', 'apel']`. Gunakan `Map` untuk menghitung frekuensi kemunculan setiap buah.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09 - Boolean](../09-boolean/README.md)\n- ➡️ **Selanjutnya:** [11 - Set](../11-set/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
