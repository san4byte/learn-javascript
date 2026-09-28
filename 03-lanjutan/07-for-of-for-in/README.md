# 07 - Perulangan Modern: For..of dan For..in

## Tujuan Belajar
- Memahami perbedaan mendasar antara perulangan `for..of` dan `for..in`.
- Menggunakan `for..of` untuk struktur data *Iterable* (Array, String, NodeList, arguments).
- Menggunakan `for..in` untuk enumerasi properti objek (*Enumerable*).

## Penjelasan Konsep
- **`for (const item of iterable)`**: Mengambil **nilai (value)** dari objek yang dapat diiterasi (Array, String, Set, Map, NodeList). Mendukung keyword `break` dan `continue`.
- **`for (const key in object)`**: Mengambil **kunci properti (key / index)** dari suatu objek.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Perulangan modern: for..of (iterable) dan for..in (properti objek)

const mhs = ["joko", "adi", "samsul"];
for (const [i, m] of mhs.entries()) {
  console.log(`${i + 1}. ${m}`);
}

const nama = "joko";
for (const n of nama) {
  console.log("Karakter:", n);
}

const mahasiswa = {
  nama: "joko santoso",
  umur: 20,
  email: "joko@gmail.com",
};
for (const prop in mahasiswa) {
  console.log(`${prop}: ${mahasiswa[prop]}`);
}
```

### Output
```text
1. joko
2. adi
3. samsul
Karakter: j
Karakter: o
Karakter: k
Karakter: o
nama: joko santoso
umur: 20
email: joko@gmail.com
```

---
[⬅️ Materi Sebelumnya: 06 - Destructuring Assignment](../06-destructuring/README.md) | [Materi Selanjutnya: 08 - Spread Operator ➡️](../08-spread-operator/README.md)
