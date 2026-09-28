# 03.1 - Pengulangan (While Loop)

## Tujuan Belajar
- Memahami struktur sintaks pengulangan `while`.
- Mengetahui cara kerja kondisi terminasi dan counter iterasi.
- Mencegah terjadinya infinite loop.

## Penjelasan Konsep
Pengulangan `while` mengevaluasi kondisi sebelum blok kode dijalankan. Jika kondisi bernilai `true`, blok kode akan terus dieksekusi sampai kondisi bernilai `false`.
Penghentian dapat dilakukan via:
1. Aksi interaksi pengguna (misal konfirmasi `confirm()`).
2. Counter yang diatur oleh program (`nilaiAwal++`).

## Contoh Kode
```javascript
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
...
hello world 10x
```
