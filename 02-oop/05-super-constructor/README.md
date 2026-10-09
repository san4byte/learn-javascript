# 05 - Super Constructor

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memanggil constructor milik superclass dari dalam subclass menggunakan sintaks fungsi `super(...)`.
> - **Kapan Digunakan**: Setiap kali sebuah subclass mendeklarasikan blok `constructor` sendiri dan perlu meneruskan data untuk menginisialisasi properti yang didefinisikan oleh superclass.
> - **Aturan Praktis**: Pemanggilan `super(...)` WAJIB dieksekusi sebelum mengakses kata kunci `this` di dalam constructor subclass.

---

## 1. 🎯 Tujuan Belajar

- Memahami peran dan mekanisme kata kunci **`super(...)`** di dalam constructor subclass.
- Mengetahui aturan mutlak pemanggilan `super(...)` sebelum mengakses kata kunci `this`.
- Menguasai teknik **Parameter Forwarding** (meneruskan argumen tertentu maupun menggunakan _rest parameter_).
- Mengetahui perilaku **Default Constructor** ketika subclass tidak menulis blok `constructor` sama sekali.
- Memahami cara menginisialisasi properti tambahan khusus subclass setelah pemanggilan `super(...)`.
- Mengetahui teknik evaluasi ekspresi dan helper function sebelum atau di dalam argumen `super(...)`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **mengisi formulir pendaftaran bertingkat**: Sebelum petugas mencetak kartu keanggotaan khusus (_subclass properties_), formulir data kependudukan dasar seperti NIK dan nama lengkap (_superclass properties_) harus diserahkan dan diverifikasi terlebih dahulu melalui loket pusat (`super()`). Jika Anda mencoba mencetak kartu (_mengakses `this`_) sebelum formulir dasar diserahkan, sistem akan menolak dengan pesan error.

---

### 1. Tabel Ringkasan Fitur Super Constructor (Cheat-Sheet)

| Fitur / Mekanisme        | Sintaks                       | Perilaku Utama                                                              | Konsekuensi Pelanggaran                      |
| :----------------------- | :---------------------------- | :-------------------------------------------------------------------------- | :------------------------------------------- |
| **Panggilan Dasar**      | `super(arg1, arg2)`           | Menjalankan constructor induk dengan argumen yang diberikan.                | Properti induk terinisialisasi sempurna.     |
| **Aturan Urutan `this`** | `super()` sebelum `this.prop` | Objek `this` baru tercipta setelah super constructor selesai.               | Melempar `ReferenceError`.                   |
| **Forwarding Argumen**   | `super(...args)`              | Meneruskan seluruh atau sebagian argumen ke induk.                          | Data induk sesuai dengan input subclass.     |
| **Default Constructor**  | _(Tanpa blok constructor)_    | JavaScript otomatis menyisipkan `constructor(...args) { super(...args); }`. | Tetap aman dan mewarisi inisialisasi induk.  |
| **Properti Tambahan**    | `this.subProp = val`          | Dideklarasikan tepat setelah baris `super()`.                               | Instance memiliki properti induk dan anak.   |
| **Evaluasi Ekspresi**    | `super(formatId(id))`         | Argumen dapat berupa hasil komputasi fungsi pembantu.                       | Nilai terproses sebelum diserahkan ke induk. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja pemanggilan super constructor beserta skenario kasusnya:

---

#### 1. Pemanggilan Dasar `super(...)`

Ketika subclass memiliki constructor sendiri, ia bertanggung jawab memanggil constructor superclass menggunakan `super(...)` agar konstruksi dasar objek selesai:

```javascript
class Karyawan {
  constructor(nama) {
    this.nama = nama;
  }
}

class Manajer extends Karyawan {
  constructor(nama, departemen) {
    super(nama); // Memanggil constructor Karyawan
    this.departemen = departemen;
  }
}

const mgr = new Manajer('Budi', 'Teknologi');
console.log(mgr.nama); // "Budi"
```

---

#### 2. Aturan Akses `this` Sebelum `super()`

Di JavaScript modern, objek `this` pada turunan kelas belum ada di memori sampai constructor parent selesai dieksekusi. Mengakses `this` sebelum `super()` akan memicu error:

```javascript
class Parent {
  constructor(id) {
    this.id = id;
  }
}

class Child extends Parent {
  constructor(id, role) {
    // SALAH: this.role = role; // ReferenceError!
    super(id); // BENAR: panggil super() lebih dulu
    this.role = role; // Lalu inisialisasi this
  }
}
```

---

#### 3. Parameter Forwarding dan Rest Parameters

Kita dapat meneruskan sebagian argumen secara spesifik atau meneruskan seluruh sisa argumen menggunakan _rest parameter_ (`...args`):

```javascript
class RekeningBank {
  constructor(nomor, saldo) {
    this.nomor = nomor;
    this.saldo = saldo;
  }
}

class RekeningPrioritas extends RekeningBank {
  constructor(level, ...rekeningArgs) {
    super(...rekeningArgs); // Meneruskan nomor dan saldo ke RekeningBank
    this.level = level;
  }
}

const rek = new RekeningPrioritas('Platinum', 'ACC-123', 10_000_000);
console.log(rek.nomor); // "ACC-123"
```

---

#### 4. Perilaku Default Constructor Subclass

Jika subclass tidak mendefinisikan blok `constructor`, engine JavaScript akan menyisipkan constructor implisit secara otomatis:

```javascript
class Hewan {
  constructor(nama) {
    this.nama = nama;
  }
}

// Tidak menulis constructor sama sekali:
class Kucing extends Hewan {}

// Di balik layar, engine memperlakukannya sebagai:
// constructor(...args) { super(...args); }

const cat = new Kucing('Mimi');
console.log(cat.nama); // "Mimi" (Terinisialisasi otomatis)
```

---

#### 5. Menambahkan Properti Khusus Subclass

Setelah `super(...)` selesai dieksekusi, subclass bebas mendefinisikan properti tambahan apa pun pada instance `this`:

```javascript
class Produk {
  constructor(nama, harga) {
    this.nama = nama;
    this.harga = harga;
  }
}

class ProdukDigital extends Produk {
  constructor(nama, harga, linkDownload) {
    super(nama, harga);
    this.linkDownload = linkDownload; // Properti spesifik subclass
  }
}

const ebook = new ProdukDigital('Ebook JS', 50000, 'https://link.id/ebook');
console.log(ebook.linkDownload); // "https://link.id/ebook"
```

---

#### 6. Evaluasi Ekspresi di Dalam Panggilan `super()`

Argumen yang dikirimkan ke dalam `super()` dapat berupa ekspresi, operasi aritmetika, atau hasil pemanggilan fungsi eksternal:

```javascript
function formatCode(prefix, id) {
  return `${prefix.toUpperCase()}-${id}`;
}

class Entitas {
  constructor(kode) {
    this.kode = kode;
  }
}

class Pengguna extends Entitas {
  constructor(id, role) {
    super(formatCode(role, id)); // Evaluasi fungsi sebelum super() dijalankan
    this.role = role;
  }
}

const user = new Pengguna(42, 'admin');
console.log(user.kode); // "ADMIN-42"
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep super constructor di atas—mulai dari panggilan dasar, pencegahan _ReferenceError_, _parameter forwarding_, _default constructor_, hingga evaluasi ekspresi sebelum inisialisasi—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/05-super-constructor/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konfigurasi HTTP Client**: Subclass API client (misal `PaymentApiClient`) memanggil `super(baseUrl, defaultTimeout)` milik `BaseHttpClient` sebelum menyimpan API key rahasia milik payment gateway.
2. **Kustomisasi Komponen GUI**: Subclass UI Button memanggil `super(elementId, width, height)` milik `BaseComponent` sebelum menyetel warna tema atau ikon spesifik.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **ReferenceError Sebelum `super()`**: Mengakses `this.nama = nama;` sebelum `super()` dieksekusi adalah penyebab nomor satu crash pada subclass ES6.
- **Lupa Argumen Wajib Parent**: Menjalankan `super()` kosong padahal parent mewajibkan parameter tertentu, berujung pada nilai properti induk yang menjadi `undefined`.
- **Memanggil `super()` di Kelas Non-Turunan**: Memanggil `super()` di dalam class biasa yang tidak menggunakan kata kunci `extends` akan memicu `SyntaxError: 'super' keyword unexpected here`.

### 🌟 Best Practice

- Selalu jadikan `super(...)` sebagai baris pertama yang bermakna di dalam constructor subclass.
- Gunakan _rest parameters_ (`...args`) jika parameter kelas induk bersifat fleksibel atau sering mengalami penambahan konfigurasi.
- Jika subclass tidak memerlukan inisialisasi properti baru, jangan tulis ulang blok `constructor` kosong; biarkan JavaScript menggunakan _default constructor_.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Kendaraan` dengan constructor `(merk, roda)`. Buat subclass `Mobil` dengan constructor `(merk, tipeBahanBakar)` yang memanggil `super(merk, 4)`. Pastikan roda mobil selalu terinisialisasi bernilai 4.
2. Buat subclass `SepedaMotor` yang tidak mendefinisikan constructor sama sekali. Buat instance `new SepedaMotor("Honda", 2)` dan periksa apakah nilai `merk` dan `roda` terisi dengan benar.
3. Coba tempatkan kode `console.log(this);` sebelum baris `super()` di constructor anak, amati pesan error spesifik yang ditampilkan oleh runtime JavaScript, lalu jelaskan alasannya.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - Class Inheritance](../04-class-inheritance/README.md)
- ➡️ **Selanjutnya:** [06 - Super Method](../06-super-method/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
