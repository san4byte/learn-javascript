# 06 - Super Method (Method Overriding & Super)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memanggil method milik parent class dari dalam method child class menggunakan `super.methodName()`.
> * **Kapan Digunakan**: Saat subclass ingin memperluas (*extend*) fungsionalitas parent tanpa menghapus logika aslinya.
> * **Aturan Praktis**: Panggil `super.methodName()` untuk mempertahankan logika dasar, lalu tambahkan kode baru di bawahnya.

## 1. 🎯 Tujuan Belajar
- Memahami konsep **Method Overriding** (menimpa method induk di kelas anak).
- Mengakses method asli milik parent class menggunakan **`super.namaMethod()`**.
- Mengombinasikan logika parent class dengan logika tambahan di child class.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **kustomisasi resep masakan warisan**: Seorang koki memasak menu utama menggunakan racikan bumbu asli orang tuanya (`super.masak()`), lalu menambahkan topping saus keju mozzarella spesial sebagai sentuhan inovasi modern.

1. **Method Overriding**: Saat child class mendeklarasikan method dengan nama yang persis sama dengan method di parent class, maka method anak akan menimpa (*override*) method induk saat dipanggil dari instance anak.
2. **Kata Kunci `super` untuk Method**: Terkadang kita tidak ingin membuang seluruh logika parent, melainkan ingin menjalankannya terlebih dahulu sebelum menjalankan kode baru. Kita dapat memanggil method induk tersebut menggunakan sintaks:
   `super.namaMethod()`

---

## 3. 💻 Contoh Kode (`example.js`)
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

---

## 4. 🖥️ Output yang Diharapkan
```text
Menggambar bentuk Shape dasar
Menggambar lingkaran Circle
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Menambahkan audit log otomatis saat menyimpan data, atau menambahkan validasi spesifik sebelum memanggil method penyimpanan dasar `super.save()`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Memanggil `super.method()` Saat Override**: Jika child class hanya bermaksud menambah fitur tetapi lupa memanggil `super.method()`, logika dasar milik parent akan tertimpa seutuhnya (*completely overridden*).
* **Salah Konteks `super`**: Mengira `super` bisa dipanggil sembarangan di luar class body.

### 🌟 Best Practice
* Gunakan method overriding untuk memperkaya fungsionalitas, bukan untuk membatalkan perilaku parent yang sudah mapan.
* Beri komentar jika suatu method sengaja menimpa logika parent secara total.

---

## 6. ✍️ Latihan Mandiri
1. Buat class `Notifikasi` dengan method `kirim(pesan)`. Buat child class `EmailNotifikasi` yang menimpa method `kirim` dengan memanggil `super.kirim(pesan)` lalu menambahkan pesan "Terkirim melalui protokol SMTP".

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - Super Constructor](../05-super-constructor/README.md)
- ➡️ **Selanjutnya:** [07 - Getter dan Setter](../07-getter-setter/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
