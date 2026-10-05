# 09.1 - Dasar Object (Properti dan Method)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep Object sebagai kumpulan pasangan kunci-nilai (key-value pairs).
> - **Kapan Digunakan**: Mampu mengakses dan mengubah nilai properti menggunakan Dot Notation dan Bracket Notation.
> - **Aturan Praktis**: Utamakan penulisan method menggunakan sintaks _Method Shorthand_ ES6 (`sapa() {}` alih-alih `sapa: function() {}`).

## 1. 🎯 Tujuan Belajar

- Memahami konsep Object sebagai kumpulan pasangan kunci-nilai (key-value pairs).
- Mampu mengakses dan mengubah nilai properti menggunakan Dot Notation dan Bracket Notation.
- Memahami fungsi yang berada di dalam objek yang disebut sebagai Method.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Objek seperti **KTP (Kartu Tanda Penduduk)** fisik seseorang: memiliki label-label tetap seperti NIK, Nama, Tanggal Lahir, dan Alamat (properti). Dan orang yang memiliki KTP tersebut bisa melakukan aksi seperti tanda tangan atau berbicara (method).

**Object** adalah tipe data fundamental di JavaScript yang digunakan untuk menyimpan kumpulan data terstruktur dalam format pasangan **kunci dan nilai (_key-value pairs_)**.

### Komponen Objek:

- **Properti**: Nilai data yang disimpan di dalam objek (seperti string, number, boolean, array, atau objek lain).
- **Method**: Fungsi yang didefinisikan sebagai nilai dari sebuah properti objek.

### 2 Cara Mengakses Nilai Properti:

1. **Dot Notation (`obj.properti`)**: Paling sering digunakan dan mudah dibaca.
2. **Bracket Notation (`obj["properti"]`)**: Wajib digunakan jika nama properti berupa variabel dinamis atau memiliki karakter khusus/spasi.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Anatomi Objek dengan Properti dan Method ---');
const pengguna = {
  // Properti
  id: 101,
  namaLengkap: 'Joko Santoso',
  email: 'joko@example.com',
  isAktif: true,
  keahlian: ['JavaScript', 'Node.js', 'React'],
  alamat: {
    kota: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
  },

  // Method (Fungsi di dalam Objek)
  perkenalkanDiri: function () {
    return `Halo, nama saya ${this.namaLengkap} dari ${this.alamat.kota}.`;
  },

  // Shorthand Method (ES6)
  hitungTotalKeahlian() {
    return this.keahlian.length;
  },
};

console.log('Akses via Dot Notation     :', pengguna.namaLengkap);
console.log('Akses Nested Object        :', pengguna.alamat.kota);
console.log('Akses Array dalam Objek    :', pengguna.keahlian[0]);
console.log('Memanggil Method           :', pengguna.perkenalkanDiri());
console.log(
  'Memanggil Shorthand Method :',
  pengguna.hitungTotalKeahlian(),
  'keahlian'
);

console.log('\n--- 2. Bracket Notation Dinamis ---');
const propertiYangDicari = 'email';
console.log('Akses Dinamis:', pengguna[propertiYangDicari]); // pengguna["email"]

// Menambah dan mengubah properti secara dinamis
pengguna.umur = 25;
pengguna.isAktif = false;
console.log('Objek setelah diupdate:', {
  umur: pengguna.umur,
  isAktif: pengguna.isAktif,
});
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Anatomi Objek dengan Properti dan Method ---
Akses via Dot Notation     : Joko Santoso
Akses Nested Object        : Jakarta Selatan
Akses Array dalam Objek    : JavaScript
Memanggil Method           : Halo, nama saya Joko Santoso dari Jakarta Selatan.
Memanggil Shorthand Method : 3 keahlian

--- 2. Bracket Notation Dinamis ---
Akses Dinamis: joko@example.com
Objek setelah diupdate: { umur: 25, isAktif: false }
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **JSON Response REST API**: Hampir semua payload pertukaran data backend-frontend berformat JSON yang merupakan turunan langsung dari Object JavaScript.
2. **Model Data Entitas**: Merepresentasikan tabel database (misal tabel `Users`, `Products`, `Orders`) ke dalam bentuk objek kode.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Bracket Notation Lupa Tanda Petik**: Menulis `obj[nama]` akan mencari variabel bernama `nama`. Jika Anda ingin mengakses string literal properti nama, wajib diberi tanda kutip: `obj["nama"]`.
- **Menghapus Properti dengan Menyetel Undefined**: Menulis `obj.properti = undefined` tidak menghapus kunci dari objek (kuncinya tetap ada di memory). Gunakan operator `delete obj.properti` untuk menghapus secara permanen.

### 🌟 Best Practice

- Utamakan penulisan method menggunakan sintaks _Method Shorthand_ ES6 (`sapa() {}` alih-alih `sapa: function() {}`).
- Gunakan Dot Notation secara konsisten, kecuali jika nama properti berupa variabel yang berubah-ubah (_dynamic property access_).

---

## 6. ✍️ Latihan Mandiri

1. Buatlah objek `mobil` dengan properti `merk`, `model`, `tahun`, dan method `tampilkanSpesifikasi()`.
2. Tambahkan properti baru `warna` ke objek mobil tersebut menggunakan Bracket Notation.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08.3 - Project Kelola Penumpang](../../08-arrays/03-project-manage-passengers/README.md)
- ➡️ **Selanjutnya:** [09.2 - Tiga Cara Membuat Object](../02-creating-objects/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
