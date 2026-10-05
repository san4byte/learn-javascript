# 04 - Class Inheritance (Pewarisan Kelas)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mewariskan seluruh properti dan method dari parent class ke child class menggunakan kata kunci `extends`.
> * **Kapan Digunakan**: Menghindari duplikasi kode (*DRY*) saat membuat varian khusus dari suatu konsep umum.
> * **Aturan Praktis**: Gunakan sintaks `class Child extends Parent`.

## 1. 🎯 Tujuan Belajar
- Memahami konsep pilar OOP: **Inheritance (Pewarisan)**.
- Menggunakan kata kunci **`extends`** untuk menurunkan sifat class induk (*parent*) ke class anak (*child*).
- Memahami konsep pewarisan method dan hierarki kelas.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **pewarisan sifat dan DNA orang tua ke anak**: Seorang anak mewarisi ciri fisik dasar dan golongan darah dari orang tua, namun anak tersebut juga bisa memiliki bakat dan hobi unik sendiri tanpa mengubah orang tuanya.

Inheritance memungkinkan kita membuat class baru yang mewarisi seluruh properti dan method dari class yang sudah ada:
1. **Parent Class (Superclass)**: Kelas dasar yang mewariskan (contoh: `Employee`).
2. **Child Class (Subclass)**: Kelas turunan yang mewarisi menggunakan sintaks:
   `class Manager extends Employee { ... }`
3. Seluruh method yang ada di class induk otomatis tersedia dan dapat dipanggil oleh objek milik class anak tanpa perlu menulis ulang kodenya.

---

## 3. 💻 Contoh Kode (`example.js`)
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
budi.sayHello('Joko');

const eko = new Manager();
eko.sayHello('Joko');
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Halo Joko, saya karyawan biasa.
Halo Joko, saya adalah Manager.
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Membangun hierarki peran pengguna (misal `class Admin extends User`), atau komponen UI (misal `class IconButton extends Button`).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Pewarisan Terlalu Dalam (*Deep Hierarchy*)**: Membuat turunan kelas hingga 5-6 lapis ke bawah membuat alur kode sulit dilacak (*fragile base class problem*).
* **Hubungan Tidak Tepat**: Menerapkan `extends` pada objek yang tidak memiliki hubungan 'is-a' murni.

### 🌟 Best Practice
* Utamakan komposisi (*composition*) di atas pewarisan kompleks jika hubungan antar objek bukan merupakan turunan langsung.
* Jaga hierarki inheritance tetap dangkal (1-2 level).

---

## 6. ✍️ Latihan Mandiri
1. Buat parent class `Animal` dengan method `makan()`. Lalu buat child class `Cat extends Animal` dengan method tambahan `meow()`.
2. Buktikan bahwa objek kucing dari class `Cat` dapat memanggil kedua method tersebut (`makan()` dan `meow()`).

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [03 - Class](../03-class/README.md)
- ➡️ **Selanjutnya:** [05 - Super Constructor](../05-super-constructor/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
