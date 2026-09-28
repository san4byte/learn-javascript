# 04.1 - Pengkondisian (If Else)

## Tujuan Belajar
- Memahami konsep logika percabangan biner (dua jalur keputusan).
- Menggunakan operator pembanding (`<=`, `===`, `!==`).
- Menggabungkan struktur pengkondisian di dalam perulangan loop.

## Penjelasan Konsep
Percabangan `if...else` mengevaluasi suatu kondisi boolean:
- Jika kondisi bernilai `true`, maka blok di dalam kurung kurawal `if` akan dieksekusi.
- Jika kondisi bernilai `false`, maka blok di dalam kurung kurawal `else` yang akan dieksekusi sebagai jalur alternatif.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pengkondisian if else untuk status angkot
let jmlAngkot = 10;
let angkotBeroprasi = 6;

for (let noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
  if (noAngkot <= angkotBeroprasi) {
    console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
  }
}
```

### Output
```text
Angkot No. 1 beroprasi dengan baik.
Angkot No. 2 beroprasi dengan baik.
Angkot No. 3 beroprasi dengan baik.
Angkot No. 4 beroprasi dengan baik.
Angkot No. 5 beroprasi dengan baik.
Angkot No. 6 beroprasi dengan baik.
Angkot No. 7 sedang tidak beroprasi
Angkot No. 8 sedang tidak beroprasi
Angkot No. 9 sedang tidak beroprasi
Angkot No. 10 sedang tidak beroprasi
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti persimpangan rel kereta: Jika tuas diarahkan ke kiri (`true`), kereta melaju ke stasiun A. Jika tidak (`false`), kereta melaju ke stasiun B.
- **Kesalahan Umum Pemula**:
  Menggunakan operator penugasan tunggal `=` alih-alih pembanding `==` atau `===`. Menulis `if (x = 5)` akan menimpa nilai `x` menjadi 5 dan selalu dianggap `true`!
- **Best Practice**:
  Gunakan selalu *strict equality* `===` untuk membandingkan nilai beserta tipe datanya tanpa konversi tipe otomatis yang membingungkan.

## Latihan
1. Buat program yang memeriksa umur pengguna via prompt: jika umur >= 17 tampilkan "Boleh membuat SIM", jika kurang tampilkan "Belum cukup umur".
2. Ubah kode status angkot di atas agar hanya mencetak nomor angkot yang genap saja yang beroperasi.

## Ringkasan Poin Penting
- `if...else` memberikan jalur eksekusi cadangan ketika kondisi utama tidak terpenuhi.
- Selalu gunakan `===` dan `!==` untuk pengecekan kondisi yang akurat.

---
[⬅️ Materi Sebelumnya: 03.3 - Pengulangan Bersarang](../../03-pengulangan/03-pengulangan-bersarang/README.md) | [Materi Selanjutnya: 04.2 - Pengkondisian Else If ➡️](../02-else-if/README.md)
