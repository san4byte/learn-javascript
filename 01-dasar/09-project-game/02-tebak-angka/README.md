# 09.2 - Game Tebak Angka

## Tujuan Belajar
- Mengimplementasikan sistem game dengan batasan kesempatan (kuota nyawa).
- Memberikan feedback komparasi dinamis (terlalu tinggi / terlalu rendah).
- Mengelola kondisi menang, kalah, dan penutupan loop.

## Penjelasan Konsep
1. Komputer mengacak angka bulat antara 1 sampai 10: `Math.floor(Math.random() * 10) + 1`.
2. Pemain diberikan 3 kali kesempatan menebak.
3. Setiap tebakan salah, sistem memberi petunjuk apakah angka tebakan pemain "TERLALU RENDAH" atau "TERLALU TINGGI" serta sisa kesempatan yang dimiliki.
4. Game berakhir saat angka berhasil ditebak atau kesempatan habis.

## Contoh Kode
Tinjau file implementasi [tebak-angka-1.js](tebak-angka-1.js) dan [tebak-angka-2.js](tebak-angka-2.js) di folder ini.

---
[⬅️ Materi Sebelumnya: 09.1 - Game Suit Jawa](../01-suit-jawa/README.md) | [Materi Selanjutnya: 02-DOM Intro ➡️](../../../02-dom/01-intro/README.md)
