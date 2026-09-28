# 11 - Timing Events: setTimeout dan setInterval

## Tujuan Belajar
- Menjalankan fungsi dengan jeda waktu menggunakan `setTimeout()`.
- Menjalankan fungsi secara berulang pada interval waktu tertentu menggunakan `setInterval()`.
- Membatalkan timer menggunakan `clearTimeout()` dan `clearInterval()`.
- Membuat aplikasi hitung mundur (*countdown timer*).

## Penjelasan Konsep
1. `setTimeout(callback, delayMs)`: Menjalankan fungsi callback tepat satu kali setelah durasi waktu tunggu (dalam milidetik).
2. `setInterval(callback, intervalMs)`: Menjalankan fungsi callback berulang-ulang tanpa henti setiap interval milidetik tercapai.
3. Keduanya mengembalikan nilai ID unik timer yang dapat digunakan untuk menghentikan timer via `clearTimeout(id)` atau `clearInterval(id)`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Penggunaan setTimeout dan setInterval

const tes = setTimeout(() => {
  console.log("Timeout selesai setelah 3 detik");
}, 3000);

let counter = 0;
let tesInterval = setInterval(() => {
  counter++;
  console.log("Interval ke-", counter);
  if (counter >= 3) {
    clearInterval(tesInterval);
    console.log("Interval dihentikan");
  }
}, 500);
```

### Output
```text
Interval ke- 1
Interval ke- 2
Interval ke- 3
Interval dihentikan
Timeout selesai setelah 3 detik
```

---
[⬅️ Materi Sebelumnya: 10 - Asynchronous Intro](../10-asynchronous-intro/README.md) | [Materi Selanjutnya: 12 - Callbacks ➡️](../12-callbacks/README.md)
