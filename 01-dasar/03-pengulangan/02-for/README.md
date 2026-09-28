# 03.2 - Pengulangan (For Loop)

## Tujuan Belajar
- Memahami struktur sintaks loop `for` yang ringkas.
- Membedakan use case antara `for` dan `while`.
- Mengetahui alur eksekusi loop `for` langkah demi langkah.

## Penjelasan Konsep
Loop `for` menggabungkan tiga komponen utama pengulangan ke dalam satu baris deklarasi yang rapi:
`for (inisialisasi; kondisi; inkremen) { // statement }`
Alur eksekusinya:
1. Inisialisasi dijalankan **sekali** di awal.
2. Kondisi diuji. Jika `true`, blok statement dieksekusi.
3. Inkremen dijalankan setelah statement selesai.
4. Kembali ke langkah 2 sampai kondisi bernilai `false`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pengulangan menggunakan for
for (var nilaiAwal = 1; nilaiAwal <= 10; nilaiAwal++) {
  console.log("hello world " + nilaiAwal + "x");
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
- **Kapan Menggunakan For Loop**:
  Gunakan `for` ketika **jumlah perulangan sudah diketahui secara pasti** (misalnya mengulang sebanyak 10 kali atau sepanjang panjang array `arr.length`).
- **Best Practice Modern**:
  Gunakan keyword `let` pada inisialisasi counter (`for (let i = 0; i < n; i++)`) agar variabel counter tidak bocor ke luar cakupan loop.

## Latihan
1. Tulis loop `for` untuk mencetak bilangan genap saja dari 2 sampai 20.
2. Hitung jumlah total angka dari 1 sampai 100 menggunakan satu perulangan `for`.

## Ringkasan Poin Penting
- Sintaks `for` lebih ringkas dan meminimalkan risiko lupa menuliskan inkremen.
- Selalu gunakan `let` untuk counter loop.

---
[⬅️ Materi Sebelumnya: 03.1 - Pengulangan While](../01-while/README.md) | [Materi Selanjutnya: 03.3 - Pengulangan Bersarang ➡️](../03-pengulangan-bersarang/README.md)
