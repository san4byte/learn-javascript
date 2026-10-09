# 07.5 - Arrow Function dan Konteks Keyword This

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menuliskan fungsi anonim dengan sintaks ringkas simbol panah (`=>`) yang memiliki fitur _implicit return_ dan mempertahankan ikatan leksikal konteks `this` (_Lexical this_).
> - **Kapan Digunakan**: Sangat ideal untuk fungsi callback ringkas pada pemrosesan array (`.map()`, `.filter()`, `.reduce()`), event listener komponen, serta rantai Promise.
> - **Aturan Praktis**: Jangan pernah menggunakan Arrow Function sebagai metode objek literal, metode _class prototype_, fungsi konstruktor (`new`), atau event handler DOM yang membutuhkan `this` sebagai elemen HTML pemicu.

---

## 1. 🎯 Tujuan Belajar

- Menguasai seluruh variasi sintaks Arrow Function (tanpa parameter, 1 parameter, multi-parameter, dan _implicit return_).
- Mengetahui teknik pengembalian objek literal secara implisit menggunakan tanda kurung pembungkus `({ ... })`.
- Memahami perbedaan mutlak perilaku `this` antara Regular Function (konteks dinamis) dan Arrow Function (konteks leksikal).
- Mengetahui bahwa Arrow Function tidak memiliki objek semu `arguments` dan tidak memiliki prototype.
- Mengetahui skenario kapan Arrow Function wajib dihindari agar tidak menimbulkan bug `undefined`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - Regular Function seperti **wisatawan yang menyewa mobil di setiap kota yang dikunjungi**: Setir kemudi mobilnya (**`this`**) selalu berubah-ubah tergantung di kota mana dan oleh perusahaan rental mana ia dipanggil.
> - Arrow Function seperti **sepeda lipat pribadi yang selalu dibawa dari rumah**: Ke mana pun wisatawan tersebut pergi (**di mana pun fungsi dipanggil**), sepedanya (**`this`**) tetap sama persis seperti saat ia berangkat dari rumah asalnya (**lingkup leksikal tempat fungsi didefinisikan**).

---

### Tabel Perbandingan Regular Function vs Arrow Function

| Karakteristik           | Regular Function (`function`)         | Arrow Function (`=>`)                           |
| :---------------------- | :------------------------------------ | :---------------------------------------------- |
| **Konteks `this`**      | Dinamis (tergantung cara pemanggilan) | Leksikal (mewarisi `this` dari outer scope)     |
| **Sintaks Return**      | Wajib kata kunci `return` eksplisit   | Mendukung _Implicit Return_ 1 baris             |
| **Objek `arguments`**   | Tersedia secara bawaan                | **Tidak Tersedia** (gunakan `...args`)          |
| **Konstruktor (`new`)** | Bisa digunakan sebagai konstruktor    | **Tidak Bisa** (_TypeError: not a constructor_) |
| **Metode Prototype**    | Memiliki properti `.prototype`        | Tidak memiliki `.prototype`                     |

---

### Pembahasan Mendalam Fitur & API

#### 1. Ragam Sintaks Penulisan Arrow Function

Sintaks arrow function menyesuaikan dengan jumlah parameter dan kompleksitas badan fungsi:

```javascript
// Tanpa parameter
const ping = () => "Pong";

// 1 parameter (tanda kurung opsional)
const ganda = (x) => x * 2;

// Multi parameter
const luas = (p, l) => p * l;

// Multi baris (membutuhkan kurung kurawal & return)
const sapa = (nama) => {
  const jam = new Date().getHours();
  return `Halo ${nama}, waktu saat ini: ${jam}`;
};
```

#### 2. Implicit Return dan Trik Mengembalikan Objek Literal

Untuk mengembalikan objek literal secara implisit dalam satu baris, kurung kurawal objek **wajib dibungkus dengan tanda kurung bulat `()`** agar mesin JavaScript tidak salah mengira kurung kurawal tersebut sebagai badan fungsi:

```javascript
// Salah: dianggap badan fungsi kosong bertanda label nama
// const buatUser = (nama) => { user: nama };

// Benar:
const buatUser = (nama) => ({ user: nama });
```

#### 3. Konsep Lexical `this` (Binding Tanpa Dynamic Context)

Di dalam callback seperti `forEach` atau `setTimeout`, regular function sering kehilangan konteks objek induknya dan menunjuk ke `window/undefined`. Arrow function memecahkan masalah ini secara alami:

```javascript
const timer = {
  detik: 0,
  mulai() {
    setInterval(() => {
      this.detik++; // 'this' tetap menunjuk ke objek timer!
    }, 1000);
  },
};
```

#### 4. Ketiadaan Objek `arguments` dan Solusi Rest Parameters

Arrow function tidak mendefinisikan objek semu `arguments`. Untuk menerima daftar argumen tak terbatas, gunakan _Rest Parameter_ modern:

```javascript
const total = (...angka) => angka.reduce((acc, curr) => acc + curr, 0);
```

#### 5. Larangan Penggunaan Sebagai Method Objek

Jika ditulis sebagai metode langsung pada objek literal, `this` pada arrow function akan mewarisi konteks terluar (modul atau `window`), **bukan** objek itu sendiri:

```javascript
const user = {
  nama: "Joko",
  sapa: () => `Halo ${this.nama}`, // undefined!
};
```

#### 6. Larangan Penggunaan Sebagai Constructor (`new`)

Arrow function tidak memiliki metode internal `[[Construct]]` dan tidak memiliki properti `.prototype`:

```javascript
const Orang = (nama) => {
  this.nama = nama;
};
// new Orang('Budi'); // TypeError: Orang is not a constructor
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi ragam sintaks arrow function, teknik implicit return objek literal `({})`, pembuktian keunggulan _lexical this_ pada perulangan callback, jebakan fatal `this` pada metode objek literal, serta penolakan operator `new` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/05-arrow-functions/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Transformasi Koleksi Data Fungsional**:
   ```javascript
   const daftarNama = pengguna
     .filter((u) => u.usia >= 18)
     .map((u) => u.nama.toUpperCase());
   ```
2. **Penanganan Rantai Promise Asinkron**:
   ```javascript
   fetch("/api/data")
     .then((res) => res.json())
     .then((data) => console.log(data))
     .catch((err) => console.error(err));
   ```

### ⚠️ Common Pitfalls

- **Menulis Method Objek dengan Arrow Function**: Kesalahan sangat lazim pemula yang menyebabkan `this.properti` bernilai `undefined`. Gunakan sintaks _method shorthand_ reguler: `sapa() { ... }`.
- **Lupa Mengapit Objek Literal dengan Tanda Kurung**: Menulis `const fn = () => { id: 1 }` akan menghasilkan `undefined` karena JavaScript menganggap `{ id: 1 }` adalah blok kode dengan label statement.

### 🌟 Best Practice

- Gunakan Arrow Function untuk semua callback fungsional array dan handler event asinkron di mana Anda ingin mempertahankan konteks _scope_ induk.
- Gunakan Regular Function (atau class method) untuk konstruktor objek dan method kelas.

---

## 5. ✍️ Latihan Mandiri

1. Ubah fungsi biasa berikut menjadi Arrow Function satu baris dengan _implicit return_:
   ```javascript
   function ubahFormatRupiah(nominal) {
     return "Rp " + nominal.toLocaleString("id-ID");
   }
   ```
2. Tulis sebuah fungsi arrow `buatProduk(sku, nama, harga)` yang mengembalikan objek literal `{ sku, nama, harga, status: 'Tersedia' }` secara implisit satu baris tanpa kata kunci `return`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.4 - Closures dan Lexical Scope](../04-closures/README.md)
- ➡️ **Selanjutnya:** [07.6 - Higher-Order Functions](../06-higher-order-functions/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
