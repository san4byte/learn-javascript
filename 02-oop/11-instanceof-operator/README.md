# 11 - Operator instanceof

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menguji apakah sebuah objek merupakan instance dari suatu class/constructor tertentu dengan memindai ke atas seluruh rantai prototipe (_prototype chain_).
> - **Kapan Digunakan**: Melakukan validasi tipe data kompleks saat _runtime_, membedakan objek built-in (`Date`, `Array`, `RegExp`), dan menangani error secara polimorfis di blok `try...catch`.
> - **Aturan Praktis**: Gunakan format infix `objek instanceof NamaClass` yang menghasilkan nilai boolean (`true` atau `false`).

---

## 1. 🎯 Tujuan Belajar

- Memahami mekanisme evaluasi operator perbandingan **`instanceof`**.
- Mengetahui cara kerja pengecekan rantai pewarisan prototipe (_Prototype Chain Traversal_).
- Membedakan penggunaan dan batasan antara operator **`typeof`** dan **`instanceof`**.
- Memahami mengapa tipe primitif (`string`, `number`) tidak cocok dengan `instanceof` kecuali dibungkus objek (_wrapper_).
- Menerapkan arsitektur _hierarchical error handling_ berbasis `instanceof`.
- Menguasai kustomisasi logika validasi instance menggunakan **`Symbol.hasInstance`**.
- Mengetahui jebakan batas lingkungan eksekusi (_cross-realm / multi-iframe issues_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **pemeriksaan dokumen silsilah keluarga dan paspor di imigrasi**: Petugas memeriksa apakah seorang pelancong merupakan warga negara tertentu. Jika Anda memegang paspor Diplomat Indonesia, Anda otomatis diakui sah sebagai Diplomat (`instanceof Diplomat`), Warga Negara Indonesia (`instanceof WNI`), dan Manusia (`instanceof Manusia`).

---

### 1. Tabel Ringkasan Fitur Operator instanceof (Cheat-Sheet)

| Skenario Pengujian    | Contoh Sintaks                      | Hasil Evaluasi | Penjelasan Singkat                                   |
| :-------------------- | :---------------------------------- | :------------- | :--------------------------------------------------- |
| **Instance Langsung** | `sub instanceof Child`              | `true`         | Objek diciptakan langsung dari `Child`.              |
| **Hierarki Induk**    | `sub instanceof Parent`             | `true`         | `Parent.prototype` ada di rantai prototype objek.    |
| **Akar Objek**        | `sub instanceof Object`             | `true`         | Hampir semua objek JavaScript berakar pada `Object`. |
| **Tipe Primitif**     | `"teks" instanceof String`          | `false`        | Literal primitif bukan instance objek.               |
| **Wrapper Object**    | `new String("x") instanceof String` | `true`         | Objek bungkus (_wrapper_) adalah instance sah.       |
| **Custom Matcher**    | `val instanceof CustomClass`        | Sesuai aturan  | Diatur secara dinamis via `Symbol.hasInstance`.      |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja operator `instanceof` beserta skenario kasusnya:

---

#### 1. Sintaks Dasar Operator `instanceof`

Operator `instanceof` memeriksa apakah `Constructor.prototype` dapat ditemukan di mana pun dalam rantai prototipe objek target:

```javascript
class Hewan {}
const kucing = new Hewan();

console.log(kucing instanceof Hewan); // true
console.log(kucing instanceof Array); // false
```

---

#### 2. Pemindaian Rantai Pewarisan Multi-Level

Jika sebuah kelas mewarisi kelas lain (`extends`), instansinya akan bernilai `true` untuk semua leluhur di pohon pewarisan:

```javascript
class Karyawan {}
class Manajer extends Karyawan {}
class Direktur extends Manajer {}

const bos = new Direktur();
console.log(bos instanceof Direktur); // true
console.log(bos instanceof Manajer); // true
console.log(bos instanceof Karyawan); // true
console.log(bos instanceof Object); // true
```

---

#### 3. Perbandingan Mendalam: `typeof` vs `instanceof`

`typeof` mengecek tipe primitif dasar dan mengembalikan string, sedangkan `instanceof` mengenali class dan tipe objek spesifik:

```javascript
const daftar = [1, 2, 3];
const tanggal = new Date();

console.log(typeof daftar); // "object" (kurang informatif)
console.log(daftar instanceof Array); // true (presisi!)

console.log(typeof tanggal); // "object"
console.log(tanggal instanceof Date); // true (presisi!)
```

---

#### 4. Perilaku Tipe Primitif vs Objek Wrapper

Tipe primitif literal bukan merupakan objek, sehingga tidak terdeteksi oleh `instanceof`:

```javascript
const teksPrimitif = 'Halo';
const teksObjek = new String('Halo');

console.log(teksPrimitif instanceof String); // false ❌ (Primitif)
console.log(teksObjek instanceof String); // true ✅ (Objek wrapper)
```

---

#### 5. Polimorfisme Error Handling Berjenjang

`instanceof` sangat krusial dalam blok `catch` untuk menangani jenis kegagalan yang berbeda:

```javascript
class DatabaseError extends Error {}
class NetworkError extends Error {}

try {
  throw new DatabaseError('Koneksi PostgreSQL terputus');
} catch (err) {
  if (err instanceof DatabaseError) {
    console.log('Tangani masalah basis data.');
  } else if (err instanceof NetworkError) {
    console.log('Tangani masalah jaringan.');
  } else {
    throw err; // Lempar ulang error yang tidak dikenal
  }
}
```

---

#### 6. Mekanisme Rantai Prototype di Balik Layar

Evaluasi `a instanceof B` secara internal menjalankan algoritma penelusuran `Object.getPrototypeOf`:

```javascript
// Memeriksa prototype langkah demi langkah:
let proto = Object.getPrototypeOf(bos);
while (proto !== null) {
  if (proto === Karyawan.prototype) {
    console.log('Ditemukan kecocokan dengan Karyawan.prototype!');
    break;
  }
  proto = Object.getPrototypeOf(proto);
}
```

---

#### 7. Kustomisasi Menggunakan `Symbol.hasInstance`

Sejak ES2015, class dapat mengontrol cara operator `instanceof` memperlakukannya dengan mendefinisikan method statis `[Symbol.hasInstance]`:

```javascript
class BilanganGenap {
  static [Symbol.hasInstance](nilai) {
    return typeof nilai === 'number' && nilai % 2 === 0;
  }
}

console.log(4 instanceof BilanganGenap); // true
console.log(7 instanceof BilanganGenap); // false
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep operator `instanceof` di atas—mulai dari pengecekan pewarisan berjenjang, perbandingan dengan `typeof`, penanganan primitif vs wrapper, polimorfisme error, kustomisasi `Symbol.hasInstance`, hingga inspeksi prototype chain—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/11-instanceof-operator/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Error Classification di Web Service**: Menentukan status kode HTTP berdasarkan class error: `NotFoundError` $\rightarrow$ 404, `UnauthorizedError` $\rightarrow$ 401, `ValidationError` $\rightarrow$ 422.
2. **Event Dispatcher**: Memvalidasi apakah payload event yang diterima merupakan instance sah dari `CustomDomainEvent`.
3. **Middleware Pipeline**: Memeriksa tipe stream data (apakah `ReadableStream` atau `Buffer`) sebelum memproses payload request.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Jebakan Cross-Realm (Iframe / VM)**: Jika array dibuat di dalam `<iframe>` atau konteks Node.js `vm`, `arr instanceof Array` bisa mengembalikan `false` karena `Array.prototype` di realm tersebut memiliki referensi memori yang berbeda. Solusinya: selalu gunakan `Array.isArray(arr)`.
- **Salah Asumsi pada Primitif**: Menggunakan `input instanceof Number` untuk memvalidasi angka primitif (seperti `123`) akan menghasilkan `false`. Gunakan `typeof input === "number"`.

### 🌟 Best Practice

- Gunakan `instanceof` untuk memvalidasi class instansiasi buatan sendiri atau subclass dari `Error`.
- Untuk pengecekan Array, utamakan `Array.isArray()` daripada `instanceof Array` demi keamanan lintas konteks.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Kendaraan`, `Mobil extends Kendaraan`, dan `KapalLaut extends Kendaraan`. Buat fungsi `parkir(objek)` yang hanya menerima instansi dari `Kendaraan` dan menolak objek lain dengan melempar `TypeError`.
2. Buat hierarki error: `class AppError extends Error`, lalu `class AuthError extends AppError`. Di blok `try...catch`, buktikan bahwa `instanceof` dapat membedakan kedua class error tersebut.
3. Buat class kustom `StringNonKosong` yang memanfaatkan `static [Symbol.hasInstance]` untuk mengecek apakah suatu nilai berupa string dengan panjang lebih dari 0.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [10 - Private Method](../10-private-method/README.md)
- ➡️ **Selanjutnya:** [12 - Static Field](../12-static-field/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
