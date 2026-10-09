# 12 - Static Field

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendefinisikan properti yang menempel langsung pada fungsi constructor kelas itu sendiri, bukan pada setiap objek (_instance_) yang dihasilkan oleh `new`.
> - **Kapan Digunakan**: Menyimpan konstanta konfigurasi global, data cache bersama (_shared state_), atau penghitung total objek yang telah dibuat.
> - **Aturan Praktis**: Tambahkan kata kunci `static` di depan nama field: `static NAMA_FIELD = nilaiAwal;`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Static Field** di JavaScript modern ES2022.
- Membedakan alokasi memori antara properti instance (_milik objek_) dan properti statis (_milik class_).
- Mengetahui cara mengakses dan memanipulasi static field langsung melalui nama kelas.
- Mengetahui cara mengakses static field dari dalam method instance menggunakan `this.constructor`.
- Memahami bagaimana static field otomatis diwariskan ke subclass (_Static Inheritance_).
- Menerapkan pola desain _Instance Counter_ dan _Enum / Constants Grouping_.
- Menguasai fitur modern **Static Initialization Block** (`static { ... }`).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **data sensus kependudukan global**: Setiap manusia (_instance_) memiliki nama, tinggi badan, dan nomor KTP unik masing-masing. Namun informasi mengenai "Berapa total populasi manusia di bumi saat ini?" adalah atribut statis milik spesies `Manusia` secara global (`Manusia.totalPopulasi`), bukan atribut perorangan.

---

### 1. Tabel Ringkasan Fitur Static Field (Cheat-Sheet)

| Fitur / Pola                   | Sintaks                 | Cara Akses               | Karakteristik Utama                                   |
| :----------------------------- | :---------------------- | :----------------------- | :---------------------------------------------------- |
| **Static Field Dasar**         | `static NAMA = val;`    | `Class.NAMA`             | Melekat langsung pada objek class constructor.        |
| **Akses via Instance**         | `inst.NAMA`             | Menghasilkan `undefined` | Static field tidak ada di prototype instance.         |
| **Akses dari Instance Method** | `this.constructor.NAMA` | Dinamis via constructor  | Merujuk ke static field kelas pembentuk instance.     |
| **Static Inheritance**         | `Subclass.NAMA`         | Diwariskan otomatis      | Subclass dapat membaca static field milik superclass. |
| **Static Init Block**          | `static { ... }`        | Dijalankan saat load     | Menjalankan logika kompleks untuk inisialisasi class. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja static field beserta skenario kasusnya:

---

#### 1. Deklarasi Dasar Static Field

Static field dideklarasikan dengan kata kunci `static` langsung di badan kelas:

```javascript
class KonfigurasiApp {
  static NAMA = 'Portal Utama';
  static VERSI = '1.0.0';
}

console.log(KonfigurasiApp.NAMA); // "Portal Utama"
console.log(KonfigurasiApp.VERSI); // "1.0.0"
```

---

#### 2. Akses Melalui Class vs Instance Objek

Static field **tidak disalin** ke objek hasil `new`. Mengaksesnya lewat instance menghasilkan `undefined`:

```javascript
const app = new KonfigurasiApp();
console.log(app.NAMA); // undefined ❌ (Bukan milik instance)
console.log(KonfigurasiApp.NAMA); // "Portal Utama" ✅ (Milik class)
```

---

#### 3. Mengakses Static Field dari dalam Instance Method

Di dalam method instance, `this` merujuk ke instance. Untuk membaca static field, gunakan `this.constructor` atau nama class langsung:

```javascript
class Tiket {
  static BIAYA_ADMIN = 5000;

  constructor(hargaDasar) {
    this.hargaDasar = hargaDasar;
  }

  hitungTotal() {
    // Mengakses static field dari dalam method:
    return this.hargaDasar + this.constructor.BIAYA_ADMIN;
  }
}

const t = new Tiket(50000);
console.log(t.hitungTotal()); // 55000
```

---

#### 4. Pewarisan Static Field pada Subclass (Static Inheritance)

JavaScript mendukung pewarisan statis: Subclass secara otomatis mewarisi static field milik superclass:

```javascript
class SuperService {
  static TIMEOUT = 3000;
}

class AuthService extends SuperService {}

console.log(AuthService.TIMEOUT); // 3000 (Diwarisi dari SuperService!)
```

---

#### 5. Pola Desain: Instance Counter (Pelacak Total Objek)

Static field sangat berguna untuk menghitung berapa banyak instance yang telah dibuat sepanjang aplikasi berjalan:

```javascript
class Pengguna {
  static total = 0;

  constructor(nama) {
    this.nama = nama;
    Pengguna.total++; // Tingkatkan counter global setiap kali new dipanggil
  }
}

new Pengguna('Andi');
new Pengguna('Budi');
console.log(Pengguna.total); // 2
```

---

#### 6. Pola Desain: Enum / Konstanta Nilai Tetap

Sebelum TypeScript enum populer, static field adalah cara standar OOP JavaScript untuk mengelompokkan nilai status yang valid:

```javascript
class StatusTransaksi {
  static PENDING = 'MENUNGGU';
  static SUKSES = 'BERHASIL';
  static GAGAL = 'GAGAL';
}

let statusSaatIni = StatusTransaksi.SUKSES;
```

---

#### 7. Static Initialization Block (`static { ... }`)

ES2022 memperkenalkan blok inisialisasi statis yang memungkinkan penanganan error `try...catch` atau logika bercabang saat class pertama kali didefinisikan:

```javascript
class Database {
  static KONEKSI_AKTIF;

  static {
    try {
      this.KONEKSI_AKTIF = true; // Inisialisasi awal
    } catch (e) {
      this.KONEKSI_AKTIF = false;
    }
  }
}

console.log(Database.KONEKSI_AKTIF); // true
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep static field di atas—mulai dari deklarasi dasar, pembuktian akses class vs instance, akses via `this.constructor`, pewarisan statis, pelacak total instance, konstanta status, hingga static initialization block—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/12-static-field/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konfigurasi Global Aplikasi**: Menyimpan pengaturan server seperti `ServerConfig.DEFAULT_PORT` atau `AppConfig.API_BASE_URL`.
2. **Kumpulan Status / Enum**: Mengorganisasi status transaksi perbankan atau tahapan pengiriman kurir.
3. **Connection Pool Cache**: Menyimpan pool koneksi database singleton yang digunakan bersama oleh seluruh instance query repository.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Akses via Instance Objek**: Mengakses `user.total` alih-alih `Pengguna.total`, yang menghasilkan nilai `undefined` dan dapat memicu bug sulit dilacak.
- **Efek Samping State Bersama (_Shared Mutable State_)**: Jika static field berupa objek/array dan diubah oleh satu instance, perubahannya akan berdampak pada seluruh instance lain di dalam aplikasi.

### 🌟 Best Practice

- Gunakan huruf kapital dengan pemisah garis bawah (UPPER_SNAKE_CASE) untuk static field yang nilainya bersifat konstanta murni.
- Manfaatkan `Object.freeze()` jika static field berbentuk objek untuk mencegah mutasi tidak sengaja dari luar.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Karyawan` dengan static field `totalKaryawan = 0`. Setiap kali `new Karyawan(nama)` dipanggil, tingkatkan nilai `totalKaryawan` dan simpan ID karyawan secara otomatis (`"EMP-" + Karyawan.totalKaryawan`).
2. Buat class `PeranAkses` dengan static fields: `ADMIN = "admin"`, `EDITOR = "editor"`, dan `GUEST = "guest"`. Buat fungsi yang memeriksa apakah peran pengguna valid berdasarkan field-field tersebut.
3. Buat subclass yang mewarisi static field superclass, lalu buktikan bahwa mengubah static field pada subclass tidak mengubah nilai asli di superclass jika ditimpa (_shadowed_).

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [11 - Operator instanceof](../11-instanceof-operator/README.md)
- ➡️ **Selanjutnya:** [13 - Static Method](../13-static-method/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
