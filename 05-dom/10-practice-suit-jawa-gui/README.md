# 08 - Latihan Mandiri: Game Suit Jawa GUI Interaktif

## 1. 🎯 Tujuan Belajar
- Mengembangkan logika Suit Jawa di modul 01 menjadi antarmuka grafis (GUI) interaktif.
- Membuat efek animasi putar gambar sebelum komputer menentukan pilihan.
- Menampilkan papan skor kemenangan pemain dan komputer secara real-time.

---

## 2. 📖 Penjelasan Konsep
Pada modul dasar, game Suit Jawa hanya berjalan menggunakan dialog teks. Pada modul ini, kita mengubahnya menjadi **Game GUI Penuh**:
1. Pemain mengklik ikon gambar (Gajah, Orang, atau Semut).
2. Gambar komputer berputar cepat selama 1 detik (animasi simulasi memikir).
3. Gambar komputer berhenti di pilihan final dan hasil pertandingan (Menang/Kalah/Seri) ditampilkan di layar.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 08. Game Suit Jawa GUI ---");
  console.log("Buka file 'index.html' di browser Anda untuk memainkan game Suit Jawa visual!");
} else {
  console.log("--- 08. Game Suit Jawa GUI (Browser) ---");

  function getPilihanKomputer() {
    const acak = Math.random();
    if (acak < 0.34) return "gajah";
    if (acak <= 0.67) return "orang";
    return "semut";
  }

  function tentukanHasil(player, comp) {
    if (player === comp) return "SERI!";
    if (player === "gajah") return comp === "orang" ? "MENANG!" : "KALAH!";
    if (player === "orang") return comp === "gajah" ? "KALAH!" : "MENANG!";
    if (player === "semut") return comp === "orang" ? "KALAH!" : "MENANG!";
  }

  console.log("Mesin game Suit Jawa siap merespon klik gambar.");
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 08. Game Suit Jawa GUI (Browser) ---
Mesin game Suit Jawa siap merespon klik gambar.
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Game ini seperti **mesin slot kasino mini**: Anda menarik tuas (mengklik gambar Anda), roda angka berputar cepat beberapa putaran (animasi timing interval), lalu roda terkunci di hasil akhir.

### 🏢 Real-World Use Case
1. **Gamifikasi Web E-Commerce**: Fitur Lucky Spin atau Lucky Draw berhadiah voucher belanja saat promo tanggal kembar.
2. **Pengantar Game Development HTML5 Canvas / DOM**: Melatih pengelolaan state visual, timer animasi, dan sistem skor.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Mengizinkan User Klik Bertubi-tubi Saat Animasi Berjalan**: Jika tombol tidak di-disable selama animasi putar 1 detik, timer animasi akan tumpang tindih dan membuat hasil acak menjadi kacau.

### 🌟 Best Practice
* Matikan interaksi klik sementara (*disable pointer-events*) selama animasi komputer berputar, lalu aktifkan kembali setelah hasil keluar.

---

## 6. ✍️ Latihan Mandiri
1. Tambahkan sistem penghitung skor (Player vs Komputer) di layar yang nilainya terus bertambah setiap kali salah satu pihak menang.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07 - Latihan Ubah Warna](../09-practice-color-picker/README.md)
- ➡️ **Selanjutnya:** [09 - Latihan Galeri Gambar](../11-practice-image-gallery/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
