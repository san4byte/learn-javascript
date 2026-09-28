# 06 - Destructuring Assignment

## Tujuan Belajar
- Memahami teknik pembongkaran elemen array ke variabel individual.
- Memahami pembongkaran properti objek ke variabel terpisah.
- Menetapkan nilai bawaan (*default value*) dan alias nama variabel.
- Menukar nilai variabel (*swap variables*) dalam satu baris.

## Penjelasan Konsep
Destructuring assignment adalah sintaks ekspresi yang memungkinkan ekstraksi data dari array atau properti dari objek langsung ke dalam variabel-variabel berbeda secara instan.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Destructuring Assignment pada Array dan Object

const coba = ["satu", "dua", "tiga"];
const [a, , c] = coba;
console.log("Array destructuring:", a, c);

let y = 1, z = 2;
[y, z] = [z, y];
console.log("Swap variables:", y, z);

const mhs = {
  nama: "joko santoso",
  umur: 20,
};
const { nama, umur } = mhs;
console.log("Object destructuring:", nama, umur);
```

### Output
```text
Array destructuring: satu tiga
Swap variables: 2 1
Object destructuring: joko santoso 20
```

---
[⬅️ Materi Sebelumnya: 05 - Template Literals](../05-template-literals/README.md) | [Materi Selanjutnya: 07 - For of dan For in ➡️](../07-for-of-for-in/README.md)
