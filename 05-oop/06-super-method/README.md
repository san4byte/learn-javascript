# 06 - Super Method (Method Overriding & Super)

## Tujuan Belajar
- Memahami konsep **Method Overriding** (menimpa method induk di kelas anak).
- Mengakses method asli milik parent class menggunakan **`super.namaMethod()`**.
- Mengombinasikan logika parent class dengan logika tambahan di child class.

## Penjelasan Konsep
1. **Method Overriding**: Saat child class mendeklarasikan method dengan nama yang persis sama dengan method di parent class, maka method anak akan menimpa (*override*) method induk saat dipanggil dari instance anak.
2. **Kata Kunci `super` untuk Method**: Terkadang kita tidak ingin membuang seluruh logika parent, melainkan ingin menjalankannya terlebih dahulu sebelum menjalankan kode baru. Kita dapat memanggil method induk tersebut menggunakan sintaks:
   `super.namaMethod()`

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Mengakses method milik parent class yang telah dioverride menggunakan 'super.namaMethod()'

class Shape {
  paint() {
    console.log("Menggambar bentuk Shape dasar");
  }
}

class Circle extends Shape {
  paint() {
    // Memanggil method paint milik parent class (Shape)
    super.paint();
    // Menambahkan aksi khusus milik Circle
    console.log("Menggambar lingkaran Circle");
  }
}

const lingkaran = new Circle();
lingkaran.paint();
```

### Output
```text
Menggambar bentuk Shape dasar
Menggambar lingkaran Circle
```

## Penjelasan Tambahan
- **Kapan Menggunakan Super Method?**:
  Sangat sering digunakan saat proses penyimpanan data atau hook event (misalnya di framework frontend seperti React atau library backend). Class induk menangani validasi atau koneksi database dasar via `super.save()`, sementara class anak menambahkan logging atau audit trail.

## Latihan
1. Buat class `Notifikasi` dengan method `kirim(pesan)`. Buat child class `EmailNotifikasi` yang menimpa method `kirim` dengan memanggil `super.kirim(pesan)` lalu menambahkan pesan "Terkirim melalui protokol SMTP".

## Ringkasan Poin Penting
- Method overriding menimpa method induk pada kelas anak.
- Gunakan `super.namaMethod()` untuk tetap memanfaatkan method asli milik parent class.

---
[⬅️ Materi Sebelumnya: 05 - Super Constructor](../05-super-constructor/README.md) | [Materi Selanjutnya: 07 - Getter dan Setter ➡️](../07-getter-setter/README.md)
