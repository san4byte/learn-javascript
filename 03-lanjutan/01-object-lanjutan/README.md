# 01 - Object Lanjutan (Prototype Inheritance & ES6 Class)

## Tujuan Belajar
- Memahami inefisiensi memori method pada constructor function biasa.
- Mengoptimasi penggunaan memori dengan `Object.create()`.
- Memahami mekanisme pewarisan prototipe (*Prototype Inheritance*).
- Menguasai penulisan cetak biru objek modern dengan sintaks ES6 `class`.

## Penjelasan Konsep
1. **Masalah Constructor Biasa**: Setiap kali objek baru diinstansiasi (`new`), method di dalamnya ikut diduplikasi ke memori, memboroskan RAM.
2. **`Object.create(parentObject)`**: Menghubungkan objek baru ke objek referensi sehingga method tidak perlu diduplikasi.
3. **Prototype (`Mahasiswa.prototype`)**: Menyimpan method di satu tempat sentral (*prototype object*). Semua instance akan mewarisi dan mereferensikan method yang sama via rantai prototipe (`__proto__`).
4. **ES6 `class`**: Gula sintaks (*syntactic sugar*) modern di atas sistem prototype agar lebih mudah dibaca dan mirip dengan bahasa OOP lain (seperti Java/PHP).

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pembuatan objek tingkat lanjut: Prototype dan ES6 Class

class Mahasiswa {
  constructor(nama, energi) {
    this.nama = nama;
    this.energi = energi;
  }

  makan(porsi) {
    this.energi += porsi;
    return `hallo ${this.nama}, selamat makan`;
  }

  main(jam) {
    this.energi -= jam;
    return `hallo ${this.nama}, selamat main`;
  }
}

let samsul = new Mahasiswa("joko", 20);
console.log(samsul.makan(5));
console.log(samsul.main(2));
```

### Output
```text
hallo joko, selamat makan
hallo joko, selamat main
```

## Penjelasan Tambahan
- **Under The Hood ES6 Class**:
  Meskipun kita menulis `class Mahasiswa`, di balik layar JavaScript tetap mengeksekusi sistem prototipe yang sama persis: `Mahasiswa.prototype.makan = function(...)`.
- **Inheritance dengan `extends` dan `super()`**:
  ES6 Class memungkinkan pewarisan kelas turunan dengan sangat bersih:
  ```javascript
  class MahasiswaS2 extends Mahasiswa {
    constructor(nama, energi, tesis) {
      super(nama, energi);
      this.tesis = tesis;
    }
  }
  ```

---
[⬅️ Materi Sebelumnya: 02-DOM Image Gallery](../../02-dom/09-latihan-image-gallery/README.md) | [Materi Selanjutnya: 02 - Closures ➡️](../02-closures/README.md)
