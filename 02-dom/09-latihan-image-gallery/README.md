# 09 - Latihan Galeri Gambar Interaktif

## Tujuan Belajar
- Menerapkan teknik *Event Delegation* pada galeri thumbnail foto.
- Mengganti atribut gambar utama (`src`) secara dinamis saat thumbnail diklik.
- Menambahkan efek animasi pergantian gambar via CSS class dan event transit.

## Penjelasan Konsep
Daripada memasang puluhan event listener ke tiap thumbnail, satu event listener dipasang di container utama. Ketika elemen thumbnail (`e.target.classList.contains('thumb')`) diklik, atribut `src` gambar jumbo utama diperbarui dan kelas animasi opacity ditambahkan.

Tinjau implementasi di [contoh.js](contoh.js).

---
[⬅️ Materi Sebelumnya: 08 - Latihan Suit Jawa GUI](../08-latihan-suit-jawa-v2/README.md) | [Materi Selanjutnya: 03-Lanjutan Object Lanjutan ➡️](../../03-lanjutan/01-object-lanjutan/README.md)
