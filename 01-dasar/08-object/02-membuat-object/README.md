# 08.2 - Tiga Cara Membuat Object

## Tujuan Belajar
- Memahami cara membuat objek via Object Literal.
- Memahami cara membuat objek via Function Declaration.
- Memahami cara membuat objek via Constructor Function dengan keyword `new`.

## Penjelasan Konsep
1. **Object Literal**: Cocok untuk satu objek sederhana.
2. **Function Declaration**: Fungsi pembantu yang mereturn objek baru.
3. **Constructor Function**: Cetak biru (blueprint) menggunakan keyword `this` dan dipanggil dengan `new`.

## Contoh Kode
```javascript
function Mahasiswa(nama, energi) {
  this.nama = nama;
  this.energi = energi;
}
let mhs = new Mahasiswa("Joko", 20);
console.log(mhs);
```

### Output
`Mahasiswa { nama: 'Joko', energi: 20 }`
