# 09.1 - Dasar Object (Properti dan Method)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyimpan dan mengelola kumpulan data majemuk terstruktur dalam format pasangan kunci dan nilai (_Key-Value Pairs_).
> - **Kapan Digunakan**: Memodelkan entitas dunia nyata (seperti profil pengguna, katalog produk, atau transaksi), respons data JSON dari REST API, serta konfigurasi aplikasi.
> - **Aturan Praktis**: Gunakan _Dot Notation_ (`obj.key`) untuk properti statis biasa, dan gunakan _Bracket Notation_ (`obj[key]`) jika nama properti berupa variabel dinamis atau memuat spasi/karakter khusus. Tulis method dengan gaya _Method Shorthand_ ES6 (`namaMethod() {}`).

---

## 1. 🎯 Tujuan Belajar

- Memahami struktur fundamental Object sebagai wadah pasangan kunci dan nilai (_Key-Value Pairs_).
- Mengetahui perbedaan peran antara data keadaan (_state/properties_) dan fungsi perilaku (_behavior/methods_).
- Menguasai dua cara akses properti: _Dot Notation_ (`.`) dan _Bracket Notation_ (`[]`).
- Mampu menambah, memperbarui, dan menghapus kunci properti secara permanen menggunakan operator `delete`.
- Menguasai teknik verifikasi keberadaan properti menggunakan operator `in` dan metode statis `Object.hasOwn()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Objek seperti **Kartu Tanda Penduduk (KTP) fisik seseorang**:
>
> - Kartu memiliki label-label data tertulis seperti NIK, Nama Lengkap, Tanggal Lahir, dan Alamat Domisili (**properti data**).
> - Pemilik kartu tersebut juga memiliki kemampuan untuk melakukan aksi fisik seperti berbicara, menandatangani dokumen, atau memperbarui masa berlaku kartu (**metode aksi / method**).

---

### Tabel Perbandingan Cara Akses Properti

| Kriteria                        | Dot Notation (`obj.key`)              | Bracket Notation (`obj["key"]` / `obj[var]`) |
| :------------------------------ | :------------------------------------ | :------------------------------------------- |
| **Keterbacaan Kode**            | Sangat bersih dan ringkas             | Sedikit lebih panjang                        |
| **Kunci Dinamis (Variabel)**    | ❌ Tidak Bisa (dianggap nama literal) | ✅ **Bisa** (mengevaluasi ekspresi variabel) |
| **Kunci dengan Spasi / Simbol** | ❌ Melempar _SyntaxError_             | ✅ **Bisa** (`obj['nama lengkap']`)          |
| **Kunci Berupa Angka**          | ❌ Tidak Bisa (`obj.0` invalid)       | ✅ **Bisa** (`obj[0]`)                       |

---

### Pembahasan Mendalam Fitur & API

#### 1. Konsep Objek & Pasangan Kunci-Nilai (Key-Value Pairs)

Kunci (_keys/properties_) di JavaScript selalu bertipe `string` atau `Symbol`, sedangkan nilainya (_values_) dapat berupa tipe data apa pun:

```javascript
const buku = {
  judul: "Clean Code",
  halaman: 464,
  tersedia: true,
};
```

#### 2. Definisi Properti dan Method (Traditional vs ES6 Shorthand)

Method adalah fungsi yang disimpan sebagai properti. ES6 memperkenalkan penulisan ringkas tanpa kata kunci `function` dan titik dua:

```javascript
const robot = {
  tipe: "Android",
  // Tradisional:
  jalan: function () {
    return "Melangkah...";
  },
  // ES6 Shorthand:
  bicara() {
    return "Halo Manusia!";
  },
};
```

#### 3. Akses Properti: Dot Notation vs Bracket Notation

- Gunakan dot notation saat nama kunci sudah diketahui pasti dan berupa pengenal valid.
- Gunakan bracket notation saat nama kunci berada dalam variabel atau memiliki karakter spasi:

```javascript
const kueri = "halaman";
console.log(buku.judul); // 'Clean Code'
console.log(buku[kueri]); // 464
```

#### 4. Menambah dan Memodifikasi Properti Dinamis

Objek di JavaScript bersifat dinamis secara default (_extensible_):

```javascript
const barang = {};
barang.nama = "Keyboard"; // Menambah properti baru
barang.nama = "Mechanical Keyboard"; // Memodifikasi
```

#### 5. Penghapusan Kunci Permanen dengan Operator `delete`

Menyetel properti menjadi `undefined` (`obj.kunci = undefined`) tidak menghapus kunci dari memori. Untuk menghapus kuncinya secara total, gunakan kata kunci `delete`:

```javascript
const user = { id: 1, token: "abc" };
delete user.token;
console.log("token" in user); // false (benar-benar terhapus)
```

#### 6. Pengecekan Eksistensi Properti: Operator `in` vs `Object.hasOwn()`

- Operator `'kunci' in obj`: Memeriksa apakah kunci ada di dalam objek atau di dalam rantai prototype-nya.
- `Object.hasOwn(obj, 'kunci')`: Memastikan kunci tersebut merupakan milik asli objek itu sendiri (_own property_).

```javascript
const mobil = { roda: 4 };
console.log("roda" in mobil); // true
console.log(Object.hasOwn(mobil, "roda")); // true
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi anatomi objek lengkap (properti primitif, array, nested object, traditional & shorthand methods), pengaksesan dinamis via Bracket Notation, penambahan/pembaruan properti, penghapusan via `delete`, serta verifikasi eksistensi via `in` dan `Object.hasOwn()` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/09-objects/01-object-basics/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Serialisasi Respons Data REST API**: Membaca objek data profil pengguna yang dikirimkan server dalam format JSON.
2. **Kamus Kamus Pemetaan (_Lookup Dictionary_)**: Menggunakan objek sebagai pemetaan status kode atau label translasi multi-bahasa.

### ⚠️ Common Pitfalls

- **Lupa Memberi Tanda Kutip pada Bracket Notation**: Menulis `obj[email]` alih-alih `obj['email']` menyebabkan JavaScript mencari variabel lokal bernama `email`. Jika variabel tidak ada, kode melempar fatal error `ReferenceError: email is not defined`.
- **Menghapus Properti dengan `obj.key = null`**: Properti tersebut tetap ada di dalam objek dengan nilai `null`, sehingga loop `for...in` atau `Object.keys()` tetap menghitungnya.

### 🌟 Best Practice

- Gunakan penamaan kunci _camelCase_ yang seragam (misal: `firstName`, `orderDate`).
- Utamakan penulisan method menggunakan _Method Shorthand_ ES6 (`aksi() {}`).

---

## 5. ✍️ Latihan Mandiri

1. Buat sebuah objek `produk` dengan properti `nama`, `harga`, `stok`, dan method `tampilkanInfo()` yang mencetak kalimat info lengkap produk menggunakan _Method Shorthand_.
2. Tambahkan properti dinamis `'kategori barang'` (berisi dua kata dengan spasi) menggunakan Bracket Notation, lalu hapus properti `stok` menggunakan operator `delete`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08.3 - Project Kelola Penumpang](../../08-arrays/03-project-manage-passengers/README.md)
- ➡️ **Selanjutnya:** [09.2 - Tiga Cara Membuat Object](../02-creating-objects/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
