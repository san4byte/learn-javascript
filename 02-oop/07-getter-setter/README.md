# 07 - Getter dan Setter

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengontrol cara membaca (`get`) dan mengubah (`set`) properti objek dengan method khusus bergaya properti.
> - **Kapan Digunakan**: Melakukan validasi otomatis sebelum menyimpan nilai baru atau membuat properti komputasi dinamis.
> - **Aturan Praktis**: Gunakan nama variabel penyimpanan internal yang berbeda (misal `_nama` atau `#nama`) agar tidak infinite loop.

## 1. 🎯 Tujuan Belajar

- Memahami konsep pilar OOP: **Encapsulation (Enkapsulasi)**.
- Menggunakan kata kunci **`get`** untuk membuat properti virtual terhitung (_computed property_).
- Menggunakan kata kunci **`set`** untuk memvalidasi dan memproses data sebelum disimpan.
- Membedakan cara pemanggilan getter/setter (sebagai properti) dibanding method biasa.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **termometer digital pintar**: Saat Anda melihat layar display (Getter), ia memformat angka ke dalam satuan Celsius atau Fahrenheit; saat Anda menyetel batas suhu alarm (Setter), sistem memvalidasi dulu agar angka berada dalam rentang aman.

Getter dan Setter memungkinkan kita mengontrol cara data suatu objek dibaca dan dimanipulasi:

1. **Getter (`get namaProperty()`)**: Method yang bertindak seperti properti saat dibaca. Mengembalikan nilai yang diformat atau dihitung secara dinamis. Dipanggil **tanpa tanda kurung `()`**, contoh: `person.fullName`.
2. **Setter (`set namaProperty(value)`)**: Method yang otomatis dipicu ketika properti diberi nilai baru (`person.fullName = "Nilai Baru"`). Sangat ideal untuk melakukan validasi input sebelum mengubah data asli objek.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Getter dan Setter di JavaScript Class

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Getter: membaca properti dengan format tertentu seolah-olah properti biasa
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter: memvalidasi dan mengubah properti saat diberi nilai baru
  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts.slice(1).join(' ');
  }
}

const joko = new Person('Joko', 'Santoso');
console.log(joko.fullName); // Memanggil getter (tanpa tanda kurung ())

// Mengubah nilai menggunakan setter
joko.fullName = 'Eko Kurniawan Khannedy';
console.log(joko.fullName);
console.log(joko.firstName);
console.log(joko.lastName);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
Joko Santoso
Eko Kurniawan Khannedy
Eko
Kurniawan Khannedy
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Validasi format email atau nomor telepon sebelum disimpan ke database, serta komputasi nama lengkap (`fullName`) dari `firstName` dan `lastName`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Fatal Infinite Recursion**: Menamai getter/setter sama persis dengan nama variabel di dalamnya (`set name(val) { this.name = val; }`) menyebabkan browser/terminal crash dengan error `RangeError: Maximum call stack size exceeded`.

### 🌟 Best Practice

- Selalu gunakan penampung internal dengan prefix garis bawah (misal `this._properti`) atau private field `#properti`.
- Jangan meletakkan proses asinkron atau komputasi yang memakan waktu lama di dalam getter.

---

## 6. ✍️ Latihan Mandiri

1. Buat class `RekeningBank` dengan properti `saldo`. Buat getter `saldoFormat` yang mengembalikan saldo berformat Rupiah, dan setter `tambahSaldo` yang menolak jika angka yang disetor bernilai negatif atau nol.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - Super Method](../06-super-method/README.md)
- ➡️ **Selanjutnya:** [08 - Public Class Field](../08-public-class-field/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
