# 10 - Map (Key-Value Collection Modern, Perbedaan Mendalam dengan Object)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami struktur data `Map` sebagai koleksi pasangan kunci-nilai modern di ES6.
> * **Kapan Digunakan**: Menganalisis perbedaan fundamental dan keunggulan `Map` dibandingkan `Object` biasa.
> * **Aturan Praktis**: Gunakan `Map` jika kunci tidak diketahui hingga runtime atau bertipe non-string.

## 1. 🎯 Tujuan Belajar

- Memahami struktur data `Map` sebagai koleksi pasangan kunci-nilai modern di ES6.
- Menganalisis perbedaan fundamental dan keunggulan `Map` dibandingkan `Object` biasa.
- Menguasai method dan properti utama: `set()`, `get()`, `has()`, `delete()`, `clear()`, dan properti `size`.
- Mampu melakukan iterasi pasangan data pada Map menggunakan `forEach()` dan `for...of`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> `Object` biasa seperti lemari loker kayu tua di mana setiap kotak loker hanya bisa diberi label stiker kertas bertuliskan huruf (string). Sedangkan `Map` seperti loker pintar berteknologi sensor RFID: kuncinya tidak harus berupa teks, Anda bisa menggunakan kartu magnetik, sidik jari, atau token objek apa pun sebagai kuncinya.

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

### 3. Kunci Bertipe Objek: Value vs Reference (Kenapa Wajib Pakai Variabel?)

Di JavaScript, objek disimpan berdasarkan **alamat referensi memori** (*pass-by-reference*), bukan berdasarkan nilai teks isinya:
- Dua objek literal `{ role: "admin" } === { role: "admin" }` bernilai **`false`** karena JavaScript memesan dua alamat memori yang berbeda setiap kali tanda `{}` ditulis.
- **Jebakan Tanpa Variabel**:
  ```javascript
  const map = new Map();
  map.set({ role: 'admin' }, 'Akses Penuh');
  console.log(map.get({ role: 'admin' })); // undefined! ❌
  ```
  `map.get()` menghasilkan `undefined` karena objek yang dimasukkan saat `get` adalah objek baru dengan alamat memori yang berbeda.
- **Solusi Wajib**: Simpan objek ke dalam variabel terlebih dahulu agar referensi memorinya identik:
  ```javascript
  const kunciAdmin = { role: 'admin' }; // Alamat memori tunggal tersimpan di variabel
  map.set(kunciAdmin, 'Akses Penuh');
  console.log(map.get(kunciAdmin)); // "Akses Penuh" ✅
  ```
- **Primitif vs Objek**: Nilai primitif (Number, String, Boolean) dibandingkan berdasarkan **nilai murni** (*by value*), sehingga `map.get(101)` atau `map.get("sessionId")` langsung ditemukan tanpa harus menggunakan variabel.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Inisialisasi & Pengisian Map (.set) ---');
const sesiUser = new Map();

// Kunci pada Map bisa bertipe Number, String, maupun Objek Referensi!
const kunciAdmin = { role: 'admin' };

sesiUser.set(101, 'Joko Santoso');
sesiUser.set('sessionId', 'SESS-XYZ-999');
sesiUser.set(kunciAdmin, 'Akses Penuh Server');

console.log('Akses Key Number (101)      :', sesiUser.get(101));
console.log('Akses Key Objek (kunciAdmin):', sesiUser.get(kunciAdmin));
console.log('Cek Keberadaan Key sessionId:', sesiUser.has('sessionId'));
console.log('Total Pasangan Data (size)  :', sesiUser.size);

console.log('\n--- 2. Iterasi Pasangan Data Map dengan for...of ---');
for (const [kunci, nilai] of sesiUser) {
  console.log('Key :', kunci, '==> Value :', nilai);
}

console.log('\n--- 3. Menghapus Data (.delete) & Cek Ukuran Baru ---');
const statusHapus = sesiUser.delete('sessionId');
console.log('Apakah sessionId terhapus?  :', statusHapus);
console.log('Ukuran Map setelah dihapus  :', sesiUser.size);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Inisialisasi & Pengisian Map (.set) ---
Akses Key Number (101)      : Joko Santoso
Akses Key Objek (kunciAdmin): Akses Penuh Server
Cek Keberadaan Key sessionId: true
Total Pasangan Data (size)  : 3

--- 2. Iterasi Pasangan Data Map dengan for...of ---
Key : 101 ==> Value : Joko Santoso
Key : sessionId ==> Value : SESS-XYZ-999
Key : { role: 'admin' } ==> Value : Akses Penuh Server

--- 3. Menghapus Data (.delete) & Cek Ukuran Baru ---
Apakah sessionId terhapus?  : true
Ukuran Map setelah dihapus  : 2
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case

1. **Sistem Cache Memori (In-Memory Caching)**: Menyimpan hasil komputasi berat dengan objek parameter request sebagai kuncinya.
2. **Metadata Elemen DOM**: Memetakan elemen tombol HTML langsung sebagai kunci tanpa harus mengubah atau mencemari objek DOM itu sendiri.
3. **Frekuensi Penghitungan Kata**: Menghitung jumlah kemunculan kata atau ID pengguna dengan penambahan data berkecepatan tinggi.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengakses Map dengan bracket notation `map[key]`**: Menulis `map['nama'] = 'Joko'` tidak menyimpan data ke dalam struktur Map internal, melainkan menambahkan properti objek JS biasa. Properti `map.size` tidak akan bertambah! Selalu gunakan `map.set()` dan `map.get()`.
- **Perbandingan referensi pada kunci objek**: Menulis `map.set({ role: 'admin' }, 'data')` **tidak bisa diambil** dengan `map.get({ role: 'admin' })` dan akan mengembalikan `undefined`! Hal ini terjadi karena kedua tanda kurung kurawal `{}` tersebut memesan alamat memori yang berbeda. Kunci objek wajib disimpan ke dalam satu variabel referensi terlebih dahulu.
- **Serialisasi JSON langsung**: `JSON.stringify(map)` menghasilkan string kosong `{}` karena JSON tidak mendukung Map secara native. Konversi dulu ke objek via `Object.fromEntries(map)`.

### 🌟 Best Practice

- Gunakan `Map` jika kunci tidak diketahui hingga runtime atau bertipe non-string.
- Gunakan `Map` jika Anda membutuhkan frekuensi penambahan dan penghapusan key secara berkala demi performa memori yang optimal.
- Gunakan `Object` biasa jika Anda hanya memerlukan struktur data rekaman statis (_record_) yang telah ditentukan field-fieldnya sejak awal.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah class `CacheService` sederhana yang menggunakan `Map` di dalamnya, memiliki method `simpan(kunci, nilai)` dan `ambil(kunci)`.
2. Diberikan array string `['apel', 'jeruk', 'apel', 'mangga', 'jeruk', 'apel']`. Gunakan `Map` untuk menghitung frekuensi kemunculan setiap buah.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09 - Boolean](../09-boolean/README.md)
- ➡️ **Selanjutnya:** [11 - Set](../11-set/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
