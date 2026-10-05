# 04.1 - Pengulangan: While Loop & Do-While

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami struktur dasar pengulangan while: nilai awal, kondisi terminasi, dan inkremen/dekremen.
> - **Kapan Digunakan**: Mampu menghindari jebakan Infinite Loop (perulangan tanpa henti).
> - **Aturan Praktis**: Selalu pastikan ada jaminan bahwa kondisi terminasi akan tercapai.

## 1. 🎯 Tujuan Belajar

- Memahami struktur dasar pengulangan while: nilai awal, kondisi terminasi, dan inkremen/dekremen.
- Mampu menghindari jebakan Infinite Loop (perulangan tanpa henti).
- Memahami perbedaan mendasar antara `while` dan `do...while`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Perulangan `while` seperti **naik bus trans umum berbayar di gerbang**: kondektur memeriksa tiket Anda di pintu masuk bus. Jika tidak punya tiket, Anda langsung dilarang masuk (0 kali jalan). Sedangkan `do...while` seperti **makan di restoran prasmanan**: Anda boleh mengambil dan mencicipi makanan dulu 1 piring, baru kemudian kasir memeriksa tagihan Anda di pintu keluar.

Perulangan `while` digunakan ketika kita ingin mengeksekusi suatu blok kode secara berulang-ulang **selama suatu kondisi bernilai `true`**.

### 3 Komponen Wajib Pengulangan:

1. **Nilai Awal (Inisialisasi)**: Menentukan titik mulai counter.
2. **Kondisi Terminasi**: Pengecekan kondisi yang menentukan kapan loop harus berhenti.
3. **Penambahan (Increment / Decrement)**: Mengubah nilai variabel counter agar suatu saat kondisi terminasi bernilai `false`.

### Perbedaan `while` vs `do...while`:

- **`while`**: Mengecek kondisi **di awal**. Jika kondisi awal sudah `false`, blok kode tidak akan pernah dijalankan sama sekali (0 kali).
- **`do...while`**: Mengecek kondisi **di akhir**. Blok kode dijamin akan dieksekusi **minimal satu kali**, meskipun kondisinya `false` sejak awal.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Perulangan While Standar ---');
let nilaiAwal = 1;

while (nilaiAwal <= 5) {
  console.log(`Angkot No. ${nilaiAwal} beroperasi dengan baik.`);
  nilaiAwal++; // Wajib: agar loop tidak berjalan selamanya (infinite loop)
}

console.log('\n--- 2. Perbedaan dengan Do-While ---');
let angkaUji = 10;

// Meskipun angkaUji sudah > 5 sejak awal, do-while tetap jalan 1 kali:
do {
  console.log(`Nilai dalam do-while: ${angkaUji} (dieksekusi minimal 1x)`);
  angkaUji++;
} while (angkaUji < 5);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Perulangan While Standar ---
Angkot No. 1 beroperasi dengan baik.
Angkot No. 2 beroperasi dengan baik.
Angkot No. 3 beroperasi dengan baik.
Angkot No. 4 beroperasi dengan baik.
Angkot No. 5 beroperasi dengan baik.

--- 2. Perbedaan dengan Do-While ---
Nilai dalam do-while: 10 (dieksekusi minimal 1x)
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Membaca Stream Data Jaringan**: Membaca paket data yang masuk dari koneksi socket selama stream belum ditutup (`while (stream.hasData())`).
2. **Retry Mechanism**: Mengulang kembali panggilan request API maksimal 3 kali jika server sedang sibuk.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Menuliskan Inkremen (Infinite Loop)**: Jika Anda lupa menulis `nilaiAwal++`, kondisi `nilaiAwal <= 5` akan selamanya bernilai `true`, mengakibatkan CPU komputer melonjak ke 100% dan tab browser menjadi _Not Responding_.

### 🌟 Best Practice

- Selalu pastikan ada jaminan bahwa kondisi terminasi akan tercapai.
- Gunakan `while` saat jumlah perulangan tidak diketahui secara pasti sebelumnya (misal menunggu input user atau membaca antrean).

---

## 6. ✍️ Latihan Mandiri

1. Buatlah program hitung mundur dari angka 10 hingga 1 menggunakan perulangan `while`, lalu cetak 'Waktu Habis!' di akhir.
2. Gunakan `do...while` untuk meminta input angka jika pengguna memasukkan angka negatif.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Template Literals](../../03-template-literals/README.md)
- ➡️ **Selanjutnya:** [04.2 - Pengulangan For](../02-for/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
