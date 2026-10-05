# 02 - Timing Events (setTimeout dan setInterval)

## 1. 🎯 Tujuan Belajar
- Memahami cara menunda eksekusi kode menggunakan `setTimeout()`.
- Memahami cara menjalankan kode berulang secara periodik menggunakan `setInterval()`.
- Mampu menghentikan timer sebelum dieksekusi menggunakan `clearTimeout()` dan `clearInterval()`.
- Mengetahui masalah ketepatan waktu (*timer drift*) pada JavaScript.

---

## 2. 📖 Penjelasan Konsep
JavaScript menyediakan dua fungsi bawaan untuk mengatur pewaktuan (*scheduling*):
1. **`setTimeout(callback, delayMs, ...args)`**: Menjalankan fungsi callback satu kali setelah jeda waktu tertentu.
2. **`setInterval(callback, intervalMs, ...args)`**: Menjalankan fungsi callback berulang kali setiap selang waktu tertentu secara terus-menerus.

Setiap pemanggilan fungsi ini mengembalikan sebuah identifier unik bertipe integer (*Timer ID*). Identifier ini digunakan untuk membatalkan timer:
* `clearTimeout(timerId)`
* `clearInterval(intervalId)`

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. setTimeout & clearTimeout ---");
const timerPesan = setTimeout(() => {
  console.log("Pesan ini tidak akan pernah muncul karena di-cancel!");
}, 2000);

// Membatalkan timer sebelum 2 detik tercapai
clearTimeout(timerPesan);
console.log("Timer berhasil dibatalkan sebelum sempat dieksekusi.");

console.log("\n--- 2. setInterval & clearInterval (Simulasi Countdown) ---");
let hitungMundur = 3;

const intervalId = setInterval(() => {
  if (hitungMundur > 0) {
    console.log(`Hitung mundur: ${hitungMundur}...`);
    hitungMundur--;
  } else {
    console.log("🚀 Roket Meluncur!");
    clearInterval(intervalId); // Wajib dihentikan agar tidak berjalan selamanya
  }
}, 300);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. setTimeout & clearTimeout ---
Timer berhasil dibatalkan sebelum sempat dieksekusi.

--- 2. setInterval & clearInterval (Simulasi Countdown) ---
Hitung mundur: 3...
Hitung mundur: 2...
Hitung mundur: 1...
🚀 Roket Meluncur!
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> **setTimeout** seperti *alarm jam weker di pagi hari*: Anda menyetelnya untuk berdering 1 kali setelah 7 jam. Jika sebelum berdering Anda sudah bangun, Anda bisa menekan tombol cancel (**clearTimeout**). Sedangkan **setInterval** seperti *detak jarum jam dinding*: berbunyi 'tik-tok' secara teratur setiap 1 detik sampai baterainya dicabut (**clearInterval**).

### 🏢 Real-World Use Case
1. **Pemberitahuan Toast / Notifikasi Melayang**: Menampilkan pop-up notifikasi 'Data Berhasil Disimpan', lalu menghilangkannya secara otomatis setelah 3 detik menggunakan `setTimeout`.
2. **Fitur OTP Countdown**: Menampilkan timer 'Kirim Ulang Kode OTP dalam 60 detik' di halaman login/registrasi.
3. **Session Timeout Warning**: Menampilkan dialog peringatan 'Sesi Anda akan berakhir dalam 1 menit karena tidak ada aktivitas'.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Memanggil `clearInterval` (Memory Leak)**: Jika Anda menggunakan `setInterval` pada aplikasi web satu halaman (Single Page App / React), berpindah halaman tanpa memanggil `clearInterval` akan membuat fungsi tersebut terus berjalan di background selamanya, menyedot memori dan CPU.
* **Timer Tidak 100% Presisi**: Jika CPU komputer sedang sibuk atau tab browser sedang tidak aktif (*background tab*), browser akan menunda eksekusi timer demi menghemat baterai.

### 🌟 Best Practice
* Selalu simpan timer ID ke dalam variabel dan bersihkan pada saat komponen di-unmount atau aksi dibatalkan.
* Gunakan rekursif `setTimeout` daripada `setInterval` jika durasi eksekusi dari fungsi di dalamnya memakan waktu tidak menentu (misal memanggil API).

---

## 6. ✍️ Latihan Mandiri
1. Buatlah sebuah fungsi `buatJamDigital()` menggunakan `setInterval` yang mencetak waktu saat ini (jam:menit:detik) setiap 1 detik.
2. Hentikan jam tersebut secara otomatis setelah berjalan sebanyak 5 kali.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [01 - Asynchronous Intro & Event Loop](../01-event-loop-intro/README.md)
- ➡️ **Selanjutnya:** [03 - Callbacks dan Callback Hell](../03-callbacks/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
