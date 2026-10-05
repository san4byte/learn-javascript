# 09.5 - Object Lanjutan: Prototype Inheritance dan Object.create

## 1. 🎯 Tujuan Belajar
- Memahami konsep Prototype Inheritance di balik layar JavaScript.
- Memahami efisiensi memori dari meletakkan method di dalam Prototype daripada Constructor.
- Memahami fungsi `Object.create()` dalam menghubungkan rantai prototype.

---

## 2. 📖 Penjelasan Konsep
JavaScript adalah bahasa berbasis **Prototype-based Inheritance** (Pewarisan Berbasis Prototipe).

Setiap objek di JavaScript memiliki properti tersembunyi bernama `[[Prototype]]` (dapat diakses via `__proto__` atau `Object.getPrototypeOf()`) yang menunjuk ke objek prototipe induknya.

### Mengapa Meletakkan Method di Prototype?
Jika Anda mendefinisikan method di dalam tubuh constructor function:
```javascript
function Mahasiswa(nama) {
  this.nama = nama;
  this.makan = function() { ... }; // DUPLIKASI MEMORI!
}
```
Setiap kali Anda membuat 10.000 objek mahasiswa dengan `new`, fungsi `makan` akan diduplikasi sebanyak 10.000 kali di memori RAM!

Dengan menaruhnya di **`Mahasiswa.prototype.makan`**, fungsi tersebut hanya ada **SATU di memori** dan dipakai bersama (*shared*) oleh seluruh objek mahasiswa.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Prototype Inheritance Klasik ---");
function Robot(nama, energi) {
  this.nama = nama;
  this.energi = energi;
}

// Menempelkan method ke Prototype (Hanya dibuat 1 kali di memori!)
Robot.prototype.bekerja = function (jam) {
  this.energi -= jam * 10;
  console.log(`${this.nama} bekerja selama ${jam} jam. Sisa energi: ${this.energi}%`);
};

Robot.prototype.isiUlang = function (tambah) {
  this.energi += tambah;
  console.log(`${this.nama} mengisi ulang baterai. Energi saat ini: ${this.energi}%`);
};

const optimus = new Robot("Optimus Prime", 100);
const bumblebee = new Robot("Bumblebee", 80);

optimus.bekerja(3);
bumblebee.isiUlang(15);

// Membuktikan kedua objek berbagi method yang sama:
console.log("Apakah berbagi method prototype yang sama?", optimus.bekerja === bumblebee.bekerja); // true

console.log("\n--- 2. Pewarisan dengan Object.create() ---");
const cetakanInduk = {
  sapa() {
    return `Halo dari ${this.nama}`;
  }
};

// Membuat objek baru yang mewarisi langsung dari cetakanInduk
const anakRobot = Object.create(cetakanInduk);
anakRobot.nama = "MiniBot";
console.log(anakRobot.sapa());
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Prototype Inheritance Klasik ---
Optimus Prime bekerja selama 3 jam. Sisa energi: 70%
Bumblebee mengisi ulang baterai. Energi saat ini: 95%
Apakah berbagi method prototype yang sama? true

--- 2. Pewarisan dengan Object.create() ---
Halo dari MiniBot
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Prototype seperti **cetak biru rancangan pabrik umum**: pabrik menyimpan satu lembar cetak biru petunjuk penggunaan mobil di arsip pusat. Setiap mobil yang dijual ke konsumen tidak perlu membawa pabriknya, melainkan hanya membawa buku referensi yang menunjuk ke cetak biru pusat tersebut.

### 🏢 Real-World Use Case
1. **Method Bawaan Array & String**: Kenapa semua array memiliki method `.map()`, `.filter()`, `.push()`? Karena method tersebut disimpan di `Array.prototype`!
2. **Pondasi Sintaks Class ES6**: Sintaks modern `class` dan `extends` yang telah Anda pelajari di Modul 05 sebenarnya adalah *syntactic sugar* di atas Prototype ini.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Mengutak-atik Prototype Bawaan (Monkey Patching)**: Menambahkan method baru secara langsung ke `Array.prototype` atau `Object.prototype` sangat dilarang di industri karena dapat merusak library lain dan menimbulkan bug kompatibilitas masa depan.

### 🌟 Best Practice
* Selalu tempatkan method di dalam prototype (atau di dalam tubuh `class`) alih-alih di dalam constructor untuk menghemat memori.
* Untuk proyek modern, gunakan sintaks `class` yang lebih intuitif namun tetap pahami bahwa cara kerjanya di balik layar adalah Prototype.

---

## 6. ✍️ Latihan Mandiri
1. Buat constructor `Kendaraan(kecepatan)` dan tambahkan method `tambahKecepatan(nilai)` pada `Kendaraan.prototype`.
2. Buat objek `sepedaMotor` dan uji penambahan kecepatannya.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [09.4 - Destructuring & Spread Object](../04-destructuring-spread/README.md)
- ➡️ **Selanjutnya:** [09.6 - Latihan Angkot Berbasis Objek](../06-practice-angkot-object/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
