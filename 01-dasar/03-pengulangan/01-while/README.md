# 03.1 - Pengulangan (While Loop)

## Tujuan Belajar
- Memahami struktur logika perulangan `while`.
- Mengetahui peran inisialisasi, kondisi terminasi, dan inkremen (*step counter*).
- Menghindari bug fatal *Infinite Loop*.

## Penjelasan Konsep
Perulangan `while` mengevaluasi kondisi logika sebelum mengeksekusi blok kode di dalamnya. Jika kondisi menghasilkan `true`, blok kode dijalankan. Proses ini berulang terus-menerus hingga kondisi bernilai `false`.
Komponen wajib dalam loop berbasis counter:
1. **Nilai Awal (Inisialisasi)**: Menentukan titik awal hitungan (misal `var nilaiAwal = 1`).
2. **Kondisi Terminasi**: Batasan agar perulangan tahu kapan harus berhenti (misal `nilaiAwal <= 10`).
3. **Penambah / Pengurang (Step)**: Mengubah nilai counter setiap putaran agar mendekati kondisi berhenti (misal `nilaiAwal++`).

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pengulangan while dihentikan oleh program
var nilaiAwal = 1;
while (nilaiAwal <= 10) {
  console.log("hello world " + nilaiAwal + "x");
  nilaiAwal++;
}
```

### Output
```text
hello world 1x
hello world 2x
hello world 3x
hello world 4x
hello world 5x
hello world 6x
hello world 7x
hello world 8x
hello world 9x
hello world 10x
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti menyiram tanaman di kebun: "Selama tangki air belum kosong (`while (air > 0)`), terus siram tanaman dan kurangi air di tangki (`air--`)".
- **Kapan Menggunakan While Loop**:
  Gunakan `while` ketika **jumlah perulangan belum pasti** di awal dan bergantung pada suatu kondisi dinamis (misalnya menunggu input spesifik dari pengguna atau membaca stream data).
- **Kesalahan Umum Pemula**:
  Lupa menuliskan `nilaiAwal++`. Tanpa baris ini, `nilaiAwal` akan selamanya bernilai `1`, sehingga kondisi `1 <= 10` selalu `true` dan menyebabkan browser atau terminal *freeze* (*infinite loop*).

## Latihan
1. Buat perulangan `while` yang mencetak angka mundur dari 10 sampai 1.
2. Buat perulangan `while` yang mencetak kelipatan 5 dari 5 hingga 50.

## Ringkasan Poin Penting
- `while` mengecek kondisi di awal sebelum menjalankan perintah.
- Selalu pastikan ada instruksi pengubah kondisi di dalam blok loop agar tidak terjadi infinite loop.

---
[⬅️ Materi Sebelumnya: 02 - Variabel](../../02-variabel/README.md) | [Materi Selanjutnya: 03.2 - Pengulangan For ➡️](../02-for/README.md)
