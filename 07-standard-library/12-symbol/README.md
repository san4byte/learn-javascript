# 12 - Symbol (Primitive Unik dan Global Symbol Registry)

## 1. 🎯 Tujuan Belajar

- Memahami `Symbol` sebagai tipe data primitif ke-7 yang menjamin keunikan identitas 100%.
- Mampu membuat Symbol lokal dengan deskripsi opsional menggunakan fungsi `Symbol()`.
- Menguasai **Global Symbol Registry** dengan method `Symbol.for()` dan `Symbol.keyFor()`.
- Memahami penggunaan Symbol sebagai kunci properti objek yang tersembunyi (*hidden/non-enumerable properties*).

---

## 2. 📖 Penjelasan Konsep & Referensi Lengkap

**`Symbol`** adalah tipe data primitif yang diperkenalkan pada ES6. Karakteristik utama dari Symbol adalah **setiap nilai Symbol yang dibuat selalu bersifat unik dan tidak dapat diubah (*immutable*)**, bahkan jika dua Symbol dibuat dengan deskripsi teks yang persis sama.

### Tabel Referensi API `Symbol`

| Fitur / Method | Parameter | Tipe Return | Kegunaan & Contoh Singkat |
| :--- | :--- | :--- | :--- |
| **`Symbol([description])`** | `description` (opsional) | `symbol` | Membuat Symbol lokal unik baru: `const s = Symbol("id");` |
| **`sym.description`** | - | `string` / `undefined` | Properti baca-saja (*read-only*) untuk melihat teks deskripsi Symbol. |
| **`Symbol.for(key)`** | `key` (string) | `symbol` | Mencari di Global Registry; jika belum ada, otomatis dibuatkan. Bersifat *shared*. |
| **`Symbol.keyFor(sym)`** | `sym` (symbol) | `string` / `undefined` | Mengambil nama key dari Symbol yang terdaftar di Global Registry. |
| **`Object.getOwnPropertySymbols(obj)`** | `obj` | `Array<symbol>` | Mengambil seluruh properti Symbol yang terpasang pada suatu objek. |
| **`Reflect.ownKeys(obj)`** | `obj` | `Array<string \| symbol>` | Mengambil **seluruh** kunci properti objek (baik String biasa maupun Symbol). |

---

### Well-Known Symbols (Symbol Bawaan JavaScript)

JavaScript menggunakan Symbol bawaan sistem (*Well-Known Symbols*) untuk mengekspos mekanisme internal bahasa:
- **`Symbol.iterator`**: Menentukan metode iterator default untuk perulangan `for...of`.
- **`Symbol.toPrimitive`**: Menentukan konversi objek menjadi nilai primitif.
- **`Symbol.hasInstance`**: Mengatur perilaku operator `instanceof`.
- **`Symbol.toStringTag`**: Mengatur nilai string saat objek dipanggil oleh `Object.prototype.toString()`.

---

### Sifat Kunci Symbol pada Objek

1. **Non-enumerable secara default**: Tidak akan muncul pada `for...in` maupun `Object.keys()`.
2. **Tidak Masuk ke JSON**: `JSON.stringify(obj)` otomatis mengabaikan dan menghapus properti berkunci Symbol.
3. **Bukan Enkapsulasi Privat Sejati**: Walaupun tersembunyi dari loop biasa, properti Symbol tetap bisa dibaca menggunakan `Object.getOwnPropertySymbols(obj)`.

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Keunikan Mutlak Symbol Primitif ---");
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log("Deskripsi id1             :", id1.description);
console.log("Deskripsi id2             :", id2.description);
console.log("Apakah id1 === id2?       :", id1 === id2); // false (selalu unik di memori)

console.log("\n--- 2. Symbol sebagai Kunci Objek Tersembunyi ---");
const TOKEN_SECRET = Symbol("token");

const user = {
  nama: "Joko Santoso",
  role: "Developer",
  [TOKEN_SECRET]: "RAHASIA_12345"
};

console.log("Akses properti biasa      :", user.nama);
console.log("Akses via kunci Symbol    :", user[TOKEN_SECRET]);

console.log("\n--- 3. Kunci Symbol Tersembunyi dari Loop & JSON ---");
console.log("Object.keys(user)         :", Object.keys(user)); // Hanya ['nama', 'role']
console.log("Hasil JSON.stringify      :", JSON.stringify(user)); // TOKEN_SECRET tidak ikut

// Cara resmi mengakses kunci Symbol pada objek:
const simbolObjek = Object.getOwnPropertySymbols(user);
console.log("getOwnPropertySymbols     :", simbolObjek);
console.log("Nilai dari Symbol         :", user[simbolObjek[0]]);

console.log("\n--- 4. Global Symbol Registry (Symbol.for & Symbol.keyFor) ---");
const symGlobal1 = Symbol.for("app.version");
const symGlobal2 = Symbol.for("app.version");

console.log("Apakah symGlobal1 === 2?  :", symGlobal1 === symGlobal2); // true (berbagi registry global)
console.log("Nama kunci via keyFor     :", Symbol.keyFor(symGlobal1)); // "app.version"
console.log("keyFor pada Symbol lokal  :", Symbol.keyFor(id1)); // undefined
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Keunikan Mutlak Symbol Primitif ---
Deskripsi id1             : id
Deskripsi id2             : id
Apakah id1 === id2?       : false

--- 2. Symbol sebagai Kunci Objek Tersembunyi ---
Akses properti biasa      : Joko Santoso
Akses via kunci Symbol    : RAHASIA_12345

--- 3. Kunci Symbol Tersembunyi dari Loop & JSON ---
Object.keys(user)         : [ 'nama', 'role' ]
Hasil JSON.stringify      : {"nama":"Joko Santoso","role":"Developer"}
getOwnPropertySymbols     : [ Symbol(token) ]
Nilai dari Symbol         : RAHASIA_12345

--- 4. Global Symbol Registry (Symbol.for & Symbol.keyFor) ---
Apakah symGlobal1 === 2?  : true
Nama kunci via keyFor     : app.version
keyFor pada Symbol lokal  : undefined
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `Symbol()` lokal seperti **sidik jari biometrik manusia**: meskipun ada dua orang bernama sama persis 'Joko Santoso', sidik jari keduanya dijamin 100% berbeda dan unik. Sementara `Symbol.for()` seperti **nomor induk registrasi kependudukan (NIK) terpusat di kantor Dukcapil**: siapapun instansi yang meminta NIK atas kode tersebut akan selalu mendapatkan satu identitas yang sama.

### 🏢 Real-World Use Case
1. **Mencegah Tabrakan Nama Properti (Property Collision)**: Saat membuat plugin atau library open-source yang menyematkan metadata ke objek milik developer lain tanpa risiko merusak properti aslinya.
2. **Konstanta Unik (Enum)**: Membuat nilai state yang tidak mungkin tertukar secara kebetulan dengan string biasa.
3. **Well-Known Symbols**: Fitur internal JavaScript seperti `Symbol.iterator`, `Symbol.toPrimitive`, dan `Symbol.hasInstance` untuk memodifikasi perilaku bawaan bahasa.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memanggil `new Symbol()`**: Symbol adalah tipe primitif. Memanggil dengan keyword `new` akan menghasilkan fatal error `TypeError: Symbol is not a constructor`.
* **Mengira Symbol adalah data rahasia absolut (Private)**: Symbol menyembunyikan properti dari `for...in` dan `JSON.stringify`, namun ia **bukan enkapsulasi privat sejati**. Developer lain tetap bisa membacanya menggunakan `Object.getOwnPropertySymbols(obj)` atau `Reflect.ownKeys(obj)`.
* **Tidak bisa dikonversi implisit ke string**: Menulis `console.log('ID: ' + id1)` melempar `TypeError: Cannot convert a Symbol value to a string`. Anda harus memanggil `id1.toString()` atau `String(id1)` secara eksplisit.

### 🌟 Best Practice
* Gunakan Symbol ketika membuat properti metadata internal pada objek yang tidak boleh tercampur dalam serialisasi JSON atau iterasi umum.
* Selalu sertakan deskripsi string pada `Symbol('deskripsi')` untuk mempermudah proses debugging di console.
* Gunakan `Symbol.for()` jika Anda merancang arsitektur multi-modul yang membutuhkan koordinasi identifier bersama.

---

## 6. ✍️ Latihan Mandiri
1. Buat objek `mobil` dengan properti biasa `merk` dan properti tersembunyi `[Symbol('nomorRangka')]`. Tunjukkan bahwa `Object.keys(mobil)` hanya mencetak `merk`.
2. Daftarkan Symbol global dengan identifier `'pengaturan.bahasa'` menggunakan `Symbol.for()`, lalu buktikan bahwa pemanggilan di baris lain menghasilkan referensi yang identik.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [11 - Set](../11-set/README.md)
- ➡️ **Selanjutnya:** [13 - RegExp](../13-regexp/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
