# 04 - Class Inheritance (Pewarisan Kelas)

## Tujuan Belajar
- Memahami konsep pilar OOP: **Inheritance (Pewarisan)**.
- Menggunakan kata kunci **`extends`** untuk menurunkan sifat class induk (*parent*) ke class anak (*child*).
- Memahami konsep pewarisan method dan hierarki kelas.

## Penjelasan Konsep
Inheritance memungkinkan kita membuat class baru yang mewarisi seluruh properti dan method dari class yang sudah ada:
1. **Parent Class (Superclass)**: Kelas dasar yang mewariskan (contoh: `Employee`).
2. **Child Class (Subclass)**: Kelas turunan yang mewarisi menggunakan sintaks:
   `class Manager extends Employee { ... }`
3. Seluruh method yang ada di class induk otomatis tersedia dan dapat dipanggil oleh objek milik class anak tanpa perlu menulis ulang kodenya.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pewarisan Class menggunakan kata kunci 'extends'

class Employee {
  sayHello(name) {
    console.log(`Halo ${name}, saya karyawan biasa.`);
  }
}

class Manager extends Employee {
  sayHello(name) {
    console.log(`Halo ${name}, saya adalah Manager.`);
  }
}

const budi = new Employee();
budi.sayHello("Joko");

const eko = new Manager();
eko.sayHello("Joko");
```

### Output
```text
Halo Joko, saya karyawan biasa.
Halo Joko, saya adalah Manager.
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Hubungan orang tua dan anak: Anak mewarisi ciri fisik orang tua (warna mata, bentuk wajah), tetapi anak juga bisa memiliki keahlian atau ciri unik tersendiri yang tidak dimiliki orang tuanya.
- **Prinsip Reusability**:
  Inheritance mencegah duplikasi kode (*Don't Repeat Yourself*). Semua logika umum diletakkan di parent class, sedangkan child class hanya mendefinisikan hal-hal yang spesifik.

## Latihan
1. Buat parent class `Animal` dengan method `makan()`. Lalu buat child class `Cat extends Animal` dengan method tambahan `meow()`.
2. Buktikan bahwa objek kucing dari class `Cat` dapat memanggil kedua method tersebut (`makan()` dan `meow()`).

## Ringkasan Poin Penting
- Gunakan `extends` untuk mewariskan class.
- Child class otomatis memiliki semua method milik parent class.

---
[⬅️ Materi Sebelumnya: 03 - Class](../03-class/README.md) | [Materi Selanjutnya: 05 - Super Constructor ➡️](../05-super-constructor/README.md)
