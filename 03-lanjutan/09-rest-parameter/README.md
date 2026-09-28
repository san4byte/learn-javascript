# 09 - Rest Parameter (`...`)

## Tujuan Belajar
- Memahami konsep pengumpulan sisa argumen menggunakan Rest Parameter (`...args`).
- Membedakan fungsi Rest Parameter dengan Spread Operator.
- Mengetahui keunggulan Rest Parameter dibanding objek semu `arguments`.
- Mengombinasikan Rest Parameter dengan Destructuring Assignment.

## Penjelasan Konsep
Rest parameter memungkinkan fungsi untuk menerima argumen dalam jumlah tak terbatas dan otomatis membungkusnya ke dalam sebuah **Array sejati**. Rest parameter harus selalu diletakkan di posisi parameter paling terakhir dari fungsi.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Rest Parameter: menangani argumen tak terbatas ke dalam bentuk array

function jmlAngka(...angka) {
  return angka.reduce((a, b) => a + b, 0);
}
console.log("Total penjumlahan:", jmlAngka(1, 2, 3, 4, 5));

const kelompok = ["joko", "santoso", "samsul", "adi", "roy"];
const [ketua, wakil, ...anggota] = kelompok;
console.log("Ketua:", ketua);
console.log("Wakil:", wakil);
console.log("Anggota:", anggota);
```

### Output
```text
Total penjumlahan: 15
Ketua: joko
Wakil: santoso
Anggota: [ 'samsul', 'adi', 'roy' ]
```

---
[⬅️ Materi Sebelumnya: 08 - Spread Operator](../08-spread-operator/README.md) | [Materi Selanjutnya: 10 - Asynchronous Intro ➡️](../10-asynchronous-intro/README.md)
