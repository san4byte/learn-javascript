# 07 - Getter dan Setter

## Tujuan Belajar
- Memahami konsep pilar OOP: **Encapsulation (Enkapsulasi)**.
- Menggunakan kata kunci **`get`** untuk membuat properti virtual terhitung (*computed property*).
- Menggunakan kata kunci **`set`** untuk memvalidasi dan memproses data sebelum disimpan.
- Membedakan cara pemanggilan getter/setter (sebagai properti) dibanding method biasa.

## Penjelasan Konsep
Getter dan Setter memungkinkan kita mengontrol cara data suatu objek dibaca dan dimanipulasi:
1. **Getter (`get namaProperty()`)**: Method yang bertindak seperti properti saat dibaca. Mengembalikan nilai yang diformat atau dihitung secara dinamis. Dipanggil **tanpa tanda kurung `()`**, contoh: `person.fullName`.
2. **Setter (`set namaProperty(value)`)**: Method yang otomatis dipicu ketika properti diberi nilai baru (`person.fullName = "Nilai Baru"`). Sangat ideal untuk melakukan validasi input sebelum mengubah data asli objek.

## Contoh Kode
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
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts.slice(1).join(" ");
  }
}

const joko = new Person("Joko", "Santoso");
console.log(joko.fullName); // Memanggil getter (tanpa tanda kurung ())

// Mengubah nilai menggunakan setter
joko.fullName = "Eko Kurniawan Khannedy";
console.log(joko.fullName);
console.log(joko.firstName);
console.log(joko.lastName);
```

### Output
```text
Joko Santoso
Eko Kurniawan Khannedy
Eko
Kurniawan Khannedy
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti termometer pintar:
  - Saat Anda melihat display suhu (Getter), ia bisa menampilkan dalam Celcius atau Fahrenheit sesuai format yang Anda minta.
  - Saat Anda menyetel batas suhu ruangan (Setter), sistem memvalidasi dulu apakah angka suhu yang dimasukkan masuk akal (misal tidak boleh di bawah minus 50 derajat).
- **Kesalahan Fatal: Infinite Loop / Call Stack Exceeded**:
  Jika nama getter/setter sama persis dengan nama properti internal di constructor tanpa pembeda, maka `this.nama = value` di dalam setter akan memanggil setter itu sendiri tanpa henti!
  Solusi: gunakan nama properti penampung yang berbeda (misal `this._nama` atau private field `#nama`).

## Latihan
1. Buat class `RekeningBank` dengan properti `saldo`. Buat getter `saldoFormat` yang mengembalikan saldo berformat Rupiah, dan setter `tambahSaldo` yang menolak jika angka yang disetor bernilai negatif atau nol.

## Ringkasan Poin Penting
- `get` digunakan untuk membaca nilai terhitung seolah-olah properti biasa.
- `set` digunakan untuk validasi saat mengubah nilai.
- Keduanya dipanggil tanpa tanda kurung `()`.

---
[⬅️ Materi Sebelumnya: 06 - Super Method](../06-super-method/README.md) | [Materi Selanjutnya: 08 - Public Class Field (Besok) ➡️](../08-public-class-field/README.md)
