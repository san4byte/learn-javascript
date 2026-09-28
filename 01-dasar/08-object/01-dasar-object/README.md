# 08.1 - Dasar Object (Properti dan Method)

## Tujuan Belajar
- Memahami struktur data Objek (pasangan *key-value*).
- Mengetahui perbedaan properti (variabel dalam objek) dan method (fungsi dalam objek).
- Mengakses data objek menggunakan *dot notation* (`.`) dan *bracket notation* (`[]`).

## Penjelasan Konsep
Objek adalah entitas independen yang memiliki properti dan tipe. Properti mendefinisikan karakteristik objek (seperti nama, status, nilai), sedangkan method adalah aksi yang dapat dilakukan oleh objek tersebut.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Struktur dasar Object Literal dan Method
let mahasiswa = {
  nama: "joko",
  lulus: true,
  ipSemester: [2.9, 3.1, 1.25, 2.88, 3.04],
  ipKumulatif: function () {
    let total = 0;
    let ips = this.ipSemester;
    for (let i = 0; i < ips.length; i++) {
      total += ips[i];
    }
    return total / ips.length;
  },
};

console.log("IP Kumulatif:", mahasiswa.ipKumulatif());
```

### Output
```text
IP Kumulatif: 2.654
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Objek seperti sebuah mobil fisik:
  - Properti: warna ("merah"), merek ("Toyota"), kapasitas (5 orang).
  - Method: `maju()`, `rem()`, `bunyikanKlakson()`.
- **Dot Notation vs Bracket Notation**:
  - `mahasiswa.nama` (Dot notation: paling umum dan bersih).
  - `mahasiswa["nama"]` (Bracket notation: wajib digunakan jika nama properti berupa variabel dinamis atau mengandung spasi/karakter khusus).

## Latihan
1. Buat objek `buku` dengan properti `judul`, `penulis`, `jumlahHalaman`, dan method `infoBuku()` yang mereturn kalimat rangkuman data buku tersebut.
2. Tambahkan properti baru `penerbit` ke objek `buku` secara dinamis dari luar definisi objek.

## Ringkasan Poin Penting
- Objek merepresentasikan entitas dunia nyata dengan state (properti) dan behavior (method).
- Gunakan keyword `this` di dalam method untuk merujuk ke data milik objek itu sendiri.

---
[⬅️ Materi Sebelumnya: 07.2 - Project Pengelolaan Penumpang](../../07-array/02-project-kelola-penumpang/README.md) | [Materi Selanjutnya: 08.2 - Tiga Cara Membuat Object ➡️](../02-membuat-object/README.md)
