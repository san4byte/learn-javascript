# 07 - Latihan Manipulasi Warna Background DOM

## Tujuan Belajar
- Menerapkan event tombol untuk toggle class dark mode / warna acak.
- Mengambil nilai input slider HTML5 (`<input type="range">`) dengan event `input`.
- Mengonversi nilai input RGB menjadi background warna dokumen secara dinamis.

## Penjelasan Konsep
Studi kasus interaktif:
1. Tombol ubah warna sederhana menggunakan `classList.toggle('biru-muda')`.
2. Tombol acak warna membangkitkan kombinasi nilai RGB: `Math.round(Math.random() * 255)`.
3. Tiga buah slider (Red, Green, Blue) yang mendengarkan event `input` dan memperbarui `document.body.style.backgroundColor = 'rgb(r, g, b)'`.

Tinjau implementasi di [script-1.js](script-1.js) dan [script-2.js](script-2.js).

---
[⬅️ Materi Sebelumnya: 06 - DOM Traversal](../06-dom-traversal/README.md) | [Materi Selanjutnya: 08 - Latihan Suit Jawa GUI ➡️](../08-latihan-suit-jawa-v2/README.md)
