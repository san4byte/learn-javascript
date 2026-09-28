# 09.1 - Game Suit Jawa (Batu Gunting Kertas Tradisional)

## Tujuan Belajar
- Menerapkan angka acak `Math.random()` untuk simulasi kecerdasan buatan (AI) komputer.
- Merancang alur logika permainan bertingkat.
- Memahami proses refactoring dari kode prosedural ke kode modular berbasis fungsi.

## Penjelasan Konsep
Aturan Permainan Suit Jawa:
- **Gajah (Jempol)**: Menang atas Orang, Kalah dari Semut.
- **Orang (Telunjuk)**: Menang atas Semut, Kalah dari Gajah.
- **Semut (Kelingking)**: Menang atas Gajah, Kalah dari Orang.

Logika Komputer:
`Math.random()` menghasilkan bilangan desimal antara 0 sampai 1:
- $< 0.34 ightarrow$ Gajah
- $0.34 - 0.67 ightarrow$ Orang
- $> 0.67 ightarrow$ Semut

## Contoh Kode
Tersedia dua versi implementasi:
1. [suit-jawa.js](suit-jawa.js): Logika prosedural dengan dialog prompt/alert.
2. [suit-jawa-func.js](suit-jawa-func.js): Logika yang dipecah rapi ke fungsi `getPilihanKomputer()` dan `getHasil()`.

---
[⬅️ Materi Sebelumnya: 08.4 - Latihan Angkot Object](../../08-object/04-latihan-angkot-object/README.md) | [Materi Selanjutnya: 09.2 - Game Tebak Angka ➡️](../02-tebak-angka/README.md)
