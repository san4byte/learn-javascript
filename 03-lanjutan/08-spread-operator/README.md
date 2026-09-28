# 08 - Spread Operator (`...`)

## Tujuan Belajar
- Memahami fungsi penyebaran (*unpacking*) elemen iterable dengan sintaks tiga titik `...`.
- Menggabungkan dua atau lebih array secara mudah dan fleksibel.
- Melakukan penyalinan array secara aman (*shallow copy*).
- Mengonversi NodeList dari DOM menjadi Array sejati.

## Penjelasan Konsep
Spread operator memecah (*spreads*) elemen-elemen dari suatu iterable (array atau string) menjadi elemen individual tunggal.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Spread Operator: menyebarkan iterable menjadi elemen tunggal

const mhs = ["joko", "adi", "samsul"];
const dosen = ["pak budi", "bu siti"];

const gabung = [...mhs, "aji", ...dosen];
console.log("Gabungan array:", gabung);

const mhsCopy = [...mhs];
mhsCopy[0] = "tono";
console.log("Array copy:", mhsCopy);
console.log("Array asli tetap aman:", mhs);
```

### Output
```text
Gabungan array: [ 'joko', 'adi', 'samsul', 'aji', 'pak budi', 'bu siti' ]
Array copy: [ 'tono', 'adi', 'samsul' ]
Array asli tetap aman: [ 'joko', 'adi', 'samsul' ]
```

---
[⬅️ Materi Sebelumnya: 07 - For of dan For in](../07-for-of-for-in/README.md) | [Materi Selanjutnya: 09 - Rest Parameter ➡️](../09-rest-parameter/README.md)
