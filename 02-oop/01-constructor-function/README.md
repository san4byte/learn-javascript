# 01 - Constructor Function (Blueprint Objek, Keyword this, dan Operator new)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membuat cetak biru (_blueprint_) objek sebelum adanya sintaks ES6 `class` menggunakan fungsi reguler yang dipanggil dengan kata kunci `new`.
> - **Kapan Digunakan**: Memahami kode warisan (_legacy code_), konsep fundamental OOP JavaScript di balik layar, atau membuat instance objek berulang dengan properti seragam.
> - **Aturan Praktis**: Selalu gunakan konvensi nama **PascalCase**, jangan pernah lupa menyertakan operator `new`, gunakan `new.target` untuk proteksi defensif, dan hindari menaruh method langsung di dalam `this` constructor demi efisiensi RAM.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar Pemrograman Berorientasi Objek (_OOP_) di JavaScript melalui Constructor Function.
- Menguasai 4 tahapan eksekusi internal yang dilakukan oleh operator `new`.
- Memahami peran kata kunci `this` dan mekanisme pengikatannya (_binding_) ke instance baru.
- Mengetahui cara mendeteksi dan menangani pemanggilan fungsi tanpa `new` menggunakan meta-properti `new.target`.
- Memahami perilaku khusus nilai kembalian (_return value_) pada constructor: perbedaan mengembalikan tipe primitif vs mengembalikan objek eksplisit.
- Menyadari masalah pemborosan alokasi memori (_RAM overhead_) akibat duplikasi method di dalam constructor.
- Mengetahui cara memeriksa identitas objek melalui properti `constructor` dan operator `instanceof`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Constructor Function seperti **cetakan kue martabak atau wajan pencetak kue cubit**: Cetakan logamnya sendiri bernama `Person` (nama fungsi PascalCase). Tiap adonan kue yang dituang dan dicetak menggunakan alat tersebut (`new Person(...)`) akan menghasilkan kue fisik baru yang memiliki bentuk dasar serupa, namun masing-masing kue bisa diberi topping atau rasa yang berlainan (misalnya topping keju untuk `joko`, dan cokelat untuk `budi`).

---

### 1. Tabel Ringkasan Fitur Constructor Function (Cheat-Sheet)

| Fitur / Konsep      | Sintaks                    | Nilai Kembalian / Sifat   | Deskripsi Singkat                                                      |
| :------------------ | :------------------------- | :------------------------ | :--------------------------------------------------------------------- |
| **Deklarasi**       | `function NamaModel(...)`  | Fungsi reguler            | Konvensi penamaan huruf kapital diawali (_PascalCase_).                |
| **Instansiasi**     | `new NamaModel(...args)`   | Objek baru                | Operator pembentuk instance objek dari constructor.                    |
| **Binding `this`**  | `this.properti = nilai`    | Menunjuk ke objek baru    | Menetapkan properti langsung ke instance yang sedang dibuat.           |
| **Meta-Property**   | `new.target`               | `Function` \| `undefined` | Mendeteksi apakah fungsi sedang dipanggil via operator `new`.          |
| **Return Primitif** | `return 123` / `'teks'`    | Diabaikan                 | Nilai kembalian primitif diabaikan; JavaScript tetap me-return `this`. |
| **Return Objek**    | `return { custom: true }`  | Objek eksplisit           | Menggantikan/menimpa objek `this` dengan objek baru yang di-return.    |
| **Inspeksi Tipe**   | `obj instanceof NamaModel` | `boolean`                 | Memverifikasi apakah objek merupakan turunan dari constructor.         |
| **Properti Asal**   | `obj.constructor`          | Fungsi konstruktor        | Referensi balik ke fungsi konstruktor yang membuat instance.           |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja Constructor Function beserta berbagai kemungkinan kasus (_edge cases_):

---

#### 1. Anatomi & Aturan Penamaan PascalCase

Constructor function pada dasarnya adalah fungsi JavaScript biasa. Standar industri menetapkan konvensi penulisan nama menggunakan format **PascalCase** (huruf besar di awal) untuk membedakannya dari fungsi utilitas biasa (_camelCase_):

```javascript
function Produk(nama, harga) {
  this.nama = nama;
  this.harga = harga;
}

const p1 = new Produk('Kopi', 25000);
console.log(p1.nama); // "Kopi"
```

---

#### 2. Empat Langkah yang Dijalankan Operator `new`

Ketika Anda menulis `new Produk('Kopi', 25000)`, mesin JavaScript secara otomatis menjalankan 4 tahapan berikut di belakang layar:

1. **Membuat Objek Kosong Baru**: Mesin mengalokasikan objek baru di memori: `{}`.
2. **Mengikat Prototype**: Objek baru tersebut dihubungkan ke `Produk.prototype` (`obj.__proto__ = Produk.prototype`).
3. **Mengikat Konteks `this`**: Fungsi `Produk` dieksekusi dengan kata kunci `this` diarahkan ke objek baru tersebut.
4. **Mengembalikan Objek**: Objek baru yang telah diisi propertinya secara otomatis dikembalikan (`return this`).

---

#### 3. Peran Kata Kunci `this` pada Constructor

Di dalam constructor, `this` mewakili objek spesifik yang saat itu sedang dibuat:

```javascript
function Mobil(merk, warna) {
  this.merk = merk;
  this.warna = warna;
  this.mesinNyala = false;

  this.hidupkanMesin = function () {
    this.mesinNyala = true;
  };
}

const sedan = new Mobil('Honda', 'Hitam');
sedan.hidupkanMesin();
console.log(sedan.mesinNyala); // true
```

---

#### 4. Deteksi Pemanggilan Tanpa `new` & Meta-Property `new.target`

Jika constructor function dipanggil tanpa operator `new` (`const x = Mobil(...)`):

- Pada **Sloppy Mode**: `this` akan merujuk ke objek global (`globalThis` atau `window`), mengakibatkan variabel global tercemar (_scope pollution_).
- Pada **Strict Mode** (`"use strict"`): `this` bernilai `undefined`, memicu fatal error `TypeError: Cannot set properties of undefined`.

* **Pola Defensif Menggunakan `new.target` (ES6)**:
  `new.target` bernilai referensi fungsi jika dipanggil dengan `new`, atau bernilai `undefined` jika dipanggil tanpa `new`:

  ```javascript
  function User(nama) {
    // Jika dipanggil tanpa new, otomatis panggilkan dengan new:
    if (!new.target) {
      return new User(nama);
    }
    this.nama = nama;
  }

  const u1 = new User('Joko'); // Valid
  const u2 = User('Budi'); // Tetap aman menghasilkan instance User! ✅
  console.log(u2 instanceof User); // true
  ```

---

#### 5. Perilaku Khusus Nilai Kembalian: Return Primitif vs Return Objek

Secara default, constructor function mengembalikan objek `this`. Namun jika terdapat statement `return` eksplisit di dalamnya:

- **Kasus A: Mengembalikan Nilai Primitif (Diabaikan)**
  Jika Anda me-return angka, string, atau boolean, nilai tersebut **diabaikan sepenuhnya**, dan JavaScript tetap mengembalikan objek `this`:

  ```javascript
  function TesPrimitif() {
    this.angka = 10;
    return 999; // Diabaikan!
  }
  console.log(new TesPrimitif()); // TesPrimitif { angka: 10 }
  ```

- **Kasus B: Mengembalikan Objek Eksplisit (Menimpa `this`)**
  Jika Anda secara sengaja me-return sebuah objek lain, objek baru tersebut akan **menggantikan total** objek `this`:
  ```javascript
  function TesObjek() {
    this.angka = 10;
    return { status: 'ditimpa' }; // Objek ini yang akan dikembalikan!
  }
  console.log(new TesObjek()); // { status: 'ditimpa' }
  ```

---

#### 6. Masalah Duplikasi Method di RAM (Alasan Perlunya Prototype)

Mendefinisikan method langsung di dalam tubuh constructor function (`this.sayHello = function...`) adalah anti-pattern performa jika instance yang dibuat berjumlah banyak:

```javascript
function Anggota(nama) {
  this.nama = nama;
  this.sapa = function () {
    return `Halo ${this.nama}`;
  };
}

const a1 = new Anggota('Andi');
const a2 = new Anggota('Budi');

console.log(a1.sapa === a2.sapa); // false! ❌
```

> ⚠️ **Penjelasan Pemborosan RAM**:
> Kedua fungsi di atas melakukan logika yang sama, tetapi dialokasikan di dua blok memori terpisah. Jika Anda memiliki 10.000 anggota, akan ada 10.000 salinan fungsi `sapa` di RAM. Masalah ini diselesaikan oleh **Prototype Inheritance** (materi 02) di mana fungsi hanya disimpan 1 kali di memori bersama.

---

#### 7. Inspeksi Properti `constructor` & Operator `instanceof`

Setiap instance yang dibuat mewarisi properti `constructor` yang menunjuk ke fungsi pembuatnya:

```javascript
const a = new Anggota('Siti');

console.log(a instanceof Anggota); // true
console.log(a.constructor === Anggota); // true
console.log(a.constructor.name); // "Anggota"
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep deklarasi constructor, operator `new`, auto-instansiasi via `new.target`, pengujian return value primitif vs objek, pembuktian duplikasi method di RAM, dan inspeksi `instanceof` di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/01-constructor-function/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pemahaman Arsitektur Library Klasik**: Library legendaris seperti jQuery (`$()`) dan Express (`express()`) memanfaatkan pola factory dan constructor function tanpa keharusan mengetik `new`.
2. **Entity Data Model Sederhana**: Memformat struktur data tabel sebelum JavaScript modern mengadopsi sintaks ES6 class.
3. **Polyfill Lingkungan Lawas**: Menulis kode yang kompatibel dengan browser zaman dahulu tanpa memerlukan transpiler Babel.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Mengetik `new`**: Memicu pencemaran variabel global atau melempar runtime error pada strict mode. Selalu gunakan pola defensif `if (!new.target) return new Constructor(...)`.
- **Menaruh Method di Dalam `this` Constructor**: Mengakibatkan pembengkakan penggunaan memori RAM aplikasi. Selalu letakkan method pada `Constructor.prototype`.
- **Me-return Objek Baru Tanpa Sengaja**: Mengakibatkan instance kehilangan relasi prototype dengan constructor aslinya.

### 🌟 Best Practice

- Gunakan konvensi penamaan huruf kapital (_PascalCase_) untuk semua constructor function.
- Utamakan penggunaan sintaks modern ES6 `class` untuk proyek aplikasi baru (dibahas pada materi 03).
- Gunakan `new.target` jika Anda ingin constructor Anda fleksibel dipanggil baik menggunakan `new` maupun tanpa `new`.

---

## 5. ✍️ Latihan Mandiri

1. Buat Constructor Function `Buku(judul, penulis, harga)` yang menerapkan pola defensif `new.target` sehingga aman dipanggil baik dengan `new Buku(...)` maupun `Buku(...)`.
2. Buat Constructor Function `Counter(awal)` yang memiliki properti `nilai` dan method `tambah()` serta `kurang()`. Buktikan apakah method pada dua instance yang berbeda memiliki alamat memori yang sama atau berbeda.
3. Eksperimen: Apa yang terjadi jika constructor function mengembalikan nilai `null` (`return null;`)? Apakah JavaScript mengembalikan `null` atau objek `this`? Buktikan dengan kode!

---

## 6. 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [10 - Sintaks Modern ES Lanjutan (Modul 01)](../../01-fundamentals/10-advanced-syntax/README.md)
- ➡️ **Selanjutnya:** [02 - Prototype Inheritance](../02-prototype/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
