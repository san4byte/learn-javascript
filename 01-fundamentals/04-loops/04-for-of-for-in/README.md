# 04.4 - Perulangan Modern: For..of dan For..in

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyediakan sintaks perulangan modern tingkat tinggi untuk membaca isi koleksi _Iterable_ (`for...of`) atau menelusuri nama properti (_enumerable keys_) dari objek (`for...in`).
> - **Kapan Digunakan**: Gunakan `for...of` untuk `Array`, `String`, `Set`, dan `Map`. Gunakan `for...in` khusus saat Anda perlu membaca nama properti (_keys_) dari sebuah objek literal `{}`.
> - **Aturan Praktis**: Jangan pernah menggunakan `for...in` untuk array karena urutan indeks tidak dijamin konsisten dan bertipe string. Gunakan `Object.hasOwn(obj, key)` saat menggunakan `for...in` untuk menyaring properti rantai _prototype_.

---

## 1. 🎯 Tujuan Belajar

- Memahami perbedaan fundamental antara mekanisme `for...of` (ekstraksi nilai) dan `for...in` (ekstraksi kunci properti).
- Menguasai perulangan `for...of` pada berbagai jenis objek _Iterable_ (`Array`, `String`, `Set`, dan `Map`).
- Menggunakan metode `array.entries()` bersama teknik _destructuring_ untuk memperoleh indeks dan nilai sekaligus di dalam `for...of`.
- Menguasai penelusuran properti objek menggunakan `for...in` serta menyaring properti warisan prototype dengan `Object.hasOwn()`.
- Mengetahui alternatif modern yang lebih aman untuk objek menggunakan `Object.keys()`, `Object.values()`, dan `Object.entries()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - `for...of` seperti **membuka kotak kado satu per satu dan mengeluarkan hadiah di dalamnya**: Anda fokus langsung pada isi barang (_value_) tanpa peduli nomor seri kotaknya.
> - `for...in` seperti **membaca daftar label stiker di pintu luar laci lemari**: Anda memeriksa nama-nama label laci (_keys/property names_) satu per satu untuk mengetahui laci apa saja yang tersedia, termasuk laci bawaan pabrik lemari tersebut (_prototype chain_).

---

### Tabel Perbandingan `for...of` vs `for...in`

| Fitur                             | `for (const item of iterable)`                     | `for (const key in object)`              |
| :-------------------------------- | :------------------------------------------------- | :--------------------------------------- |
| **Fokus Pengambilan Data**        | Mengambil **Nilai / Value** elemen                 | Mengambil **Nama Properti / Key**        |
| **Target Tipe Data**              | Objek _Iterable_ (`Array`, `String`, `Set`, `Map`) | Sembarang `Object` JavaScript            |
| **Dukungan Objek Literal `{}`**   | ❌ Melempar _TypeError: not iterable_              | ✅ Berjalan mulus membaca properti       |
| **Bahaya Prototype Chain**        | Aman (hanya membaca data internal)                 | Rawan membaca properti turunan prototype |
| **Dukungan `break` & `continue`** | ✅ Didukung penuh                                  | ✅ Didukung penuh                        |

---

### Pembahasan Mendalam Fitur & API

#### 1. Perulangan `for...of` untuk Koleksi Iterable

`for...of` secara otomatis memanggil protokol iterator (`Symbol.iterator`) dari struktur data koleksi untuk mengekstraksi nilai secara berurutan:

```javascript
const buah = ["Apel", "Mangga", "Jeruk"];
for (const item of buah) {
  console.log(item); // 'Apel', 'Mangga', 'Jeruk'
}
```

#### 2. Mendapatkan Indeks dan Nilai Sekaligus via `array.entries()`

Jika Anda membutuhkan nomor indeks dan nilai elemen sekaligus di dalam `for...of`, pasangkan dengan metode `.entries()` dan pola _destructuring array_:

```javascript
const hewan = ["Kucing", "Anjing", "Kelinci"];
for (const [index, nama] of hewan.entries()) {
  console.log(`No #${index + 1}: ${nama}`);
}
```

#### 3. Iterasi Karakter String dengan `for...of`

`for...of` memecah teks string karakter demi karakter secara aman terhadap karakter Unicode dan emoji:

```javascript
for (const char of "KODE") {
  console.log(char); // 'K', 'O', 'D', 'E'
}
```

#### 4. Iterasi Struktur `Set` dan `Map` dengan `for...of`

Dua struktur data modern ES6 (`Set` dan `Map`) adalah koleksi iterable sejati yang bekerja secara mulus dengan `for...of`:

```javascript
const kamus = new Map([
  ["id", "Indonesia"],
  ["jp", "Jepang"],
]);
for (const [kodeNegara, namaNegara] of kamus) {
  console.log(`${kodeNegara} => ${namaNegara}`);
}
```

#### 5. Perulangan `for...in` untuk Properti Objek

`for...in` membaca nama kunci properti yang dapat dihitung (_enumerable properties_) dari suatu objek:

```javascript
const user = { nama: "Joko", role: "Developer" };
for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

#### 6. Bahaya Warisan Prototype pada `for...in` dan Solusi `Object.hasOwn()`

`for...in` menelusuri rantai prototype hingga ke `Object.prototype`. Untuk memastikan properti tersebut merupakan milik objek itu sendiri (_own property_), gunakan fungsi statis modern `Object.hasOwn()`:

```javascript
for (const key in user) {
  if (Object.hasOwn(user, key)) {
    // Aman: Hanya mengeksekusi properti asli milik objek user
  }
}
```

#### 7. Pola Modern: `Object.entries()` dengan `for...of`

Standar industri modern lebih memilih mengubah objek menjadi iterable menggunakan `Object.entries()` lalu mengulanginya dengan `for...of`:

```javascript
const setting = { tema: "dark", zoom: 100 };
for (const [kunci, nilai] of Object.entries(setting)) {
  console.log(`${kunci} disetel ke ${nilai}`);
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi perulangan `for...of` pada array dan string, ekstraksi indeks via `.entries()`, iterasi struktur `Set` & `Map`, pemindaian properti objek via `for...in` terproteksi `Object.hasOwn()`, serta pemanfaatan `Object.entries()` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/04-loops/04-for-of-for-in/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Iterasi Koleksi Elemen DOM Web Browser**:
   ```javascript
   const cards = document.querySelectorAll(".card");
   for (const card of cards) {
     card.classList.add("visible");
   }
   ```
2. **Serialisasi Payload Formulir HTTP**: Mengambil seluruh kunci dan nilai dari form data menggunakan `for (const [key, val] of Object.entries(formData))`.

### ⚠️ Common Pitfalls

- **Menggunakan `for...in` pada Array**: Menggunakan `for...in` pada array menghasilkan nilai berupa string indeks (`"0"`, `"1"`), dan jika ada pustaka eksternal yang memodifikasi `Array.prototype`, properti tambahan tersebut akan ikut teriterasi!
- **Mencoba `for...of` pada Objek Literal**: Menulis `for (const val of {})` akan langsung memicu `TypeError: obj is not iterable`. Gunakan `Object.values(obj)` atau `Object.entries(obj)`.

### 🌟 Best Practice

- Gunakan `for...of` untuk koleksi data (`Array`, `Set`, `Map`, `NodeList`).
- Gunakan `Object.entries(obj)` dikombinasikan dengan `for...of` sebagai pengganti `for...in` untuk keterbacaan yang lebih terprediksi dan bebas kebocoran prototype.
- Berbeda dengan metode array callback (`.forEach()`), `for...of` mendukung kata kunci kontrol `break`, `continue`, dan pemanggilan `await` asinkron secara sekuensial.

---

## 5. ✍️ Latihan Mandiri

1. Diberikan array daftar nilai `const nilai = [75, 88, 92, 60, 85]`. Gunakan `for...of` dengan `entries()` untuk mencetak hanya siswa yang nilainya di atas 80 beserta nomor urutnya.
2. Diberikan objek `buku = { judul: 'Clean Architecture', pengarang: 'Robert C. Martin', tahun: 2017 }`. Gunakan `Object.entries()` dan `for...of` untuk mencetak seluruh pasangan kunci dan nilainya dalam format `"[KUNCI] -> NILAI"`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04.3 - Pengulangan Bersarang](../03-nested-loops/README.md)
- ➡️ **Selanjutnya:** [05.1 - Pengkondisian If Else](../../05-conditionals/01-if-else/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
