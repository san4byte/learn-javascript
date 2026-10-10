# Mini Project 07 - Pengelolaan Kursi Penumpang Angkot

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengintegrasikan konsep manipulasi Array (pencarian, penyisipan kembali slot kosong, penambahan di ujung, dan penghapusan) ke dalam studi kasus sistem manajemen kursi penumpang.
> - **Kapan Digunakan**: Mengelola alokasi sumber daya berkapasitas terbatas (sistem reservasi kursi bioskop, alokasi loker gym, antrean loket, atau pool koneksi memori).
> - **Aturan Praktis**: Tandai kursi kosong dengan nilai `undefined` saat penumpang turun agar indeks posisi kursi di belakangnya tidak bergeser, dan gunakan loop pencarian untuk menduduki slot kosong tersebut terlebih dahulu.

---

## 1. 🎯 Tujuan Belajar

- Mengimplementasikan logika pemecahan masalah dunia nyata menggunakan struktur data Array.
- Menguasai alur percabangan kompleks saat menambah penumpang (`tambahPenumpang`) berdasarkan status ketersediaan kursi.
- Menguasai alur penurunan penumpang (`turunkanPenumpang`) dengan mekanisme penandaan slot kosong (`undefined`).
- Menerapkan proteksi terhadap data duplikat menggunakan metode `Array.prototype.includes()`.
- Menetapkan batas kapasitas maksimal angkot untuk menolak permintaan saat armada penuh.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Sistem kursi angkot seperti **lemari loker penitipan barang di gym**:
> Ketika loker nomor 2 dikosongkan oleh anggota yang pulang duluan (**penumpang turun, kursi menjadi `undefined`**), anggota baru yang baru saja datang akan diarahkan petugas untuk mengisi loker nomor 2 yang kosong tersebut terlebih dahulu (**daur ulang slot kosong / seat recycling**), sebelum petugas membuka dan memberikan loker baru di deretan belakang.

---

### Tabel Logika Keputusan Penambahan Penumpang

| Kondisi Array Kursi                     | Aksi yang Dijalankan | Hasil Posisi Penumpang             |
| :-------------------------------------- | :------------------- | :--------------------------------- |
| **Array Masih Kosong (`length === 0`)** | `push(nama)`         | Duduk di Kursi 1 (indeks 0)        |
| **Nama Sudah Ada di Array**             | Tolak penambahan     | Cetak peringatan duplikasi         |
| **Ada Nilai `undefined` di Tengah**     | `kursi[i] = nama`    | Mengisi slot kursi kosong terdepan |
| **Kapasitas Penuh (`>= batas`)**        | Tolak penambahan     | Cetak peringatan angkot penuh      |
| **Kursi Terisi Penuh Normal**           | `push(nama)`         | Duduk di kursi paling belakang     |

---

### Pembahasan Mendalam Fitur & API

#### 1. Arsitektur Aturan Bisnis Kursi Angkot

Sistem ini memodelkan angkot sebagai array satu dimensi di mana setiap indeks merepresentasikan nomor kursi fisik (`indeks + 1`):

```javascript
const daftarKursi = ["Joko", undefined, "Siti"];
// Kursi 1: Joko, Kursi 2: Kosong, Kursi 3: Siti
```

#### 2. Logika Penambahan Penumpang (`tambahPenumpang`)

Fungsi mengevaluasi 5 tahapan berurutan: periksa kekosongan total, periksa duplikasi nama, cari kursi kosong `undefined`, periksa batas kapasitas, dan tambahkan di baris paling akhir jika masih ada kuota.

#### 3. Logika Penurunan Penumpang (`turunkanPenumpang`)

Saat penumpang turun, kursi **tidak dihapus menggunakan `splice()`**, melainkan disetel menjadi `undefined`:

```javascript
kursi[i] = undefined;
```

Alasannya: jika menggunakan `splice()`, seluruh nomor kursi penumpang di belakangnya akan otomatis bergeser dan mengubah nomor tiket yang sudah dipegang penumpang lain.

#### 4. Pengelolaan Slot Kosong (_Seat Recycling_)

Melakukan iterasi untuk menemukan indeks pertama yang bernilai `undefined`:

```javascript
for (let i = 0; i < kursi.length; i++) {
  if (kursi[i] === undefined) {
    kursi[i] = namaBaru;
    return kursi;
  }
}
```

#### 5. Pencegahan Duplikasi Data dengan `Array.includes()`

Mencegah satu orang penumpang yang sama duduk di dua kursi berbeda:

```javascript
if (kursi.includes(nama)) {
  console.log(`Penumpang '${nama}' sudah ada di dalam angkot!`);
  return kursi;
}
```

#### 6. Validasi Kapasitas Maksimum Angkot

Menjaga keselamatan armada agar tidak melebihi muatan resmi yang diizinkan (_max capacity barrier_).

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi simulasi sistem kursi angkot: alur penumpang naik berurutan, proses penumpang turun meninggalkan kursi `undefined`, penumpang baru menduduki slot kosong, penolakan nama ganda, serta pengujian kapasitas maksimum armada telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node projects/mini-projects/07-penumpang-angkot/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Tiket Bioskop & Maskapai Penerbangan**: Menyediakan denah kursi di mana pembatalan tiket mengubah status kursi menjadi `AVAILABLE` kembali untuk dipesan pembeli lain.
2. **Buffer Memory Allocation (Object Pool)**: Di industri game development, objek peluru atau musuh yang hancur disetel kembali menjadi `null/undefined` di dalam array pool agar memorinya dapat digunakan kembali oleh peluru baru tanpa membebani _Garbage Collector_.

### ⚠️ Common Pitfalls

- **Menggunakan `shift()` atau `splice()` untuk Menghapus Penumpang**: Menyebabkan penumpang yang duduk di kursi 3 tiba-tiba tergeser ke kursi 2, merusak konsistensi penomoran kursi fisik.
- **Mengabaikan Nilai `undefined` Saat Menghitung Jumlah Penumpang**: Menggunakan `kursi.length` untuk mengetahui jumlah penumpang riil akan salah jika ada kursi kosong `undefined` di tengah. Gunakan `kursi.filter(Boolean).length`.

### 🌟 Best Practice

- Selalu kembalikan nilai array kursi (`return kursi`) pada setiap cabang kondisi fungsi agar pemanggilan fungsi bersifat terprediksi.
- Ekstrak batas kapasitas maksimum menjadi parameter konfigurasi fungsi dengan nilai default (`kapasitas = 10`).

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi pembantu `hitungPenumpangAktif(kursi)` yang mengembalikan jumlah penumpang yang benar-benar ada di dalam angkot (abaikan slot kursi yang bernilai `undefined`).
2. Tambahkan fitur tarif angkot: buat variabel `kasAngkot = 0`. Setiap kali penumpang berhasil turun via `turunkanPenumpang()`, tambahkan kas angkot sebesar `Rp 5.000`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [Mini Project 06 - Image Gallery](../06-image-gallery/README.md)
- ➡️ **Selanjutnya:** [Mini Project 08 - Pengelolaan Angkot Objek](../08-angkot-object/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
