# 08 - Public Class Field

## Tujuan Belajar
- Memahami fitur modern JavaScript: **Class Field**.
- Mendeklarasikan properti publik langsung di dalam badan class tanpa harus selalu di dalam `constructor()`.
- Menetapkan nilai bawaan (*default value*) pada properti class secara deklaratif.

## Penjelasan Konsep
Sebelum ada fitur Class Field (ES2022), semua properti wajib dideklarasikan di dalam method `constructor()` menggunakan `this.namaProperty`.
Dengan **Public Class Field**:
1. Properti dapat didefinisikan langsung di badan class di luar constructor.
2. Bisa dideklarasikan tanpa nilai awal (menghasilkan `undefined`) atau langsung diberikan nilai default (misalnya `balance = 0`).
3. Properti ini bersifat **public**, artinya bisa dibaca dan dimodifikasi secara bebas dari luar class oleh siapa saja.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Public Class Field (Mendeklarasikan properti langsung di badan class)

class Customer {
  firstName;
  lastName;
  balance = 0; // Nilai default

  constructor(firstName, lastName, balance = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
  }

  sayHello(name) {
    console.info(`Halo ${name}, nama saya ${this.firstName} ${this.lastName}`);
  }
}

const joko = new Customer("Joko", "Santoso", 100000);
console.info(joko);
console.info("Saldo Joko:", joko.balance);
joko.sayHello("Budi");

const anonim = new Customer();
console.info(anonim);
```

### Output
```text
Customer { firstName: 'Joko', lastName: 'Santoso', balance: 100000 }
Saldo Joko: 100000
Halo Budi, nama saya Joko Santoso
Customer { firstName: undefined, lastName: undefined, balance: 0 }
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti formulir pendaftaran fisik dengan kolom-kolom yang sudah tercetak rapi sejak awal (Nama Depan, Nama Belakang, Saldo Awal). Formulir sudah memiliki slot yang jelas bahkan sebelum calon nasabah mengisinya.
- **Kapan Dipakai di Proyek Nyata**:
  Sangat sering dipakai untuk menentukan state awal pada class komponen UI, default configuration objek, atau pendefinisian skema model entity database.
- **Perbedaan Field vs Prototype Method**:
  Class field menempel langsung pada **setiap instance objek** (sama seperti `this.property`), sedangkan method class menempel di **prototype**.

## Latihan
1. Buat class `Mobil` dengan public field `kecepatan = 0` dan `mesinAktif = false`. Buat method `nyalakanMesin()` yang mengubah `mesinAktif` menjadi `true`.
2. Apa bedanya mendeklarasikan `balance = 0` di badan class dibanding `this.balance = 0` di constructor?

## Ringkasan Poin Penting
- Public Class Field membuat struktur properti class lebih rapi dan terlihat jelas di awal file.
- Properti publik dapat diakses langsung oleh objek via dot notation (`obj.balance`).

---
[⬅️ Materi Sebelumnya: 07 - Getter dan Setter](../07-getter-setter/README.md) | [Materi Selanjutnya: 09 - Private Class Field ➡️](../09-private-class-field/README.md)
