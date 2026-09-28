# 08.4 - Latihan Pengelolaan Angkot dengan Object

## Tujuan Belajar
- Mengintegrasikan konsep Object-Oriented Programming (OOP) dasar di JavaScript.
- Mengelola state objek (supir, kas, trayek, array penumpang).
- Mengimplementasikan transaksi bisnis (penumpang naik & bayar ongkos saat turun).

## Penjelasan Konsep
Membangun sistem angkot berbasis objek menggunakan Constructor Function:
- **Properti**:
  - `sopir`: Nama supir angkot.
  - `trayek`: Rute perjalanan angkot (Array jurusan).
  - `penumpang`: Daftar nama penumpang di dalam angkot.
  - `kas`: Saldo uang kas yang terkumpul dari ongkos penumpang.
- **Method**:
  - `penumpangNaik(namaPenumpang)`: Menambahkan penumpang ke bangku kosong atau kursi berikutnya.
  - `penumpangTurun(namaPenumpang, bayar)`: Menghapus penumpang dari kursi dan menambahkan uang `bayar` ke dalam saldo `kas`.

## Contoh Kode
Silakan tinjau file implementasi [latihan-1.js](latihan-1.js) dan [latihan-2.js](latihan-2.js) di folder ini.

## Penjelasan Tambahan
- **Keunggulan Pendekatan Objek**:
  Dibandingkan variabel terpisah-pisah, membungkus data supir, penumpang, dan kas ke dalam satu entitas objek membuat data saling terikat secara logis dan mudah dibuatkan armada baru (misal `let angkot1 = new Angkot(...)` dan `let angkot2 = new Angkot(...)`).

## Ringkasan Poin Penting
- Objek menggabungkan data status dan method transaksi ke dalam satu wadah.

---
[⬅️ Materi Sebelumnya: 08.3 - Konsep Keyword This](../03-keyword-this/README.md) | [Materi Selanjutnya: 09.1 - Game Suit Jawa ➡️](../../09-project-game/01-suit-jawa/README.md)
