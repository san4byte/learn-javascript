# 08 - Public Class Field

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendeklarasikan properti publik langsung di dalam badan class tanpa harus menuliskannya di dalam method `constructor`.
> - **Kapan Digunakan**: Menentukan nilai bawaan (_default value_) atau mendokumentasikan skema properti objek secara deklaratif dan bersih di bagian atas kelas.
> - **Aturan Praktis**: Tulis nama field dan nilainya langsung di dalam badan class: `namaField = nilaiAwal;`.

---

## 1. 🎯 Tujuan Belajar

- Memahami fitur modern JavaScript ES2022: **Public Class Field**.
- Mendeklarasikan properti publik langsung di badan class tanpa harus menggunakan `this.field` di dalam constructor.
- Menetapkan nilai bawaan (_default value_) secara deklaratif.
- Memahami urutan eksekusi inisialisasi class field terhadap eksekusi blok constructor.
- Memahami perbedaan mendasar antara properti instance (_own property_) dan method prototype.
- Menguasai pembuatan method otomatis terikat (_auto-bound methods_) menggunakan _arrow function_ sebagai class field.
- Memahami pewarisan (_inheritance_) dan penimpaan nilai public field pada subclass.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **formulir cetak pendaftaran nasabah**: Kolom-kolom isian formulir (seperti Nama Depan, Saldo Awal Rp0, dan Status Akun Aktif) sudah tercetak jelas di lembaran formulir sejak awal. Kertas formulir sudah memiliki slot yang terdefinisi rapi bahkan sebelum nasabah mulai mengisinya di meja pelayanan (_constructor_).

---

### 1. Tabel Ringkasan Fitur Public Class Field (Cheat-Sheet)

| Fitur / Pola               | Sintaks                   | Nilai Awal Default      | Lokasi Memori                                              |
| :------------------------- | :------------------------ | :---------------------- | :--------------------------------------------------------- |
| **Field Tanpa Nilai**      | `namaField;`              | `undefined`             | Own property pada setiap instance objek.                   |
| **Field Bernilai Default** | `saldo = 0;`              | `0` (ekspresi apa pun)  | Own property pada setiap instance objek.                   |
| **Computed Field**         | `[ekspresi] = val;`       | Dihitung saat deklarasi | Own property dengan key dinamis.                           |
| **Auto-Bound Method**      | `onClick = () => {}`      | Fungsi Arrow            | Function instance unik per objek (terikat ke `this`).      |
| **Field Inheritance**      | `class Sub extends Super` | Diwariskan / ditimpa    | Subclass menginisialisasi field induk lalu field miliknya. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja public class field beserta skenario kasusnya:

---

#### 1. Deklarasi Dasar dan Nilai Default

Anda dapat mendeklarasikan properti tanpa nilai (otomatis `undefined`) atau langsung memberikan nilai bawaan:

```javascript
class Customer {
  firstName; // bernilai undefined jika tidak diisi
  status = 'aktif'; // bernilai default "aktif"
  balance = 0; // bernilai default 0
}

const c = new Customer();
console.log(c.firstName); // undefined
console.log(c.status); // "aktif"
```

---

#### 2. Urutan Waktu Eksekusi Inisialisasi Field

Class field dievaluasi dan diinisialisasi **tepat saat instance dibuat**, sebelum badan kode di dalam blok `constructor` dijalankan:

```javascript
class Urutan {
  nilai = 10; // 1. Inisialisasi field berjalan lebih dahulu

  constructor() {
    console.log(this.nilai); // 10 (sudah ada)
    this.nilai = 20; // 2. Menimpa nilai dari constructor
  }
}

new Urutan(); // mencetak 10
```

---

#### 3. Lokasi Memori: Instance Property vs Prototype

Berbeda dengan method class biasa yang disimpan bersama di `Class.prototype`, public class field menempel langsung sebagai properti unik milik setiap instance objek (_own property_):

```javascript
class Produk {
  kategori = 'Elektronik'; // Own property instance
  tampilkan() {} // Prototype method
}

const p = new Produk();
console.log(Object.hasOwn(p, 'kategori')); // true ✅ (Menempel di instance)
console.log(Object.hasOwn(Produk.prototype, 'kategori')); // false ❌ (Bukan di prototype)
```

---

#### 4. Nama Properti Terhitung (Computed Field Names)

Nama class field dapat dihitung secara dinamis pada saat kelas didefinisikan menggunakan tanda kurung siku `[...]`:

```javascript
const PREFIX = 'config_';

class Server {
  [`${PREFIX}port`] = 8080;
  [`${PREFIX}host`] = 'localhost';
}

const s = new Server();
console.log(s.config_port); // 8080
```

---

#### 5. Arrow Function sebagai Class Field (Auto-Bound Methods)

Ketika Anda menetapkan _arrow function_ ke public field, nilai `this` akan selalu terikat secara permanen ke instance objek tersebut, bahkan saat method dicopot dari objeknya:

```javascript
class Tombol {
  label = 'Simpan';

  // Arrow function field: 'this' tidak akan pernah lepas
  klik = () => {
    console.log(`Mengklik: ${this.label}`);
  };
}

const btn = new Tombol();
const handlerLepas = btn.klik;
handlerLepas(); // "Mengklik: Simpan" (Tetap aman tanpa error!)
```

---

#### 6. Pewarisan Public Field pada Subclass

Subclass mewarisi seluruh class field milik superclass. Subclass juga dapat menimpa nilai default field warisan tersebut:

```javascript
class Kendaraan {
  roda = 4;
  bahanBakar = 'Bensin';
}

class MobilListrik extends Kendaraan {
  bahanBakar = 'Baterai EV'; // Menimpa field superclass
  kapasitasKwh = 100;
}

const ev = new MobilListrik();
console.log(ev.roda); // 4 (Diwarisi dari Kendaraan)
console.log(ev.bahanBakar); // "Baterai EV" (Ditimpa)
console.log(ev.kapasitasKwh); // 100 (Milik MobilListrik)
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep public class field di atas—mulai dari deklarasi default value, urutan eksekusi inisialisasi, verifikasi lokasi instance vs prototype, computed field names, auto-bound arrow functions, hingga pewarisan field—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/08-public-class-field/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **State Komponen Frontend**: Menentukan state default pada komponen UI modern (seperti `isOpen = false`, `isLoading = true`).
2. **Event Handler UI**: Menggunakan _arrow function class fields_ sebagai callback listener (seperti `handleSubmit = (e) => {}`) agar tidak perlu melakukan `.bind(this)` manual di constructor.
3. **Konfigurasi Default Service**: Menetapkan nilai default timeout, batas percobaan (_retry count_), dan base URL pada class service.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Konsumsi Memori Berlebih dengan Arrow Function**: Jika sebuah class memiliki ribuan instance, mendefinisikan method menggunakan arrow function field akan menduplikasi closure fungsi di setiap instance, memakan memori lebih banyak dibanding method biasa di `prototype`.
- **Mengharapkan Field Ada di Prototype**: Mencari class field di `MyClass.prototype.field` akan menghasilkan `undefined` karena field hanya ada pada instance objek.

### 🌟 Best Practice

- Gunakan class field untuk mendokumentasikan seluruh state awal objek secara deklaratif di bagian atas class body.
- Gunakan method biasa di prototype untuk fungsi umum, dan batasi arrow function field hanya untuk callback event yang konteks `this`-nya sering lepas.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `KarakterGame` dengan public field `level = 1`, `hp = 100`, dan `aktif = true`. Tambahkan method `terimaDamage(poin)` yang mengurangi `hp`.
2. Buktikan menggunakan `Object.hasOwn()` bahwa public field yang Anda buat di class `KarakterGame` berada pada instance objek dan bukan pada `KarakterGame.prototype`.
3. Buat class `Penghitung` dengan field arrow function `tambah = () => { ... }`. Copot fungsi tersebut ke dalam variabel terpisah dan buktikan bahwa pemanggilan fungsi lepas tetap berhasil menambah hitungan.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07 - Getter dan Setter](../07-getter-setter/README.md)
- ➡️ **Selanjutnya:** [09 - Private Class Field](../09-private-class-field/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
