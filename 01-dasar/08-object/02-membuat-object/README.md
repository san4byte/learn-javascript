# 08.2 - Tiga Cara Membuat Object

## Tujuan Belajar
- Memahami pembuatan objek dengan cara **Object Literal**.
- Memahami pembuatan objek dengan **Function Declaration** (*factory function*).
- Memahami pembuatan objek dengan **Constructor Function** dan keyword `new`.

## Penjelasan Konsep
1. **Object Literal**: Membuat objek langsung dengan tanda kurung kurawal `{}`. Mudah ditulis tapi tidak efisien jika harus membuat banyak objek yang serupa.
2. **Function Declaration**: Fungsi biasa yang menginisialisasi objek kosong, mengisi nilai, lalu mengembalikannya (`return`).
3. **Constructor Function**: Fungsi cetak biru khusus (konvensi nama diawali huruf kapital). Menggunakan keyword `this` untuk mengikat properti dan dipanggil dengan keyword `new`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Tiga cara membuat objek di JavaScript

// 1. Object Literal
let mhs1 = {
  nama: "joko santoso",
  prodi: "pai",
  sem: "lima",
  nirm: "1214.21.19184",
};
console.log("Object Literal:", mhs1);

// 2. Function Declaration
function buatObjectMhs(nama, prodi, sem, nirm) {
  let mhs = {};
  mhs.nama = nama;
  mhs.prodi = prodi;
  mhs.sem = sem;
  mhs.nirm = nirm;
  return mhs;
}
let mhs2 = buatObjectMhs("joko santoso", "pai", "lima", "1214.21.19184");
console.log("Function Declaration:", mhs2);

// 3. Constructor Function
function Mahasiswa(nama, prodi, sem, nirm) {
  this.nama = nama;
  this.prodi = prodi;
  this.sem = sem;
  this.nirm = nirm;
}
let mhs3 = new Mahasiswa("samsul", "informatika", "tiga", "1214.21.19185");
console.log("Constructor Function:", mhs3);
```

### Output
```text
Object Literal: { nama: 'joko santoso', prodi: 'pai', sem: 'lima', nirm: '1214.21.19184' }
Function Declaration: { nama: 'joko santoso', prodi: 'pai', sem: 'lima', nirm: '1214.21.19184' }
Constructor Function: Mahasiswa { nama: 'samsul', prodi: 'informatika', sem: 'tiga', nirm: '1214.21.19185' }
```

## Penjelasan Tambahan
- **Peran Sakti Keyword `new`**:
  Ketika Anda memanggil fungsi dengan `new`:
  1. JavaScript otomatis membuat objek kosong baru di balik layar.
  2. Mengikat keyword `this` ke objek baru tersebut.
  3. Mengeksekusi kode konstruktor.
  4. Otomatis mereturn `this` tanpa perlu menuliskan baris `return`.
- **Kesalahan Fatal Pemula**:
  Lupa menuliskan `new` saat memanggil Constructor Function (`let mhs = Mahasiswa(...)`). Tanpa `new`, `this` akan merujuk ke global window/globalThis dan mencemari variabel global!

## Latihan
1. Buat Constructor Function `Mobil(merek, warna, kecepatanMaks)` dan buat dua objek mobil yang berbeda menggunakan keyword `new`.
2. Jelaskan apa yang terjadi jika Constructor Function dipanggil tanpa keyword `new`.

## Ringkasan Poin Penting
- Gunakan Object Literal untuk objek tunggal.
- Gunakan Constructor Function untuk membuat banyak objek dengan struktur yang seragam (*blueprint*).

---
[⬅️ Materi Sebelumnya: 08.1 - Dasar Object](../01-dasar-object/README.md) | [Materi Selanjutnya: 08.3 - Konsep Keyword This ➡️](../03-keyword-this/README.md)
