# Mini Project 04 - Color Picker (Manipulasi Warna DOM)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memanipulasi properti visual DOM (`document.body.style.backgroundColor`) secara interaktif menggunakan tombol klik, pembangkitan nilai acak RGB, dan slider jangkauan warna.
> - **Kapan Digunakan**: Mengembangkan komponen pemilih warna (_color picker_), tema dinamis (_theme switcher_), atau visualisasi interaktif berbasis gerakan mouse.
> - **Aturan Praktis**: Gunakan event `input` (bukan `change`) pada elemen `<input type="range">` agar perubahan warna terjadi secara halus dan seketika (_real-time_) saat slider ditarik.

---

## 1. 🎯 Tujuan Belajar

- Mengakses dan memodifikasi properti CSS inline melalui objek DOM `style.backgroundColor`.
- Menerapkan formula pembangkitan nilai integer RGB ($0-255$) secara acak dengan `Math.round()` dan `Math.random()`.
- Mengikat event listener `input` pada elemen `<input type="range">` untuk manipulasi warna real-time.
- Menangkap koordinat posisi pointer kursor melalui event objek `mousemove` (`e.clientX` dan `e.clientY`).

---

## 2. 📖 Penjelasan Konsep & Manipulasi DOM

### 🎭 Analogi Dunia Nyata

> Proyek ini seperti **palet cat digital dan tuas kontrol pencahayaan panggung**: teknisi dapat menekan tombol sekali klik untuk menyalakan mode lampu tertentu, memutar tuas warna acak (_strobe effect_), atau menggeser slider proporsi filter warna Merah, Hijau, dan Biru untuk menghasilkan warna atmosfer panggung yang presisi.

### Tabel Komponen Interaktif & Event DOM

| Fitur / Komponen         | Elemen HTML            | Event DOM   | Efek yang Dihasilkan                               |
| :----------------------- | :--------------------- | :---------- | :------------------------------------------------- |
| **Toggle Warna Dasar**   | `<button>`             | `click`     | Mengganti atau toggle warna background body        |
| **Warna Acak RGB**       | `<button>`             | `click`     | Menghasilkan nilai acak $0-255$ untuk R, G, B      |
| **Slider RGB Presisi**   | `<input type="range">` | `input`     | Sinkronisasi komposisi warna secara real-time      |
| **Sensor Posisi Kursor** | `document.body`        | `mousemove` | Menghitung persentase warna dari koordinat pointer |

---

### Penjelasan Detail Komponen Manipulasi

#### 1. Manipulasi Inline Style Background

Elemen `body` dapat diakses langsung via `document.body`. Properti `style` memungkinkan penetapan nilai string format CSS:

```javascript
document.body.style.backgroundColor = "lightblue";
```

#### 2. Pembangkitan Formula Warna Acak RGB

Untuk menghasilkan nilai warna RGB yang valid, angka acak desimal ($0$ sampai $1$) dikalikan $255$ lalu dibulatkan ke bilangan bulat:

```javascript
const r = Math.round(Math.random() * 255);
const g = Math.round(Math.random() * 255);
const b = Math.round(Math.random() * 255);
document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
```

#### 3. Interaksi Slider Range Real-Time (Event `input`)

Event `input` terpicu pada setiap pergeseran piksel slider tanpa harus menunggu pengguna melepaskan klik tombol mouse:

```javascript
const sliderMerah = document.querySelector("input[name=sMerah]");
sliderMerah.addEventListener("input", function () {
  const r = sliderMerah.value;
  document.body.style.backgroundColor = `rgb(${r}, 100, 100)`;
});
```

#### 4. Sensor Koordinat Kursor Mouse (Event `mousemove`)

Menggunakan posisi piksel pointer relatif terhadap lebar/tinggi jendela browser (`window.innerWidth` & `window.innerHeight`):

```javascript
window.addEventListener("mousemove", function (e) {
  const xPos = Math.round((e.clientX / window.innerWidth) * 255);
  const yPos = Math.round((e.clientY / window.innerHeight) * 255);
  document.body.style.backgroundColor = `rgb(${xPos}, ${yPos}, 100)`;
});
```

---

## 3. 💻 Struktur Proyek & Panduan Eksekusi

Proyek ini mencakup dua implementasi berkas HTML/JS interaktif:

- `index-1.html` & `script-1.js`: Manipulasi warna dasar, tombol acak, dan slider range RGB.
- `index-2.html` & `script-2.js`: Varian interaktif lanjutan dengan sensor koordinat mouse.
- `example.js`: Skrip kompatibel lingkungan Node.js dan Browser.

### Menjalankan di Terminal (Verifikasi Skrip)

```bash
node projects/mini-projects/04-color-picker/example.js
```

### Menjalankan di Browser (Visual Interaktif)

Buka berkas `index-1.html` atau `index-2.html` secara langsung di browser atau menggunakan ekstensi VS Code **Live Server**:

```bash
# Menjalankan via live-server (jika terpasang):
npx serve projects/mini-projects/04-color-picker
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Komponen Color Picker Aplikasi Desain**: Pemilihan warna palet kustom di aplikasi desain kanvas seperti Figma, Canva, atau Photoshop Web.
2. **Simulator Kontras Aksesibilitas (WCAG)**: Menguji keterbacaan teks secara langsung saat warna latar belakang diubah ke berbagai tingkat kecerahan.

### ⚠️ Common Pitfalls

- **Menggunakan Event `change` pada Slider**: Event `change` pada `<input type="range">` hanya terpicu saat pengguna melepaskan klik mouse, menghasilkan visual yang patah-patah (_laggy_). Selalu gunakan event `input` untuk respon seketika.
- **Lupa Pembulatan Angka RGB**: Menghasilkan nilai desimal seperti `rgb(124.542, 80.21, 201.09)` dapat menyebabkan masalah kompatibilitas parsing CSS di peramban tertentu.

### 🌟 Best Practice

- Kelompokkan ketiga nilai slider ($R$, $G$, $B$) ke dalam satu fungsi pembaruan terpusat (`updateBackgroundColor()`) agar logika tidak diduplikasi di setiap event listener slider.
- Tampilkan nilai angka hex atau RGB saat ini di teks layar untuk meningkatkan kenyamanan pengguna (_user experience_).

---

## 5. ✍️ Latihan Mandiri

1. Tambahkan kotak teks (_label_) yang menampilkan kode Hexadesimal (`#RRGGBB`) secara dinamis saat slider digeser.
2. Tambahkan tombol "Salin Kode Warna" (_Copy to Clipboard_) menggunakan `navigator.clipboard.writeText()` agar pengguna dapat langsung menyalin warna yang dipilih.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Tebak Angka CLI](../03-tebak-angka-cli/README.md)
- ➡️ **Selanjutnya:** [05 - Suit Jawa GUI](../05-suit-jawa-gui/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
