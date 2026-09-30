# 12 - Symbol (Primitive Unik dan Global Symbol Registry)

## 1. 🎯 Tujuan Belajar
- Memahami `Symbol` sebagai tipe data primitif ke-7 yang menjamin keunikan identitas 100%.\n- Mampu membuat Symbol lokal dengan deskripsi opsional menggunakan fungsi `Symbol()`.\n- Menguasai **Global Symbol Registry** dengan method `Symbol.for()` dan `Symbol.keyFor()`.\n- Memahami penggunaan Symbol sebagai kunci properti objek yang tersembunyi (*hidden/non-enumerable properties*).

---

## 2. 📖 Penjelasan Konsep
**`Symbol`** adalah tipe data primitif yang diperkenalkan pada ES6. Karakteristik utama dari Symbol adalah **setiap nilai Symbol yang dibuat selalu bersifat unik dan tidak dapat diubah (*immutable*)**, bahkan jika dua Symbol dibuat dengan deskripsi teks yang persis sama.

### 1. Membuat Symbol Lokal: `Symbol([description])`
Fungsi `Symbol()` dipanggil tanpa keyword `new` (karena ia adalah tipe data primitif, bukan objek konstruktor).
```javascript
const s1 = Symbol("id");
const s2 = Symbol("id");
console.log(s1 === s2); // FALSE! Selalu unik dan berbeda di memori
```

### 2. Global Symbol Registry: `Symbol.for()` & `Symbol.keyFor()`
Jika kita ingin membagikan satu Symbol yang sama di berbagai file atau iframe yang berbeda:
* **`Symbol.for(key)`**: Mencari Symbol dengan kunci tertentu di registri global. Jika sudah ada, ia akan mengembalikan Symbol tersebut; jika belum ada, ia akan membuat Symbol baru di registri global.
* **`Symbol.keyFor(sym)`**: Mengambil nama kunci string dari suatu Symbol yang terdaftar di registri global (mengembalikan `undefined` jika Symbol tersebut bukan simbol global).

### 3. Symbol sebagai Kunci Properti Objek Tersembunyi
Symbol dapat digunakan sebagai nama properti objek:
* Properti dengan kunci Symbol **tidak akan muncul** dalam perulangan `for...in` biasa.
* Properti Symbol **tidak muncul** pada `Object.keys()` maupun serialisasi `JSON.stringify()`.
* Properti Symbol hanya bisa dibaca menggunakan method khusus: **`Object.getOwnPropertySymbols(obj)`** atau **`Reflect.ownKeys(obj)`**.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Keunikan Mutlak Symbol Primitif ---");
const id1 = Symbol("idPengguna");
const id2 = Symbol("idPengguna");

console.log("Deskripsi id1             :", id1.description);
console.log("Apakah id1 === id2?       :", id1 === id2); // FALSE!

console.log("\n--- 2. Symbol sebagai Kunci Objek Tersembunyi ---");
const ID_RAHASIA = Symbol("id_rahasia");

const pengguna = {
  nama: "Joko Santoso",
  role: "Software Engineer",
  [ID_RAHASIA]: "TOKEN-SECRET-XYZ-9988" // Properti berbasis Symbol
};

console.log("Akses properti biasa      :", pengguna.nama);
console.log("Akses via kunci Symbol    :", pengguna[ID_RAHASIA]);

console.log("\n--- 3. Kunci Symbol Tersembunyi dari Loop Biasa ---");
console.log("Object.keys()             :", Object.keys(pengguna)); // Hanya nama & role!
console.log("Hasil JSON.stringify()    :", JSON.stringify(pengguna)); // ID_RAHASIA tidak ikut!

// Cara resmi mengambil kunci Symbol objek:
const simbolObjek = Object.getOwnPropertySymbols(pengguna);
console.log("getOwnPropertySymbols()   :", simbolObjek);
console.log("Nilai simbol rahasia      :", pengguna[simbolObjek[0]]);

console.log("\n--- 4. Global Symbol Registry (Symbol.for & Symbol.keyFor) ---");
const simGlobal1 = Symbol.for("app.session_id");
const simGlobal2 = Symbol.for("app.session_id");

console.log("Apakah simGlobal1 === simGlobal2? :", simGlobal1 === simGlobal2); // TRUE! Keduanya berbagi registry global
console.log("Nama kunci global (keyFor)        :", Symbol.keyFor(simGlobal1)); // "app.session_id"
console.log("keyFor pada Symbol lokal biasa    :", Symbol.keyFor(id1)); // undefined
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Keunikan Mutlak Symbol Primitif ---
Deskripsi id1             : idPengguna
Apakah id1 === id2?       : false

--- 2. Symbol sebagai Kunci Objek Tersembunyi ---
Akses properti biasa      : Joko Santoso
Akses via kunci Symbol    : TOKEN-SECRET-XYZ-9988

--- 3. Kunci Symbol Tersembunyi dari Loop Biasa ---
Object.keys()             : [ 'nama', 'role' ]
Hasil JSON.stringify()    : {"nama":"Joko Santoso","role":"Software Engineer"}
getOwnPropertySymbols()   : [ Symbol(id_rahasia) ]
Nilai simbol rahasia      : TOKEN-SECRET-XYZ-9988

--- 4. Global Symbol Registry (Symbol.for & Symbol.keyFor) ---
Apakah simGlobal1 === simGlobal2? : true
Nama kunci global (keyFor)        : app.session_id
keyFor pada Symbol lokal biasa    : undefined
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `Symbol()` lokal seperti **sidik jari biometrik manusia**: meskipun ada dua orang bernama sama persis 'Joko Santoso', sidik jari keduanya dijamin 100% berbeda dan unik. Sementara `Symbol.for()` seperti **nomor induk registrasi kependudukan (NIK) terpusat di kantor Dukcapil**: siapapun instansi yang meminta NIK atas kode tersebut akan selalu mendapatkan satu identitas yang sama.

### 🏢 Real-World Use Case
1. **Mencegah Tabrakan Nama Properti (Property Collision)**: Saat membuat plugin atau library open-source yang menyematkan metadata ke objek milik developer lain tanpa risiko merusak properti aslinya.\n2. **Konstanta Unik (Enum)**: Membuat nilai state yang tidak mungkin tertukar secara kebetulan dengan string biasa.\n3. **Well-Known Symbols**: Fitur internal JavaScript seperti `Symbol.iterator`, `Symbol.toPrimitive`, dan `Symbol.hasInstance` untuk memodifikasi perilaku bawaan bahasa.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memanggil `new Symbol()`**: Symbol adalah tipe primitif. Memanggil dengan keyword `new` akan menghasilkan fatal error `TypeError: Symbol is not a constructor`.\n* **Mengira Symbol adalah data rahasia absolut (Private)**: Symbol menyembunyikan properti dari `for...in` dan `JSON.stringify`, namun ia **bukan enkapsulasi privat sejati**. Developer lain tetap bisa membacanya menggunakan `Object.getOwnPropertySymbols(obj)` atau `Reflect.ownKeys(obj)`.\n* **Tidak bisa dikonversi implisit ke string**: Menulis `console.log('ID: ' + id1)` melempar `TypeError: Cannot convert a Symbol value to a string`. Anda harus memanggil `id1.toString()` atau `String(id1)` secara eksplisit.

### 🌟 Best Practice
* Gunakan Symbol ketika membuat properti metadata internal pada objek yang tidak boleh tercampur dalam serialisasi JSON atau iterasi umum.\n* Selalu sertakan deskripsi string pada `Symbol('deskripsi')` untuk mempermudah proses debugging di console.\n* Gunakan `Symbol.for()` jika Anda merancang arsitektur multi-modul yang membutuhkan koordinasi identifier bersama.

---

## 6. ✍️ Latihan Mandiri
1. Buat objek `mobil` dengan properti biasa `merk` dan properti tersembunyi `[Symbol('nomorRangka')]`. Tunjukkan bahwa `Object.keys(mobil)` hanya mencetak `merk`.\n2. Daftarkan Symbol global dengan identifier `'pengaturan.bahasa'` menggunakan `Symbol.for()`, lalu buktikan bahwa pemanggilan di baris lain menghasilkan referensi yang identik.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [11 - Set](../11-set/README.md)\n- ➡️ **Selanjutnya:** [13 - RegExp](../13-regexp/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
