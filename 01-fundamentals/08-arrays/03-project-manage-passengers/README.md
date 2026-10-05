# 08.3 - Project Pengelolaan Kursi Penumpang Angkot

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Menerapkan konsep manipulasi Array dalam skenario studi kasus nyata.
> * **Kapan Digunakan**: Mengimplementasikan fungsi penambahan penumpang (`tambahPenumpang`).
> * **Aturan Praktis**: Kembalikan array kursi di akhir fungsi (`return kursi`) agar fungsi bersifat prediktif dan konsisten.

## 1. 🎯 Tujuan Belajar
- Menerapkan konsep manipulasi Array dalam skenario studi kasus nyata.
- Mengimplementasikan fungsi penambahan penumpang (`tambahPenumpang`).
- Mengimplementasikan fungsi penurunan penumpang (`hapusPenumpang`).
- Menangani kondisi kursi kosong (`undefined`), kursi penuh, dan validasi nama duplikat.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Sistem ini seperti **manajemen loker gym**: saat loker nomor 2 dikosongkan oleh anggota yang pulang, anggota baru yang datang diprioritaskan mengisi loker nomor 2 yang kosong tersebut sebelum manajemen membuka baris loker baru di belakang.

Proyek **Pengelolaan Kursi Penumpang** adalah implementasi studi kasus algoritma dunia nyata:

### Aturan Bisnis:
1. Angkot memiliki array kursi penampung penumpang: `penumpang = []`.
2. **Fungsi `tambahPenumpang(namaPenumpang, penumpang)`**:
   * Jika angkot masih kosong, penumpang duduk di kursi pertama (index 0).
   * Jika ada kursi kosong di tengah (karena penumpang sebelumnya turun), duduki kursi kosong tersebut terlebih dahulu.
   * Jika ada nama yang sama persis sudah ada di dalam angkot, tolak penambahan (cegah duplikasi).
   * Jika seluruh kursi terisi penuh, tambahkan penumpang di kursi paling belakang.
3. **Fungsi `hapusPenumpang(namaPenumpang, penumpang)`**:
   * Jika angkot kosong, cetak peringatan bahwa angkot kosong.
   * Jika nama ditemukan, ubah posisinya menjadi `undefined` (kursi menjadi kosong kembali).
   * Jika nama tidak ditemukan, beri tahu bahwa penumpang tidak ada di dalam angkot.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Project Sistem Kursi Penumpang Angkot ---');

const daftarKursi = [];

function tambahPenumpang(nama, kursi) {
  // 1. Jika angkot kosong
  if (kursi.length === 0) {
    kursi.push(nama);
    console.log(`[NAIK]: ${nama} duduk di kursi pertama (kursi 1).`);
    return kursi;
  }

  // 2. Cek apakah nama sudah ada (duplikasi)
  if (kursi.includes(nama)) {
    console.log(`[DITOLAK]: Penumpang bernama '${nama}' sudah ada di dalam angkot!`);
    return kursi;
  }

  // 3. Telusuri apakah ada kursi kosong di tengah (undefined)
  for (let i = 0; i < kursi.length; i++) {
    if (kursi[i] === undefined) {
      kursi[i] = nama;
      console.log(`[NAIK]: ${nama} menduduki kursi kosong (kursi ${i + 1}).`);
      return kursi;
    }
  }

  // 4. Jika seluruh kursi terisi penuh, tambah di kursi belakang
  kursi.push(nama);
  console.log(`[NAIK]: Seluruh kursi penuh, ${nama} duduk di kursi paling belakang (kursi ${kursi.length}).`);
  return kursi;
}

function turunkanPenumpang(nama, kursi) {
  if (kursi.length === 0) {
    console.log('[PERINGATAN]: Angkot masih kosong, tidak ada penumpang yang bisa turun.');
    return kursi;
  }

  for (let i = 0; i < kursi.length; i++) {
    if (kursi[i] === nama) {
      kursi[i] = undefined; // Kursi menjadi kosong kembali
      console.log(`[TURUN]: ${nama} telah turun dari kursi ${i + 1}.`);
      return kursi;
    }
  }

  console.log(`[GAGAL]: Tidak ada penumpang bernama '${nama}' di dalam angkot.`);
  return kursi;
}

// Simulasi Alur Penumpang:
tambahPenumpang('Joko', daftarKursi);
tambahPenumpang('Budi', daftarKursi);
tambahPenumpang('Siti', daftarKursi);
console.log('Status Kursi:', daftarKursi);

// Budi turun di perjalanan
turunkanPenumpang('Budi', daftarKursi);
console.log('Status Kursi:', daftarKursi);

// Penumpang baru naik dan mengisi kursi kosong bekas Budi
tambahPenumpang('Ahmad', daftarKursi);
console.log('Status Kursi:', daftarKursi);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Project Sistem Kursi Penumpang Angkot ---
[NAIK]: Joko duduk di kursi pertama (kursi 1).
[NAIK]: Seluruh kursi penuh, Budi duduk di kursi paling belakang (kursi 2).
[NAIK]: Seluruh kursi penuh, Siti duduk di kursi paling belakang (kursi 3).
Status Kursi: [ 'Joko', 'Budi', 'Siti' ]
[TURUN]: Budi telah turun dari kursi 2.
Status Kursi: [ 'Joko', undefined, 'Siti' ]
[NAIK]: Ahmad menduduki kursi kosong (kursi 2).
Status Kursi: [ 'Joko', 'Ahmad', 'Siti' ]
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Sistem Pemesanan Kursi Bioskop / Kereta Api**: Mengelola status ketersediaan kursi (`Tersedia`, `Terisi`, `Dibatalkan`) secara dinamis.
2. **Memory Pool Allocation**: Menggunakan kembali slot memori yang kosong (*recycled memory buffer*) sebelum mengalokasikan blok memori baru.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Menggunakan `delete array[i]` tanpa hati-hati**: Operator `delete` menghapus nilai tetapi mempertahankan index array sebagai `empty slot / undefined`. Pastikan loop Anda memeriksa nilai `undefined` dengan benar.

### 🌟 Best Practice
* Kembalikan array kursi di akhir fungsi (`return kursi`) agar fungsi bersifat prediktif dan konsisten.
* Gunakan method array bawaan seperti `includes()` untuk validasi duplikasi data.

---

## 6. ✍️ Latihan Mandiri
1. Tambahkan batasan kapasitas maksimal angkot (misal maksimal 5 penumpang). Jika penumpang ke-6 mencoba naik dan tidak ada kursi kosong, tolak dengan pesan 'Maaf, angkot sudah penuh!'.
2. Buat fungsi `hitungSisaKursiKosong(kursi, kapasitasMaksimal)`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [08.2 - Destructuring & Spread Array](../02-destructuring-spread/README.md)
- ➡️ **Selanjutnya:** [09.1 - Dasar Object](../../09-objects/01-object-basics/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
