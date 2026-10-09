# 12 - Symbol (Primitive Unik, Global Registry, dan Well-Known Symbols)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Tipe data primitif ke-7 yang menjamin keunikan identitas 100% tanpa risiko tabrakan nama (_collision-proof_).
> - **Kapan Digunakan**: Kunci metadata tersembunyi pada objek library/plugin, konstanta enum unik, dan kustomisasi perilaku bahasa via _Well-Known Symbols_ (`Symbol.iterator`, `Symbol.toStringTag`).
> - **Aturan Praktis**: Symbol bukan konstruktor (`new Symbol()` melempar TypeError), tersembunyi dari `Object.keys()` dan `JSON.stringify()`, serta tidak bisa dikonversi secara implisit ke string via operator `+`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar tipe data primitif `Symbol` dan jaminan keunikan nilainya di memori.
- Mampu membuat Symbol lokal dan membaca properti `description`.
- Menguasai penggunaan Symbol sebagai kunci properti objek tersembunyi (_non-enumerable & non-JSON_).
- Mengetahui cara inspeksi kunci Symbol menggunakan `Object.getOwnPropertySymbols()` dan `Reflect.ownKeys()`.
- Menguasai Global Symbol Registry menggunakan `Symbol.for()` dan `Symbol.keyFor()`.
- Memahami implementasi praktis _Well-Known Symbols_ (`Symbol.iterator` dan `Symbol.toStringTag`).
- Menghindari jebakan _type coercion_ string pada nilai Symbol.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Symbol()` lokal seperti **sidik jari biometrik manusia**: meskipun ada dua orang dengan nama teks identik 'Joko Santoso', sidik jari keduanya dijamin 100% unik dan berbeda. Sementara `Symbol.for()` seperti **Nomor Induk Kependudukan (NIK) terpusat di kantor Dukcapil**: instansi mana pun yang meminta NIK atas kode tersebut akan selalu mendapatkan satu identitas yang dibagikan bersama.

---

### 1. Tabel Ringkasan API Symbol (Cheat-Sheet)

| Fitur / Method                          | Parameter                  | Nilai Kembalian           | Deskripsi Singkat                                                     |
| :-------------------------------------- | :------------------------- | :------------------------ | :-------------------------------------------------------------------- |
| **`Symbol([description])`**             | `description` _(opsional)_ | `symbol`                  | Membuat Symbol lokal unik baru.                                       |
| **`sym.description`**                   | `-`                        | `string` \| `undefined`   | Properti _read-only_ untuk membaca teks deskripsi.                    |
| **`Symbol.for(key)`**                   | `key` _(string)_           | `symbol`                  | Mengambil/mendaftarkan Symbol pada Global Registry.                   |
| **`Symbol.keyFor(sym)`**                | `sym` _(symbol)_           | `string` \| `undefined`   | Mengambil string kunci dari Symbol yang terdaftar di Global Registry. |
| **`Object.getOwnPropertySymbols(obj)`** | `obj`                      | `Array<symbol>`           | Mengambil seluruh kunci Symbol yang menempel pada objek.              |
| **`Reflect.ownKeys(obj)`**              | `obj`                      | `Array<string \| symbol>` | Mengambil **seluruh** properti objek (string biasa + symbol).         |

---

### 2. Keunikan Mutlak & Larangan Konstruktor `new`

Setiap pemanggilan `Symbol()` selalu menghasilkan nilai unik di memori:

```javascript
const s1 = Symbol("auth");
const s2 = Symbol("auth");

console.log(s1 === s2); // false! ❌ (Meskipun deskripsinya sama persis)
console.log(s1.description); // "auth"
```

> ⚠️ **Bukan Konstruktor**: Jangan pernah memanggil dengan keyword `new`:
>
> ```javascript
> // new Symbol('id'); // ❌ TypeError: Symbol is not a constructor
> ```

---

### 3. Kunci Properti Tersembunyi (Anti-Collision)

Saat Anda membuat plugin atau library yang ingin menyematkan data internal ke objek pengguna tanpa takut menabrak nama properti yang sudah ada:

```javascript
const METADATA_KEY = Symbol("metadataInternal");

const user = {
  nama: "Budi",
  role: "Admin",
  [METADATA_KEY]: { idInternal: 9999, secretKey: "xyz" },
};

console.log(user[METADATA_KEY]); // { idInternal: 9999, secretKey: 'xyz' }

// Karakteristik Kunci Symbol:
console.log(Object.keys(user)); // ['nama', 'role'] (METADATA_KEY tidak muncul!)
console.log(JSON.stringify(user)); // '{"nama":"Budi","role":"Admin"}' (otomatis disingkirkan dari JSON!)
```

---

### 4. Cara Menginspeksi Kunci Symbol

Meskipun tersembunyi dari loop biasa (`for...in`, `Object.keys()`), Symbol **bukan enkapsulasi privat sejati**:

```javascript
// 1. Mengambil hanya kunci-kunci Symbol:
const daftarSimbol = Object.getOwnPropertySymbols(user);
console.log(daftarSimbol); // [ Symbol(metadataInternal) ]
console.log(user[daftarSimbol[0]]); // Nilai tetap dapat dibaca!

// 2. Mengambil SEMUA kunci (String dan Symbol):
const semuaKunci = Reflect.ownKeys(user);
console.log(semuaKunci); // ['nama', 'role', Symbol(metadataInternal)]
```

> 💡 Jika Anda membutuhkan enkapsulasi data privat sejati yang tidak dapat diakses dari luar kelas, gunakan sintaks **Private Field `#`** di dalam Class JavaScript (`#privateField`).

---

### 5. Global Symbol Registry: `Symbol.for()` & `Symbol.keyFor()`

Jika Anda memiliki beberapa modul atau berkas terpisah yang perlu membagikan satu Symbol yang sama:

- **`Symbol.for(key)`**: Mengecek apakah ada Symbol dengan kunci string tersebut di registry runtime global. Jika ada, Symbol tersebut dikembalikan; jika belum, dibuatkan baru.
- **`Symbol.keyFor(sym)`**: Membaca kembali nama kunci string dari Symbol yang terdaftar di registry global.

```javascript
const globalA = Symbol.for("app.tema");
const globalB = Symbol.for("app.tema");

console.log(globalA === globalB); // true ✅ (merujuk ke Symbol yang sama di memori)
console.log(Symbol.keyFor(globalA)); // "app.tema"

// Symbol lokal biasa tidak terdaftar di Global Registry:
const lokal = Symbol("lokal");
console.log(Symbol.keyFor(lokal)); // undefined
```

---

### 6. Well-Known Symbols dalam Praktik

JavaScript menyediakan konstanta bawaan (_Well-Known Symbols_) untuk mengatur perilaku internal bahasa:

#### 1. `Symbol.iterator`: Membuat Objek Dapat Di-Loop `for...of`

```javascript
const penghitung = {
  batas: 3,
  [Symbol.iterator]() {
    let hitung = 1;
    return {
      next: () => ({
        value: hitung,
        done: hitung++ > this.batas,
      }),
    };
  },
};

for (const angka of penghitung) {
  console.log(angka); // 1, lalu 2, lalu 3
}
```

---

#### 2. `Symbol.toStringTag`: Kustomisasi Label Objek

```javascript
class KeranjangBelanja {
  get [Symbol.toStringTag]() {
    return "KeranjangBelanja";
  }
}

const k = new KeranjangBelanja();
console.log(Object.prototype.toString.call(k)); // "[object KeranjangBelanja]"
```

---

### 7. Jebakan Type Coercion String

Symbol tidak dapat dikonversi secara otomatis/implisit menjadi string via operator penjumlahan `+`:

```javascript
const id = Symbol("akun");

// console.log('ID: ' + id); // ❌ TypeError: Cannot convert a Symbol value to a string

// Solusi yang Benar:
console.log("ID: " + id.description); // "ID: akun" ✅
console.log("ID: " + String(id)); // "ID: Symbol(akun)" ✅
console.log("ID: " + id.toString()); // "ID: Symbol(akun)" ✅
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep keunikan mutlak, kunci tersembunyi objek, inspeksi via `Reflect.ownKeys()`, Global Symbol Registry (`Symbol.for`), implementasi praktis _Well-Known Symbols_, dan pencegahan error _type coercion_ di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/12-symbol/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pembuatan Plugin / Middleware**: Menyematkan metadata internal (seperti ID pelacakan trace log) ke objek _Request_ atau _Response_ tanpa khawatir menimpa properti milik aplikasi utama.
2. **Konstanta Enum Unik**: Mendefinisikan status transaksi di mana nilai status dijamin tidak akan pernah bentrok dengan string biasa.
3. **Mendefinisikan Protokol Kustom**: Mengimplementasikan `[Symbol.iterator]` agar objek custom dapat diurai menggunakan Spread Operator (`[...obj]`) atau perulangan `for...of`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Symbol Adalah Private Field**: Properti Symbol masih dapat dibaca via `Object.getOwnPropertySymbols(obj)` atau `Reflect.ownKeys(obj)`.
- **Konkatenasi String Implisit**: Menulis `'ID ' + sym` melempar `TypeError`.
- **Tertukar `Symbol()` dengan `Symbol.for()`**: `Symbol('x') !== Symbol('x')`, sedangkan `Symbol.for('x') === Symbol.for('x')`.

### 🌟 Best Practice

- Selalu sertakan deskripsi string pada `Symbol('namaDeskripsi')` agar mudah dikenali saat debugging log.
- Gunakan `Symbol.for()` jika Anda merancang sistem multi-bundle atau multi-iframe yang membutuhkan identifier terpusat.
- Gunakan `sym.description` untuk membaca nama teks deskripsi tanpa format pembungkus `Symbol(...)`.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `KoleksiBuku` yang menyimpan daftar buku di dalam array internal. Gunakan `[Symbol.iterator]` agar instance `KoleksiBuku` dapat di-loop langsung menggunakan perulangan `for...of`.
2. Buat objek `profil` dengan properti biasa `nama` dan properti tersembunyi ber-Symbol `[Symbol('apiKey')]`. Buktikan bahwa serialisasi `JSON.stringify(profil)` tidak menyertakan `apiKey`.
3. Gunakan `Symbol.for()` untuk membuat sistem registrasi event global sederhana dengan nama event `'onUserLogin'`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [11 - Set](../11-set/README.md)
- ➡️ **Selanjutnya:** [13 - RegExp](../13-regexp/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
