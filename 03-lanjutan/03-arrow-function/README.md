# 03 - Arrow Function

## Tujuan Belajar
- Menguasai sintaks ringkas Arrow Function (`=>`).
- Memahami *Implicit Return* untuk fungsi satu baris.
- Memahami perbedaan krusial konteks `this` antara fungsi biasa dan arrow function (*Lexical this*).

## Penjelasan Konsep
Arrow Function diperkenalkan pada ES6 sebagai alternatif penulisan *Function Expression* yang lebih ringkas dan elegan:
- Satu parameter tidak membutuhkan tanda kurung: `nama => ...`
- Satu baris ekspresi tidak membutuhkan kurung kurawal `{}` maupun keyword `return` (*implicit return*): `nama => \`hallo \${nama}\``
- **Perbedaan `this`**: Arrow function **tidak memiliki konteks `this` sendiri**! Ia tidak mengikat `this`, melainkan mencarinya dari cakupan leksikal di luar dirinya.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Arrow function: sintaks ringkas dan implisit return

const tampilNama = (nama) => `hallo ${nama}`;
console.log(tampilNama("joko"));

const tampilLengkap = (nama, waktu) => `hallo ${nama} selamat ${waktu}`;
console.log(tampilLengkap("joko", "malam"));

let mhs = ["joko", "santoso", "ayam b"];
let jumlahHuruf = mhs.map((nama) => nama.length);
console.log(jumlahHuruf);
```

### Output
```text
hallo joko
hallo joko selamat malam
[ 4, 7, 6 ]
```

## Penjelasan Tambahan
- **Kapan JANGAN Menggunakan Arrow Function**:
  1. Pada method objek jika butuh mengakses properti objek via `this` (karena `this` akan lari ke global window).
  2. Sebagai constructor function (tidak bisa dipanggil dengan `new`).
  3. Pada event listener jika Anda butuh keyword `this` untuk menunjuk ke elemen DOM yang diklik (gunakan fungsi biasa `function(e) { this... }`).

---
[⬅️ Materi Sebelumnya: 02 - Closures](../02-closures/README.md) | [Materi Selanjutnya: 04 - Higher-Order Functions ➡️](../04-higher-order-functions/README.md)
