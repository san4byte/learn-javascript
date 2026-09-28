# 02 - Closures dan Lexical Scope

## Tujuan Belajar
- Memahami konsep fase eksekusi: *Creation Phase* dan *Execution Phase*.
- Memahami konsep *Lexical Scope* (lingkup leksikal).
- Memahami definisi Closure dan mengapa fungsi bisa "mengingat" lingkungannya.
- Mengimplementasikan Closure untuk *Factory Function* dan *Private Variable*.

## Penjelasan Konsep
**Closure** adalah kombinasi antara sebuah fungsi dan lingkungan leksikal (*lexical environment*) di mana fungsi tersebut dideklarasikan.
Closure terjadi ketika:
1. Sebuah fungsi bersarang (*inner function*) mengacu pada variabel di fungsi luarnya (*outer function*).
2. Fungsi luar tersebut selesai dieksekusi dan mengembalikan (*return*) fungsi dalam.
3. Fungsi dalam tetap memiliki akses ke variabel fungsi luar tersebut meskipun eksekusi fungsi luar sudah selesai dari Call Stack!

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Lexical scope dan closure untuk private variable

function ucapSalam(waktu) {
  return function (nama) {
    console.log(`halo ${nama}, selamat ${waktu}, semoga harimu menyenangkan`);
  };
}

let selamatPagi = ucapSalam("pagi");
selamatPagi("joko");

// Private Variable menggunakan IIFE (Immediately Invoked Function Expression)
let add = (function () {
  let counter = 0; // Private: tidak bisa diubah langsung dari luar
  return function () {
    return ++counter;
  };
})();

console.log(add()); // 1
console.log(add()); // 2
console.log(add()); // 3
```

### Output
```text
halo joko, selamat pagi, semoga harimu menyenangkan
1
2
3
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti membawa ransel bekal saat pergi tamasya: Meskipun Anda sudah meninggalkan rumah (fungsi luar selesai), Anda tetap membawa bekal di ransel Anda ke mana pun Anda pergi (closure).
- **Kapan Closure Digunakan di Dunia Nyata**:
  - Menyembunyikan data rahasia (*encapsulation / private data*).
  - Membuat *function factory* (misal pembuat format mata uang atau generator ID unik).
  - Menjaga state di framework modern (seperti cara kerja React `useState`).

---
[⬅️ Materi Sebelumnya: 01 - Object Lanjutan](../01-object-lanjutan/README.md) | [Materi Selanjutnya: 03 - Arrow Function ➡️](../03-arrow-function/README.md)
