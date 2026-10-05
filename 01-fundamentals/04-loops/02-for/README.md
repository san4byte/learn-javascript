# 04.2 - Pengulangan: For Loop

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami sintaks ringkas perulangan `for`.
> - **Kapan Digunakan**: Mampu menggunakan perulangan `for` untuk iterasi data dengan rentang angka pasti.
> - **Aturan Praktis**: Gunakan `for` saat jumlah langkah pengulangan sudah diketahui secara pasti.

## 1. 🎯 Tujuan Belajar

- Memahami sintaks ringkas perulangan `for`.
- Mampu menggunakan perulangan `for` untuk iterasi data dengan rentang angka pasti.
- Memahami penggunaan keyword `break` dan `continue` untuk mengontrol alur loop.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Perulangan `for` seperti **jadwal minum obat**: Dokter memberi instruksi yang jelas: mulai dari hari ke-1, minum 1 butir setiap hari, sampai hari ke-5. Anda sudah tahu persis sejak awal bahwa aksi ini dilakukan 5 kali.

Perulangan `for` adalah bentuk perulangan yang paling populer saat kita **sudah mengetahui secara pasti berapa kali perulangan akan dilakukan**.

Ketiga komponen perulangan (inisialisasi, kondisi, inkremen) ditulis dalam satu baris header:

```javascript
for (inisialisasi; kondisi; inkremen) {
  // kode yang diulang
}
```

### Keyword Kontrol Alur:

- **`break`**: Menghentikan paksa seluruh proses perulangan seketika dan keluar dari blok loop.
- **`continue`**: Menghentikan hanya iterasi yang sedang berjalan saat ini, lalu melompat langsung ke iterasi berikutnya.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Perulangan For Standar ---');
for (let i = 1; i <= 5; i++) {
  console.log(`Tiket antrean ke-${i}`);
}

console.log('\n--- 2. Penggunaan continue dan break ---');
for (let i = 1; i <= 6; i++) {
  if (i === 3) {
    console.log(`[LEWATI]: Antrean ${i} tidak hadir (continue)`);
    continue; // Lewati sisa kode di bawah, langsung lanjut ke i = 4
  }

  if (i === 5) {
    console.log(`[BERHENTI]: Kuota harian habis pada antrean ${i} (break)`);
    break; // Hentikan loop total
  }

  console.log(`Melayani nasabah nomor ${i}`);
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Perulangan For Standar ---
Tiket antrean ke-1
Tiket antrean ke-2
Tiket antrean ke-3
Tiket antrean ke-4
Tiket antrean ke-5

--- 2. Penggunaan continue dan break ---
Melayani nasabah nomor 1
Melayani nasabah nomor 2
[LEWATI]: Antrean 3 tidak hadir (continue)
Melayani nasabah nomor 4
[BERHENTI]: Kuota harian habis pada antrean 5 (break)
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Menghitung Nilai Rata-rata**: Melakukan iterasi indeks array angka dari 0 sampai panjang array untuk menjumlahkan total nilai ujian.
2. **Pencarian Awal (Search First Match)**: Menggunakan `break` segera setelah barang yang dicari ditemukan dalam daftar agar tidak membuang waktu memproses sisa data.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Off-by-One Error**: Kesalahan meletakkan tanda `<` atau `<=`. Menulis `i < 10` akan berhenti di 9, sedangkan `i <= 10` akan berjalan sampai 10.
- **Menggunakan `var` di Header Loop**: Jangan gunakan `for (var i = 0; ...)`. Selalu gunakan `for (let i = 0; ...)` agar variabel counter terisolasi di tiap putaran.

### 🌟 Best Practice

- Gunakan `for` saat jumlah langkah pengulangan sudah diketahui secara pasti.
- Gunakan nama variabel `i`, `j`, `k` hanya untuk counter loop sederhana yang pendek. Jika loop panjang atau kompleks, gunakan nama yang deskriptif seperti `indexBaris`.

---

## 6. ✍️ Latihan Mandiri

1. Buat perulangan `for` yang hanya mencetak bilangan genap dari 2 sampai 20.
2. Buat perulangan dari 1 sampai 10, tetapi lewati (skip) angka 5 dan 7 menggunakan `continue`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04.1 - While Loop](../01-while/README.md)
- ➡️ **Selanjutnya:** [04.3 - Pengulangan Bersarang](../03-nested-loops/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
