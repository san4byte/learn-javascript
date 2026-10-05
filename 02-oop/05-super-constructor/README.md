# 05 - Super Constructor

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memanggil constructor parent class dari dalam child class menggunakan fungsi `super()`.
> * **Kapan Digunakan**: Saat child class mendefinisikan `constructor` sendiri dan perlu menginisialisasi data parent.
> * **Aturan Praktis**: `super()` WAJIB dipanggil sebelum mengakses keyword `this` di constructor turunan.

## 1. 🎯 Tujuan Belajar
- Memahami fungsi kata kunci **`super()`** di dalam constructor child class.
- Mengetahui aturan wajib pemanggilan `super()` sebelum mengakses `this`.
- Meneruskan argumen dari child class ke parent constructor.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **mengisi formulir pendaftaran bertingkat**: Sebelum petugas mencetak nomor kartu mahasiswa khusus (data child), formulir data kependudukan dasar (nama, tanggal lahir) dari dinas kependudukan parent harus diselesaikan terlebih dahulu melalui `super()`.

Ketika child class memiliki constructor sendiri, constructor tersebut **wajib** memanggil constructor milik parent class menggunakan fungsi **`super(...)`**:
1. `super(...)` berfungsi mengeksekusi logika constructor class induk agar properti milik induk terinisialisasi dengan benar.
2. **Aturan Mutlak**: Pemanggilan `super()` **harus berada di baris pertama** sebelum mengakses kata kunci `this`. Jika Anda mengakses `this` sebelum memanggil `super()`, JavaScript akan melempar `ReferenceError: Must call super constructor in derived class before accessing 'this'`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Memanggil constructor parent class dengan 'super()'

class Employee {
  constructor(firstName) {
    this.firstName = firstName;
  }

  sayHello(name) {
    console.log(`Halo ${name}, nama saya ${this.firstName} (Karyawan)`);
  }
}

class Manager extends Employee {
  constructor(firstName, lastName) {
    // Wajib panggil super() sebelum mengakses keyword 'this'
    super(firstName);
    this.lastName = lastName;
  }

  sayHello(name) {
    console.log(`Halo ${name}, nama saya ${this.firstName} ${this.lastName} (Manager)`);
  }
}

const budi = new Employee("Budi");
budi.sayHello("Joko");

const eko = new Manager("Eko", "Khannedy");
eko.sayHello("Joko");
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Halo Joko, nama saya Budi (Karyawan)
Halo Joko, nama saya Eko Khannedy (Manager)
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Menginisialisasi konfigurasi dasar HTTP Client (seperti base URL dan auth headers) di parent sebelum menambahkan endpoint khusus di subclass.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **ReferenceError Sebelum `super()`**: Mengakses `this.property` sebelum memanggil `super()` akan memicu crash fatal: `ReferenceError: Must call super constructor in derived class before accessing 'this'`.
* **Lupa Meneruskan Argumen**: Tidak meneruskan argumen penting dari child ke `super(arg1, arg2)` sehingga properti parent bernilai `undefined`.

### 🌟 Best Practice
* Letakkan pemanggilan `super(...)` selalu di baris pertama blok `constructor` anak.
* Teruskan semua parameter wajib yang diminta parent class.

---

## 6. ✍️ Latihan Mandiri
1. Buat class `Kendaraan(merek, roda)` lalu buat child class `Mobil(merek, tipeBahanBakar)`. Gunakan `super(merek, 4)` untuk menginisialisasi roda mobil selalu bernilai 4.
2. Coba letakkan `this.lastName = lastName;` sebelum baris `super(firstName);` dan amati pesan error yang muncul di console.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04 - Class Inheritance](../04-class-inheritance/README.md)
- ➡️ **Selanjutnya:** [06 - Super Method](../06-super-method/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
