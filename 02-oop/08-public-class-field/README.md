# 08 - Public Class Field

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendeklarasikan properti publik langsung di body class tanpa harus menuliskannya di constructor.
> - **Kapan Digunakan**: Menentukan state awal atau default value suatu objek secara bersih dan mudah dibaca.
> - **Aturan Praktis**: Tulis nama field dan nilainya langsung di dalam body class: `field = nilai;`.

## 1. 🎯 Tujuan Belajar

- Memahami fitur modern JavaScript: **Class Field**.
- Mendeklarasikan properti publik langsung di dalam badan class tanpa harus selalu di dalam `constructor()`.
- Menetapkan nilai bawaan (_default value_) pada properti class secara deklaratif.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **formulir pendaftaran cetak**: Kolom-kolom formulir (Nama Depan, Saldo Awal, Status Akun) sudah tercetak rapi sejak awal. Kertas formulir sudah memiliki slot yang jelas bahkan sebelum nasabah mulai mengisinya.

Sebelum ada fitur Class Field (ES2022), semua properti wajib dideklarasikan di dalam method `constructor()` menggunakan `this.namaProperty`.
Dengan **Public Class Field**:

1. Properti dapat didefinisikan langsung di badan class di luar constructor.
2. Bisa dideklarasikan tanpa nilai awal (menghasilkan `undefined`) atau langsung diberikan nilai default (misalnya `balance = 0`).
3. Properti ini bersifat **public**, artinya bisa dibaca dan dimodifikasi secara bebas dari luar class oleh siapa saja.

---

## 3. 💻 Contoh Kode (`example.js`)

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

const joko = new Customer('Joko', 'Santoso', 100000);
console.info(joko);
console.info('Saldo Joko:', joko.balance);
joko.sayHello('Budi');

const anonim = new Customer();
console.info(anonim);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
Customer { firstName: 'Joko', lastName: 'Santoso', balance: 100000 }
Saldo Joko: 100000
Halo Budi, nama saya Joko Santoso
Customer { firstName: undefined, lastName: undefined, balance: 0 }
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Menentukan state default pada komponen UI modern, konfigurasi timeout HTTP request, atau pendefinisian skema entity.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Field Menempel pada Instance, Bukan Prototype**: Class field disalin ke setiap objek yang dibuat, berbeda dengan method class yang disimpan terpusat di prototype.
- **Eksekusi Sebelum Constructor**: Public field diinisialisasi sebelum kode di dalam `constructor()` dijalankan.

### 🌟 Best Practice

- Gunakan public class field untuk mendokumentasikan properti apa saja yang dimiliki class di baris paling atas.
- Berikan nilai default yang masuk akal jika ada.

---

## 6. ✍️ Latihan Mandiri

1. Buat class `Mobil` dengan public field `kecepatan = 0` dan `mesinAktif = false`. Buat method `nyalakanMesin()` yang mengubah `mesinAktif` menjadi `true`.
2. Apa bedanya mendeklarasikan `balance = 0` di badan class dibanding `this.balance = 0` di constructor?

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07 - Getter dan Setter](../07-getter-setter/README.md)
- ➡️ **Selanjutnya:** [09 - Private Class Field](../09-private-class-field/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
