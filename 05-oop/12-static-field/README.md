# 12 - Static Field

## Tujuan Belajar
- Memahami konsep **Static Field** di JavaScript Class.
- Membedakan antara properti instance (milik objek) dan properti statis (milik class).
- Mengetahui cara mengakses dan mengubah static field.

## Penjelasan Konsep
Kata kunci **`static`** sebelum nama field menandakan bahwa field tersebut menjadi milik **Class itu sendiri**, bukan milik instance objek yang dibuat dengan `new`:
1. Static field disimpan langsung pada objek constructor fungsi/class di memori.
2. Tidak dapat diakses melalui objek hasil `new` (`objek.staticField` menghasilkan `undefined`).
3. Diakses langsung menggunakan nama kelasnya: `NamaClass.namaField`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Static Field (Properti milik Class, bukan milik instance objek)

class Configuration {
  static name = "Centinela";
  static version = 1.0;
  static author = "Joko Santoso";
}

const config = new Configuration();
console.info(config.name); // undefined

console.info(Configuration.name); // Centinela
Configuration.name = "Rekap Uang";
console.info(Configuration.name); // Rekap Uang
```

### Output
```text
undefined
Centinela
Rekap Uang
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Populasi manusia di bumi: Setiap orang (instance) memiliki nama, tinggi badan, dan warna mata masing-masing (instance field). Namun informasi "Berapa total populasi manusia di bumi saat ini?" adalah properti statis milik spesies `Manusia` secara global (`Manusia.totalPopulasi`), bukan milik orang perorangan.
- **Kapan Digunakan di Proyek Nyata**:
  - Menyimpan konstanta konfigurasi aplikasi (seperti URL dasar API, versi aplikasi).
  - Menyimpan cache data bersama atau penghitung total objek yang telah dibuat.

## Latihan
1. Buat class `User` dengan static field `totalUser = 0`. Setiap kali constructor `User` dipanggil dengan `new User()`, tingkatkan `User.totalUser++`.

## Ringkasan Poin Penting
- Static field menempel pada Class, bukan pada instance objek.
- Panggil langsung via `NamaClass.field`.

---
[⬅️ Materi Sebelumnya: 11 - Operator instanceof](../11-operator-instanceof/README.md) | [Materi Selanjutnya: 13 - Static Method ➡️](../13-static-method/README.md)
