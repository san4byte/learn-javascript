# 07 - Getter dan Setter

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengontrol mekanisme pembacaan (_getter_) dan penulisan/modifikasi (_setter_) suatu properti objek menggunakan accessor methods yang diakses seolah-olah properti biasa tanpa tanda kurung `()`.
> - **Kapan Digunakan**: Melakukan validasi data otomatis sebelum menyimpan nilai baru, memformat data saat dibaca, atau menyediakan properti virtual terhitung (_computed properties_).
> - **Aturan Praktis**: Gunakan variabel penampung internal dengan awalan garis bawah (misal `this._nama`) atau _private field_ (`this.#nama`) agar tidak memicu rekursi tak hingga (_infinite loop_).

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep pilar OOP: **Encapsulation (Enkapsulasi)** melalui getter dan setter.
- Menguasai pembuatan properti virtual menggunakan kata kunci **`get`**.
- Menguasai validasi dan sanitasi data masukan menggunakan kata kunci **`set`**.
- Memahami jebakan fatal pemanggilan diri sendiri (_infinite recursion call stack_) dan solusinya menggunakan _backing property_.
- Memahami karakteristik **Read-Only Property** (hanya mendefinisikan getter tanpa setter).
- Menguasai penerapan **Static Getter & Setter** langsung pada level class.
- Memahami bagaimana engine JavaScript menyimpan accessor di balik layar pada `prototype` descriptor.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **layar display dan tombol pengatur AC pintar**: Saat Anda melihat layar display (_Getter_), suhu ditampilkan dalam satuan Celsius rapi lengkap dengan simbol derajat (°C); saat Anda menekan tombol naik/turun (_Setter_), microcontroller memvalidasi terlebih dahulu agar suhu yang diminta hanya berada di rentang 16°C hingga 30°C. Jika Anda meminta suhu 5°C, sistem menolak dan mempertahankan suhu aman.

---

### 1. Tabel Ringkasan Fitur Getter dan Setter (Cheat-Sheet)

| Fitur / Sintaks             | Jenis Accessor              | Cara Akses                    | Perilaku & Manfaat                                                                      |
| :-------------------------- | :-------------------------- | :---------------------------- | :-------------------------------------------------------------------------------------- |
| **`get prop()`**            | Getter (Reader)             | `obj.prop` (tanpa tanda `()`) | Menghitung atau memformat nilai secara dinamis saat properti dibaca.                    |
| **`set prop(val)`**         | Setter (Writer)             | `obj.prop = val`              | Mencegat proses penetapan nilai, memvalidasi tipe/rentang data.                         |
| **Backing Field (`_prop`)** | Penyimpan Internal          | `this._prop = val`            | Variabel riil tempat data disimpan agar terhindar dari rekursi tak hingga.              |
| **Read-Only Property**      | Getter Tanpa Setter         | `obj.prop` (baca saja)        | Nilai tidak bisa diubah dari luar; assignment diabaikan atau error.                     |
| **Static Accessor**         | `static get` / `static set` | `Class.prop`                  | Getter dan setter yang melekat pada fungsi constructor kelas, bukan instance.           |
| **Descriptor Prototype**    | `getOwnPropertyDescriptor`  | Inspeksi internal             | Accessor terdaftar sebagai properti bertipe _accessor descriptor_ di `Class.prototype`. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja getter dan setter beserta skenario kasusnya:

---

#### 1. Sintaks Dasar Getter: `get prop()`

Getter dieksekusi setiap kali nama properti dibaca. Getter **tidak menerima parameter** dan harus mengembalikan suatu nilai (_return value_):

```javascript
class Orang {
  constructor(depan, belakang) {
    this.depan = depan;
    this.belakang = belakang;
  }

  get namaLengkap() {
    return `${this.depan} ${this.belakang}`;
  }
}

const user = new Orang('Joko', 'Santoso');
console.log(user.namaLengkap); // "Joko Santoso" (Diakses tanpa tanda kurung)
```

---

#### 2. Sintaks Dasar Setter: `set prop(val)`

Setter dieksekusi secara otomatis saat operator penugasan (`=`) digunakan. Setter **wajib menerima tepat 1 parameter**:

```javascript
class Orang {
  constructor(depan, belakang) {
    this.depan = depan;
    this.belakang = belakang;
  }

  set namaLengkap(nilai) {
    const bagian = nilai.split(' ');
    this.depan = bagian[0];
    this.belakang = bagian.slice(1).join(' ');
  }
}

const user = new Orang('Joko', 'Santoso');
user.namaLengkap = 'Eko Khannedy'; // Menjalankan setter
console.log(user.depan); // "Eko"
```

---

#### 3. Jebakan Rekursi Tak Hingga & Solusi Backing Field

Kesalahan paling sering terjadi adalah menggunakan nama variabel yang sama persis di dalam setter atau getter:

```javascript
class Jebakan {
  set nama(val) {
    this.nama = val; // 💥 BAHAYA: Memanggil setter dirinya sendiri tanpa henti!
    // Runtime Error: RangeError: Maximum call stack size exceeded
  }
}

// SOLUSI: Gunakan backing field (konvensi underscore _nama)
class Benar {
  constructor(nama) {
    this.nama = nama; // Menjalankan setter di bawah
  }

  get nama() {
    return this._nama;
  }
  set nama(val) {
    this._nama = val;
  }
}
```

---

#### 4. Properti Hanya-Baca (Read-Only Properties)

Jika sebuah class hanya mendefinisikan `get` tanpa `set`, maka properti tersebut menjadi _read-only_. Upaya menulis properti ini tidak akan mengubah nilai:

```javascript
class Lingkaran {
  constructor(radius) {
    this.radius = radius;
  }

  get luas() {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Lingkaran(10);
circle.luas = 500; // Tidak berpengaruh (atau melempar TypeError dalam strict mode)
console.log(circle.luas.toFixed(2)); // "314.16"
```

---

#### 5. Properti Komputasi Dinamis (Computed Properties)

Getter sangat ideal untuk properti yang nilainya selalu berubah bergantung pada variabel lain, misalnya umur dari tanggal lahir:

```javascript
class Pengguna {
  constructor(tahunLahir) {
    this.tahunLahir = tahunLahir;
  }

  get umur() {
    const tahunSekarang = new Date().getFullYear();
    return tahunSekarang - this.tahunLahir;
  }
}

const p = new Pengguna(2000);
console.log(p.umur); // Menghasilkan umur aktual saat dibaca
```

---

#### 6. Static Getter dan Setter pada Kelas

Getter dan setter juga dapat ditempelkan langsung pada level class menggunakan kata kunci `static`:

```javascript
class Konfigurasi {
  static _env = 'development';

  static get env() {
    return this._env.toUpperCase();
  }

  static set env(nilai) {
    this._env = nilai.toLowerCase();
  }
}

console.log(Konfigurasi.env); // "DEVELOPMENT"
Konfigurasi.env = 'PRODUCTION';
console.log(Konfigurasi.env); // "PRODUCTION"
```

---

#### 7. Struktur Accessor di Prototype (Under the Hood)

Di balik layar, getter dan setter didaftarkan pada `Class.prototype` sebagai _accessor property descriptor_:

```javascript
const desc = Object.getOwnPropertyDescriptor(Orang.prototype, 'namaLengkap');
console.log(typeof desc.get); // "function"
console.log(typeof desc.set); // "function"
console.log(desc.enumerable); // false (secara default tidak muncul di for...in)
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep getter dan setter—mulai dari computed properties, validasi data, mitigasi infinite recursion, read-only property, static accessor, hingga inspeksi descriptor di prototype—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/07-getter-setter/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Format Keuangan Otomatis**: Properti `saldo` angka murni (misal: `1500000`) memiliki getter `saldoRupiah` yang mengembalikan format teks cantik `"Rp 1.500.000,00"`.
2. **Validasi Password & Email**: Setter `email` memvalidasi keberadaan karakter `@` dan domain sebelum data dimasukkan ke atribut internal.
3. **Koordinat Geografis**: Setter `latitude` dan `longitude` memastikan angka berada dalam rentang valid `[-90, 90]` dan `[-180, 180]`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Rekursi `this.property = value`**: Menetapkan nilai ke properti dengan nama yang sama di dalam setter tanpa variabel perantara (`_property`) memicu crash `RangeError: Maximum call stack size exceeded`.
- **Memanggil Getter dengan Kurung `()`**: Memanggil `user.namaLengkap()` akan memicu `TypeError: user.namaLengkap is not a function`. Getter harus diakses seperti properti: `user.namaLengkap`.
- **Komputasi Berat di Getter**: Jangan menaruh operasi lambat (seperti HTTP fetch atau pembacaan disk) di dalam getter karena pembaca properti mengharapkan operasi instan.

### 🌟 Best Practice

- Gunakan konvensi penamaan backing field yang konsisten (seperti `_nama` atau _private field_ `#nama`).
- Letakkan validasi tipe dan batas nilai di dalam setter untuk menjaga konsistensi state objek.
- Gunakan getter hanya untuk operasi murni (_idempotent_) tanpa efek samping (_side effects_).

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Suhu` dengan backing field `_celsius`. Buat getter `fahrenheit` yang mengonversi Celsius ke Fahrenheit, dan setter `fahrenheit` yang mengubah suhu input Fahrenheit kembali ke Celsius.
2. Buat class `DompetDigital` dengan setter `saldo` yang menolak (melempar error) jika ada yang memasukkan angka negatif atau tipe bukan `number`.
3. Tulis contoh kode yang secara sengaja menyebabkan `RangeError: Maximum call stack size exceeded` akibat salah menulis setter, lalu perbaiki kode tersebut.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - Super Method](../06-super-method/README.md)
- ➡️ **Selanjutnya:** [08 - Public Class Field](../08-public-class-field/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
