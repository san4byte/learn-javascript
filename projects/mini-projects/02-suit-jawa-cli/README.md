# Mini Project 02 - Game Suit Jawa (CLI / Console)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membangun mesin logika permainan Suit Jawa berbasis penentuan acak komputer (`Math.random()`) dan aturan siklus relasional non-hierarkis.
> - **Kapan Digunakan**: Mengimplementasikan simulasi game siklus tertutup (mirip Rock-Paper-Scissors) di lingkungan command line atau console.
> - **Aturan Praktis**: Normalisasikan string input pemain (`pilihan.toLowerCase()`) dan bagi distribusi probabilitas acak secara merata ke dalam 3 interval sama besar (~0.33, ~0.67, 1.0).

---

## 1. 🎯 Tujuan Belajar

- Memahami cara membangkitkan pilihan acak komputer terdistribusi merata menggunakan `Math.random()`.
- Mengimplementasikan logika evaluasi multi-cabang menggunakan percabangan `if...else` dan ternary operator.
- Membangun fungsi murni (_pure function_) yang menerima input pemain dan mengembalikan hasil permainan tanpa efek samping yang tak terduga.
- Menangani validasi input secara tangguh untuk pilihan yang tidak dikenali (_unhandled cases_).

---

## 2. 📖 Penjelasan Konsep & Logika Permainan

### 🎭 Analogi Dunia Nyata

> Permainan ini seperti **batu-gunting-kertas internasional**: sebuah sistem siklus tertutup di mana tidak ada satu entitas pun yang memiliki kekuasaan mutlak atas semua entitas lain. Gajah menginjak Orang, Orang membunuh Semut, namun Semut mampu melumpuhkan Gajah dengan masuk ke telinganya.

### Matriks Aturan Kemenangan

| Pilihan Player | Pilihan Komputer: Gajah    | Pilihan Komputer: Orang   | Pilihan Komputer: Semut   |
| :------------- | :------------------------- | :------------------------ | :------------------------ |
| **Gajah**      | SERI                       | **MENANG** (Injak Orang)  | **KALAH** (Digigit Semut) |
| **Orang**      | **KALAH** (Diinjak Gajah)  | SERI                      | **MENANG** (Injak Semut)  |
| **Semut**      | **MENANG** (Masuk Telinga) | **KALAH** (Diinjak Orang) | SERI                      |

---

### Penjelasan Detail Komponen Logika

#### 1. Pembagian Distribusi Probabilitas Acak (`Math.random()`)

`Math.random()` menghasilkan bilangan desimal mengambang antara `0` (inklusif) dan `1` (eksklusif). Rentang ini dibagi menjadi 3 interval seimbang untuk ketiga pilihan komputer:

```javascript
const acak = Math.random();
let pilihanKomputer = "";

if (acak < 0.34) {
  pilihanKomputer = "gajah";
} else if (acak <= 0.67) {
  pilihanKomputer = "orang";
} else {
  pilihanKomputer = "semut";
}
```

#### 2. Normalisasi Input Pemain

Untuk mencegah bug perbandingan akibat variasi huruf besar/kecil (`Gajah` vs `gajah`), teks input dinormalisasi menggunakan method `.toLowerCase()`:

```javascript
const player = pilihanPlayer.trim().toLowerCase();
```

#### 3. Logika Evaluasi Relasional (Menang, Kalah, Seri)

Kondisi seri dievaluasi terlebih dahulu. Jika berbeda, masing-masing pilihan pemain diuji secara terarah melawan pilihan komputer:

```javascript
let hasil = "";
if (player === pilihanKomputer) {
  hasil = "SERI!";
} else if (player === "gajah") {
  hasil = pilihanKomputer === "orang" ? "MENANG!" : "KALAH!";
} else if (player === "orang") {
  hasil = pilihanKomputer === "gajah" ? "KALAH!" : "MENANG!";
} else if (player === "semut") {
  hasil = pilihanKomputer === "orang" ? "KALAH!" : "MENANG!";
} else {
  hasil = "Pilihan tidak valid!";
}
```

---

## 3. 💻 Kode Praktik Terpadu (example.js)

Seluruh logika permainan dikemas ke dalam fungsi terstruktur di berkas [`example.js`](example.js). Skrip ini mensimulasikan beberapa putaran pertandingan pemain melawan komputer di terminal.

Jalankan program di terminal:

```bash
node projects/mini-projects/02-suit-jawa-cli/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Mekanika Elemen Pertarungan di Game RPG**: Sistem pertarungan tipe elemen: Api mengalahkan Tumbuhan, Tumbuhan mengalahkan Air, dan Air mengalahkan Api (_triangle advantage system_).
2. **Pembangkit Lawan AI Acak Sederhana**: Menggunakan `Math.random()` untuk menentukan pergerakan taktis musuh di game kasual.

### ⚠️ Common Pitfalls

- **Distribusi Probabilitas Acak yang Tidak Adil**: Membagi rentang `Math.random()` dengan ukuran yang tidak seimbang (misal `< 0.5`, `< 0.8`, `else`) akan membuat komputer bias terhadap salah satu pilihan.
- **Lupa Menangani Input Tidak Valid**: Tidak menyediakan cabang `else` untuk pilihan di luar opsi yang ditentukan akan menghasilkan nilai `undefined` atau evaluasi logika yang rancu.

### 🌟 Best Practice

- Gunakan operator _strict equality_ (`===`) untuk seluruh evaluasi komparasi string.
- Kemas seluruh alur permainan ke dalam satu fungsi terisolasi yang mengembalikan objek hasil pertandingan `{ player, komputer, hasil }` agar mudah diintegrasikan ke antarmuka CLI maupun GUI.

---

## 5. ✍️ Latihan Mandiri

1. Modifikasi program untuk mencatat skor pertandingan (Skor Player vs Skor Komputer) dengan aturan _Best of 3_ (pihak yang pertama meraih 2 kemenangan dinyatakan sebagai pemenang).
2. Tambahkan opsi pilihan keempat "pemburu" dengan aturan kustom untuk memperluas matriks percabangan.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Juragan Angkot](../01-juragan-angkot/README.md)
- ➡️ **Selanjutnya:** [03 - Tebak Angka CLI](../03-tebak-angka-cli/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
