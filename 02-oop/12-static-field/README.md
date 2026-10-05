# 12 - Static Field

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mendefinisikan properti yang menempel langsung pada class, bukan pada instance objek.
> * **Kapan Digunakan**: Menyimpan konstanta konfigurasi aplikasi, cache bersama, atau penghitung total objek.
> * **Aturan Praktis**: Tambahkan kata kunci `static` di depan nama field: `static versi = '1.0';`.

## 1. 🎯 Tujuan Belajar
- Memahami konsep **Static Field** di JavaScript Class.
- Membedakan antara properti instance (milik objek) dan properti statis (milik class).
- Mengetahui cara mengakses dan mengubah static field.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **data sensus populasi dunia**: Setiap manusia (instance) memiliki nama, tinggi badan, dan nomor KTP masing-masing. Namun informasi 'Berapa total populasi manusia di bumi saat ini?' adalah properti statis milik kategori `Manusia` secara global (`Manusia.totalPopulasi`), bukan milik orang perorangan.

Kata kunci **`static`** sebelum nama field menandakan bahwa field tersebut menjadi milik **Class itu sendiri**, bukan milik instance objek yang dibuat dengan `new`:
1. Static field disimpan langsung pada objek constructor fungsi/class di memori.
2. Tidak dapat diakses melalui objek hasil `new` (`objek.staticField` menghasilkan `undefined`).
3. Diakses langsung menggunakan nama kelasnya: `NamaClass.namaField`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Static Field (Properti milik Class, bukan milik instance objek)

class Configuration {
  static name = 'Centinela';
  static version = 1.0;
  static author = 'Joko Santoso';
}

const config = new Configuration();
console.info(config.name); // undefined

console.info(Configuration.name); // Centinela
Configuration.name = 'Rekap Uang';
console.info(Configuration.name); // Rekap Uang
```

---

## 4. 🖥️ Output yang Diharapkan
```text
undefined
Centinela
Rekap Uang
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Menyimpan konfigurasi umum seperti `AppConfig.API_ENDPOINT` atau cache objek global.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Diakses Lewat Instance Menghasilkan Undefined**: Memanggil `instance.staticField` menghasilkan `undefined`. Anda wajib memanggilnya lewat nama class: `NamaClass.staticField`.

### 🌟 Best Practice
* Gunakan static field untuk data yang sifatnya tunggal (*singleton*) dan berlaku global untuk semua instance.
* Kombinasikan dengan huruf kapital (`static DEFAULT_TIMEOUT = 5000`) untuk nilai konstanta.

---

## 6. ✍️ Latihan Mandiri
1. Buat class `User` dengan static field `totalUser = 0`. Setiap kali constructor `User` dipanggil dengan `new User()`, tingkatkan `User.totalUser++`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [11 - Operator instanceof](../11-instanceof-operator/README.md)
- ➡️ **Selanjutnya:** [13 - Static Method](../13-static-method/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
