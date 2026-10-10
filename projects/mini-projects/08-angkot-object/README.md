# Mini Project 08 - Pengelolaan Angkot Berbasis Objek

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengintegrasikan seluruh konsep Object (Constructor Function, prototype methods, `this`, array state, dan logika percabangan) ke dalam pemodelan sistem armada angkutan kota.
> - **Kapan Digunakan**: Menggabungkan data status (_properties_) dan tindakan operasi (_methods_) yang saling terkait ke dalam satu kesatuan entitas objek utuh (_High Cohesion_).
> - **Aturan Praktis**: Gunakan _Constructor Function_ dengan method yang disematkan pada `prototype` untuk memungkinkan instansiasi banyak armada secara efisien dan mandiri.

---

## 1. 🎯 Tujuan Belajar

- Mengintegrasikan Constructor Function, kata kunci `this`, array, dan percabangan dalam studi kasus komprehensif.
- Memodelkan karakteristik fisik dan finansial armada angkot (sopir, trayek rute, kursi penumpang, kas pendapatan, batas kapasitas).
- Mengimplementasikan alur transaksi pembayaran tunai saat penumpang turun.
- Menerapkan arsitektur _Prototype Method_ untuk efisiensi memori seluruh armada.
- Menangani skenario kapasitas penuh dan daur ulang kursi kosong (_seat recycling_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Objek Angkot seperti **sebuah mobil minibus angkutan umum nyata lengkap dengan kotak kas sopirnya**:
>
> - Di kursi kemudi depan duduk sang sopir (**properti `sopir`**).
> - Di kaca depan tertera stiker rute trayek (**properti `trayek`**).
> - Di bangku belakang berderet kursi penumpang (**properti array `penumpang`**).
> - Di dashboard terdapat kotak kayu tempat menyimpan uang setoran (**properti `kas`**).
> - Dan setiap kali penumpang turun, sopir menerima uang ongkos yang langsung dimasukkan ke dalam kotak kas tersebut (**method `penumpangTurun()`**).

---

### Tabel Spesifikasi Entitas Objek Angkot

| Komponen                          | Tipe Data       | Peran / Deskripsi                      |
| :-------------------------------- | :-------------- | :------------------------------------- |
| **`sopir`**                       | String          | Nama pengemudi angkot                  |
| **`trayek`**                      | Array of String | Rute asal dan tujuan perjalanan        |
| **`penumpang`**                   | Array           | Daftar nama penumpang di kursi         |
| **`kas`**                         | Number          | Saldo akumulasi uang pendapatan angkot |
| **`kapasitas`**                   | Number          | Kuota kursi maksimum armada            |
| **`penumpangNaik(nama)`**         | Method          | Menempatkan penumpang ke kursi kosong  |
| **`penumpangTurun(nama, bayar)`** | Method          | Mengosongkan kursi dan menambah kas    |
| **`infoArmada()`**                | Method          | Mengembalikan ringkasan status armada  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Arsitektur Pemodelan Angkot Berbasis Objek

Daripada mengelola variabel global yang tercerai-berai, seluruh state dienkapsulasi di dalam instans:

```javascript
function Angkot(sopir, trayek, kasAwal = 0, kapasitas = 4) {
  this.sopir = sopir;
  this.trayek = trayek;
  this.penumpang = [];
  this.kas = kasAwal;
  this.kapasitas = kapasitas;
}
```

#### 2. Deklarasi Constructor Function Angkot

Kata kunci `this` mengikat setiap properti ke instans armada yang sedang dibuat melalui pemanggilan `new Angkot(...)`.

#### 3. Optimasi Method Prototype `penumpangNaik`

Menyimpan method di `Angkot.prototype` agar 100 unit armada berbagi kode fungsi yang sama di memori. Method memeriksa:

1. Validasi duplikasi nama.
2. Penempatan di kursi kosong `undefined` jika ada.
3. Batas kuota armada (`length >= kapasitas`).
4. Penambahan di kursi paling belakang.

#### 4. Method Prototype `penumpangTurun` & Transaksi Kas

Ketika penumpang turun, kursi ditandai `undefined` (bukan dihapus dengan `splice` agar nomor kursi lain tidak bergeser), dan parameter `ongkos` ditambahkan ke `this.kas`:

```javascript
this.penumpang[i] = undefined;
this.kas += ongkos;
```

#### 5. Method Ringkasan `infoArmada`

Mengembalikan string ringkasan yang memfilter penumpang aktif (`filter(Boolean)`) untuk menampilkan rasio keterisian kursi secara presisi.

#### 6. Manajemen Siklus Hidup Instans Armada

Setiap armada bekerja secara independen: pemasukan kas Pak Joko tidak akan bercampur dengan kas Pak Herman.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi arsitektur sistem armada Angkot berbasis Constructor Function & Prototype, validasi kursi penuh, transaksi pembayaran saat penumpang turun, daur ulang kursi kosong oleh penumpang baru, serta pelaporan ringkasan armada telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node projects/mini-projects/08-angkot-object/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Pemesanan Taksi Online (Ride-Hailing)**: Model kelas `Trip` yang menampung profil driver, titik jemput, penumpang, dan status pembayaran dompet digital.
2. **Game RPG Hero & Inventory**: Karakter pahlawan dengan status HP, tas ransel (array), dan kantong koin emas yang bertambah saat menyelesaikan misi.

### ⚠️ Common Pitfalls

- **Lupa Kata Kunci `this.` Saat Menambah Kas**: Menulis `kas += ongkos` alih-alih `this.kas += ongkos` tidak akan mengubah properti kas objek, melainkan mencari variabel lokal `kas` yang berujung pada error.
- **Menggunakan Arrow Function pada Method Prototype**: Menulis `Angkot.prototype.penumpangNaik = () => { ... }` akan merusak binding `this`, sehingga `this` menunjuk ke modul global alih-alih ke armada angkot.

### 🌟 Best Practice

- Gunakan _High Cohesion_: Satukan semua fungsi yang memanipulasi properti angkot ke dalam method prototipe objek tersebut.
- Selalu kembalikan nilai boolean atau status array dari method agar pemanggil dapat memeriksa keberhasilan tindakan.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah instans armada kedua: `angkot2 = new Angkot('Pak Herman', ['Kebon Kelapa', 'Ledeng'], 10000, 5)`. Lakukan simulasi 2 penumpang naik dan 1 penumpang turun dengan ongkos Rp 7.000.
2. Tambahkan method `tarikKas(nominal)` pada `Angkot.prototype` yang memungkinkan sopir mengambil sebagian uang kas untuk membeli bensin, dengan syarat saldo kas mencukupi.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [Mini Project 07 - Pengelolaan Penumpang Angkot](../07-penumpang-angkot/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
