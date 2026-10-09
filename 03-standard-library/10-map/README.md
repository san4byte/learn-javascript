# 10 - Map (Key-Value Collection Modern, Perbedaan Mendalam dengan Object)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Koleksi pasangan kunci-nilai (_key-value_) berurutan di mana kunci dapat bertipe data apa pun (termasuk Objek dan Fungsi).
> - **Kapan Digunakan**: Saat butuh struktur kamus (_dictionary/hash map_), kunci dinamis yang sering ditambah/dihapus pada saat _runtime_, atau kunci bertipe non-string.
> - **Aturan Praktis**: Hindari notasi kurung siku `map[key]`, selalu gunakan API resmi (`.set()`, `.get()`, `.has()`, dll).

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar dan perbedaan fundamental antara `Map` dan `Object`.
- Menguasai seluruh method & properti `Map` beserta berbagai kemungkinan kondisi (_edge cases_) yang dapat terjadi.
- Mampu memilih pola iterasi yang tepat (`.keys()`, `.values()`, `.entries()`, `forEach`, `for...of`).
- Mengetahui cara konversi data antara Map, Array, dan Object.
- Memahami perbandingan referensi memori kunci bertipe Objek.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Object` biasa seperti lemari loker kayu tua di mana setiap kotak loker hanya bisa diberi label stiker kertas bertuliskan huruf (string). Sedangkan `Map` seperti loker pintar berteknologi sensor RFID: kuncinya tidak harus berupa teks, Anda bisa menggunakan kartu magnetik, sidik jari, atau token objek apa pun sebagai kuncinya.

---

### 1. Perbandingan Utama: `Map` vs `Object`

| Fitur                        | `Map`                                                            | `Object`                                                |
| :--------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------ |
| **Tipe Kunci (Key)**         | **Bebas**: Primitif, Objek, Fungsi, `NaN`, Symbol                | Terbatas hanya bertipe **String** atau **Symbol**       |
| **Urutan Elemen**            | Dijamin terurut sesuai **urutan penyisipan** (_insertion order_) | Tidak terjamin sepenuhnya terurut secara pasti          |
| **Mengetahui Ukuran**        | Instan $O(1)$ via properti bawaan **`map.size`**                 | Manual: `Object.keys(obj).length` ($O(n)$)              |
| **Kunci Bawaan (Prototype)** | Bersih, tidak ada warisan _prototype_ bawaan                     | Memiliki default prototype (`toString`, `valueOf`, dll) |
| **Performa Tambah/Hapus**    | Sangat teroptimasi untuk penambahan dan penghapusan massal       | Kurang optimal untuk penambahan/penghapusan intensif    |
| **Kemudahan Iterasi**        | Bersifat **Iterable** langsung (`for...of`, `forEach`)           | Harus diekstrak dulu via `Object.entries()`             |

---

### 2. Tabel Ringkasan Method & Properti (Cheat-Sheet)

| Method / Properti           | Parameter               | Nilai Kembalian (Return) | Deskripsi Singkat                                                  |
| :-------------------------- | :---------------------- | :----------------------- | :----------------------------------------------------------------- |
| **`new Map([iterable])`**   | `iterable` _(opsional)_ | `Map`                    | Membuat instance baru (bisa diinisialisasi dengan array pasangan). |
| **`map.set(key, value)`**   | `key`, `value`          | `Map` _(this)_           | Menambah atau memperbarui data (mendukung _chaining_).             |
| **`map.get(key)`**          | `key`                   | `value` \| `undefined`   | Mengambil nilai berdasarkan kunci.                                 |
| **`map.has(key)`**          | `key`                   | `boolean`                | Memeriksa keberadaan suatu kunci.                                  |
| **`map.delete(key)`**       | `key`                   | `boolean`                | Menghapus elemen berdasarkan kunci (`true` jika ada & terhapus).   |
| **`map.clear()`**           | `-`                     | `undefined`              | Mengosongkan seluruh isi Map.                                      |
| **`map.size`**              | _(getter)_              | `number`                 | Properti _read-only_ jumlah pasangan data saat ini.                |
| **`map.keys()`**            | `-`                     | `MapIterator`            | Iterator berisi semua kunci.                                       |
| **`map.values()`**          | `-`                     | `MapIterator`            | Iterator berisi semua nilai.                                       |
| **`map.entries()`**         | `-`                     | `MapIterator`            | Iterator berisi pasangan `[key, value]`.                           |
| **`map.forEach(callback)`** | `(val, key, map)`       | `undefined`              | Menjalankan fungsi callback untuk setiap elemen.                   |

---

### 3. Eksplorasi Mendalam Setiap Method & Kemungkinan Kasus

Berikut adalah rincian lengkap setiap fitur `Map` beserta skenario dan kemungkinan kasus (_edge cases_) yang dapat terjadi:

---

#### 1. Inisialisasi: `new Map([iterable])`

Membuat instance Map baru.

- **Kasus A: Inisialisasi Kosong**

  ```javascript
  const map = new Map();
  console.log(map.size); // 0
  ```

- **Kasus B: Inisialisasi dari Array 2D (Pasangan Kunci-Nilai)**

  ```javascript
  const produk = new Map([
    ["SKU-1", "Laptop"],
    ["SKU-2", "Mouse"],
  ]);
  ```

- **Kasus C: Duplikasi Kunci pada Inisialisasi Awal**
  Jika array awal memiliki kunci yang sama, **nilai terakhir yang akan menang** (menimpa nilai sebelumnya):

  ```javascript
  const duplikat = new Map([
    ["status", "pending"],
    ["status", "sukses"], // Nilai ini yang tersimpan
  ]);
  console.log(duplikat.get("status")); // "sukses"
  ```

- **Kasus D: Kloning Map (Shallow Copy)**
  Membuat salinan Map baru yang independen:

  ```javascript
  const mapAsli = new Map([["a", 1]]);
  const mapSalinan = new Map(mapAsli);
  mapSalinan.set("a", 99);

  console.log(mapAsli.get("a")); // 1 (tidak terpengaruh)
  console.log(mapSalinan.get("a")); // 99
  ```

---

#### 2. Menambah & Mengubah Data: `map.set(key, value)`

Menyimpan pasangan baru atau memperbarui nilai lama jika kunci sudah ada.

- **Kasus A: Menambah dan Mengupdate (_Overwrite_)**
  Jika kunci belum ada, data ditambahkan. Jika sudah ada, nilainya diperbarui:

  ```javascript
  const skor = new Map();
  skor.set("player1", 10);
  skor.set("player1", 25); // Mengupdate nilai 10 menjadi 25
  console.log(skor.get("player1")); // 25
  ```

- **Kasus B: Pemanggilan Berantai (_Method Chaining_)**
  Karena `.set()` mengembalikan objek Map itu sendiri (`this`), pemanggilan dapat dirangkai:

  ```javascript
  const user = new Map();
  user.set("id", 1).set("nama", "Joko").set("aktif", true);
  ```

- **Kasus C: Menggunakan Berbagai Tipe Kunci**
  Kunci tidak dibatasi string:

  ```javascript
  const peta = new Map();
  const objKey = { role: "admin" };
  const fnKey = () => {};

  peta.set(100, "Tipe Number");
  peta.set(true, "Tipe Boolean");
  peta.set(objKey, "Tipe Object Referensi");
  peta.set(fnKey, "Tipe Function");
  peta.set(null, "Tipe Null");
  peta.set(undefined, "Tipe Undefined");
  ```

- **Kasus D: Perilaku Khusus `NaN` dan `+0` / `-0`**
  Map menggunakan algoritma kesamaan _SameValueZero_:
  - `NaN` dianggap **sama** dengan `NaN` (berbeda dengan perbandingan normal `NaN === NaN` yang bernilai `false`).
  - `+0` dan `-0` dianggap sebagai kunci yang **sama**.

  ```javascript
  const edgeMap = new Map();
  edgeMap.set(NaN, "Nilai NaN");
  console.log(edgeMap.get(NaN)); // "Nilai NaN" ✅

  edgeMap.set(+0, "Nol Positif");
  edgeMap.set(-0, "Nol Negatif"); // Menimpa kunci +0
  console.log(edgeMap.get(0)); // "Nol Negatif"
  console.log(edgeMap.size); // 2 (hanya ada NaN dan 0)
  ```

---

#### 3. Membaca Nilai: `map.get(key)`

Mengambil nilai yang tersimpan untuk kunci tertentu.

- **Kasus A: Kunci Ditemukan vs Tidak Ditemukan**

  ```javascript
  const map = new Map([["nama", "Andi"]]);
  console.log(map.get("nama")); // "Andi"
  console.log(map.get("umur")); // undefined (kunci tidak terdaftar)
  ```

- **Kasus B: Jebakan Nilai `undefined` (Kunci Ada vs Kunci Tidak Ada)**
  Jika Anda menyimpan nilai `undefined` secara sengaja, `.get()` akan menghasilkan `undefined`. Anda tidak bisa membedakan apakah kuncinya memang tidak ada atau bernilai `undefined` hanya dengan `.get()`. Gunakan `.has()` untuk memastikannya:

  ```javascript
  const map = new Map();
  map.set("dataKosong", undefined);

  console.log(map.get("dataKosong")); // undefined
  console.log(map.get("kunciGhaib")); // undefined

  // Cara yang benar untuk membedakan:
  console.log(map.has("dataKosong")); // true (kuncinya ada!)
  console.log(map.has("kunciGhaib")); // false (kuncinya memang tidak ada)
  ```

- **Kasus C: Akses Menggunakan Kunci Objek Literal (Jebakan Referensi)**
  Objek dievaluasi berdasarkan referensi memorinya:

  ```javascript
  const map = new Map();
  map.set({ id: 1 }, "Data User");

  console.log(map.get({ id: 1 })); // undefined! ❌ (karena memori objek berbeda)

  // Solusi: Simpan referensi ke variabel
  const userKey = { id: 1 };
  map.set(userKey, "Data User");
  console.log(map.get(userKey)); // "Data User" ✅
  ```

---

#### 4. Memeriksa Keberadaan Kunci: `map.has(key)`

Mengembalikan `true` jika kunci terdaftar di dalam Map, atau `false` jika tidak.

- **Kasus A: Pemeriksaan Cepat**

  ```javascript
  const izin = new Map([
    ["read", true],
    ["write", false],
  ]);
  console.log(izin.has("read")); // true
  console.log(izin.has("delete")); // false
  ```

- **Kasus B: Kebal terhadap Prototype Inheritance**
  Pada objek biasa `{}`, pengecekan `'toString' in obj` bernilai `true` karena warisan prototype. Pada `Map`, hanya kunci milik Map itu sendiri yang diperiksa:
  ```javascript
  const map = new Map();
  console.log(map.has("toString")); // false ✅ (bersih dari prototype)
  ```

---

#### 5. Menghapus Elemen: `map.delete(key)`

Menghapus pasangan kunci-nilai tertentu.

- **Kasus A: Nilai Kembalian (_Return Value_)**
  - Mengembalikan **`true`** jika elemen ditemukan dan berhasil dihapus.
  - Mengembalikan **`false`** jika kunci memang tidak ada (tidak memicu _error_ / tidak melempar eksepsi).

  ```javascript
  const token = new Map([["auth", "xyz123"]]);

  console.log(token.delete("auth")); // true (berhasil dihapus)
  console.log(token.delete("nonExist")); // false (tidak ada aksi)
  console.log(token.has("auth")); // false
  ```

---

#### 6. Mengosongkan Map: `map.clear()`

Menghapus semua pasangan data di dalam Map sekaligus.

- **Karakteristik**:
  - Mengembalikan nilai `undefined`.
  - Mengubah properti `.size` menjadi `0`.
  - Membantu pembersihan memori (_Garbage Collection_) karena seluruh referensi di dalamnya dilepas.

  ```javascript
  const antrean = new Map([
    ["A1", "User 1"],
    ["A2", "User 2"],
  ]);
  antrean.clear();

  console.log(antrean.size); // 0
  console.log(antrean.has("A1")); // false
  ```

---

#### 7. Properti Ukuran: `map.size`

Mengembalikan jumlah pasangan data saat ini.

- **Kasus A: Bersifat _Read-Only_ (Getter)**
  Tidak bisa dimanipulasi secara manual seperti `Array.prototype.length`:

  ```javascript
  const map = new Map([["a", 1]]);
  map.size = 10; // Tidak akan berpengaruh (diabaikan atau error pada strict mode)
  console.log(map.size); // 1
  ```

- **Kasus B: Jebakan Bracket Notation `map[key]`**
  Jika Anda salah menulis kode dengan kurung siku, Anda menambahkan properti ke objek JavaScript pembungkusnya, bukan ke dalam struktur data Map internal:

  ```javascript
  const salah = new Map();
  salah["nama"] = "Budi"; // ❌ SALAH! Ini menambahkan properti objek biasa

  console.log(salah.size); // 0 (tidak terhitung di Map!)
  console.log(salah.get("nama")); // undefined
  console.log(salah["nama"]); // "Budi" (berada di luar struktur Map)
  ```

---

#### 8. Iterasi Kunci: `map.keys()`

Mengembalikan objek iterator yang berisi seluruh kunci sesuai urutan penyisipan (_insertion order_).

- **Cara Konsumsi**:

  ```javascript
  const kurs = new Map([
    ["USD", 16000],
    ["EUR", 17500],
  ]);

  // 1. Menggunakan for...of
  for (const mataUang of kurs.keys()) {
    console.log(mataUang); // "USD", lalu "EUR"
  }

  // 2. Mengubah menjadi Array murni
  const daftarKunci = Array.from(kurs.keys()); // atau [...kurs.keys()]
  console.log(daftarKunci); // ['USD', 'EUR']

  // 3. Mengambil elemen pertama via manual next()
  const keyPertama = kurs.keys().next().value;
  console.log(keyPertama); // "USD"
  ```

---

#### 9. Iterasi Nilai: `map.values()`

Mengembalikan objek iterator yang berisi seluruh nilai sesuai urutan penyisipan.

- **Cara Konsumsi**:

  ```javascript
  const gaji = new Map([
    ["staff", 5000000],
    ["manager", 12000000],
  ]);

  // Menghitung total nilai secara fungsional
  const total = [...gaji.values()].reduce((acc, curr) => acc + curr, 0);
  console.log(total); // 17000000
  ```

---

#### 10. Iterasi Pasangan: `map.entries()`

Mengembalikan objek iterator berupa array pasangan `[key, value]`.

- **Karakteristik & Hubungan dengan `for...of`**:
  Method ini adalah iterator _default_ dari Map. Artinya `map.entries()` menghasilkan data yang sama persis dengan perulangan langsung pada `map`:

  ```javascript
  const roles = new Map([
    [1, "User"],
    [2, "Admin"],
  ]);

  // Cara A: Menggunakan .entries() eksplisit
  for (const [id, namaRole] of roles.entries()) {
    console.log(id, namaRole);
  }

  // Cara B: Langsung pada objek Map (ekivalen)
  for (const [id, namaRole] of roles) {
    console.log(id, namaRole);
  }
  ```

---

#### 11. Perulangan Callback: `map.forEach(callback[, thisArg])`

Mengeksekusi fungsi callback untuk setiap elemen pasangan di dalam Map.

- **Kasus A: Urutan Parameter Callback `(value, key, map)`**

  > ⚠️ **PENTING**: Urutan parameter adalah **`value` terlebih dahulu**, baru disusul oleh **`key`**! Hal ini dirancang agar konsisten dengan `Array.prototype.forEach((item, index) => ...)`.

  ```javascript
  const stok = new Map([
    ["apel", 10],
    ["jeruk", 5],
  ]);

  stok.forEach((jumlah, namaBuah) => {
    console.log(`${namaBuah} tersisa ${jumlah} buah`);
  });
  ```

- **Kasus B: Kontrol Alur (Tidak Bisa `break` atau `continue`)**
  Di dalam `forEach`, kata kunci `break` atau `continue` akan menghasilkan _Syntax Error_. Kata kunci `return` hanya menghentikan iterasi callback elemen saat ini (mirip `continue`):
  ```javascript
  // Jika Anda butuh 'break' untuk berhenti di tengah jalan, gunakan for...of:
  for (const [buah, jumlah] of stok) {
    if (jumlah < 10) break; // Berhenti jika kondisi terpenuhi
    console.log(buah);
  }
  ```

---

#### 12. Konversi Antara Map, Array, dan Plain Object

- **A. Konversi Map $\leftrightarrow$ Array**:

  ```javascript
  const mapData = new Map([
    ["a", 1],
    ["b", 2],
  ]);

  // Map -> Array 2D
  const arr = [...mapData]; // [['a', 1], ['b', 2]]

  // Array 2D -> Map
  const mapBaru = new Map(arr);
  ```

- **B. Konversi Map $\leftrightarrow$ Plain Object**:

  ```javascript
  // Map -> Object (Semua kunci Map harus bertipe String/Symbol)
  const mapConfig = new Map([
    ["theme", "dark"],
    ["lang", "id"],
  ]);
  const objConfig = Object.fromEntries(mapConfig);
  console.log(objConfig); // { theme: 'dark', lang: 'id' }

  // Object -> Map
  const userObj = { nama: "Joko", umur: 25 };
  const userMap = new Map(Object.entries(userObj));
  console.log(userMap.get("nama")); // "Joko"
  ```

- **C. Konversi Map ke JSON (Serialisasi)**:
  `JSON.stringify(map)` menghasilkan string kosong `{}` karena JSON tidak mengenali Map secara native. Ubah dulu menjadi Object atau Array:

  ```javascript
  const map = new Map([
    ["id", 1],
    ["nama", "Joko"],
  ]);

  // Cara 1: Ubah ke Object dulu
  const jsonString1 = JSON.stringify(Object.fromEntries(map));

  // Cara 2: Ubah ke Array 2D dulu (bagus jika kuncinya non-string)
  const jsonString2 = JSON.stringify([...map]);
  ```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep, method, dan skenario di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan dan dieksplorasi secara langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/10-map/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Cache Memori (In-Memory Caching)**: Menyimpan hasil komputasi berat dengan objek parameter request sebagai kuncinya.
2. **Metadata Elemen DOM**: Memetakan elemen tombol HTML langsung sebagai kunci tanpa harus mengubah atau mencemari objek DOM itu sendiri.
3. **Frekuensi Penghitungan Kata**: Menghitung jumlah kemunculan kata atau ID pengguna dengan penambahan data berkecepatan tinggi.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengakses Map dengan bracket notation `map[key]`**: Menulis `map['nama'] = 'Joko'` tidak menyimpan data ke dalam struktur Map internal, melainkan menambahkan properti objek JS biasa. Properti `map.size` tidak akan bertambah! Selalu gunakan `map.set()` dan `map.get()`.
- **Perbandingan referensi pada kunci objek**: Menulis `map.set({ role: 'admin' }, 'data')` **tidak bisa diambil** dengan `map.get({ role: 'admin' })` dan akan mengembalikan `undefined`! Hal ini terjadi karena kedua tanda kurung kurawal `{}` tersebut memesan alamat memori yang berbeda. Kunci objek wajib disimpan ke dalam satu variabel referensi terlebih dahulu.
- **Serialisasi JSON langsung**: `JSON.stringify(map)` menghasilkan string kosong `{}` karena JSON tidak mendukung Map secara native. Konversi dulu via `Object.fromEntries(map)` atau `[...map]`.

### 🌟 Best Practice

- Gunakan `Map` jika kunci tidak diketahui hingga runtime atau bertipe non-string.
- Gunakan `Map` jika Anda membutuhkan frekuensi penambahan dan penghapusan key secara berkala demi performa memori yang optimal.
- Gunakan `Object` biasa jika Anda hanya memerlukan struktur data rekaman statis (_record_) yang telah ditentukan field-fieldnya sejak awal.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah class `CacheService` sederhana yang menggunakan `Map` di dalamnya, memiliki method `simpan(kunci, nilai)` dan `ambil(kunci)`.
2. Diberikan array string `['apel', 'jeruk', 'apel', 'mangga', 'jeruk', 'apel']`. Gunakan `Map` untuk menghitung frekuensi kemunculan setiap buah.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09 - Boolean](../09-boolean/README.md)
- ➡️ **Selanjutnya:** [11 - Set](../11-set/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
