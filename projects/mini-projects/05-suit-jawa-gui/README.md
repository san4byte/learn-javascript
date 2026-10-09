# Mini Project 05 - Game Suit Jawa 2.0 (GUI Interaktif)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mentransformasikan logika mesin Suit Jawa menjadi antarmuka visual (GUI) interaktif dengan efek animasi putar gambar menggunakan interval waktu (`setInterval`).
> - **Kapan Digunakan**: Mengembangkan permainan web kasual berbasis visual, pengelolaan state animasi dinamis, dan pembaruan DOM responsif.
> - **Aturan Praktis**: Nonaktifkan interaksi klik pengguna sementara (_disable pointer-events_) selama animasi acak berputar agar tidak terjadi balapan proses (_race condition_).

---

## 1. 🎯 Tujuan Belajar

- Mengintegrasikan logika komputasi murni dengan elemen grafis antarmuka dokumen HTML/CSS.
- Membangun animasi acak berbasis timer menggunakan perulangan berjangka `setInterval()` dan penghentian terencana `setTimeout()`.
- Mengelola state interaksi pengguna untuk mencegah klik ganda tak terkontrol saat animasi sedang berlangsung.
- Memperbarui atribut gambar (`src`) dan teks elemen secara reaktif untuk mencerminkan status permainan.

---

## 2. 📖 Penjelasan Konsep & Mekanisme GUI

### 🎭 Analogi Dunia Nyata

> Game ini bekerja seperti **mesin putar slot interaktif kasino**: saat tuas ditarik (pengguna mengklik ikon), silinder gambar berputar cepat selama 1 detik (animasi interval gambar bergantian), lalu roda terkunci pada simbol final dan sistem secara otomatis mencocokkan kombinasi kemenangan.

### Alur Kerja Mesin Game GUI

| Tahapan Alur           | Aksi Komponen / Timer                       | Manipulasi DOM Terkait                           |
| :--------------------- | :------------------------------------------ | :----------------------------------------------- |
| **1. Trigger Klik**    | Pengguna mengklik thumbnail                 | Matikan klik elemen, catat pilihan pemain        |
| **2. Putaran Animasi** | `setInterval` berganti gambar tiap `100ms`  | Ubah atribut `img.src` komputer secara acak      |
| **3. Finalisasi**      | `setTimeout` mematikan interval di `1000ms` | Pasang gambar final komputer, evaluasi pemenang  |
| **4. Render Hasil**    | Fungsi pembanding dijalankan                | Tampilkan teks "MENANG!", "KALAH!", atau "SERI!" |

---

### Penjelasan Detail Komponen Mekanisme

#### 1. Logika Pilihan Komputer & Penentuan Hasil

Fungsi murni terpisah yang mengembalikan string pilihan komputer dan mengevaluasi hasil pertandingan:

```javascript
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
```

#### 2. Animasi Putar Gambar Komputer (`setInterval`)

Membuat ilusi komputer sedang "berpikir" dengan mengganti gambar secara cepat sebelum hasil final ditetapkan:

```javascript
function putarGambar(callback) {
  const imgKomputer = document.querySelector(".img-komputer");
  const gambar = ["gajah", "semut", "orang"];
  let i = 0;
  const waktuMulai = new Date().getTime();

  const interval = setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval(interval);
      callback();
      return;
    }
    imgKomputer.setAttribute("src", "img/" + gambar[i++] + ".png");
    if (i === gambar.length) i = 0;
  }, 100);
}
```

#### 3. Proteksi Event Klik Pengguna

Mencegah pengguna memicu animasi baru saat animasi sebelumnya masih aktif berputar:

```javascript
const areaPilihan = document.querySelector(".area-player");
areaPilihan.style.pointerEvents = "none"; // Kunci interaksi
// Aktifkan kembali setelah putaran animasi selesai:
setTimeout(() => {
  areaPilihan.style.pointerEvents = "auto";
}, 1000);
```

---

## 3. 💻 Struktur Proyek & Panduan Eksekusi

Proyek ini terdiri dari beberapa aset web:

- `index.html`: Struktur papan permainan (area komputer, papan info hasil, dan area pilihan player).
- `style.css`: Tata letak flexbox dan styling visual papan permainan.
- `img/`: Direktori aset gambar (`gajah.png`, `orang.png`, `semut.png`, `bg.png`).
- `example.js`: Skrip logika universal yang dapat dijalankan di Node.js maupun browser.

### Menjalankan di Terminal (Verifikasi Skrip)

```bash
node projects/mini-projects/05-suit-jawa-gui/example.js
```

### Menjalankan di Browser (Visual GUI Penuh)

Buka berkas `index.html` langsung di browser Anda atau gunakan server lokal:

```bash
npx serve projects/mini-projects/05-suit-jawa-gui
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Gamifikasi Web E-Commerce**: Modul putaran roda berhadiah (_lucky draw / wheel of fortune_) saat kampanye belanja tanggal kembar.
2. **Pengantar Game Development Web**: Fondasi pemahaman siklus update frame (_game loop_), manipulasi sprite aset, dan pengelolaan state skor.

### ⚠️ Common Pitfalls

- **Mengizinkan Klik Bertubi-tubi**: Jika elemen interaktif tidak dinonaktifkan saat animasi berjalan, pemanggilan `setInterval` yang tumpang tindih akan menyebabkan _memory leak_ dan tampilan gambar berkedip tak beraturan.
- **Path Aset Relatif yang Rusak**: Pastikan path menuju gambar (`img/gajah.png`) konsisten dan sesuai dengan direktori relatif file HTML yang membukanya.

### 🌟 Best Practice

- Pisahkan manipulasi tampilan visual dari fungsi logika matematika evaluasi agar kode mudah diuji (_unit testable_).
- Gunakan transisi CSS bersamaan dengan JavaScript timer untuk memberikan kesan pergerakan yang mulus.

---

## 5. ✍️ Latihan Mandiri

1. Tambahkan papan skor numerik (_Scoreboard_) di layar yang menambah skor pemain atau komputer secara kumulatif setiap kali ada pihak yang menang.
2. Tambahkan tombol "Reset Skor" yang mengembalikan nilai skor ke 0 dan mereset gambar komputer ke posisi default.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - Color Picker](../04-color-picker/README.md)
- ➡️ **Selanjutnya:** [06 - Image Gallery](../06-image-gallery/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
