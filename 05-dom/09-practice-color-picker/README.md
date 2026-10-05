# 07 - Latihan Mandiri: Manipulasi Warna Background (DOM Event & Math)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menerapkan event click dan input untuk memanipulasi style CSS secara dinamis.
> - **Kapan Digunakan**: Membuat pengubah warna acak berbasis formula RGB (`Math.random()`).
> - **Aturan Praktis**: Selalu pastikan rentang angka acak dibulatkan menjadi integer dengan `Math.round()` agar format RGB valid.

## 1. 🎯 Tujuan Belajar

- Menerapkan event click dan input untuk memanipulasi style CSS secara dinamis.
- Membuat pengubah warna acak berbasis formula RGB (`Math.random()`).
- Membangun slider interaktif range warna Merah, Hijau, dan Biru (RGB).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Aplikasi ini seperti **palet cat digital seorang seniman**: Anda bisa menekan tombol warna acak untuk membiarkan komputer mencampur cat, atau menggeser tuas tabung cat merah, hijau, dan biru untuk menghasilkan warna eksak yang Anda inginkan.

Proyek **Manipulasi Warna Background** adalah latihan interaktif DOM klasik:

1. **Fitur 1 (Tombol Toggle)**: Mengubah warna background body menjadi warna tertentu atau toggle class.
2. **Fitur 2 (Tombol Acak)**: Menghasilkan angka acak antara 0 sampai 255 untuk $R$, $G$, dan $B$, lalu menerapkannya ke `document.body.style.backgroundColor = 'rgb(r, g, b)'`.
3. **Fitur 3 (Slider Range)**: Menangkap pergerakan slider `<input type="range" min="0" max="255">` untuk menghasilkan perpaduan warna secara presisi.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 07. Latihan Manipulasi Warna Background ---');
  console.log(
    "Buka file 'index.html' di browser Anda untuk mencoba tombol warna dan slider RGB secara visual!"
  );
} else {
  console.log('--- 07. Latihan Warna (Browser) ---');

  const btnAcak = document.getElementById('btn-warna-acak');

  if (btnAcak) {
    btnAcak.addEventListener('click', function () {
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);

      const warnaBaru = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = warnaBaru;
      console.log(`Warna background diubah ke: ${warnaBaru}`);
    });
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 07. Latihan Warna (Browser) ---
Warna background diubah ke: rgb(45, 180, 220)
Warna background diubah ke: rgb(210, 85, 90)
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Color Picker Komponen**: Fitur pemilihan warna tema kustom di aplikasi desain seperti Figma atau Canva.
2. **Simulator Kontras Aksesibilitas**: Mengubah warna latar belakang untuk menguji apakah teks tetap terbaca dengan jelas (_WCAG Contrast Check_).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Menggunakan Event 'change' pada Slider**: Event `change` pada slider `<input type="range">` baru terpicu saat mouse dilepaskan. Jika ingin warna berubah secara halus dan real-time saat slider digeser, gunakan event **`input`**!

### 🌟 Best Practice

- Selalu pastikan rentang angka acak dibulatkan menjadi integer dengan `Math.round()` agar format RGB valid.

---

## 6. ✍️ Latihan Mandiri

1. Tambahkan fitur pendeteksi pergerakan kursor mouse (`mousemove` pada window) untuk mengubah warna background berdasarkan posisi koordinat `e.clientX` dan `e.clientY`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - DOM Traversal](../06-dom-traversal/README.md)
- ➡️ **Selanjutnya:** [08 - Latihan Game Suit Jawa GUI](../10-practice-suit-jawa-gui/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
