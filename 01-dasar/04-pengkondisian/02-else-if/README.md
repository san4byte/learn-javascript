# 04.2 - Pengkondisian (Else If)

## Tujuan Belajar
- Menangani lebih dari dua alternatif kondisi.
- Memahami evaluasi kondisi berurutan dari atas ke bawah.

## Penjelasan Konsep
Ketika terdapat banyak kemungkinan cabang logika, `else if` digunakan untuk menguji kondisi berikutnya secara beruntun jika kondisi sebelumnya tidak terpenuhi.

## Contoh Kode
```javascript
let angka = prompt("masukkan angka:");
if (angka % 2 == 0) {
  alert(angka + " adalah bilangan GENAP");
} else if (angka % 2 == 1) {
  alert(angka + " adalah bilangan GANJIL");
} else {
  alert("Yang anda masukkan bukan angka!!!");
}
```

### Output
Menampilkan popup peringatan apakah angka yang dimasukkan genap, ganjil, atau bukan bilangan numerik.
