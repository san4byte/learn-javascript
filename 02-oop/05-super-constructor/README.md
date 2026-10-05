# 05 - Super Constructor

## Tujuan Belajar
- Memahami fungsi kata kunci **`super()`** di dalam constructor child class.
- Mengetahui aturan wajib pemanggilan `super()` sebelum mengakses `this`.
- Meneruskan argumen dari child class ke parent constructor.

## Penjelasan Konsep
Ketika child class memiliki constructor sendiri, constructor tersebut **wajib** memanggil constructor milik parent class menggunakan fungsi **`super(...)`**:
1. `super(...)` berfungsi mengeksekusi logika constructor class induk agar properti milik induk terinisialisasi dengan benar.
2. **Aturan Mutlak**: Pemanggilan `super()` **harus berada di baris pertama** sebelum mengakses kata kunci `this`. Jika Anda mengakses `this` sebelum memanggil `super()`, JavaScript akan melempar `ReferenceError: Must call super constructor in derived class before accessing 'this'`.

## Contoh Kode
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

### Output
```text
Halo Joko, nama saya Budi (Karyawan)
Halo Joko, nama saya Eko Khannedy (Manager)
```

## Penjelasan Tambahan
- **Jika Child Class Tidak Punya Constructor**:
  Jika child class tidak mendeklarasikan constructor, JavaScript otomatis membuat constructor default yang memanggil `super(...args)`. Namun jika child class membuat constructor kustom, pemanggilan `super()` menjadi wajib secara eksplisit.

## Latihan
1. Buat class `Kendaraan(merek, roda)` lalu buat child class `Mobil(merek, tipeBahanBakar)`. Gunakan `super(merek, 4)` untuk menginisialisasi roda mobil selalu bernilai 4.
2. Coba letakkan `this.lastName = lastName;` sebelum baris `super(firstName);` dan amati pesan error yang muncul di console.

## Ringkasan Poin Penting
- `super()` memanggil constructor kelas induk.
- Wajib dipanggil sebelum menyentuh kata kunci `this` di child class.

---
[⬅️ Materi Sebelumnya: 04 - Class Inheritance](../04-class-inheritance/README.md) | [Materi Selanjutnya: 06 - Super Method ➡️](../06-super-method/README.md)
