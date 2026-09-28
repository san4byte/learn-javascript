# 08.3 - Konsep Keyword `this`

## Tujuan Belajar
- Memahami definisi dan fungsi keyword khusus `this` di JavaScript.
- Mengetahui bagaimana nilai `this` ditentukan saat runtime (*call site*).
- Membedakan nilai `this` pada fungsi biasa, method objek, dan konstruktor.

## Penjelasan Konsep
Keyword `this` merepresentasikan konteks eksekusi saat suatu kode dipanggil:
1. **Fungsi Deklarasi Biasa**: `this` mengembalikan objek global (`window` di browser, atau `global`/`globalThis` di Node.js).
2. **Method Objek**: `this` mengembalikan objek pemilik tempat method tersebut dipanggil.
3. **Constructor Function (dengan `new`)**: `this` mengembalikan instance objek yang baru saja diinstansiasi.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Perilaku keyword 'this' pada berbagai konteks

// 1. Function Declaration (this = global/window)
function halo() {
  console.log("this pada function biasa:", this === globalThis);
}
halo();

// 2. Object Literal (this = objek pemilik)
let obj = {
  nama: "joko",
  halo: function () {
    console.log("this pada method objek:", this.nama);
  },
};
obj.halo();

// 3. Constructor Function (this = instance objek baru)
function HaloConstructor(nama) {
  this.nama = nama;
}
let objBaru = new HaloConstructor("budi");
console.log("this pada instance baru:", objBaru.nama);
```

### Output
```text
this pada function biasa: true
this pada method objek: joko
this pada instance baru: budi
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Kata ganti "Saya" dalam percakapan:
  - Jika Joko yang berbicara: "Saya lapar" $ightarrow$ "Saya" merujuk ke Joko.
  - Jika Samsul yang berbicara: "Saya lapar" $ightarrow$ "Saya" merujuk ke Samsul.
  Nilai `this` berubah tergantung siapa yang sedang mengeksekusi instruksi tersebut.
- **Catatan Arrow Function**:
  Arrow function (`() => {}`) **tidak memiliki konteks `this` sendiri**; ia mewarisi `this` secara leksikal dari cakupan induknya (dibahas mendalam di materi Javascript Lanjutan).

## Latihan
1. Tulis kode objek `persegi` dengan properti `sisi` dan method `hitungLuas()` yang memanfaatkan `this.sisi`.
2. Apa yang akan dicetak jika kita membuat fungsi `tes()` yang mencetak `this` dalam *Strict Mode* (`"use strict";`)?

## Ringkasan Poin Penting
- Nilai `this` tidak ditentukan saat fungsi ditulis, melainkan saat fungsi **dipanggil**.
- Pada method objek, `this` menunjuk ke objek pemiliknya.

---
[⬅️ Materi Sebelumnya: 08.2 - Tiga Cara Membuat Object](../02-membuat-object/README.md) | [Materi Selanjutnya: 08.4 - Latihan Angkot dengan Object ➡️](../04-latihan-angkot-object/README.md)
