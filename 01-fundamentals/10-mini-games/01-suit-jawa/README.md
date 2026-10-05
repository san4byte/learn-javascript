# 10.1 - Game Interaktif: Suit Jawa (Gajah, Semut, Orang)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membangun logika permainan Suit Jawa berbasis kecerdasan acak komputer (`Math.random()`).
> - **Kapan Digunakan**: Mengombinasikan pengkondisian `if...else` dengan logika aturan permainan.
> - **Aturan Praktis**: Selalu ubah input pemain menjadi huruf kecil (`pilihan.toLowerCase()`) agar tidak terjadi kesalahan akibat variasi huruf kapital (misal: 'Gajah' vs 'gajah').

## 1. 🎯 Tujuan Belajar

- Membangun logika permainan Suit Jawa berbasis kecerdasan acak komputer (`Math.random()`).
- Mengombinasikan pengkondisian `if...else` dengan logika aturan permainan.
- Membuat kode universal yang bisa dimainkan di Terminal maupun Browser.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Permainan ini seperti **batu-gunting-kertas internasional**: sebuah sistem siklus tertutup di mana tidak ada satu entitas pun yang memiliki kekuasaan mutlak atas semua entitas lain.

Permainan **Suit Jawa** adalah mini-game tradisional Indonesia dengan aturan:

- **Gajah** menang melawan **Orang** (Gajah menginjak Orang).
- **Orang** menang melawan **Semut** (Orang menginjak Semut).
- **Semut** menang melawan **Gajah** (Semut masuk ke telinga Gajah).
- Pilihan yang sama menghasilkan **SERI**.

Komputer memilih secara otomatis menggunakan fungsi acak `Math.random()`, dan hasil pilihan dibandingkan dengan pilihan pemain.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Mini Game: Suit Jawa ---');

function mainkanSuitJawa(pilihanPlayer) {
  // 1. Bangkitkan pilihan komputer secara acak (0 sampai 1)
  const acak = Math.random();
  let pilihanKomputer = '';

  if (acak < 0.34) {
    pilihanKomputer = 'gajah';
  } else if (acak <= 0.67) {
    pilihanKomputer = 'orang';
  } else {
    pilihanKomputer = 'semut';
  }

  // 2. Tentukan aturan kemenangan
  let hasil = '';
  if (pilihanPlayer === pilihanKomputer) {
    hasil = 'SERI!';
  } else if (pilihanPlayer === 'gajah') {
    hasil =
      pilihanKomputer === 'orang'
        ? 'MENANG! (Gajah menginjak Orang)'
        : 'KALAH! (Gajah dikalahkan Semut)';
  } else if (pilihanPlayer === 'orang') {
    hasil =
      pilihanKomputer === 'gajah'
        ? 'KALAH! (Orang diinjak Gajah)'
        : 'MENANG! (Orang menginjak Semut)';
  } else if (pilihanPlayer === 'semut') {
    hasil =
      pilihanKomputer === 'orang'
        ? 'KALAH! (Semut diinjak Orang)'
        : 'MENANG! (Semut masuk telinga Gajah)';
  } else {
    hasil = 'Pilihan tidak valid! Pilih: gajah, orang, atau semut.';
  }

  console.log(`Player   : ${pilihanPlayer}`);
  console.log(`Komputer : ${pilihanKomputer}`);
  console.log(`Hasil    : ${hasil}`);
  return hasil;
}

// Simulasi Permainan:
mainkanSuitJawa('gajah');
console.log('');
mainkanSuitJawa('semut');
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- Mini Game: Suit Jawa ---
Player   : gajah
Komputer : orang
Hasil    : MENANG! (Gajah menginjak Orang)

Player   : semut
Komputer : orang
Hasil    : KALAH! (Semut diinjak Orang)
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Mekanika Batu-Gunting-Kertas di Game RPG**: Tipe elemen pertarungan: Api mengalahkan Tumbuhan, Tumbuhan mengalahkan Air, Air mengalahkan Api.
2. **Pembangkit Lawan AI Acak**: Menggunakan `Math.random()` untuk simulasi pergerakan musuh di game kasual.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Distribusi Probabilitas Acak yang Tidak Adil**: Membagi rentang `Math.random()` dengan ukuran yang tidak sama akan membuat komputer lebih sering mengeluarkan pilihan tertentu. Pastikan dibagi rata sepertiga (~0.33, ~0.67, 1.0).

### 🌟 Best Practice

- Selalu ubah input pemain menjadi huruf kecil (`pilihan.toLowerCase()`) agar tidak terjadi kesalahan akibat variasi huruf kapital (misal: 'Gajah' vs 'gajah').

---

## 6. ✍️ Latihan Mandiri

1. Buat sistem pencatatan skor pertandingan (Skor Player vs Skor Komputer) dalam format Best of 3 (siapa yang menang 2 kali duluan dinobatkan sebagai pemenang).

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09.6 - Latihan Angkot Objek](../../09-objects/06-practice-angkot-object/README.md)
- ➡️ **Selanjutnya:** [10.2 - Game Tebak Angka](../02-guess-number/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
